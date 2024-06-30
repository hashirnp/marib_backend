const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, default: null, required: true, trim: true },
    userClass: { type: String, default: null, required: true, trim: true },
    mobile: { type: Number, default: null, required: true, trim: true },
    isStaff: { type: Boolean, default: false, required: true, trim: true },
    isSuperStaff: { type: Boolean, default: false, required: true , trim: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;



