import express from "express";
import multer from "multer";
import Assignment from "../models/Assignment.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Submission from "../models/Submission.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create assignment (Admin only)
router.post("/", authMiddleware, requireAdmin, upload.single("file"), async (req, res) => {
  try {
    console.log("Body received:", req.body);
    console.log("File received:", req.file);

    const { title, date, status } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const assignment = await Assignment.create({ title, date, status, file, createdBy: req.user._id });
    console.log("Assignment saved:", assignment);

    res.status(201).json(assignment);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all assignments
router.get("/", authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit assignment (User uploads)
router.post("/:id/submit", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File is required" });
    const sub = await Submission.create({
      assignmentId: req.params.id,
      userId: req.user._id,
      file: req.file.filename,
    });
    res.status(201).json(sub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: list submissions for an assignment
router.get("/:id/submissions", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const subs = await Submission.find({ assignmentId: req.params.id }).sort({ submittedAt: -1 });
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get my assignments (admin)
router.get("/mine", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const assignments = await Assignment.find({ createdBy: req.user._id }).sort({ date: -1 });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
