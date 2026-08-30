// api/project-helper.js
// My Study App — Project & Homework Helper
//
// Deploy this alongside your existing editoby-api Vercel project
// (same repo/project as /api/challenge and /api/verify-payment).
// Requires an ANTHROPIC_API_KEY environment variable already set
// on that Vercel project (reuse the one used for snap-and-mark).

const { applyCors, checkRateLimit } = require('./_lib/security');
const { redis } = require('./_lib/upstash');

const SYSTEM_PROMPT = `You are the Project & Homework Helper inside My Study App, an app for Nigerian
secondary school students during the school break.

Your job is to guide a student through a project, assignment, or homework question — NOT to do it for them
and NOT to simply hand over the final answer.

Rules you must always follow:
1. Never give a complete, ready-to-submit answer, essay, solution, or project write-up in one shot.
2. Ask short clarifying questions first if the task isn't clear (subject, class level, what they've
   tried, what the project actually asks for).
3. Break the problem into small steps. Explain the idea or concept behind each step in plain language
   before asking the student to attempt it.
4. After explaining a concept, prompt the student to try the next bit themselves ("Now, based on
   that, what do you think comes next?" or similar) before you give it away.
5. If the student is stuck or asks directly for the answer, give a strong hint or a partially worked
   example using DIFFERENT numbers/details than their actual task, not their exact answer.
6. Keep tone warm, encouraging, patient — like a good older sibling or tutor, not a lecturer.
7. Keep responses reasonably short (a few sentences to a short paragraph plus maybe one guiding
   question) — this is a chat interface on a phone, not an essay.
8. If asked something completely unrelated to schoolwork or projects, gently redirect back to
   how you can help with their project, assignment, or homework.

Remember: the goal is that by the end, the student understands the material and could explain or
redo it themselves — not that they have a finished document to copy.`;

module.exports = async (req, res) => {
  applyCors(req, res);

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Method not allowed' }); return; }

  // 20 messages per 10 minutes per IP — a real back-and-forth tutoring
  // session easily fits this; a script replaying this endpoint doesn't.
  const rl = await checkRateLimit(redis, req, 'project-helper', 20, 600);
  if (!rl.allowed) {
    res.status(429).json({ ok: false, error: 'Too many requests — please wait a bit and try again' });
    return;
  }

  try {
    const { subject, messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ ok: false, error: 'messages array is required' });
      return;
    }

    // Basic guardrails: cap history length and message size sent upstream
    const trimmedMessages = messages.slice(-16).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.content || '').slice(0, 4000),
    }));

    const subjectLine = subject && subject !== 'Any subject'
      ? `The student says this project is about: ${subject}.`
      : '';

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: SYSTEM_PROMPT + (subjectLine ? `\n\n${subjectLine}` : ''),
        messages: trimmedMessages,
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text().catch(() => '');
      console.error('Anthropic API error:', apiRes.status, errText);
      res.status(502).json({ ok: false, error: 'Upstream AI service error' });
      return;
    }

    const data = await apiRes.json();
    const reply = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .trim();

    if (!reply) {
      res.status(502).json({ ok: false, error: 'Empty response from AI service' });
      return;
    }

    res.status(200).json({ ok: true, reply });
  } catch (err) {
    console.error('project-helper error:', err);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};
