# My Study App — v1

A free, standalone holiday companion app: Revision, Quiz, Challenge a Friend, and a Holiday
Project Helper. Built to reuse Editoby Ventures' existing infrastructure (question banks,
shared backend, challenge system) rather than starting from scratch.

## What's in this repo

```
index.html              — single-page app shell
css/styles.css           — design tokens + all component styles
js/app.js                 — all app logic (routing, revision, quiz, challenge, project helper)
data/manifest.js          — content manifest (what subjects/categories are available offline)
data/senior/senior-bank.js — Senior Secondary question bank (reused from My Exams App, unchanged)
data/junior/junior-bank.js — Junior Secondary starter question bank (new, seed set)
manifest.json              — PWA manifest
```

## Deployment (GitHub Pages, same pattern as your other apps)

1. Create a new GitHub repo, e.g. `holiday-hub`, under `editoby1-bit`.
2. Push everything in this folder to the repo root.
3. Enable GitHub Pages (Settings → Pages → deploy from `main` branch, root).
4. Done — no build step, it's vanilla HTML/CSS/JS same as your other two apps.

## Backend — one new endpoint needed

Everything except the Project Helper reuses your **existing** `editoby-api.vercel.app`
backend as-is:
- `/api/challenge` — already live, used by Challenge a Friend / Study Together. No changes needed.

**New endpoint to deploy:** `/api/project-helper` (file provided separately, see
`holiday-hub-backend/api/project-helper.js`). Drop it into your existing `editoby-api` Vercel
project's `/api` folder and redeploy — it reuses the same `ANTHROPIC_API_KEY` environment
variable your snap-and-mark feature already uses, so no new secrets needed.

## ⚠️ Important — data bug found and fixed in this copy (needs your attention)

While building anti-repetition tracking, I found a real bug in the **original My Exams App
question bank**: roughly 65% of objective questions (386 out of 591) across almost every
subject store their correct answer as a letter (`'B'`) instead of a numeric index (`1`), and
are missing a unique `id`. My Exams App's own scoring/highlighting code does a direct numeric
comparison (`i === q.answer`) with no letter-to-index conversion anywhere — meaning for any
question shaped this way, correct-answer highlighting and scoring don't work reliably.

**This is not something I introduced — it was already in the data file you gave me, and if
My Exams App / My JAMB App still use this same question bank, this bug is very likely live
in both paid apps right now.** Worth checking urgently, since it affects roughly two-thirds
of objective questions.

I've fixed this in My Study App's own copy of the bank only (`data/senior/senior-bank.js`) —
converted all letter answers to numeric indices and assigned stable IDs to every question that
lacked one. I did **not** touch your original My Exams App / My JAMB App repos. If you want, I
can prepare the same fix as a patch for those two apps' `questions.js` next.

## New in this update — anti-repetition + AI-generated questions

- **Seen-question tracking**: the app now remembers which questions each student has already
  done, per subject, on their device (localStorage). Quiz and Challenge selection prefer
  unseen questions first, only recycling once a subject's full pool has been exhausted —
  and when that happens, tracking resets so the next round starts fresh rather than refusing
  to serve anything.
- **AI Boost toggle** (Challenge setup): when a subject's static pool is running low on fresh
  questions for that student, the toggle auto-suggests itself and the app calls a new backend
  endpoint to generate additional never-seen questions on the fly, blended in with the static
  ones. This directly targets subjects like Literature, CRS, Geography, Civic Ed, Accounting,
  Commerce, and Marketing, which only have 20 static questions each and would otherwise repeat
  within a single 20-question quiz.
- **New backend endpoint**: `/api/generate-questions` (see `holiday-hub-backend/api/`) —
  deploy alongside `project-helper.js` on the same Vercel project, same `ANTHROPIC_API_KEY`.



**Done and tested (via automated flow simulation):**
- Home screen, category tabs (Senior/Junior), feature grid
- Revision mode — browse questions, see explanations, no timer
- Quiz mode — pick subject, question count, time limit, timed session, scoring, results, review
- Challenge a Friend / Study Together — create/join by code, waiting room, scheduled or
  ready-based sync, leaderboard — all pointed at your live backend
- Holiday Project Helper UI — chat interface, subject chips (needs the new backend endpoint deployed to actually respond)
- Local stats (sessions, average score, day streak) and a live holiday countdown

## New in this update — Speed Round + icons

- **Speed Round (Edu Games)**: 60-second rapid-fire game mode. Tap an answer, get instant
  correct/incorrect feedback, auto-advance — no "next" button. Streak-based scoring (3+ streak
  = 2x points, 5+ = 3x), a streak-flash animation every 3 in a row, and a results screen with
  score / accuracy / best streak. Pulls from the same anti-repeat pool as Quiz, and tops itself
  up with AI-generated questions in the background if a fast player is about to run out mid-round
  (uses `/api/generate-questions`, same as the Challenge AI Boost).
