import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Club from "../models/club.model.js";

// Get Club Details
const getClubDetails = asyncHandler(async (req, res) => {
  const { clubId } = req.params;

  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  res
    .status(200)
    .json(new apiResponse(200, club, "Club details fetched successfully"));
});

// Edit Club Details (Only Admin)
const editClubDetails = asyncHandler(async (req, res) => {
  const { clubId } = req.params;
  const { name, description } = req.body;

  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  // Check if the user is the club admin
  if (
    !club.members.some(
      (member) =>
        member.student.toString() === req.user.id &&
        member.role === "Club Admin"
    )
  ) {
    throw new apiError(
      403,
      "Unauthorized: Only club admins can edit club details"
    );
  }

  // Update club details
  if (name) club.name = name;
  if (description) club.description = description;
  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, club, "Club details updated successfully"));
});

// Get Club Members
const getClubMembers = asyncHandler(async (req, res) => {
  const { clubId } = req.params;

  const club = await Club.findById(clubId).populate(
    "members.student",
    "name rollNumber"
  );
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  res
    .status(200)
    .json(
      new apiResponse(200, club.members, "Club members fetched successfully")
    );
});

// Remove Member from Club
const removeMember = asyncHandler(async (req, res) => {
  const { clubId, studentId } = req.params;

  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  // Ensure only the club admin can remove members
  if (
    !club.members.some(
      (member) =>
        member.student.toString() === req.user.id &&
        member.role === "Club Admin"
    )
  ) {
    throw new apiError(
      403,
      "Unauthorized: Only club admins can remove members"
    );
  }

  // Remove the student
  club.members = club.members.filter(
    (member) => member.student.toString() !== studentId
  );
  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, null, "Member removed successfully"));
});

// Update Member Role
const updateMemberRole = asyncHandler(async (req, res) => {
  const { clubId, studentId } = req.params;
  const { role } = req.body;

  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  // Ensure only the club admin can change roles
  if (
    !club.members.some(
      (member) =>
        member.student.toString() === req.user.id &&
        member.role === "Club Admin"
    )
  ) {
    throw new apiError(
      403,
      "Unauthorized: Only club admins can update member roles"
    );
  }

  const member = club.members.find(
    (member) => member.student.toString() === studentId
  );
  if (!member) {
    throw new apiError(404, "Member not found in the club");
  }

  if (!["Member", "Committee Member"].includes(role)) {
    throw new apiError(
      400,
      "Invalid role. Allowed roles: Member, Committee Member"
    );
  }

  member.role = role;
  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, club.members, `Member role updated to ${role}`));
});

// Get Pending Membership Requests
const getPendingRequests = asyncHandler(async (req, res) => {
  const { clubId } = req.params;

  const club = await Club.findById(clubId).populate(
    "pendingRequests",
    "name rollNumber"
  );
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  res
    .status(200)
    .json(
      new apiResponse(200, club.pendingRequests, "Pending requests fetched")
    );
});

// Approve Membership Request
const approveMembership = asyncHandler(async (req, res) => {
  const { clubId, studentId } = req.params;

  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  if (!club.pendingRequests.includes(studentId)) {
    throw new apiError(400, "No pending request from this student");
  }

  club.pendingRequests = club.pendingRequests.filter(
    (id) => id.toString() !== studentId
  );
  club.members.push({ student: studentId, role: "Member" });
  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, club.members, "Membership approved"));
});

// Reject Membership Request
const rejectMembership = asyncHandler(async (req, res) => {
  const { clubId, studentId } = req.params;

  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  club.pendingRequests = club.pendingRequests.filter(
    (id) => id.toString() !== studentId
  );
  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, null, "Membership request rejected"));
});

// post announcements
const postAnnouncement = asyncHandler(async (req, res) => {
  const { clubId } = req.params;
  const { title, message } = req.body;

  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  club.announcements.push({ title, message });
  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, club.announcements, "Announcement posted"));
});

export {
  getClubDetails,
  editClubDetails,
  getClubMembers,
  removeMember,
  updateMemberRole,
  getPendingRequests,
  approveMembership,
  rejectMembership,
  postAnnouncement,
};
