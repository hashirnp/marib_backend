const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
  studentClass: { type: String, required: true },
  month: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString(), required: true },
  present: { type: Boolean, required: true },
  verified: { type: Boolean, required: true, default: false },
  timestamp: { type: String, default: () => new Date().toISOString(), required: true }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
