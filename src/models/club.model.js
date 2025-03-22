import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Unique club name
    description: { type: String }, // Short description of the club

    members: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // Student reference
        role: {
          type: String,
          enum: ["Member", "Committee Member", "Club Admin"], // Role in club
          default: "Member",
        },
        joinedAt: { type: Date, default: Date.now }, // Date of joining
      },
    ],

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Club events reference

    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Students waiting for approval

    autoApproval: { type: Boolean, default: true }, // If true, students can join without approval

    announcements: [
      {
        title: { type: String, required: true }, // Announcement title
        message: { type: String, required: true }, // Announcement details
        createdAt: { type: Date, default: Date.now }, // Timestamp
      },
    ],

    analytics: {
      totalMembers: { type: Number, default: 0 }, // Total members count
      eventsHosted: { type: Number, default: 0 }, // Number of events hosted
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "ClubAdmin" }, // Club creator (Admin)
  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubSchema);
export default Club;

