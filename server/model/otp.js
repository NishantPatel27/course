const mongoose = require('mongoose');
const mailSender = require('../services/emailService');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60
    }
});

// Pre-save middleware function 
otpSchema.pre('save', async function (next) {
    try {
        const mailResponse = await mailSender(this.email, "Verification for Registration", this.otp);
        console.log("Mail sent successfully", mailResponse);
        next();
    } catch (err) {
        console.log("Error sending email:", err);
        next(err); // Pass error to the next middleware
    }
});

module.exports = mongoose.model("OTP", otpSchema);
