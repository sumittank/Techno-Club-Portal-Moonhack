import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    studentEngagement: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    feedback: [{ type: String }],
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
