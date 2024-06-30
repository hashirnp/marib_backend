 const mongoose = require('mongoose');

// Define the schema for ExamModel
const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Number, required: true } // Assuming date is represented as a Unix timestamp (milliseconds)
});

// Create a model for ExamModel
const ExamModel = mongoose.model('ExamModel', examSchema);

module.exports = ExamModel;
