// models/Evaluation.js
const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true,
    unique: true, 
  },
  grader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String, 
  },
  feedbackByAI: {
    type: String, 
  },
  evaluatedAt: {
    type: Date,
    default: Date.now,
  },
  weakConcepts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concept',
  }]
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);