- **Icons**: generated `icon-192.png` / `icon-512.png` — navy background, coral star, thin gold
  ring, on-brand with the rest of the app. "Add to Home Screen" now has a proper icon. Also
  added `<link rel="icon">` / `apple-touch-icon` to `index.html`, which weren't there before.

## New in this update — visual differentiation ("everything felt the same")

Feedback was that Revision, Quiz, and Challenge all rendered through the same white-card
component and felt interchangeable. Fixed by giving each mode its own identity:

- **Subject color/icon system** (`data/manifest.js` → `SUBJECT_META`): every subject now has
  an accent color + emoji, shown on subject-picker rows and carried into whichever mode you're in.
- **Revision → "Study Mode"**: calmer parchment-toned card, answers reveal with a small
  checkmark/strike instead of a hard red/green flash, subject-colored progress bar, feels
  like reading rather than testing.
- **Quiz → "Exam Mode"**: OMR-style circular bubble selectors (A)(B)(C)(D) like a real answer
  sheet, ruled-paper background texture, coral progress bar, numbered question badge.
- **Challenge → "Duel Mode"**: waiting room and leaderboard now use colored initials-avatars
  (deterministic per name), "⚔️ Duel Lobby" / "🏆 Duel Results" framing, ready-state highlighting.
- Speed Round and Project Helper were already distinct (tap-grid game, chat) and untouched.

## New in this update — from "quiz app" to study companion

Feedback: the app was technically built on a past-questions foundation but shouldn't *feel*
like one — it should feel like a study tool that knows the student. Four additions to close
that gap:

- **Weak-area tracking**: every scored Quiz and Speed Round session now records per-subject
  accuracy locally (storage key `hh-mastery-v1`). Revision doesn't count — it's open browsing,
  not a test.
- **Home dashboard nudges**: once there's enough data, the home screen leads with up to two
  cards above the feature grid — "Continue where you left off" (last subject/mode touched)
  and "Focus area: [Subject] — averaging X%" (weakest subject with 8+ attempts). Silent for
  brand-new users; only appears once real usage exists.
- **Personal Study Plan** (new pillar, not just another mode): a banner above the feature grid
  opens a setup flow — pick subjects, pick how many weeks — and generates a day-by-day
  checklist (round-robin across chosen subjects, one Speed Round mixed in every 3rd day for
  variety). Each task has a "Start →" that jumps straight into that subject's Quiz or Speed
  Round, and a checkbox to mark done. Progress bar shows overall completion. Deterministic,
  not AI-generated — instant, never fails, no API cost.
- **"Explain this differently"** button inside Study Mode's explanation panel: when the canned
  explanation doesn't land, tapping it calls the *existing* `/api/project-helper` endpoint
  (no new backend needed) with the question/answer/explanation as context, and the AI tutor
  offers a different angle — simpler analogy or different approach — inline, without leaving
  Study Mode.

## New in this update — Study Library (non-past-question resources)

A new pillar, fully offline (no API calls, static content), addressing feedback that the app
should feel like more than a quiz bank:

- **Flashcards** — term/definition pairs, tap to flip, shuffle, prev/next navigation.
- **Formula Sheets** — condensed formula + note per entry, for subjects where that's relevant.
- **Concept Notes** — short plain-English topic summaries for subjects that benefit more from
  explanation than formulas.

Only the tabs with actual content for a subject are shown (e.g. Mathematics shows Flashcards +
Formulas but no Notes tab; Government shows Flashcards + Notes but no Formulas tab). If a
subject has nothing yet, tapping it shows "content isn't ready yet" instead of a broken screen.

**Current content coverage** (updated):
- **All 15 senior subjects now have real Study Library content** — no more empty subjects.
  Full three-type coverage (flashcards + formulas + notes) on the STEM/heavy-calculation
  subjects (Math, Chemistry, Physics, Accounting, Economics); flashcards + notes on the
  discussion-heavy subjects (English, Government, Literature, Commerce, Marketing, Civic Ed,
  Animal Husbandry); flashcards only on CRS and Geography (formulas don't apply, notes can
  come later).
- **Junior**: Mathematics, English, Basic Science, Basic Technology, Social Studies, and Civic
  Education all now have starter content — every junior subject in the manifest has something.

Adding more is a content-only change — drop entries into `data/senior/senior-resources.js` or
`data/junior/junior-resources.js` under the right subject key, no app logic changes needed.

## New in this update — real interaction variety (not just skins)

Feedback: Revision, Quiz, and Speed Round all *looked* different but were mechanically the
same thing — read a question, tap an option. Fixed at the interaction level, not just visually:

- **Bug fix**: Speed Round never showed which subject/category you were playing (no label
  anywhere in the game screen). Added a subject badge under the timer bar.
