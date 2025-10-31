import express from "express";
import fetch from "node-fetch";

const router = express.Router();

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
          "You are an AI that generates exam questions ONLY in pure JSON format, no explanations or text outside JSON.",
      },
      {
        role: "user",
        content: `Generate ${n} ${difficulty} multiple-choice questions on ${subject}.
Each object should follow exactly this format:
{
  "question": "Question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "A"
}
Return a valid JSON array ONLY. Do not include extra text, markdown, or comments.`,
      },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "EvalEra AI Question Generator",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    let text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      console.error("❌ Invalid AI response:", data);
      return res.status(500).json({ error: "No response from AI" });
    }

    // 🧹 Clean unwanted wrappers like ```json or explanations
    text = text.replace(/```json|```/g, "").trim();

    // Try parsing JSON safely
    let questions;
    try {
      questions = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON parse error:", err);
      console.error("Raw text:", text);
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: text, // helpful for debugging in Postman
      });
    }

    res.json({ questions });
  } catch (err) {
    console.error("🔥 AI generation error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

export default router;
