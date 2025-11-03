import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import fetch from "node-fetch";

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

  // Streak + XP: daily login bonus (+10 XP)
  try {
    const now = new Date();
    const last = user.lastLogin ? new Date(user.lastLogin) : null;
    const isNewDay = !last || last.toDateString() !== now.toDateString();
    if (isNewDay) {
      const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
      const continued = last && last.toDateString() === yesterday.toDateString();
      user.streak = continued ? (user.streak || 0) + 1 : 1;
      user.xp = (user.xp || 0) + 10;
      user.lastLogin = now;
      await user.save();
    }
  } catch (_) {}

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

// Google OAuth sign-in/up
router.post("/google", async (req, res) => {
  try {
    const { idToken, role } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });
    // Verify with Google
    const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
    const info = await verifyRes.json();
    if (!verifyRes.ok) return res.status(401).json({ error: "Invalid Google token" });
    const audOk = info.aud === "1088003588585-qtnukm16fdb25k1s695fhflnu79r426s.apps.googleusercontent.com";
    if (!audOk) return res.status(401).json({ error: "Token audience mismatch" });
    if (info.email_verified !== "true") return res.status(401).json({ error: "Email not verified" });

    const email = info.email;
    const username = info.name || email.split("@")[0];
    let user = await User.findOne({ email });
    if (!user) {
      // Create new user with Google
      const pwd = await bcrypt.hash(jwt.sign({ email }, process.env.JWT_SECRET).slice(0, 12), 8);
      user = await User.create({ username, email, password: pwd, role: role || "user" });
    } else if (role && user.role !== role) {
      // Keep existing role to avoid privilege escalation
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
