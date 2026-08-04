# Holiday Hub — v1

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

I've fixed this in Holiday Hub's own copy of the bank only (`data/senior/senior-bank.js`) —
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
  this affects the live paid apps as a priority, separate from Holiday Hub.
