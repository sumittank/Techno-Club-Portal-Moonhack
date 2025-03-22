import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
    participatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    credits: { type: Number, default: 0 },
    refreshToken: { type: String }, // For authentication
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
