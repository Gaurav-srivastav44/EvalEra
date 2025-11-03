import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Test from "../models/Test.js";
import Result from "../models/Result.js";
import User from "../models/User.js";
import fetch from "node-fetch";

const router = express.Router();

function generateCode(length = 6) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // avoid ambiguous chars
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

async function generateUniqueCode() {
  // retry up to a few times in the rare event of collision
  for (let i = 0; i < 5; i++) {
    const code = generateCode();
    const exists = await Test.findOne({ code }).lean();
    if (!exists) return code;
  }
  // last resort: longer code
  return generateCode(8);
}

// MARK: Helper function for Judge0 API
async function judge0Submit({ source_code, language_id, testCases }) {
  // language_id: judge0's id - map from string below
  // testCases: [{ input, output }]
  const results = [];
  for (const tc of testCases) {
    const resp = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
      },
      body: JSON.stringify({
        source_code,
        language_id,
        stdin: tc.input,
        expected_output: tc.output,
      }),
    });
    const data = await resp.json();
    results.push({
      input: tc.input,
      output: tc.output,
      passed: data.status && data.status.id === 3, // 3 == Accepted
      stdout: data.stdout,
      time: data.time,
      memory: data.memory,
    });
  }
  return results;
}
// Language mapping for Judge0
const JUDGE0_LANGS = { python: 71, javascript: 63, cpp: 53, java: 62 };

async function awardXpAndBadges(userId, percent) {
  try {
    const user = await User.findById(userId);
    if (!user) return;
    let xpGain = 200; // base for finishing a test
    const badges = new Set(user.badges || []);
    if (percent >= 90) {
      xpGain += 50;
      badges.add("Gold Student");
    }
    user.xp = (user.xp || 0) + xpGain;
    // Quiz Master: 20+ results
    const attempts = await Result.countDocuments({ userId });
    if (attempts >= 20) badges.add("Quiz Master");
    user.badges = Array.from(badges);
    await user.save();
  } catch (_) {}
}

async function openAIDescriptiveGrade({ answers, questions }) {
  const outputs = [];
  for (let i = 0; i < answers.length; ++i) {
    const { answer } = answers[i];
    const prompt = questions[i]?.prompt || "";
    const max = questions[i]?.maxScore || 10;
    let system = `You are an expert exam grader. Grade only on a 0-${max} scale. Consider content accuracy, grammar, relevance, structure.`;
    let messages = [
      { role: "system", content: system },
      { role: "user", content: `Question: ${prompt}\n\nAnswer: ${answer}\n\nGive this:
Score: <marks>/${max}\nFeedback: <2-3 sentence improvement tips>` }
    ];
    try {
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model: "gpt-3.5-turbo", messages, temperature: 0.1 }),
      });
      const data = await resp.json();
      let marks = 0, feedback = "";
      if (data?.choices?.[0]?.message?.content) {
        const m = data.choices[0].message.content.match(/\b([0-9]+(?:\.[0-9]+)?)\s*\/\s*([0-9]+)/);
        if(m) marks = parseFloat(m[1]); else marks = 0;
        feedback = data.choices[0].message.content.replace(/Score:.+/g, "").replace(/Feedback:/, "").trim();
      } else {
        feedback = "Could not get feedback. Try again.";
      }
      outputs.push({ index: i, marks, max, feedback });
    } catch (e) {
      outputs.push({ index: i, marks: 0, max, feedback: "Grading failed (AI API error)" });
    }
  }
  return outputs;
}

