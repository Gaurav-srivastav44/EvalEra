import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: { type: [answerSchema], default: [] },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
  descriptiveFeedback: { type: [Object], default: undefined },
  penalty: { type: Number, default: 0 },
  finalScore: { type: Number, default: null },
  proctoringLog: { type: [Object], default: undefined },
});

resultSchema.index({ testId: 1, userId: 1 });

export default mongoose.model("Result", resultSchema);






