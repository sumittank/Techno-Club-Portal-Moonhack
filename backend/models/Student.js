const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const studentSchema = new mongoose.Schema({
    name: String,
    total_events_attended: Number,
    total_events_hosted: Number,
    years_since_joining: Number,
    events_organized: Number,
    ai_score: Number,
});

module.exports = mongoose.model("Student", studentSchema);