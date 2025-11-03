import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role)
    return res.status(400).json({ error: "All fields are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "Invalid email or password" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

  if (user.role !== role)
    return res.status(403).json({ error: "Role mismatch — incorrect login type." });

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: { id: user._id, username: user.username, email: user.email, role: user.role },
  });
});

export default router;
// Current user profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