// Create a new test (Admin only)
router.post("/", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { name, subject, difficulty, numberOfQuestions, type, questions } = req.body;

    if (!name || !subject || !difficulty || !numberOfQuestions || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const code = await generateUniqueCode();
    const doc = await Test.create({
      name,
      subject,
      difficulty,
      numberOfQuestions,
      type,
      questions: Array.isArray(questions) ? questions : [],
      createdBy: req.user._id,
      code,
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all tests (Admin only)
router.get("/", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const tests = await Test.find({}).sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get tests created by current admin (for dashboard)
router.get("/mine", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const tests = await Test.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single test by id (Admin only)
router.get("/:id", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ error: "Not found" });
    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: list results for a given test with user info
router.get("/:id/results", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const testId = req.params.id;
    const results = await Result.find({ testId })
      .sort({ submittedAt: -1 })
      .populate({ path: 'userId', select: 'username email' })
      .lean();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// User fetch by join code (authenticated user, not admin-only)
router.get("/public/by-code/:code", authMiddleware, async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const test = await Test.findOne({ code, isActive: true }).lean();
    if (!test) return res.status(404).json({ error: "Invalid or inactive code" });

    // Hide sensitive fields for users
    const { questions, type, ...rest } = test;

    let safeQuestions = questions;
    if (type === "mcq" || type === "ai") {
      safeQuestions = (questions || []).map(q => ({
        question: q.question,
        options: q.options,
        // do not include correctAnswer
      }));
    }
    // For descriptive, questions are already prompts without answers

    res.json({ ...rest, type, questions: safeQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Submit answers for a test and store result (user)
router.post("/:id/submit", authMiddleware, async (req, res) => {
  try {
    const testId = req.params.id;
    const { answers, penalty = 0, proctoringLog } = req.body; // for coding: [{index, code, language}]
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "answers must be an array" });
    }
    const test = await Test.findById(testId).lean();
    if (!test || !test.isActive) return res.status(404).json({ error: "Test not found" });

    let score = 0;
    const total = Array.isArray(test.questions) ? test.questions.length : 0;
    let codingDetail = [];

    if (test.type === "coding") {
      // Each answer must have index, code, language.
      // For each coding question, run all testCases.
      for (let idx = 0; idx < test.questions.length; idx++) {
        const question = test.questions[idx];
        const userAnswer = answers.find(a => a.index === idx);
        if (!userAnswer || !userAnswer.code) continue;
        const langId = JUDGE0_LANGS[userAnswer.language] || JUDGE0_LANGS[question.language];
        if (!langId) continue;
        // Run all testCases for this coding question
        const results = await judge0Submit({
          source_code: userAnswer.code,
          language_id: langId,
          testCases: question.testCases,
        });
        const passed = results.filter(r => r.passed).length;
        score += passed / question.testCases.length;
        codingDetail.push({
          index: idx,
          results,
          totalCases: question.testCases.length,
          passed,
          code: userAnswer.code,
        });
      }
      // Average or sum of correctness for all questions
      // For final score, sum fraction for each question then round
      score = Math.round((score / total) * total);
      const finalScore = Math.max(0, score - (Number(penalty) || 0));
      const result = await Result.create({
        testId: test._id,
        userId: req.user._id,
        answers,
        score,
        total,
        codingDetail: codingDetail.length > 0 ? codingDetail : undefined,
        penalty: Number(penalty) || 0,
        finalScore,
        proctoringLog: Array.isArray(proctoringLog) ? proctoringLog : undefined,
      });
      const percent = total ? (finalScore / total) * 100 : 0;
      await awardXpAndBadges(req.user._id, percent);
      return res.status(201).json({ resultId: result._id, score, penalty: Number(penalty)||0, finalScore, total, codingDetail });
    } else if (test.type === "mcq" || test.type === "ai") {
      const answerMap = new Map(answers.map(a => [a.index, a.answer]));
      test.questions.forEach((q, idx) => {
        const userAns = answerMap.get(idx);
        if (typeof q.correctAnswer === "string" && userAns && userAns === q.correctAnswer) {
          score += 1;
        }
      });
    } else {
      // descriptive: AI grade each answer
      const grading = await openAIDescriptiveGrade({ answers, questions: test.questions });
      score = Math.round(grading.reduce((a, b) => a + (b.marks || 0), 0));
      const finalScore = Math.max(0, score - (Number(penalty) || 0));
      const result = await Result.create({
        testId: test._id,
        userId: req.user._id,
        answers,
        score,
        total,
        descriptiveFeedback: grading,
        penalty: Number(penalty) || 0,
        finalScore,
        proctoringLog: Array.isArray(proctoringLog) ? proctoringLog : undefined,
      });
      const maxTotal = grading.reduce((a,b)=> a + (b.max||0), 0) || total;
      const percent = maxTotal ? (finalScore / maxTotal) * 100 : 0;
      await awardXpAndBadges(req.user._id, percent);
      return res.status(201).json({ resultId: result._id, score, penalty: Number(penalty)||0, finalScore, total, descriptiveFeedback: grading });
    }
    const finalScore = Math.max(0, score - (Number(penalty) || 0));
    const result = await Result.create({
      testId: test._id,
      userId: req.user._id,
      answers,
      score,
      total,
      penalty: Number(penalty) || 0,
      finalScore,
      proctoringLog: Array.isArray(proctoringLog) ? proctoringLog : undefined,
    });
    const percent = total ? (finalScore / total) * 100 : 0;
    await awardXpAndBadges(req.user._id, percent);
    res.status(201).json({ resultId: result._id, score, penalty: Number(penalty)||0, finalScore, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get current user's result for a test
router.get("/:id/my-result", authMiddleware, async (req, res) => {
  try {
    const testId = req.params.id;
    const result = await Result.findOne({ testId, userId: req.user._id }).sort({ submittedAt: -1 });
    if (!result) return res.status(404).json({ error: "No result found" });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all my results
router.get("/results/mine", authMiddleware, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user._id })
      .sort({ submittedAt: -1 })
      .lean();
    // Optionally attach minimal test info
    const testIds = [...new Set(results.map(r => String(r.testId)))];
    const tests = await Test.find({ _id: { $in: testIds } })
      .select("name subject difficulty")
      .lean();
    const testMap = new Map(tests.map(t => [String(t._id), t]));
    const withTests = results.map(r => ({
      ...r,
      test: testMap.get(String(r.testId)) || null,
    }));
    res.json(withTests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;


