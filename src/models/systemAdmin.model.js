import mongoose from "mongoose";

const systemAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String }, // For authentication
  },
  { timestamps: true }
);

const SystemAdmin = mongoose.model("SystemAdmin", systemAdminSchema);
export default SystemAdmin;
