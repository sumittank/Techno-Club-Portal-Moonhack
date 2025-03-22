const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['applicant', 'officer', 'admin'], required: true },
    uniqueKey: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);
