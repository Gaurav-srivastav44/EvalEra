import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Challenge from "../models/Challenge.js";
import Attempt from "../models/Attempt.js";

const router = express.Router();

// Create challenge (admin)
router.post("/", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { question, options = [], correctAnswer, subject, activeFrom } = req.body;
    if (!question || !correctAnswer || !activeFrom) return res.status(400).json({ error: "Missing fields" });
    const doc = await Challenge.create({ question, options, correctAnswer, subject, activeFrom });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get today's challenge (auth)
router.get("/today", authMiddleware, async (req, res) => {
  try {
    const start = new Date(); start.setHours(0,0,0,0);
    const end = new Date(); end.setHours(23,59,59,999);
    const ch = await Challenge.findOne({ activeFrom: { $gte: start, $lte: end } }).lean();
    if (!ch) return res.status(404).json({ error: "No challenge for today" });
    // Do not send correct answer
    const { correctAnswer, ...safe } = ch;
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Submit attempt (auth)
router.post("/:id/attempt", authMiddleware, async (req, res) => {
  try {
    const { answer } = req.body;
    const ch = await Challenge.findById(req.params.id).lean();
    if (!ch) return res.status(404).json({ error: "Challenge not found" });
    const correct = typeof answer === "string" && answer === ch.correctAnswer;
    const attempt = await Attempt.create({ challengeId: ch._id, userId: req.user._id, answer, correct });
    res.status(201).json({ correct, attemptId: attempt._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;






