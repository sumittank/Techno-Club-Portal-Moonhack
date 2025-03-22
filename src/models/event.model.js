import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String }, // Event location (if offline)
    startTime: { type: String, required: true },  // Example: "14:30"
    endTime: { type: String, required: true },    // Example: "16:00"
    mode: { type: String, enum: ["Online", "Offline"], default: "Offline" }, // Mode of event
    category: { type: String }, // Helps in recommendations (e.g., "Technical", "Cultural")
    tags: [{ type: String }], // Tags for filtering (e.g., ["Hackathon", "Workshop"])
    club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "ClubAdmin" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Registered students
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Students who marked it as interested
    capacity: { type: Number }, // Max participants allowed
    googleEventId: { type: String },  // To store the event ID when synced with Google Calendar
    announcements: [
      {
        title: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    registrationStatus: {
      type: String,
      enum: ["Open", "Closed", "Full"],
      default: "Open",
    }, // Helps in registration control
    googleCalendarEventId: { type: String }, // Stores event ID if synced with Google Calendar
  },
  { timestamps: true }
);

// Function to generate Google Calendar Link
eventSchema.methods.generateGoogleCalendarLink = function () {
  const startDateTime = new Date(this.date);
  startDateTime.setHours(this.startTime.split(":")[0], this.startTime.split(":")[1]);

  const endDateTime = new Date(this.date);
  endDateTime.setHours(this.endTime.split(":")[0], this.endTime.split(":")[1]);

  const formattedStart = startDateTime.toISOString().replace(/-|:|\.\d+/g, "");
  const formattedEnd = endDateTime.toISOString().replace(/-|:|\.\d+/g, "");

  return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(this.title)}&dates=${formattedStart}/${formattedEnd}&details=${encodeURIComponent(this.description)}&location=${encodeURIComponent(this.location)}`;
};

// Generate Google Calendar Link before saving
eventSchema.pre("save", function (next) {
  this.googleCalendarLink = this.generateGoogleCalendarLink();
  next();
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
