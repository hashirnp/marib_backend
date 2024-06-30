const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaint: { type: String, required: true },
    // response: { type: String, required: true },
    status: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
    studentClass: { type: String, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint; 
