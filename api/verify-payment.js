// /api/verify-payment.js — add to the same Vercel project as /api/mark.js
//
// WHY THIS EXISTS:
// The app previously granted access the moment Paystack's inline-JS
// `callback()` fired in the browser. That callback firing is NOT proof of
// payment — with the app's static, no-backend architecture, anyone could
// open devtools and call the client's grantAccess() function directly, or
// simply fabricate the callback, and get full paid access for free.
//
// This endpoint closes that hole: the client sends the Paystack transaction
// `reference` here, the server asks Paystack directly "did this reference
// really succeed, and for how much?", and only then tells the client what
// entitlement (tier + days) to grant. The amount actually paid — not
// whatever the client claims it bought — determines the entitlement.
//
// SETUP REQUIRED IN VERCEL:
//   Project Settings → Environment Variables → add PAYSTACK_SECRET_KEY
//   (starts with sk_live_... — the same account as your pk_live_ key,
//   found in Paystack Dashboard → Settings → API Keys & Webhooks)
//
// FIXED (previously a live bug): Holiday Hub's ₦500 / 10 AI-credits pack
// (AI_CREDIT_PACK_PRICE_KOBO = 50000 in js/app.js) was never added to this
// map. Every real Holiday Hub payment was coming back "Unrecognized amount
// — contact support" even though Paystack had genuinely charged the
// student. Added the `hh-ai-credits` entry below to fix this.
//
// FIXED (previously a known limitation, now closed): replay protection.
// This endpoint now marks each Paystack reference as used in the same
// Upstash Redis already provisioned for Challenge Mode (SET ... NX), so a
// verified reference can't be replayed to grant a second device's worth of
// access from one payment.

const { redis, hasRedis } = require('./_lib/upstash');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Server-side source of truth for what an amount (in kobo) unlocks.
// Mirrors the client's pricing, but the client can no longer talk it into
// granting something it didn't pay for — only these exact amounts qualify.
const ENTITLEMENTS = {
  200000:  { tier: 'student', days: 90 },   // Early adopter quarterly ₦2,000
  250000:  { tier: 'student', days: 90 },   // Standard quarterly ₦2,500
  750000:  { tier: 'student', days: 365 },  // Yearly ₦7,500
  350000:  { tier: 'plus',    days: 90 },   // Plus quarterly ₦3,500
  1050000: { tier: 'plus',    days: 365 },  // Plus yearly ₦10,500
  150000:  { tier: 'jamb',    days: 90 },   // JAMB Only quarterly ₦1,500
  100000:  { tier: 'plus',    days: 0    },  // Upgrade-to-Plus top-up ₦1,000 (keeps existing expiry — see note below)
  50000:   { tier: 'hh-ai-credits', days: 0 }, // Holiday Hub — ₦500 / 10 AI responses (tier/days unused by the client, it just needs verified:true)
};

module.exports = async (req, res) => {
  // Allow calls from both GitHub Pages apps
  res.setHeader('Access-Control-Allow-Origin', 'https://editoby1-bit.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ verified: false, error: 'Method not allowed' });
  }

  const { reference } = req.body || {};
  if (!reference || typeof reference !== 'string') {
    return res.status(400).json({ verified: false, error: 'Missing reference' });
  }

  if (!PAYSTACK_SECRET_KEY) {
    console.error('PAYSTACK_SECRET_KEY not set in Vercel environment variables');
    return res.status(500).json({ verified: false, error: 'Server misconfigured' });
  }

  try {
    const psRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );
    const psData = await psRes.json();

    if (!psRes.ok || !psData?.status || psData?.data?.status !== 'success') {
      return res.status(200).json({ verified: false, error: 'Payment not successful' });
    }

    const amount = psData.data.amount; // kobo, as actually charged
    const entitlement = ENTITLEMENTS[amount];

    if (!entitlement) {
      // Paid something, but not an amount that maps to a known plan —
      // don't guess, flag for manual review instead of silently granting.
      console.warn('Verified payment with unrecognized amount:', amount, reference);
      return res.status(200).json({ verified: false, error: 'Unrecognized amount — contact support' });
    }

    // Replay guard: only the FIRST verification of a given reference grants
    // access. 'SET key val NX EX seconds' only sets the key if it doesn't
    // already exist, and returns null (falsy) if it did — so this is an
    // atomic "claim this reference or fail" check, no separate read+write
    // race condition. Kept for 400 days (well past any realistic yearly
    // plan) so a reference can never be redeemed twice.
    if (hasRedis()) {
      try {
        const claimed = await redis('SET', `paystack:used:${reference}`, '1', 'NX', 'EX', 60 * 60 * 24 * 400);
        if (!claimed) {
          console.warn('Replay attempt on already-used payment reference:', reference);
          return res.status(200).json({ verified: false, error: 'This payment reference has already been used' });
        }
      } catch (err) {
        // Redis hiccup shouldn't block a genuine paying student — log it
        // and let the payment through; worst case is the same small replay
        // exposure that existed before this fix, not a new failure mode.
        console.warn('Replay-guard check failed (allowing payment through):', err.message);
      }
    }

    return res.status(200).json({
      verified: true,
      tier: entitlement.tier,
      days: entitlement.days,
    });
  } catch (err) {
    console.error('Paystack verify error:', err);
    return res.status(500).json({ verified: false, error: 'Verification request failed' });
  }
};
