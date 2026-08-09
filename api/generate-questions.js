// api/generate-questions.js
// Holiday Hub — AI Question Generator
//
// Generates fresh multiple-choice questions for a subject when the static
// question bank is thin or a user has already seen most of it. Used by
// Challenge a Friend (and, later, Edu Games) to avoid repetition.
//
// Deploy alongside project-helper.js in the same editoby-api Vercel
// project. Reuses the same ANTHROPIC_API_KEY environment variable.

const { applyCors, checkRateLimit } = require('./_lib/security');
const { redis } = require('./_lib/upstash');

const SYSTEM_PROMPT = `You generate multiple-choice practice questions for Nigerian secondary
school students (WAEC/NECO/GCE/NABTEB for Senior Secondary, or JSS1-3 curriculum for Junior
Secondary). You must respond with ONLY valid JSON — no markdown fences, no preamble, no
commentary — matching exactly this shape:

{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": 0,
      "explanation": "string, 1-3 sentences explaining why the answer is correct"
    }
  ]
}

Rules:
- "answer" is the zero-based index of the correct option in "options".
- Exactly 4 options per question, plausible distractors (no joke/obviously-wrong options).
- Questions must be at the stated level (Senior Secondary exam standard, or the specific JSS
  level given) and curriculum-accurate for the Nigerian system.
- Do NOT duplicate or closely rephrase any question in the "avoid" list provided — generate
  genuinely different questions covering other aspects of the subject/topic.
- Keep question and option text concise (this renders on a mobile screen).`;

module.exports = async (req, res) => {
  applyCors(req, res);

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Method not allowed' }); return; }

  // 10 generations per 10 minutes per IP — plenty for real usage (each call
  // already returns up to 15 questions), tight enough to block a script
  // hammering this endpoint to run up the Anthropic bill.
  const rl = await checkRateLimit(redis, req, 'generate-questions', 10, 600);
  if (!rl.allowed) {
    res.status(429).json({ ok: false, error: 'Too many requests — please wait a bit and try again' });
    return;
  }

  try {
    const { category, subject, count, avoidQuestions } = req.body || {};

    if (!subject || !count) {
      res.status(400).json({ ok: false, error: 'subject and count are required' });
      return;
    }
    const safeCount = Math.max(1, Math.min(parseInt(count, 10) || 5, 15)); // hard cap per call
    const levelLine = category === 'junior'
      ? 'Level: Junior Secondary (JSS1-JSS3), mixed levels unless a specific JSS level is implied by the subject name.'
      : 'Level: Senior Secondary (WAEC/NECO/GCE exam standard).';

    const avoidList = Array.isArray(avoidQuestions) ? avoidQuestions.slice(0, 60) : [];
    const avoidBlock = avoidList.length
      ? `\n\nAvoid generating questions duplicating or closely resembling any of these already-used questions:\n${avoidList.map(q => `- ${q}`).join('\n')}`
      : '';

    const userPrompt = `Subject: ${subject}\n${levelLine}\nGenerate exactly ${safeCount} new multiple-choice questions.${avoidBlock}`;

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text().catch(() => '');
      console.error('Anthropic API error:', apiRes.status, errText);
      res.status(502).json({ ok: false, error: 'Upstream AI service error' });
      return;
    }

    const data = await apiRes.json();
    const raw = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();

    let parsed;
    try {
      const cleaned = raw.replace(/^```json\s*|\s*```$/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('Failed to parse AI question JSON:', raw.slice(0, 500));
      res.status(502).json({ ok: false, error: 'AI returned malformed question data' });
      return;
    }

    if (!Array.isArray(parsed.questions) || !parsed.questions.length) {
      res.status(502).json({ ok: false, error: 'AI returned no questions' });
      return;
    }

    // Tag with a stable-ish generated id so the frontend can track/dedupe these too
    const stamped = parsed.questions
      .filter(q => q && q.question && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === 'number')
      .map((q, i) => ({
        id: `ai-${Date.now()}-${i}`,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation || '',
        aiGenerated: true,
      }));

    if (!stamped.length) {
      res.status(502).json({ ok: false, error: 'AI returned no usable questions' });
      return;
    }

    res.status(200).json({ ok: true, questions: stamped });
  } catch (err) {
    console.error('generate-questions error:', err);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};
