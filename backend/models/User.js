import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // e.g., "admin" or "user"
  xp: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  streak: { type: Number, default: 0 },
  lastLogin: { type: Date, default: null },
});

export default mongoose.model("User", userSchema);
