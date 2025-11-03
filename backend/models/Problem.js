import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  category: { type: String, enum: ["dsa", "fullstack"], required: true },
  starterCode: { type: String, default: "" },
  language: { type: String, enum: ["javascript", "python"], default: "javascript" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Problem", problemSchema);






