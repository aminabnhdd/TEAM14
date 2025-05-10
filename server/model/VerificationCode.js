const mongoose = require('mongoose');

const verificationCodeSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    data: { type: Object, required: true }, // Stores the registration data
    createdAt: { type: Date, default: Date.now }
});


verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('VerificationCode', verificationCodeSchema);