- **Study Mode is now recall-first**: instead of tapping an option to check yourself (which is
  literally what Quiz does), you read the question, think of the answer yourself, then tap
  "Reveal Answer." Options appear read-only with the correct one highlighted, plus a self-rate
  ("😊 I knew it" / "😕 Still learning") — active recall, not recognition-testing.
- **"Games" is now a hub, not a single mode.** Tapping it opens a picker for three genuinely
  different mechanics:
  - **Speed Round** (existing) — 4-option grid, rapid tap, streak scoring
  - **True or False Blitz** (new) — two giant Yes/No buttons, statements derived on the fly
    from the existing question bank (no new data, no AI needed) — different rhythm, different
    motor pattern entirely from a 4-option grid
  - **Memory Match** (new) — flip tiles to pair flashcard terms with definitions, untimed
    pressure (clock counts up, not down) — no question-reading at all, pure matching, reuses
    Study Library's flashcard data directly. Deliberately calmer than the other two.

## New in this update — Study Mode fix + 4th game

- **Study Mode fixed**: previous version showed the answer immediately after "Reveal" (too
  passive). Now it's a proper 3-step flow: read question → tap "Reveal Options" (options
  appear, but plain — no answer shown yet) → tap the option you think is right → *then* see
  correct/incorrect + explanation. Real self-testing, not just a recall-then-read flow.
- **Category Sort** (new 4th game): a genuinely different mechanic from the other three —
  classification, not question-answering. Terms from up to 4 subjects get mixed together;
  four bucket buttons (one per subject) appear, and you tap which subject each term belongs
  to. Spans multiple subjects by design, so it skips the subject picker and starts straight
  from the Games Hub. Reuses Study Library flashcard data, same scoring/streak rhythm as the
  other timed games.
- Verified visually this round (not just functionally) using Playwright screenshots — caught
  and fixed a real contrast bug in Category Sort's term card (white text on a near-white
  background) before it shipped, and confirmed the Speed Round subject badge fix actually
  renders correctly.

## New in this update — AI Credits, Paywall, and Launch Banner (hidden)

- **Freemium AI model**: every new student gets 3 free AI responses (Project Helper, Explain
  Differently, Challenge AI Boost all draw from the same pool). Once used up, a paywall offers
  10 more for ₦500 via Paystack. **Everything else stays free and uncapped** — Revision, Quiz,
  all 4 games, Study Library. This matches the plan discussed: free spreads the app fast, AI is
  the one thing that costs anything.
- **Same Paystack account, same verification endpoint**: reuses the live key and the shared
  `/api/verify-payment` endpoint your other apps already use — no new backend work needed for
  this. Transaction references are prefixed `HH-AI-` so you can tell My Study App payments apart
  from My Exams App / My JAMB App ones in your Paystack dashboard.
- **Game AI top-up stays silent**: Speed Round/True-False/Sort's background AI question
  refresh (when the static pool runs low mid-game) quietly skips itself if credits are at zero
  — it never interrupts a 60-second round with a paywall. The free game experience is never
  degraded by the payment system.
- **Launch banner built, hidden by default**: a "Coming Soon — My Exams App / My JAMB App"
  banner exists on the home screen but is off (`SHOW_LAUNCH_BANNER = false` near the bottom of
  `js/app.js`). Flip it to `true` and edit the title/text in `index.html`
  (`#launchBannerTitle` / `#launchBannerSub`) when you're ready to announce — no other changes
  needed. Dismissible per-user once shown (remembers via localStorage).
- **⚠️ Payment flow tested up to the Paystack handoff only** (paywall trigger → email modal →
  correct amount/reference/email passed to `PaystackPop.setup`) — verified via simulation,
  since I can't complete a real charge or hit your live `/api/verify-payment` endpoint from
  here. **A real test payment on a real device is essential before this goes live.**

**Open items before this is fully launch-ready:**
- **Holiday end date**: the countdown in `js/app.js` (`HOLIDAY_END`) is set to a placeholder
  date (Sept 14, 2026) — confirm the actual resumption date and I'll update it.
- **Pricing / monetization**: nothing paywalled yet — every feature is currently free. This
  needs a business decision from you (pricing model/tiers) before I can wire up Paystack —
  happy to build it as soon as you've decided.
- **Junior bank size**: still a small seed set (6 subjects, handful of questions each) — the
  AI Boost mechanism now works for Junior too (Challenge and Speed Round both use the same
  `/api/generate-questions` endpoint), so gaps are covered live even before the static bank
  grows over time.
- **Testing**: verified via simulated DOM interaction (headless) covering the full flow —
  home → revision → quiz → results → review, Speed Round game, challenge modal open/setup,
  project helper screen, anti-repetition tracking. Not yet tested on a real device/browser —
  worth a real click-through before pushing live.
- **My Exams App / My JAMB App data bug**: see the section above — recommend checking whether
  this affects the live paid apps as a priority, separate from My Study App.
