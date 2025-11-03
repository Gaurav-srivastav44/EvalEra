import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  correctAnswer: { type: String, required: true },
  subject: { type: String, default: "General" },
  activeFrom: { type: Date, required: true },
});

export default mongoose.model("Challenge", challengeSchema);






