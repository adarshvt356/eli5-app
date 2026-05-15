/**
 * POST /api/explain
 *
 * Accepts { question: string, mode: string } and returns
 * { explanation: string } from the Groq AI API.
 *
 * Deployed as a Vercel Serverless Function. Also consumed
 * locally via the Vite apiPlugin in vite.config.js.
 */

const SYSTEM_PROMPTS = {
    ELI5: `You are an enthusiastic teacher explaining something to a curious 10-year-old. \
Use simple everyday words — no jargon. Briefly use a real-world comparison to introduce \
the concept, then move on to explain how it actually works in plain language. Focus on \
making the concept itself clear — the comparison is just a quick bridge, not the main event. \
End with one sentence about why this matters in real life. Write at least 7-8 sentences in \
flowing paragraphs. Your tone should be warm, clear, and a little exciting — like you \
genuinely love this topic.`,

    Beginner: `You explain things to someone completely new to the topic. Define every key \
term when first used. Use simple relatable examples from everyday life. Write at least \
5-6 sentences with a clear structure — what it is, how it works, and why it matters. \
Never assume prior knowledge.`,

    Technical: `You explain things precisely to an experienced developer. Use correct technical \
terminology. Cover how it works internally, relevant trade-offs, time/space complexity where \
applicable, and common use cases. Be thorough — at least a paragraph of depth.`,

    Analogy: `Your entire response is one extended, imaginative real-world analogy. Do not \
explain the concept directly — instead, build a detailed story or scenario from everyday \
life that mirrors how the concept works. The reader should finish reading and think \
"oh, so THAT'S what it is" purely from the analogy alone, without any technical explanation. \
Use vivid details, characters, or situations. Write at least 6-8 sentences, fully committing \
to the scenario. Never break out of the analogy to explain technically.`,
};

export default async function handler(req, res) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not configured.' });
    }

    const { question, mode = 'ELI5' } = req.body || {};

    if (!question || !question.trim()) {
        return res.status(400).json({ error: 'question is required.' });
    }

    const systemPrompt = SYSTEM_PROMPTS[mode] ?? SYSTEM_PROMPTS.ELI5;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return res.status(response.status).json({
                error: errorData?.error?.message || 'Groq API request failed.',
            });
        }

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;

        if (!text) {
            return res.status(500).json({ error: 'No response received from AI.' });
        }

        return res.status(200).json({ explanation: text });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}