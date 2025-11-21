// models/Submission.js
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submittedPath: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Graded', 'Late'],
    default: 'Pending',
  },
  isLate: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

SubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Submission', SubmissionSchema);