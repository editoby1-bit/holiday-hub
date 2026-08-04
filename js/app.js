/* ═══════════════════════════════════════════════════════════════
   HOLIDAY HUB — App Logic v1.0
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const API_BASE = 'https://editoby-api.vercel.app';

  /* ────────────────────────────────
     STATE
  ──────────────────────────────── */
  const S = {
    category: 'senior',        // 'senior' | 'junior'
    currentUser: null,
    subject: null,
    mode: null,                // 'revision' | 'quiz' | 'challenge'
    questions: [],
    idx: 0,
    answers: [],
    score: 0,
    timerSecs: 0,
    timerInterval: null,
    startedAt: null,
    _challengeCode: null,
    stats: { sessions: 0, totalPct: 0, streak: 0, lastActiveDate: null }
  };

  /* ────────────────────────────────
     STORAGE HELPERS
  ──────────────────────────────── */
  function loadSafe(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function saveSafe(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  const STATS_KEY = 'hh-stats-v1';
  const USER_KEY = 'hh-user-v1';
  const SEEN_KEY = 'hh-seen-v1';

  function getBank(cat) {
    return cat === 'junior' ? JUNIOR_BANK : SENIOR_BANK;
  }

  /* ────────────────────────────────
     SEEN-QUESTION TRACKING
     Avoids repeating the same questions for a user in Revision, Quiz,
     and Challenge creation. Tracked per category+subject so Senior and
     Junior pools don't interfere with each other. Once every question
     in a subject has been seen, the pool quietly resets (recycles)
     rather than blocking the student from practicing further.
  ──────────────────────────────── */
  function seenKey(category, subject) { return `${category}:${subject}`; }

  function getSeenSet(category, subject) {
    const all = loadSafe(SEEN_KEY, {});
    return new Set(all[seenKey(category, subject)] || []);
  }

  function markSeen(category, subject, questionIds) {
    if (!questionIds.length) return;
    const all = loadSafe(SEEN_KEY, {});
    const key = seenKey(category, subject);
    const set = new Set(all[key] || []);
    questionIds.forEach(id => set.add(id));
    all[key] = Array.from(set);
    saveSafe(SEEN_KEY, all);
  }

  function resetSeen(category, subject) {
    const all = loadSafe(SEEN_KEY, {});
    delete all[seenKey(category, subject)];
    saveSafe(SEEN_KEY, all);
  }

  /**
   * Picks `count` questions from `pool` (array of question objects with
   * an `id`), preferring ones the user hasn't seen yet for this
   * category+subject. If the unseen pool can't cover the full count,
   * it recycles seen ones to fill the rest (and if the WHOLE pool has
   * been seen, it resets tracking so the cycle starts fresh — better
   * than refusing to serve questions at all).
   * Returns { questions, recycled } where `recycled` is true if any
   * previously-seen questions had to be reused.
   */
  function pickQuestions(category, subject, pool, count) {
    const seen = getSeenSet(category, subject);
    const unseen = pool.filter(q => !seen.has(q.id));
    const alreadySeen = pool.filter(q => seen.has(q.id));

    shuffleArray(unseen);
    shuffleArray(alreadySeen);

    let selected = unseen.slice(0, count);
    let recycled = false;

    if (selected.length < count) {
      recycled = selected.length > 0 || alreadySeen.length > 0;
      const stillNeeded = count - selected.length;
      selected = selected.concat(alreadySeen.slice(0, stillNeeded));
    }

    // Whole subject exhausted (every question already seen at least
    // once) — reset tracking now so the NEXT session starts fresh
    // rather than immediately recycling again.
    if (unseen.length === 0 && pool.length > 0) {
      resetSeen(category, subject);
    }

    return { questions: selected, recycled };
  }

  /* ────────────────────────────────
     TOAST
  ──────────────────────────────── */
  function showToast(msg, ms) {
    const host = document.getElementById('toastHost');
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => t.remove(), ms || 2600);
  }
  window.showInfoToast = showToast;

  /* ────────────────────────────────
     SCREEN ROUTING
  ──────────────────────────────── */
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
    window.scrollTo(0, 0);
  }

  function goBack(target) {
    if (target === 'confirm-exit-quiz') {
      if (S.mode === 'quiz' || S.mode === 'challenge') {
        if (!confirm('Leave this quiz? Your progress will be lost.')) return;
        stopTimer();
      }
      if (S.mode === 'game') {
        if (!confirm('Leave Speed Round? Your score will be lost.')) return;
        stopGameTimer();
      }
      showScreen('subjectScreen');
      return;
    }
    const map = { home: 'homeScreen', subject: 'subjectScreen' };
    showScreen(map[target] || 'homeScreen');
  }

  /* ────────────────────────────────
     NAME / USER
  ──────────────────────────────── */
  function ensureUser(cb) {
    const saved = loadSafe(USER_KEY, null);
    if (saved) { S.currentUser = saved; cb(); return; }
    const modal = document.getElementById('namePromptModal');
    modal.classList.remove('hidden');
    document.getElementById('nameConfirmBtn').onclick = () => {
      const name = document.getElementById('nameInput').value.trim();
      if (!name) { showToast('Please enter a name.'); return; }
      S.currentUser = name;
      saveSafe(USER_KEY, name);
      modal.classList.add('hidden');
      cb();
    };
  }

  /* ────────────────────────────────
     STATS
  ──────────────────────────────── */
  function loadStats() {
    S.stats = loadSafe(STATS_KEY, { sessions: 0, totalPct: 0, streak: 0, lastActiveDate: null });
    renderHomeStats();
  }
  function recordSession(pct) {
    S.stats.sessions++;
    S.stats.totalPct += pct;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (S.stats.lastActiveDate === yesterday) S.stats.streak++;
    else if (S.stats.lastActiveDate !== today) S.stats.streak = 1;
    S.stats.lastActiveDate = today;
    saveSafe(STATS_KEY, S.stats);
    renderHomeStats();
  }
  function renderHomeStats() {
    document.getElementById('hStatSessions').textContent = S.stats.sessions;
    document.getElementById('hStatAvg').textContent = S.stats.sessions
      ? Math.round(S.stats.totalPct / S.stats.sessions) + '%' : '—';
    document.getElementById('hStatStreak').textContent = S.stats.streak;
  }

  /* ────────────────────────────────
     HOLIDAY COUNTDOWN
     (Nigerian schools typically resume early-to-mid September;
      adjust HOLIDAY_END if your actual resumption date differs.)
  ──────────────────────────────── */
  function renderCountdown() {
    const HOLIDAY_END = new Date('2026-09-14T00:00:00');
    const now = new Date();
    const days = Math.max(0, Math.ceil((HOLIDAY_END - now) / 86400000));
    document.getElementById('daysLeft').textContent = days;
  }

  /* ────────────────────────────────
     CATEGORY TABS
  ──────────────────────────────── */
  function initCategoryTabs() {
    document.querySelectorAll('.cat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        S.category = tab.dataset.cat;
      });
    });
  }

  /* ────────────────────────────────
     FEATURE GRID ACTIONS
  ──────────────────────────────── */
  function initFeatureGrid() {
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('click', () => {
        const action = card.dataset.action;
        ensureUser(() => handleFeature(action));
      });
    });
  }

  function handleFeature(action) {
    if (action === 'revision') openSubjectPicker('revision');
    else if (action === 'quiz') openSubjectPicker('quiz');
    else if (action === 'challenge') openQuizChallenge();
    else if (action === 'friend-study') openQuizChallenge(true);
    else if (action === 'project') openProjectHelper();
    else if (action === 'games') openSubjectPicker('game');
  }

  /* ────────────────────────────────
     SUBJECT PICKER
  ──────────────────────────────── */
  function openSubjectPicker(mode) {
    S.mode = mode;
    const manifest = CONTENT_MANIFEST[S.category];
    const bank = getBank(S.category);
    const titles = { quiz: 'Quiz — pick a subject', revision: 'Revision — pick a subject', game: '🎮 Speed Round — pick a subject' };
    document.getElementById('subjectScreenTitle').textContent = titles[mode] || 'Pick a subject';

    const list = document.getElementById('subjectList');
    list.innerHTML = manifest.subjects.map(key => {
      const subj = bank[key];
      const count = subj && subj.objective ? subj.objective.length : 0;
      const label = SUBJECT_LABELS[key] || key;
      return `<button class="subject-row" data-subject="${key}">
        <div>
          <div class="subject-row-name">${label}</div>
          <div class="subject-row-count">${count} questions</div>
        </div>
        <span class="subject-row-arrow">→</span>
      </button>`;
    }).join('');

    list.querySelectorAll('.subject-row').forEach(row => {
      row.addEventListener('click', () => {
        S.subject = row.dataset.subject;
        if (mode === 'quiz') startQuizSetup(S.subject);
        else if (mode === 'game') startSpeedRound(S.subject);
        else startRevision(S.subject);
      });
    });

    showScreen('subjectScreen');
  }

  /* ────────────────────────────────
     REVISION MODE
  ──────────────────────────────── */
  function startRevision(subjectKey) {
    const bank = getBank(S.category);
    const subj = bank[subjectKey];
    if (!subj || !subj.objective || !subj.objective.length) {
      showToast('No questions available for this subject yet.');
      return;
    }
    S.mode = 'revision';
    S.questions = subj.objective.slice();
    S.idx = 0;
    document.getElementById('revisionTitle').textContent = SUBJECT_LABELS[subjectKey] || subjectKey;
    renderRevisionQuestion();
    showScreen('revisionScreen');
  }

  function renderRevisionQuestion() {
    const q = S.questions[S.idx];
    const body = document.getElementById('revisionBody');
    document.getElementById('revisionProgress').textContent = `${S.idx + 1} / ${S.questions.length}`;

    const letters = ['A', 'B', 'C', 'D', 'E'];
    body.innerHTML = `
      <div class="q-card">
        <div class="q-meta">${q.exam || ''} ${q.year || ''} ${q.level || ''}</div>
        <div class="q-text">${q.question}</div>
        <div id="revOptions">
          ${q.options.map((opt, i) => `
            <button class="q-option" data-i="${i}">
              <span class="q-option-letter">${letters[i]}</span>
              <span>${opt}</span>
            </button>`).join('')}
        </div>
        <div id="revExplanation" class="q-explanation hidden"></div>
        <div class="q-nav-row">
          <button class="btn btn-ghost" id="revPrev" ${S.idx === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="btn btn-primary" id="revNext" ${S.idx === S.questions.length - 1 ? 'disabled' : ''}>Next →</button>
        </div>
      </div>`;

    body.querySelectorAll('.q-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.i, 10);
        body.querySelectorAll('.q-option').forEach((b, bi) => {
          b.classList.remove('selected');
          if (bi === q.answer) b.classList.add('correct');
          else if (bi === i) b.classList.add('incorrect');
        });
        const exp = document.getElementById('revExplanation');
        exp.textContent = q.explanation || 'No explanation available for this question.';
        exp.classList.remove('hidden');
      });
    });

    document.getElementById('revPrev').addEventListener('click', () => { S.idx--; renderRevisionQuestion(); });
    document.getElementById('revNext').addEventListener('click', () => { S.idx++; renderRevisionQuestion(); });
  }

  /* ────────────────────────────────
     QUIZ MODE
  ──────────────────────────────── */
  function startQuizSetup(subjectKey) {
    const bank = getBank(S.category);
    const subj = bank[subjectKey];
    if (!subj || !subj.objective || !subj.objective.length) {
      showToast('No questions available for this subject yet.');
      return;
    }
    const available = subj.objective.length;
    const countOptions = [10, 20, 30].filter(n => n <= available);
    if (!countOptions.length) countOptions.push(available);

    const body = document.getElementById('subjectList');
    body.innerHTML = `
      <div class="card" style="padding:1.25rem;">
        <h3 style="font-family:var(--serif); font-size:1.1rem; margin-bottom:1rem;">${SUBJECT_LABELS[subjectKey] || subjectKey}</h3>
        <div class="form-group">
          <label>Number of questions</label>
          <select id="quizSetupCount">
            ${countOptions.map(n => `<option value="${n}">${n} questions</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Time limit</label>
          <select id="quizSetupTime">
            <option value="0">No time limit</option>
            <option value="10">10 minutes</option>
            <option value="20" selected>20 minutes</option>
            <option value="30">30 minutes</option>
          </select>
        </div>
        <button class="btn btn-primary btn-block" id="quizSetupStart">Start Quiz →</button>
      </div>`;

    document.getElementById('quizSetupStart').addEventListener('click', () => {
      const count = parseInt(document.getElementById('quizSetupCount').value, 10);
      const mins = parseInt(document.getElementById('quizSetupTime').value, 10);
      launchQuiz(subjectKey, count, mins);
    });
  }

  function launchQuiz(subjectKey, count, mins) {
    const bank = getBank(S.category);
    const pool = bank[subjectKey].objective.slice();
    const { questions, recycled } = pickQuestions(S.category, subjectKey, pool, count);
    S.mode = 'quiz';
    S.subject = subjectKey;
    S.questions = questions;
    S.idx = 0;
    S.answers = new Array(S.questions.length).fill(null);
    S._challengeCode = null;
    document.getElementById('quizTitle').textContent = SUBJECT_LABELS[subjectKey] || subjectKey;

    if (recycled) {
      showToast("You've seen most of these before — mixing in some repeats to fill out the set.", 3400);
    }

    if (mins > 0) startTimer(mins * 60); else stopTimer(true);
    renderQuizQuestion();
    showScreen('quizScreen');
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function startTimer(secs) {
    S.timerSecs = secs;
    updateTimerDisplay();
    stopTimer();
    S.timerInterval = setInterval(() => {
      S.timerSecs--;
      updateTimerDisplay();
      if (S.timerSecs <= 0) { stopTimer(); finishQuiz(); }
    }, 1000);
  }
  function stopTimer(hide) {
    if (S.timerInterval) clearInterval(S.timerInterval);
    S.timerInterval = null;
    if (hide) document.getElementById('quizTimer').textContent = '';
  }
  function updateTimerDisplay() {
    const m = Math.floor(S.timerSecs / 60);
    const sec = S.timerSecs % 60;
    document.getElementById('quizTimer').textContent = `${m}:${String(sec).padStart(2, '0')}`;
  }

  function renderQuizQuestion() {
    const q = S.questions[S.idx];
    const body = document.getElementById('quizBody');
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const selected = S.answers[S.idx];

    body.innerHTML = `
      <div class="q-card">
        <div class="q-meta">Question ${S.idx + 1} of ${S.questions.length}</div>
        <div class="q-text">${q.question}</div>
        <div id="quizOptions">
          ${q.options.map((opt, i) => `
            <button class="q-option ${selected === i ? 'selected' : ''}" data-i="${i}">
              <span class="q-option-letter">${letters[i]}</span>
              <span>${opt}</span>
            </button>`).join('')}
        </div>
        <div class="q-nav-row">
          <button class="btn btn-ghost" id="quizPrev" ${S.idx === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="btn btn-primary" id="quizNext">${S.idx === S.questions.length - 1 ? 'Finish' : 'Next →'}</button>
        </div>
      </div>`;

    body.querySelectorAll('.q-option').forEach(btn => {
      btn.addEventListener('click', () => {
        S.answers[S.idx] = parseInt(btn.dataset.i, 10);
        body.querySelectorAll('.q-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    document.getElementById('quizPrev').addEventListener('click', () => { S.idx--; renderQuizQuestion(); });
    document.getElementById('quizNext').addEventListener('click', () => {
      if (S.idx === S.questions.length - 1) finishQuiz();
      else { S.idx++; renderQuizQuestion(); }
    });
  }

  function finishQuiz() {
    stopTimer(true);
    let correct = 0;
    S.questions.forEach((q, i) => { if (S.answers[i] === q.answer) correct++; });
    const total = S.questions.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;

    recordSession(pct);
    if (S.subject) markSeen(S.category, S.subject, S.questions.map(q => q.id));
    if (S._challengeCode) saveChallengeScore(correct, total);

    renderResults(correct, total, pct);
    showScreen('resultsScreen');
  }

  function renderResults(correct, total, pct) {
    const body = document.getElementById('resultsBody');
    const verdict = pct >= 80 ? "Excellent work! 🎉" : pct >= 60 ? "Good effort — keep going!" : "Keep practicing, you'll get there.";
    body.innerHTML = `
      <div class="result-hero">
        <div class="result-score">${pct}%</div>
        <div class="result-score-sub">${correct} out of ${total} correct</div>
        <p style="margin-top:1rem; font-size:.95rem; color:var(--text-mid);">${verdict}</p>
      </div>
      <div class="result-actions">
        <button class="btn btn-primary btn-block" id="resReview">Review Answers</button>
        <button class="btn btn-ghost btn-block" id="resHome">Back to Home</button>
      </div>`;
    document.getElementById('resHome').addEventListener('click', () => showScreen('homeScreen'));
    document.getElementById('resReview').addEventListener('click', () => reviewQuizAnswers());
  }

  function reviewQuizAnswers() {
    S.mode = 'revision-review';
    S.idx = 0;
    const revBody = document.getElementById('revisionBody');
    document.getElementById('revisionTitle').textContent = 'Review';
    renderReviewQuestion();
    showScreen('revisionScreen');
  }

  function renderReviewQuestion() {
    const q = S.questions[S.idx];
    const userAns = S.answers[S.idx];
    const body = document.getElementById('revisionBody');
    document.getElementById('revisionProgress').textContent = `${S.idx + 1} / ${S.questions.length}`;
    const letters = ['A', 'B', 'C', 'D', 'E'];

    body.innerHTML = `
      <div class="q-card">
        <div class="q-text">${q.question}</div>
        <div>
          ${q.options.map((opt, i) => {
            let cls = '';
            if (i === q.answer) cls = 'correct';
            else if (i === userAns) cls = 'incorrect';
            return `<div class="q-option ${cls}">
              <span class="q-option-letter">${letters[i]}</span>
              <span>${opt}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="q-explanation">${q.explanation || 'No explanation available.'}</div>
        <div class="q-nav-row">
          <button class="btn btn-ghost" id="revwPrev" ${S.idx === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="btn btn-primary" id="revwNext" ${S.idx === S.questions.length - 1 ? 'disabled' : ''}>Next →</button>
        </div>
      </div>`;
    document.getElementById('revwPrev').addEventListener('click', () => { S.idx--; renderReviewQuestion(); });
    document.getElementById('revwNext').addEventListener('click', () => { S.idx++; renderReviewQuestion(); });
  }

  /* ────────────────────────────────
     SPEED ROUND (EDU GAME)
     60-second rapid-fire quiz: tap an answer, get instant feedback,
     auto-advance. Streak bonus scoring. Pulls from the anti-repeat
     pool first, tops up with AI-generated questions when the static
     pool is thin so a fast player doesn't run out mid-round.
  ──────────────────────────────── */
  const GAME_DURATION_SECS = 60;
  const GAME_MIN_QUEUE = 8;      // fetch more AI questions when queue drops below this
  const GAME_LOCK_MS = 550;      // pause after tap to show correct/incorrect before advancing

  let G = { subject: null, queue: [], idx: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, attempted: 0, usedIds: [], locked: false, fetchingMore: false };

  function stopGameTimer() {
    if (S.gameTimerInterval) clearInterval(S.gameTimerInterval);
    S.gameTimerInterval = null;
  }

  function startSpeedRound(subjectKey) {
    const bank = getBank(S.category);
    const subj = bank[subjectKey];
    if (!subj || !subj.objective || !subj.objective.length) {
      showToast('No questions available for this subject yet.');
      return;
    }

    const pool = subj.objective.slice();
    const { questions } = pickQuestions(S.category, subjectKey, pool, Math.min(pool.length, 25));

    G = { subject: subjectKey, queue: questions, idx: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, attempted: 0, usedIds: [], locked: false, fetchingMore: false };
    S.mode = 'game';
    S.gameTimerSecs = GAME_DURATION_SECS;

    document.getElementById('gameScore').textContent = '0';
    document.getElementById('gameStreak').textContent = '0';
    updateGameTimerDisplay();

    renderGameQuestion();
    showScreen('gameScreen');

    stopGameTimer();
    S.gameTimerInterval = setInterval(() => {
      S.gameTimerSecs--;
      updateGameTimerDisplay();
      if (S.gameTimerSecs <= 0) { stopGameTimer(); finishSpeedRound(); }
    }, 1000);

    maybeTopUpQueue();
  }

  function updateGameTimerDisplay() {
    const el = document.getElementById('gameTimer');
    el.textContent = S.gameTimerSecs;
    el.classList.toggle('urgent', S.gameTimerSecs <= 10);
  }

  function renderGameQuestion() {
    if (G.idx >= G.queue.length) {
      // Ran out despite top-up attempts — end gracefully rather than error.
      stopGameTimer();
      finishSpeedRound();
      return;
    }
    const q = G.queue[G.idx];
    const body = document.getElementById('gameBody');
    const letters = ['A', 'B', 'C', 'D'];
    body.innerHTML = `
      <div class="game-q-meta">Question ${G.idx + 1}${q.aiGenerated ? ' · ✨' : ''}</div>
      <div class="game-q-text">${q.question}</div>
      <div class="game-options" id="gameOptions">
        ${q.options.map((opt, i) => `
          <button class="game-opt" data-i="${i}">${letters[i]}. ${opt}</button>
        `).join('')}
      </div>`;

    body.querySelectorAll('.game-opt').forEach(btn => {
      btn.addEventListener('click', () => selectGameAnswer(parseInt(btn.dataset.i, 10)));
    });

    maybeTopUpQueue();
  }

  function selectGameAnswer(i) {
    if (G.locked) return;
    G.locked = true;
    const q = G.queue[G.idx];
    const isCorrect = i === q.answer;
    G.attempted++;
    G.usedIds.push(q.id);

    const opts = document.querySelectorAll('#gameOptions .game-opt');
    opts.forEach((btn, bi) => {
      if (bi === q.answer) btn.classList.add('g-correct');
      else if (bi === i) btn.classList.add('g-incorrect');
      else btn.classList.add('g-dim');
    });

    if (isCorrect) {
      G.correct++;
      G.streak++;
      G.bestStreak = Math.max(G.bestStreak, G.streak);
      const bonus = G.streak >= 5 ? 3 : G.streak >= 3 ? 2 : 1;
      G.score += 10 * bonus;
      if (G.streak > 0 && G.streak % 3 === 0) flashStreak(G.streak);
    } else {
      G.streak = 0;
    }

    document.getElementById('gameScore').textContent = G.score;
    document.getElementById('gameStreak').textContent = G.streak;

    setTimeout(() => {
      G.locked = false;
      G.idx++;
      if (S.gameTimerSecs > 0) renderGameQuestion();
    }, GAME_LOCK_MS);
  }

  function flashStreak(streak) {
    const el = document.createElement('div');
    el.className = 'streak-flash';
    el.textContent = `🔥 ${streak} streak!`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 750);
  }

  async function maybeTopUpQueue() {
    const remaining = G.queue.length - G.idx;
    if (remaining >= GAME_MIN_QUEUE || G.fetchingMore) return;
    G.fetchingMore = true;
    try {
      const bank = getBank(S.category)[G.subject];
      const avoid = (bank.objective || []).map(q => q.question).slice(0, 40);
      const res = await fetch(API_BASE + '/api/generate-questions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: S.category,
          subject: SUBJECT_LABELS[G.subject] || G.subject,
          count: 10,
          avoidQuestions: avoid,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.questions.length) {
        G.queue = G.queue.concat(data.questions);
      }
    } catch (err) {
      // Silent fail — game just ends a little early if this doesn't work, no need to interrupt play.
    } finally {
      G.fetchingMore = false;
    }
  }

  function finishSpeedRound() {
    stopGameTimer();
    const pct = G.attempted ? Math.round((G.correct / G.attempted) * 100) : 0;
    if (G.usedIds.length) markSeen(S.category, G.subject, G.usedIds);
    recordSession(pct);
    renderGameResults(pct);
    showScreen('gameResultsScreen');
  }

  function renderGameResults(pct) {
    const body = document.getElementById('gameResultsBody');
    const verdict = G.bestStreak >= 8 ? "🔥 On fire! Incredible streak." : G.bestStreak >= 4 ? "Nice streak — keep it up!" : "Good round — try to build a streak next time.";
    body.innerHTML = `
      <div class="game-result-hero">
        <div class="game-q-meta">⏱ Time's up!</div>
        <div class="game-result-score">${G.score}</div>
        <div class="game-result-sub">points</div>
        <p style="margin-top:1rem; font-size:.95rem; color:var(--text-mid);">${verdict}</p>
      </div>
      <div class="game-result-stats">
        <div class="grs-box"><span>${G.attempted}</span><label>Answered</label></div>
        <div class="grs-box"><span>${pct}%</span><label>Accuracy</label></div>
        <div class="grs-box"><span>${G.bestStreak}</span><label>Best Streak</label></div>
      </div>
      <div class="result-actions">
        <button class="btn btn-primary btn-block" id="gameReplayBtn">Play Again →</button>
        <button class="btn btn-ghost btn-block" id="gameHomeBtn">Back to Home</button>
      </div>`;
    document.getElementById('gameReplayBtn').addEventListener('click', () => startSpeedRound(G.subject));
    document.getElementById('gameHomeBtn').addEventListener('click', () => showScreen('homeScreen'));
  }

  /* ────────────────────────────────
     CHALLENGE A FRIEND
     (adapted from My Exams App / My JAMB App's community quiz —
      same shared backend, same challenge shape)
  ──────────────────────────────── */
  const QC_STORE = 'hh-challenges-v1';
  const MAX_PENDING_CHALLENGES = 3;
  const WAITING_ROOM_TIMEOUT_MS = 2 * 60 * 1000;
  let _pendingChallenge = null;
  let _waitingRoomTimer = null;
  let _waitingRoomCountdownTicker = null;
  let _isWaitingRoomCreator = false;

  function safe(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function initChallengeModule() {
    const modal = document.getElementById('quizChallengeModal');
    if (!modal) return;

    document.getElementById('qcClose').addEventListener('click', closeQuizChallenge);
    modal.addEventListener('click', e => { if (e.target === modal) closeQuizChallenge(); });

    document.getElementById('qcCreateBtn').addEventListener('click', () => { showQcPanel('qcSetup'); updateAiBoostHint(); });
    document.getElementById('qcJoinConfirm').addEventListener('click', joinChallenge);
    document.getElementById('qcGenerateBtn').addEventListener('click', generateChallenge);
    document.getElementById('qcShareLinkBtn').addEventListener('click', shareChallengeLink);
    document.getElementById('qcStartOwnBtn').addEventListener('click', startOwnAttempt);
    document.getElementById('qcNewChallengeBtn').addEventListener('click', () => { showQcPanel('qcSetup'); updateAiBoostHint(); });
    document.getElementById('qcDoneBtn').addEventListener('click', closeQuizChallenge);
    document.getElementById('qcMarkReadyBtn').addEventListener('click', markReady);
    document.getElementById('qcForceStartBtn').addEventListener('click', forceStartChallenge);
    document.getElementById('qcEndChallengeBtn').addEventListener('click', endChallengeFromWaitingRoom);
    document.getElementById('qcSyncMode').addEventListener('change', (e) => {
      document.getElementById('qcScheduleWrap').classList.toggle('hidden', e.target.value !== 'scheduled');
    });
    document.getElementById('qcSubject').addEventListener('change', updateAiBoostHint);
    document.getElementById('qcCount').addEventListener('change', updateAiBoostHint);
  }

  /**
   * Looks at the static pool size for the selected subject vs. how many
   * of those the creator has already seen, and nudges the AI-boost
   * toggle accordingly — auto-checking (but not locking) it when the
   * pool can't cover the requested question count without repeats.
   */
  function updateAiBoostHint() {
    const subject = document.getElementById('qcSubject').value;
    const count = parseInt(document.getElementById('qcCount').value, 10) || 20;
    const bank = getBank(S.category)[subject];
    const hint = document.getElementById('qcAiBoostHint');
    const checkbox = document.getElementById('qcAiBoost');
    if (!bank) { hint.textContent = ''; return; }

    const pool = bank.objective || [];
    const seen = getSeenSet(S.category, subject);
    const unseenCount = pool.filter(q => !seen.has(q.id)).length;

    if (unseenCount < count) {
      hint.textContent = `— recommended, only ${unseenCount} fresh question${unseenCount === 1 ? '' : 's'} left in this subject`;
      checkbox.checked = true;
    } else {
      hint.textContent = '— optional, adds variety beyond the question bank';
      checkbox.checked = false;
    }
  }

  function populateChallengeSubjects() {
    const sel = document.getElementById('qcSubject');
    const manifest = CONTENT_MANIFEST[S.category];
    sel.innerHTML = manifest.subjects.map(key =>
      `<option value="${key}">${SUBJECT_LABELS[key] || key}</option>`).join('');
  }

  function openQuizChallenge(isStudyMode) {
    if (!S.currentUser) { showToast('Please enter a name first.'); return; }
    populateChallengeSubjects();
    showQcPanel('qcCreate');
    document.getElementById('quizChallengeModal').classList.remove('hidden');
    renderPendingChallenges();
    const sheetTitle = document.querySelector('#qcCreate .sheet-title');
    if (sheetTitle) sheetTitle.textContent = isStudyMode ? 'Study Together' : 'Challenge a Friend';
  }
  window.openQuizChallenge = openQuizChallenge;

  function closeQuizChallenge() {
    clearInterval(_waitingRoomTimer);
    clearInterval(_waitingRoomCountdownTicker);
    document.getElementById('quizChallengeModal').classList.add('hidden');
  }

  function showQcPanel(id) {
    ['qcCreate', 'qcSetup', 'qcCreated', 'qcWaiting', 'qcResults'].forEach(p => {
      const el = document.getElementById(p);
      if (el) el.classList.toggle('hidden', p !== id);
    });
  }

  function generateChallengeCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'HH-';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  function getMyPendingChallenges() {
    const all = loadSafe(QC_STORE, {});
    return Object.values(all)
      .filter(c => c.creator === S.currentUser && !c.ended)
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  function renderPendingChallenges() {
    const wrap = document.getElementById('qcPendingWrap');
    const list = document.getElementById('qcPendingList');
    const countEl = document.getElementById('qcPendingCount');
    const mine = getMyPendingChallenges();
    countEl.textContent = mine.length;
    wrap.classList.toggle('hidden', mine.length === 0);

    list.innerHTML = mine.map(c => {
      const statusLabel = c.syncMode === 'scheduled' ? '📅 Scheduled'
        : c.syncMode === 'ready' && !c.startedAt ? '⏱ Waiting room'
        : '▶ In progress';
      return `<div class="pending-challenge-row">
        <div>
          <div style="font-weight:700;">${safe(c.code)}</div>
          <div style="color:var(--text-dim); font-size:.75rem;">${safe(SUBJECT_LABELS[c.subject] || c.subject)} · ${statusLabel}</div>
        </div>
        <div style="display:flex; gap:.5rem;">
          <button data-code="${safe(c.code)}" data-action="continue">Continue</button>
          <button data-code="${safe(c.code)}" data-action="delete" style="color:var(--red);">Delete</button>
        </div>
      </div>`;
    }).join('');

    list.querySelectorAll('[data-action="continue"]').forEach(btn => {
      btn.addEventListener('click', () => continueChallenge(btn.dataset.code));
    });
    list.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', () => deleteChallenge(btn.dataset.code));
    });
  }

  function continueChallenge(code) {
    const challenges = loadSafe(QC_STORE, {});
    const challenge = challenges[code];
    if (!challenge) return;
    window._currentChallengeCode = code;
    if (challenge.syncMode && challenge.syncMode !== 'anytime' && !challenge.startedAt) {
      _pendingChallenge = challenge;
      openWaitingRoom(code, true);
    } else {
      document.getElementById('qcCodeDisplay').textContent = code;
      showQcPanel('qcCreated');
    }
  }

  async function deleteChallenge(code) {
    if (!confirm(`Delete challenge ${code}? Anyone with the code will no longer be able to join.`)) return;
    try {
      await fetch(API_BASE + '/api/challenge', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'end_challenge', code }),
      });
    } catch (err) {}
    const challenges = loadSafe(QC_STORE, {});
    if (challenges[code]) { challenges[code].ended = true; saveSafe(QC_STORE, challenges); }
    renderPendingChallenges();
  }

  async function generateChallenge() {
    if (getMyPendingChallenges().length >= MAX_PENDING_CHALLENGES) {
      showToast(`You can have up to ${MAX_PENDING_CHALLENGES} active challenges at a time — delete one first.`);
      return;
    }

    const subject = document.getElementById('qcSubject').value;
    const count = parseInt(document.getElementById('qcCount').value, 10);
    const time = parseInt(document.getElementById('qcTime').value, 10);
    const syncMode = document.getElementById('qcSyncMode').value;
    let scheduledStartAt = null;
    if (syncMode === 'scheduled') {
      const raw = document.getElementById('qcScheduleAt').value;
      if (!raw) { showToast('Pick a date and time for the challenge to start.'); return; }
      scheduledStartAt = new Date(raw).getTime();
      if (!Number.isFinite(scheduledStartAt) || scheduledStartAt <= Date.now()) {
        showToast('Pick a start time in the future.'); return;
      }
    }

    const bank = getBank(S.category)[subject];
    if (!bank) return;
    const pool = bank.objective.slice();

    const useAiBoost = document.getElementById('qcAiBoost').checked;
    const { questions: staticQuestions } = pickQuestions(S.category, subject, pool, count);
    let questions = staticQuestions;

    const genBtn = document.getElementById('qcGenerateBtn');

    if (useAiBoost) {
      genBtn.disabled = true; genBtn.textContent = 'Generating fresh questions…';
      try {
        // Fill however many slots the static pool couldn't cover fresh,
        // or top up with a handful of extra fresh ones if the pool was full.
        const shortfall = Math.max(count - staticQuestions.length, Math.min(count, 5));
        const aiRes = await fetch(API_BASE + '/api/generate-questions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: S.category,
            subject: SUBJECT_LABELS[subject] || subject,
            count: shortfall,
            avoidQuestions: pool.map(q => q.question).slice(0, 60),
          }),
        });
        const aiData = await aiRes.json().catch(() => ({}));
        if (aiRes.ok && aiData.ok && aiData.questions.length) {
          // Replace recycled/seen static questions first with AI ones, keep unseen static.
          const combined = staticQuestions.concat(aiData.questions);
          shuffleArray(combined);
          questions = combined.slice(0, count);
        } else {
          showToast('Could not generate AI questions right now — using the question bank instead.');
        }
      } catch (err) {
        showToast('Could not generate AI questions right now — using the question bank instead.');
      }
    }

    if (!questions.length) { showToast('Not enough questions for this subject.'); return; }

    const code = generateChallengeCode();
    genBtn.disabled = true; genBtn.textContent = 'Creating…';

    try {
      const res = await fetch(API_BASE + '/api/challenge', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create', code, subject, count, time,
          questions, creator: S.currentUser, syncMode, scheduledStartAt,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not create challenge');

      const challenges = loadSafe(QC_STORE, {});
      const challengeObj = {
        code, subject, count, time,
        questionData: questions,
        expires: Date.now() + 24 * 60 * 60 * 1000,
        creator: S.currentUser,
        syncMode, scheduledStartAt,
        startedAt: syncMode === 'anytime' ? Date.now() : null,
        createdAt: Date.now(), ended: false,
        scores: {},
      };
      challenges[code] = challengeObj;
      saveSafe(QC_STORE, challenges);

      document.getElementById('qcCodeDisplay').textContent = code;
      window._currentChallengeCode = code;

      if (syncMode !== 'anytime') {
        _pendingChallenge = challengeObj;
        openWaitingRoom(code, true);
      } else {
        showQcPanel('qcCreated');
      }
    } catch (err) {
      showToast('Could not create challenge — check your connection and try again.');
    } finally {
      genBtn.disabled = false; genBtn.textContent = 'Generate Challenge Code →';
    }
  }

  function shareChallengeLink() {
    const code = window._currentChallengeCode;
    if (!code) return;
    const url = window.location.origin + window.location.pathname + '?challenge=' + code;
    const subj = document.getElementById('qcSubject')?.value || '';
    const text = `🏆 I challenge you! Take this ${SUBJECT_LABELS[subj] || subj} quiz on Holiday Hub.\n\nCode: ${code}\nLink: ${url}`;
    if (navigator.share) {
      navigator.share({ title: 'Holiday Hub Challenge', text, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text).then(() => showToast('Challenge link copied!')).catch(() => showToast('Link: ' + url));
    }
  }

  async function joinChallenge() {
    const code = (document.getElementById('qcJoinCode').value || '').trim().toUpperCase();
    if (!code) return;
    const joinBtn = document.getElementById('qcJoinConfirm');
    joinBtn.disabled = true; joinBtn.textContent = 'Joining…';

    try {
      const local = loadSafe(QC_STORE, {})[code];
      if (local) {
        if (local.ended) { showToast('This challenge has ended.'); return; }
        if (Date.now() > local.expires) { showToast('This challenge has expired (challenges last 24 hours).'); return; }
        window._currentChallengeCode = code;
        if (local.syncMode && local.syncMode !== 'anytime' && !local.startedAt) {
          _pendingChallenge = local;
          openWaitingRoom(code, local.creator === S.currentUser);
        } else {
          startChallengeAttempt(local);
        }
        return;
      }

      const res = await fetch(API_BASE + '/api/challenge', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'join', code, student: S.currentUser }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (res.status === 409 && data.alreadyCompleted) {
          showToast("You've already completed this challenge — check the leaderboard for your result.");
          const lbRes = await fetch(API_BASE + '/api/challenge', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'leaderboard', code }),
          });
          const lbData = await lbRes.json().catch(() => ({}));
          if (lbRes.ok && lbData.ok) showChallengeLeaderboard(code, lbData.scores);
          return;
        }
        showToast(res.status === 410 ? 'This challenge has ended.'
          : data.error === 'Challenge not found or expired'
          ? 'Challenge not found. Check the code and try again.'
          : 'Could not join challenge — check your connection and try again.');
        return;
      }
      const challenge = { ...data.challenge, questionData: data.challenge.questions };
      window._currentChallengeCode = code;
      if (challenge.syncMode && challenge.syncMode !== 'anytime' && !challenge.startedAt) {
        _pendingChallenge = challenge;
        openWaitingRoom(code, challenge.creator === S.currentUser);
      } else {
        startChallengeAttempt(challenge);
      }
    } finally {
      joinBtn.disabled = false; joinBtn.textContent = 'Join';
    }
  }

  function startOwnAttempt() {
    const code = window._currentChallengeCode;
    if (!code) return;
    const challenge = loadSafe(QC_STORE, {})[code];
    if (!challenge) return;
    startChallengeAttempt(challenge);
  }

  function openWaitingRoom(code, isCreator) {
    _isWaitingRoomCreator = isCreator;
    document.getElementById('qcForceStartBtn').classList.toggle('hidden', !isCreator);
    document.getElementById('qcEndChallengeBtn').classList.toggle('hidden', !isCreator);
    const readyBtn = document.getElementById('qcMarkReadyBtn');
    readyBtn.classList.remove('hidden');
    readyBtn.disabled = false; readyBtn.textContent = "I'm Ready";
    showQcPanel('qcWaiting');
    document.getElementById('quizChallengeModal').classList.remove('hidden');
    pollWaitingRoom(code);
  }

  function renderWaitingList(participants) {
    const list = document.getElementById('qcWaitingList');
    const entries = Object.entries(participants || {});
    list.innerHTML = entries.map(([name, p]) => `
      <div class="waiting-participant ${p.ready ? 'ready' : ''}">
        <span><span class="status-dot"></span>${safe(name)}${name === S.currentUser ? ' (you)' : ''}</span>
        <span>${p.ready ? 'Ready' : 'Waiting'}</span>
      </div>`).join('') || '<p class="sheet-sub">Waiting for people to join…</p>';
  }

  function updateCountdownDisplay(msRemaining) {
    // Reserved for future inline countdown display in the waiting room.
  }

  async function pollWaitingRoom(code) {
    clearInterval(_waitingRoomTimer);
    clearInterval(_waitingRoomCountdownTicker);

    const tick = async () => {
      try {
        const res = await fetch(API_BASE + '/api/challenge', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'status', code }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) return;

        if (data.ended) {
          clearInterval(_waitingRoomTimer);
          document.getElementById('qcWaitingStatus').textContent = 'This challenge has ended.';
          document.getElementById('qcMarkReadyBtn').classList.add('hidden');
          document.getElementById('qcForceStartBtn').classList.add('hidden');
          return;
        }

        renderWaitingList(data.participants);
        if (data.scheduledStartAt) {
          document.getElementById('qcWaitingStatus').textContent = 'Challenge starts automatically at the scheduled time.';
        }

        if (data.startedAt) {
          clearInterval(_waitingRoomTimer);
          document.getElementById('quizChallengeModal').classList.add('hidden');
          startChallengeAttempt(_pendingChallenge, data.startedAt);
          return;
        }

        if (data.firstReadyAt && (Date.now() - data.firstReadyAt) > WAITING_ROOM_TIMEOUT_MS) {
          await fetch(API_BASE + '/api/challenge', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'force_start', code }),
          });
        }
      } catch (err) {}
    };

    tick();
    _waitingRoomTimer = setInterval(tick, 3000);
  }

  async function markReady() {
    const code = window._currentChallengeCode;
    if (!code) return;
    const btn = document.getElementById('qcMarkReadyBtn');
    btn.disabled = true; btn.textContent = 'Waiting for others…';
    try {
      await fetch(API_BASE + '/api/challenge', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_ready', code, student: S.currentUser }),
      });
    } catch (err) {
      showToast('Could not mark ready — check your connection.');
      btn.disabled = false; btn.textContent = "I'm Ready";
    }
  }

  async function forceStartChallenge() {
    const code = window._currentChallengeCode;
    if (!code) return;
    try {
      await fetch(API_BASE + '/api/challenge', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'force_start', code }),
      });
    } catch (err) {
      showToast('Could not start — check your connection.');
    }
  }

  async function endChallengeFromWaitingRoom() {
    const code = window._currentChallengeCode;
    if (!code) return;
    if (!confirm('End this challenge for everyone? Nobody will be able to join or continue it.')) return;
    await deleteChallenge(code);
    clearInterval(_waitingRoomTimer);
    document.getElementById('quizChallengeModal').classList.add('hidden');
  }

  function startChallengeAttempt(challenge, startedAtOverride) {
    if (challenge.scores && challenge.scores[S.currentUser]) {
      showToast("You've already completed this challenge — check the leaderboard for your result.");
      showChallengeLeaderboard(challenge.code, challenge.scores);
      return;
    }

    closeQuizChallenge();

    S.subject = challenge.subject;
    S.mode = 'challenge';
    S.questions = challenge.questionData;
    S.answers = new Array(S.questions.length).fill(null);
    S.idx = 0;
    S._challengeCode = challenge.code;

    document.getElementById('quizTitle').textContent = (SUBJECT_LABELS[challenge.subject] || challenge.subject) + ' · Challenge';

    const startedAt = startedAtOverride || challenge.startedAt || Date.now();
    if (challenge.time > 0) {
      const elapsedSec = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
      const remaining = Math.max(0, challenge.time * 60 - elapsedSec);
      startTimer(remaining);
    } else {
      stopTimer(true);
    }

    renderQuizQuestion();
    showScreen('quizScreen');
  }

  async function saveChallengeScore(score, total) {
    const code = S._challengeCode;
    if (!code) return;
    const pct = Math.round((score / total) * 100);

    const challenges = loadSafe(QC_STORE, {});
    if (challenges[code]) {
      challenges[code].scores[S.currentUser] = { score, total, pct, time: new Date().toLocaleTimeString() };
      saveSafe(QC_STORE, challenges);
    }
    S._challengeCode = null;

    let backendScores = null;
    try {
      const res = await fetch(API_BASE + '/api/challenge', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit', code, student: S.currentUser, score, total, pct }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) backendScores = data.scores;
    } catch (err) {}

    showChallengeLeaderboard(code, backendScores);
  }

  function showChallengeLeaderboard(code, scoresOverride) {
    const challenges = loadSafe(QC_STORE, {});
    const localChallenge = challenges[code];
    const scores = scoresOverride || (localChallenge && localChallenge.scores);
    if (!scores) return;

    const list = document.getElementById('qcLeaderboard');
    const entries = Object.entries(scores).sort((a, b) => b[1].pct - a[1].pct);

    list.innerHTML = entries.length ? entries.map(([name, data], i) => `
      <div class="leaderboard-row ${name === S.currentUser ? 'is-me' : ''}">
        <span class="leaderboard-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
        <span class="leaderboard-name">${safe(name)}${name === S.currentUser ? ' (you)' : ''}</span>
        <span class="leaderboard-score">${data.score}/${data.total} · ${data.pct}%</span>
      </div>`).join('') : '<p class="sheet-sub">No scores yet — be the first!</p>';

    document.getElementById('quizChallengeModal').classList.remove('hidden');
    showQcPanel('qcResults');
  }

  function checkIncomingChallengeLink() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('challenge');
    if (!code) return;
    history.replaceState(null, '', window.location.pathname);
    ensureUser(() => {
      openQuizChallenge();
      document.getElementById('qcJoinCode').value = code;
      joinChallenge();
    });
  }

  /* ────────────────────────────────
     HOLIDAY PROJECT HELPER
  ──────────────────────────────── */
  let phMessages = [];
  let phSubject = 'Any subject';

  function initProjectHelper() {
    // Wiring happens lazily in openProjectHelper() since the DOM for
    // this screen is built dynamically.
  }

  function openProjectHelper() {
    phMessages = [];
    renderProjectHelper();
    showScreen('projectScreen');
  }

  function renderProjectHelper() {
    const body = document.getElementById('projectBody');
    const subjects = ['Any subject', 'Mathematics', 'English', 'Science', 'Social Studies', 'ICT'];

    body.innerHTML = `
      <div class="ph-subject-chip-row" id="phChips">
        ${subjects.map(s => `<button class="ph-chip ${s === phSubject ? 'active' : ''}" data-s="${s}">${s}</button>`).join('')}
      </div>
      ${phMessages.length === 0 ? `
        <div class="ph-intro">
          <div class="ph-intro-icon">🧭</div>
          <h3>Tell me about your project</h3>
          <p>I won't do it for you — I'll ask questions, explain ideas, and guide you<br>to the answer so you understand it and can explain it yourself.</p>
        </div>` : `<div class="ph-chat" id="phChat">${phMessages.map(renderPhMsg).join('')}</div>`}
      <div class="ph-input-row">
        <textarea id="phInput" rows="1" placeholder="Describe your holiday project or ask a question…"></textarea>
        <button class="ph-send-btn" id="phSendBtn">➤</button>
      </div>`;

    document.querySelectorAll('#phChips .ph-chip').forEach(chip => {
      chip.addEventListener('click', () => { phSubject = chip.dataset.s; renderProjectHelper(); });
    });
    document.getElementById('phSendBtn').addEventListener('click', sendProjectMessage);
    document.getElementById('phInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendProjectMessage(); }
    });
  }

  function renderPhMsg(m) {
    return `<div class="ph-msg ${m.role === 'user' ? 'ph-msg-user' : 'ph-msg-ai'} ${m.loading ? 'loading' : ''}">${safe(m.text)}</div>`;
  }

  async function sendProjectMessage() {
    const input = document.getElementById('phInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    phMessages.push({ role: 'user', text });
    phMessages.push({ role: 'ai', text: 'Thinking…', loading: true });
    renderProjectHelper();
    scrollProjectChatToBottom();

    try {
      const res = await fetch(API_BASE + '/api/project-helper', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: phSubject,
          messages: phMessages.filter(m => !m.loading).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      phMessages.pop(); // remove loading bubble
      if (res.ok && data.reply) {
        phMessages.push({ role: 'ai', text: data.reply });
      } else {
        phMessages.push({ role: 'ai', text: "I couldn't reach the server just now — check your connection and try again." });
      }
    } catch (err) {
      phMessages.pop();
      phMessages.push({ role: 'ai', text: "I couldn't reach the server just now — check your connection and try again." });
    }
    renderProjectHelper();
    scrollProjectChatToBottom();
  }

  function scrollProjectChatToBottom() {
    const chat = document.getElementById('phChat');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }

  /* ────────────────────────────────
     INIT
  ──────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initCategoryTabs();
    initFeatureGrid();
    initBackButtons();
    loadStats();
    renderCountdown();
    initChallengeModule();
    initProjectHelper();
    checkIncomingChallengeLink();
  });

  function initBackButtons() {
    document.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => goBack(btn.dataset.back));
    });
  }

  // expose for other modules in this file
  window._HH = { S, showScreen, showToast, loadSafe, saveSafe, getBank, API_BASE, recordSession, ensureUser };

})();
