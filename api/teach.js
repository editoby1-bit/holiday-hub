// /api/teach.js — add to the same Vercel project as /api/mark.js
//
// WHY THIS EXISTS:
// "Teach Me" previously called https://api.anthropic.com/v1/messages
// directly from the browser. That either requires putting your Anthropic
// API key in client-side JS (visible to anyone via the network tab — real
// money exposure if someone lifts and reuses it) or, if no key is present,
// simply fails with a 401 every time (which is what the uploaded version
// does right now). This endpoint moves the call server-side, same pattern
// as your existing snap-and-mark function.
//
// SETUP REQUIRED IN VERCEL:
//   Uses the same ANTHROPIC_API_KEY environment variable your /api/mark.js
//   already reads — no new env var needed if that's already set.

const { applyCors, checkRateLimit } = require('./_lib/security');
const { redis } = require('./_lib/upstash');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 20 explanations per 10 minutes per IP.
  const rl = await checkRateLimit(redis, req, 'teach', 20, 600);
  if (!rl.allowed) {
    return res.status(429).json({ error: 'Too many requests — please wait a bit and try again' });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt' });
  }
  // Basic abuse guard — Teach Me prompts built by the app are a few hundred
  // words at most; reject anything wildly larger than that.
  if (prompt.length > 4000) {
    return res.status(400).json({ error: 'Prompt too long' });
  }

  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not set in Vercel environment variables');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5', // cheaper than opus-4-5; confirmed a valid model ID
        // (claude-haiku-4-5 is a cheaper/faster option still, if margin matters more than max quality)
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await aiRes.json();

    if (!aiRes.ok) {
      console.error('Anthropic API error:', data);
      return res.status(502).json({ error: 'AI request failed' });
    }

    const text = data.content?.map(c => c.text || '').join('') || '';
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Teach Me error:', err);
    return res.status(500).json({ error: 'Request failed' });
  }
};
