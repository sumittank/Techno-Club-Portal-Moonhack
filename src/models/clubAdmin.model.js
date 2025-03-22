import mongoose from "mongoose";

const clubAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    managedClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
    hostedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    refreshToken: { type: String }, // For authentication
  },
  { timestamps: true }
);

const ClubAdmin = mongoose.model("ClubAdmin", clubAdminSchema);
export default ClubAdmin;
