import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answer: { type: String, required: true },
  correct: { type: Boolean, required: true },
  attemptedAt: { type: Date, default: Date.now },
});

attemptSchema.index({ challengeId: 1, userId: 1 });

export default mongoose.model("Attempt", attemptSchema);






