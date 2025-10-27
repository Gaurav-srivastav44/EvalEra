import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ This returns the currently logged-in user's info
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Optional: admin-only route to get all users (if needed later)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
