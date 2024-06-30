const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    admissionNumber: { type: Number, default: null, required: true, trim: true},
    name: { type: String, default: null, required: true, trim: true },
    studentClass: { type: String, default: null, required: true, trim: true },
    mobile: { type: Number, default: null, required: true, trim: true },
    address: { type: String, default: null, required: true, trim: true},
    token:{type:String, default:'',trim:true}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;



