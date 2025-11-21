// models/Assignment.js
const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  contentPath: {
    type: String,
  },
  contentType: {
    type: String,
    enum: ['PDF_UPLOAD', 'EXTERNAL_LINK', 'TEXT_DESCRIPTION'],
    required: true,
  },
  relatedConcepts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concept',
  }],
  isPublished: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);