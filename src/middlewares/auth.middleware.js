import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import  Student  from "../models/student.model.js";
import  ClubAdmin  from "../models/clubAdmin.model.js";
import  SystemAdmin  from "../models/systemAdmin.model.js";

// Middleware to verify JWT token
export const verifiedJWT = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized Request");
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check which user type it belongs to
    let user =
      (await Student.findById(decodedToken?._id).select("-password -refreshToken")) ||
      (await ClubAdmin.findById(decodedToken?._id).select("-password -refreshToken")) ||
      (await SystemAdmin.findById(decodedToken?._id).select("-password -refreshToken"));

    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid Access Token ");
  }
});
