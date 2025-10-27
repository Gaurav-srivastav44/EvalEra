import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function testAI() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  console.log("🔑 Loaded Key:", apiKey ? "OK" : "Missing");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:5000", // required by OpenRouter
      "X-Title": "EvalEra AI Question Generator"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // correct model name
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Generate 1 easy Java multiple-choice question in JSON format" },
      ],
      max_tokens: 200,
    }),
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

testAI();
