// models/Concept.js

const mongoose = require('mongoose');

const ConceptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ['Basic', 'Intermediate', 'Advanced'],
    default: 'Basic',
  }
}, { timestamps: true });

ConceptSchema.index({ name: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('Concept', ConceptSchema);