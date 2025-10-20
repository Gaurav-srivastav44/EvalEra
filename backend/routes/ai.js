import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// POST /api/generate-questions
router.post("/generate-questions", async (req, res) => {
  const { subject, difficulty, numberOfQuestions } = req.body;

  if (!subject || !difficulty || !numberOfQuestions) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const n = parseInt(numberOfQuestions, 10);
  if (isNaN(n) || n <= 0) {
    return res.status(400).json({ error: "Invalid number of questions" });
  }

  try {
    const messages = [
      {
        role: "system",
        content:
          "You are an expert exam creator. Generate multiple-choice questions in JSON format.",
      },
      {
        role: "user",
        content: `
Generate ${n} ${difficulty} multiple-choice questions on ${subject}.
Each question should be in this format:
{
  "question": "Question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "A" // correct option (A/B/C/D)
}
Return the entire output as a valid JSON array.
        `,
      },
    ];

    // ✅ Use OpenRouter API instead of OpenAI
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        // Optional but recommended for compliance
        "HTTP-Referer": "http://localhost:5000", // your backend or frontend URL
        "X-Title": "EvalEra AI Question Generator", // your app name
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or another model from OpenRouter (like "mistralai/mixtral-8x7b")
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      console.error("Invalid AI response:", data);
      return res.status(500).json({ error: "Failed to generate questions" });
    }

    // Safely parse JSON output
    let questions;
    try {
      questions = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", err, "\nRaw text:", text);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

export default router;
