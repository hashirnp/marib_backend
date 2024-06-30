const mongoose = require('mongoose');

const absentNotificationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
  text: { type: String, required: true },
  date: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const AbsentNotification = mongoose.model('AbsentNotification', absentNotificationSchema);

module.exports = AbsentNotification;
