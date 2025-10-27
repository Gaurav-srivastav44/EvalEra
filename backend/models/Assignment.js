import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Active", "Completed"], default: "Active" },
  file: { type: String, required: true }, // store filename
});

export default mongoose.model("Assignment", assignmentSchema);
