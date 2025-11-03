import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Problem from "../models/Problem.js";
import CodeSubmission from "../models/CodeSubmission.js";

const router = express.Router();

// Create problem (admin)
router.post("/", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { title, description, difficulty, category, starterCode, language } = req.body;
    if (!title || !description || !category) return res.status(400).json({ error: "Missing required fields" });
    const doc = await Problem.create({ title, description, difficulty, category, starterCode, language, createdBy: req.user._id });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// List problems (public auth)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const q = {};
    if (category) q.category = category;
    if (difficulty) q.difficulty = difficulty;
    const items = await Problem.find(q).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get problem by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const p = await Problem.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Submit code for a problem (no execution here)
router.post("/:id/submit", authMiddleware, async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) return res.status(400).json({ error: "code and language required" });
    const p = await Problem.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Problem not found" });
    const doc = await CodeSubmission.create({ problemId: p._id, userId: req.user._id, code, language });
    res.status(201).json({ submissionId: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;




