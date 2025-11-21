// models/StudentProgress.js
const mongoose = require('mongoose');

const StudentProgressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  concept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concept',
    required: true,
  },
  masteryScore: {
    type: Number, 
    default: 0,
  },
  totalAssignments: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

StudentProgressSchema.index({ student: 1, concept: 1 }, { unique: true });

module.exports = mongoose.model('StudentProgress', StudentProgressSchema);