// /api/challenge.js — add to the same Vercel project as /api/mark.js
//
// WHY THIS EXISTS:
// Community Quiz / Challenge Mode was storing challenges only in the
// creator's own browser localStorage. A friend opening the share link on
// their own phone could never actually see it — "Challenge not found"
// every time. There was no shared place for two different devices to meet.
//
// This endpoint gives both apps a small shared store (Upstash Redis, free
// tier) so a challenge created on one device is genuinely visible from any
// other device using the same code. Nothing else about the apps changes —
// this is purely the missing "meeting point" between two students' phones.
//
// SETUP REQUIRED (one-time, ~5 minutes, no cost):
//   1. Go to upstash.com → sign up (free) → Create Database → Redis
//      (choose the free tier, "Regional" is fine — pick a region close to
//      Nigeria/Europe for lower latency)
//   2. On the database's page, find "REST API" section — copy the
//      UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN values
//   3. In Vercel → editoby-api project → Settings → Environment Variables,
//      add both of those exactly as named above
//   4. Redeploy the project so the new env vars take effect
//
// The free tier covers far more requests/day than this app's realistic
// scale needs, and challenges auto-expire (see EXPIRE_SECONDS below) so
// storage never grows unbounded.

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const EXPIRE_SECONDS = 60 * 60 * 24 * 3; // challenges auto-expire after 3 days

