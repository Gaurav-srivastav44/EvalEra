import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Result from "../models/Result.js";
import Test from "../models/Test.js";

const router = express.Router();

router.get("/mine", authMiddleware, async (req, res) => {
  try {
    // join results with tests for subject fields
    const results = await Result.find({ userId: req.user._id }).lean();
    const testIds = [...new Set(results.map(r => String(r.testId)))];
    const tests = await Test.find({ _id: { $in: testIds } }).select("subject difficulty").lean();
    const testMap = new Map(tests.map(t => [String(t._id), t]));

    const perSubject = {};
    let totalCorrect = 0;
    let totalQuestions = 0;
    for (const r of results) {
      const t = testMap.get(String(r.testId));
      const subject = t?.subject || "General";
      if (!perSubject[subject]) perSubject[subject] = { attempts: 0, correct: 0, total: 0 };
      perSubject[subject].attempts += 1;
      perSubject[subject].correct += r.score;
      perSubject[subject].total += r.total || 0;
      totalCorrect += r.score;
      totalQuestions += r.total || 0;
    }

    const subjectStats = Object.entries(perSubject).map(([subject, s]) => ({
      subject,
      attempts: s.attempts,
      averagePercent: s.total ? Math.round((s.correct / s.total) * 100) : 0,
    }));

    const overall = {
      attempts: results.length,
      averagePercent: totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
    };

    res.json({ overall, subjectStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;




