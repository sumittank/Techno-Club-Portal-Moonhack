import mongoose from "mongoose";
import dotenv from "dotenv";
import Club from "./models/club.model.js";
import Event from "./models/event.model.js";
import Student from "./models/student.model.js";
import connectDB from "./db/dbConnect.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await Club.deleteMany();
    await Event.deleteMany();
    await Student.deleteMany();

    // Insert students
    const students = await Student.insertMany([
      {
        name: "Tanisha Gupta",
        email: "tanisha@gmail.com",
        rollNumber: "333",
        password: "123456", // Simple credentials for testing
      },
      {
        name: "Soumya Jain",
        email: "soumya@gmail.com",
        rollNumber: "4444",
        password: "123456",
      },
      {
        name: "Tanmay Verma",
        email: "tanmay@gmail.com",
        rollNumber: "5555",
        password: "123456",
      },
      {
        name: "Pranjal Agarwal",
        email: "pranjal@gmail.com",
        rollNumber: "6666",
        password: "123456",
      },
    ]);

    // Insert clubs
    const clubs = await Club.insertMany([
      {
        name: "AI Club",
        description: "A club for AI enthusiasts.",
        members: [
          { student: students[0]._id, role: "Club Admin" }, // John Doe (Admin)
          { student: students[2]._id, role: "Member" }, // Alice Johnson (Member)
          { student: students[3]._id, role: "Member" }, // Bob Williams (Member)
        ],
        autoApproval: true,
      },
      {
        name: "Coding Club",
        description: "A club for coders.",
        members: [
          { student: students[1]._id, role: "Club Admin" }, // Jane Smith (Admin)
          { student: students[2]._id, role: "Member" }, // Alice Johnson (Member)
          { student: students[3]._id, role: "Member" }, // Bob Williams (Member)
        ],
        autoApproval: false,
      },
    ]);

    // Insert events
    const events = await Event.insertMany([
      {
        title: "AI Workshop",
        description: "Introduction to AI and ML.",
        date: new Date(),
        club: clubs[0]._id,
        participants: [students[0]._id, students[2]._id], // John and Alice are attending
      },
      {
        title: "Coding Challenge",
        description: "Competitive programming contest.",
        date: new Date(),
        club: clubs[1]._id,
        participants: [students[1]._id, students[3]._id], // Jane and Bob are attending
      },
    ]);

    console.log("✅ Dummy data inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting dummy data:", error);
    process.exit(1);
  }
};

seedData();
