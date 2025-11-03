import mongoose from "mongoose";

const mcqQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true, validate: v => Array.isArray(v) && v.length >= 2 },
    correctAnswer: { type: String, required: true },
  },
  { _id: false }
);

const descriptiveQuestionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    maxScore: { type: Number, default: 0 },
  },
  { _id: false }
);

const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard", "Easy", "Medium", "Hard"], required: true },
    numberOfQuestions: { type: Number, required: true },
    type: { type: String, enum: ["mcq", "descriptive", "ai"], required: true },
    questions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    strict: false,
  }
);

// Helpful virtuals for typed access depending on test type
testSchema.virtual("mcqQuestions").get(function () {
  return this.type === "mcq" || this.type === "ai" ? this.questions : [];
});

testSchema.virtual("descriptiveQuestions").get(function () {
  return this.type === "descriptive" ? this.questions : [];
});

export default mongoose.model("Test", testSchema);


