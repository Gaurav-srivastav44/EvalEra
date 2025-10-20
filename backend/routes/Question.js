import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      answer: { type: String }, // optional, can leave blank
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);
