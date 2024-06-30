const mongoose = require('mongoose');

const FeePaymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
  month: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  timestamp: { type: Date, default: getISTTime },
  studentCls: { type: String, required: true },
  year: { type: String, required: true },
});

const FeePayment = mongoose.model('FeePaymentModel', FeePaymentSchema);

module.exports = FeePayment;

function getISTTime() {
  let date = new Date();
  let utcOffset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  let istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (+5:30)
  return new Date(date.getTime() + utcOffset + istOffset);
}
