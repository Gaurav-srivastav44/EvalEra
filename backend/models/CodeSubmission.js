import mongoose from "mongoose";

const codeSubmissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  language: { type: String, enum: ["javascript", "python"], required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

codeSubmissionSchema.index({ problemId: 1, userId: 1 });

export default mongoose.model("CodeSubmission", codeSubmissionSchema);






