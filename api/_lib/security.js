// api/_lib/security.js
// Shared CORS + rate-limiting for endpoints that spend real money per call
// (anything hitting the Anthropic API). Two problems this fixes:
//
// 1. CORS was wide open ('*') on the AI-calling endpoints, meaning any
//    website could call them directly from a visitor's browser and burn
//    your Anthropic credits — nothing to do with Holiday Hub usage at all.
// 2. There was no rate limiting anywhere, so even a legitimate-looking
//    caller (or a script hitting the endpoint directly, since the URL is
//    public in every browser's network tab) could fire unlimited requests.
//
// ALLOWED_ORIGINS covers every Editoby app hosted at editoby1-bit.github.io
// (GitHub Pages origin is the same for every repo on that account — the
// path doesn't matter for CORS, only scheme+host). Add more entries here
// if an app ever moves to a custom domain.

const ALLOWED_ORIGINS = [
  'https://editoby1-bit.github.io',
];

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Unknown/no origin (e.g. curl, a script): still set a fixed allowed
    // origin so preflight responses are well-formed, but the browser will
    // block the actual response from being read by a page on any other
    // origin — this is what actually stops cross-site abuse.
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS[0]);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.socket && req.socket.remoteAddress || 'unknown';
}

/**
 * Fixed-window rate limit backed by Upstash Redis.
 * bucket: short string identifying the endpoint, e.g. 'project-helper'
 * limit: max requests allowed per windowSeconds, per IP
 * Returns { allowed: boolean, remaining: number }.
 * Fails OPEN (allows the request) if Redis is unreachable/unconfigured —
 * an outage in the rate limiter shouldn't take down the whole feature,
 * it just means the abuse protection is temporarily off.
 */
async function checkRateLimit(redisFn, req, bucket, limit, windowSeconds) {
  try {
    const ip = getClientIp(req);
    const key = `rl:${bucket}:${ip}`;
    const count = await redisFn('INCR', key);
    if (count === 1) {
      await redisFn('EXPIRE', key, windowSeconds);
    }
    return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
  } catch (err) {
    console.warn('Rate limit check failed (failing open):', err.message);
    return { allowed: true, remaining: -1 };
  }
}

module.exports = { applyCors, getClientIp, checkRateLimit, ALLOWED_ORIGINS };
