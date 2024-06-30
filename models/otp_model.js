// models/otpModel.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 5, // The document will be automatically deleted after 150 seconds of its creation time
    },
});
// Define a function to send emails


const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
