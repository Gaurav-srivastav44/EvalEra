import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: String, required: true },
  status: { type: String, enum: ["submitted", "reviewed"], default: "submitted" },
  submittedAt: { type: Date, default: Date.now },
});

submissionSchema.index({ assignmentId: 1, userId: 1 });

export default mongoose.model("Submission", submissionSchema);




