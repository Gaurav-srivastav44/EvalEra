import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Result from "../models/Result.js";
import User from "../models/User.js";

const router = express.Router();

// Public/Authed leaderboard (require auth to avoid scraping; easy to relax)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const top = await Result.aggregate([
      {
        $group: {
          _id: "$userId",
          attempts: { $sum: 1 },
          avgScore: { $avg: { $divide: ["$score", { $cond: [{ $eq: ["$total", 0] }, 1, "$total"] }] } },
        },
      },
      { $sort: { avgScore: -1, attempts: -1 } },
      { $limit: 20 },
    ]);

    const userIds = top.map(t => t._id);
    const users = await User.find({ _id: { $in: userIds } }).select("username").lean();
    const userMap = new Map(users.map(u => [String(u._id), u]));
    const data = top.map((t, idx) => ({
      rank: idx + 1,
      userId: t._id,
      username: userMap.get(String(t._id))?.username || "User",
      attempts: t.attempts,
      averagePercent: Math.round((t.avgScore || 0) * 100),
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;




