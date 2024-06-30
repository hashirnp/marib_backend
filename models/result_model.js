const mongoose = require('mongoose');

// Define the schema for Subject
const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  score: { type: Number, required: true }
});

// Define the schema for ResultModel
const resultModelSchema = new mongoose.Schema({
  examID: { type: String, required: true, ref:'ExamModel' },
  dateOfExam: { type: Number, required: true },
  studentID: { type: String, required: true,  ref: 'Student'},
  studentName: { type: String, required: true },
  studentClass: { type: String, required: true },
  admissionNumber: { type: Number, required: true },
  subjects: [subjectSchema] // Embed the Subject schema as an array
});

// Create a model for ResultModel
const ResultModel = mongoose.model('ResultModel', resultModelSchema);

module.exports = ResultModel;
