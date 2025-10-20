import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function testAI() {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",  // You can also try "google/gemini-pro", "mistralai/mixtral-8x7b", etc.
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Generate 1 easy Java multiple-choice question in JSON format" },
      ],
      max_tokens: 150,
    }),
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

testAI();
