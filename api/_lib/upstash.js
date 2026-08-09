// api/_lib/upstash.js
// Shared Upstash Redis REST client. Files/folders prefixed with "_" under
// /api are NOT turned into routes by Vercel, so this is safe to import from
// any endpoint without becoming an accidental public endpoint itself.
//
// Reuses the SAME UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN env vars
// already set up for Challenge Mode — no new Vercel setup needed.

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(...command) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    throw new Error('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set');
  }
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

function hasRedis() {
  return !!(UPSTASH_URL && UPSTASH_TOKEN);
}

module.exports = { redis, hasRedis };
