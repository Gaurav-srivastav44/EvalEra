import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Test from "../models/Test.js";
import Result from "../models/Result.js";

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
    const { answers } = req.body; // [{index, answer}]
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "answers must be an array" });
    }

    const test = await Test.findById(testId).lean();
    if (!test || !test.isActive) return res.status(404).json({ error: "Test not found" });

    let score = 0;
    const total = Array.isArray(test.questions) ? test.questions.length : 0;
    if (test.type === "mcq" || test.type === "ai") {
      const answerMap = new Map(answers.map(a => [a.index, a.answer]));
      test.questions.forEach((q, idx) => {
        const userAns = answerMap.get(idx);
        if (typeof q.correctAnswer === "string" && userAns && userAns === q.correctAnswer) {
          score += 1;
        }
      });
    } else {
      // descriptive: store answers, score 0 (manual grading later)
      score = 0;
    }

    const result = await Result.create({
      testId: test._id,
      userId: req.user._id,
      answers,
      score,
      total,
    });

    res.status(201).json({ resultId: result._id, score, total });
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


