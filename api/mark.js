/**
 * Editoby API — Snap and Mark
 * POST /api/mark
 *
 * Body (JSON):
 *   image      : base64-encoded image string (JPEG, already compressed client-side)
 *   mediaType  : "image/jpeg" | "image/png"
 *   question   : string
 *   scheme     : array of { point: string, marks: number }
 *   totalMarks : number
 *   subject    : string
 *   examBody   : string
 */

// Same allowlist as the rest of editoby-api — every Editoby app lives at
// this one GitHub Pages account origin. Add entries here if an app ever
// moves to a custom domain.
const ALLOWED_ORIGINS = ['https://editoby1-bit.github.io'];

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function upstash(...command) {
  const r = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

// Snap-and-mark is the most expensive call in the whole system (Opus +
// image input), so this gets the tightest limit: 6 marks per 10 minutes
// per IP is generous for a real student working through past questions,
// but blocks a script from running the bill up.
async function markRateLimitOk(req) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return true; // fail open if unconfigured
  try {
    const fwd = req.headers['x-forwarded-for'];
    const ip = fwd ? String(fwd).split(',')[0].trim() : (req.socket && req.socket.remoteAddress) || 'unknown';
    const key = `rl:mark:${ip}`;
    const count = await upstash('INCR', key);
    if (count === 1) await upstash('EXPIRE', key, 600);
    return count <= 6;
  } catch (err) {
    console.warn('mark.js rate limit check failed (failing open):', err.message);
    return true;
  }
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!(await markRateLimitOk(req))) {
    return res.status(429).json({ error: 'Too many requests — please wait a bit and try again' });
  }

  const { image, mediaType, question, scheme, totalMarks, subject, examBody } = req.body;

  if (!image || !question || !scheme || !Array.isArray(scheme)) {
    return res.status(400).json({ error: 'Missing required fields: image, question, scheme' });
  }

  // Reject if image is suspiciously large (> 1MB base64 ~ 750KB raw)
  // Client should compress before sending but we double-check here
  if (image.length > 1_400_000) {
    return res.status(400).json({
      error: 'Image too large. Please compress before uploading.',
      code: 'IMAGE_TOO_LARGE'
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const schemeText = scheme.map((s, i) =>
    `Point ${i + 1} [${s.marks} mark${s.marks > 1 ? 's' : ''}]: ${s.point}`
  ).join('\n');

  const total = totalMarks || scheme.reduce((sum, s) => sum + (s.marks || 1), 0);

  const prompt = `You are a ${examBody || 'WAEC'} chief examiner marking a ${subject || 'subject'} theory answer written by a Nigerian student.

QUESTION:
${question}

OFFICIAL MARKING SCHEME (${total} marks total):
${schemeText}

TASK:
The student has handwritten their answer on paper and snapped a photo. Study the handwriting carefully.

IMPORTANT — HANDWRITING NOTE:
If the handwriting is difficult to read in any section, do your best to interpret it charitably. Note in your comment if a specific point was unclear due to handwriting. A student with illegible handwriting risks losing marks in a real exam because examiners cannot award what they cannot read.

For each marking point, determine:
1. Whether the student addressed it (fully, partially, or not at all)
2. How many marks to award (full, half where applicable, or zero)

Return ONLY valid JSON in exactly this format, no other text:
{
  "breakdown": [
    {
      "point": "exact point text from scheme",
      "maxMarks": <number>,
      "awarded": <number>,
      "comment": "brief comment — what student wrote, what was missing, or handwriting note"
    }
  ],
  "feedback": "2-3 sentence overall examiner feedback — encouraging, specific, actionable",
  "examinerNote": "one key thing to remember for the exam",
  "handwritingWarning": true or false
}

Set handwritingWarning to true if the handwriting made marking difficult. Be fair but rigorous.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: image },
            },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', response.status, err);
      return res.status(502).json({ error: 'AI service error. Please try again.' });
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || '';

    let parsed;
    try {
      const clean = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error('JSON parse error. Raw:', rawText.substring(0, 500));
      return res.status(502).json({ error: 'Could not parse AI response. Please try again.' });
    }

    const awarded = parsed.breakdown.reduce((sum, b) => sum + (b.awarded || 0), 0);
    const percent  = Math.round((awarded / total) * 100);
    const grade    = percent >= 75 ? 'Excellent' : percent >= 60 ? 'Good' : percent >= 40 ? 'Fair' : 'Poor';

    return res.status(200).json({
      awarded,
      total,
      percent,
      grade,
      feedback:           parsed.feedback || '',
      examinerNote:       parsed.examinerNote || '',
      breakdown:          parsed.breakdown || [],
      handwritingWarning: parsed.handwritingWarning || false,
    });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