async function redis(...command) {
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

// Basic shape checks — keeps junk/oversized payloads out of the store
// without needing a full schema validator.
function isValidCode(code) {
  return typeof code === 'string' && /^[A-Z0-9-]{4,20}$/.test(code);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://editoby1-bit.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    console.error('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set in Vercel environment variables');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const { action } = req.body || {};

  try {
    if (action === 'create') {
      const { code, subject, subjects, subjectRanges, count, questions, creator, time, syncMode, scheduledStartAt } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      if (!Array.isArray(questions) || questions.length === 0 || questions.length > 50) {
        return res.status(400).json({ error: 'Invalid questions' });
      }
      const mode = ['anytime', 'ready', 'scheduled'].includes(syncMode) ? syncMode : 'anytime';
      const creatorName = String(creator || '').slice(0, 40);
      const challenge = {
        code, subject, count, questions,
        subjects: Array.isArray(subjects) ? subjects.slice(0, 8) : undefined,
        subjectRanges: subjectRanges && typeof subjectRanges === 'object' ? subjectRanges : undefined,
        time: Number.isFinite(time) ? time : undefined, // minutes, 0/undefined = no limit
        creator: creatorName,
        createdAt: Date.now(),
        scores: {},
        syncMode: mode,
        scheduledStartAt: mode === 'scheduled' && Number.isFinite(scheduledStartAt) ? scheduledStartAt : null,
        // 'anytime' challenges are "started" immediately since there's no
        // shared clock to wait on; 'ready' and 'scheduled' start later.
        startedAt: mode === 'anytime' ? Date.now() : null,
        firstReadyAt: null,
        participants: mode !== 'anytime' ? { [creatorName]: { ready: false, joinedAt: Date.now() } } : {},
        ended: false,
        endedAt: null,
      };
      await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
      return res.status(200).json({ ok: true, code });
    }

    if (action === 'join') {
      const { code, student } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      let challenge = JSON.parse(raw);

      if (challenge.ended) return res.status(410).json({ error: 'This challenge has ended' });

      // Already completed this one? Don't let the same student retake it —
      // a challenge is a one-shot comparison, not a practice set.
      const name = String(student || '').slice(0, 40);
      if (name && challenge.scores[name]) {
        return res.status(409).json({ error: 'You have already completed this challenge', alreadyCompleted: true, result: challenge.scores[name] });
      }

      // Scheduled challenges: once the scheduled time has passed, lock in
      // startedAt lazily on whoever happens to check next.
      if (challenge.syncMode === 'scheduled' && !challenge.startedAt && challenge.scheduledStartAt
          && Date.now() >= challenge.scheduledStartAt) {
        challenge.startedAt = challenge.scheduledStartAt;
      }

      // A time-limited challenge that already finished its window is over —
      // don't let new people join a session whose clock has run out.
      if (challenge.startedAt && challenge.time > 0
          && Date.now() > challenge.startedAt + challenge.time * 60000) {
        challenge.ended = true;
        challenge.endedAt = Date.now();
        await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
        return res.status(410).json({ error: 'This challenge has ended' });
      }

      if (challenge.syncMode !== 'anytime' && name) {
        if (!challenge.participants[name]) {
          challenge.participants[name] = { ready: false, joinedAt: Date.now() };
        }
      }
      await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
      return res.status(200).json({ ok: true, challenge });
    }

    // Waiting-room actions — only meaningful when syncMode isn't 'anytime'.
    // Each device polls `status` every few seconds and moves into the quiz
    // for everyone once `startedAt` is set.
    if (action === 'mark_ready') {
      const { code, student } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      if (!student) return res.status(400).json({ error: 'Missing student name' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      const challenge = JSON.parse(raw);
      const name = String(student).slice(0, 40);
      if (!challenge.participants[name]) challenge.participants[name] = { ready: false, joinedAt: Date.now() };
      challenge.participants[name].ready = true;
      if (!challenge.firstReadyAt) challenge.firstReadyAt = Date.now();

      const everyone = Object.values(challenge.participants);
      if (!challenge.startedAt && everyone.length > 0 && everyone.every(p => p.ready)) {
        challenge.startedAt = Date.now();
      }
      await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
      return res.status(200).json({
        ok: true, participants: challenge.participants,
        startedAt: challenge.startedAt, firstReadyAt: challenge.firstReadyAt,
      });
    }

    if (action === 'status') {
      const { code } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      let challenge = JSON.parse(raw);
      let changed = false;

      if (challenge.syncMode === 'scheduled' && !challenge.startedAt && challenge.scheduledStartAt
          && Date.now() >= challenge.scheduledStartAt) {
        challenge.startedAt = challenge.scheduledStartAt;
        changed = true;
      }
      if (changed) await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);

      return res.status(200).json({
        ok: true, participants: challenge.participants,
        startedAt: challenge.startedAt, firstReadyAt: challenge.firstReadyAt,
        scheduledStartAt: challenge.scheduledStartAt, ended: challenge.ended,
      });
    }

    // Creator's manual override, and also what any client calls once its own
    // timeout has elapsed — safe to call more than once, only ever sets
    // startedAt the first time.
    if (action === 'force_start') {
      const { code } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      const challenge = JSON.parse(raw);
      if (!challenge.startedAt) {
        challenge.startedAt = Date.now();
        await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
      }
      return res.status(200).json({ ok: true, startedAt: challenge.startedAt });
    }

    // Host-only: remove a joiner before the challenge has started.
    if (action === 'remove_participant') {
      const { code, student } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      const challenge = JSON.parse(raw);
      if (challenge.startedAt) return res.status(400).json({ error: 'Challenge already started' });
      delete challenge.participants[String(student || '').slice(0, 40)];
      await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
      return res.status(200).json({ ok: true, participants: challenge.participants });
    }

    // Host-only: close a challenge early so nobody can join or resume it.
    if (action === 'end_challenge') {
      const { code } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      const challenge = JSON.parse(raw);
      challenge.ended = true;
      challenge.endedAt = Date.now();
      await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
      return res.status(200).json({ ok: true });
    }

    if (action === 'submit') {
      const { code, student, score, total, pct } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      if (!student || typeof student !== 'string') return res.status(400).json({ error: 'Invalid student name' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      const challenge = JSON.parse(raw);
      challenge.scores[String(student).slice(0, 40)] = {
        score: Number(score) || 0,
        total: Number(total) || 0,
        pct: Number(pct) || 0,
        completedAt: Date.now(),
      };
      await redis('SET', `challenge:${code}`, JSON.stringify(challenge), 'EX', EXPIRE_SECONDS);
      return res.status(200).json({ ok: true, scores: challenge.scores });
    }

    if (action === 'leaderboard') {
      const { code } = req.body;
      if (!isValidCode(code)) return res.status(400).json({ error: 'Invalid code' });
      const raw = await redis('GET', `challenge:${code}`);
      if (!raw) return res.status(404).json({ error: 'Challenge not found or expired' });
      const challenge = JSON.parse(raw);
      return res.status(200).json({ ok: true, scores: challenge.scores });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error('Challenge API error:', err);
    return res.status(500).json({ error: 'Request failed' });
  }
};
