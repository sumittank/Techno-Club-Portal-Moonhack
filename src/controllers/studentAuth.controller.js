import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

// Function to generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};

// REGISTER Student
const registerStudent = asyncHandler(async (req, res) => {
  const { rollNumber, name, email, password } = req.body;

  // Check if student already exists
  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    throw new apiError(400, "Student with this email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new student
  const newStudent = await Student.create({
    rollNumber,
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT tokens for immediate login
  const { accessToken, refreshToken } = generateTokens(newStudent._id);

  // Store refresh token in DB
  newStudent.refreshToken = refreshToken;
  await newStudent.save();

  return res
    .status(201)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new apiResponse(201, {
        message: "Student registered successfully",
        accessToken,
        refreshToken,
        redirectTo: "/student/dashboard", // This can be used for frontend redirection
      })
    );
});

// LOGIN Student
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find student by email
  const student = await Student.findOne({ email });
  if (!student) {
    throw new apiError(401, "Invalid email or password");
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) {
    throw new apiError(401, "Invalid email or password");
  }

  // Generate JWT tokens
  const { accessToken, refreshToken } = generateTokens(student._id);

  // Store refresh token in DB
  student.refreshToken = refreshToken;
  await student.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new apiResponse(200, {
        accessToken,
        refreshToken,
        message: "Login successful",
      })
    );
});

export { registerStudent, loginStudent };
