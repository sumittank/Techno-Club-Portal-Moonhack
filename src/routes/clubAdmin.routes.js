import express from "express";
import {
  getClubDetails,
  editClubDetails,
  getClubMembers,
  removeMember,
  updateMemberRole,
  getPendingRequests,
  approveMembership,
  rejectMembership,
  postAnnouncement,
} from "../controllers/clubAdminClubManagement.controller.js";
import { verifiedJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// secured routes

// club management routes

// Club Management Routes
router.route("/:clubId").get(verifiedJWT, getClubDetails); // Get Club Details
router.route("/:clubId/edit").put(verifiedJWT, editClubDetails); // Edit Club Details

// Member Management Routes
router.route("/:clubId/members").get(verifiedJWT, getClubMembers); // Get Club Members
router.route("/:clubId/members/:studentId").delete(verifiedJWT, removeMember); // Remove Member
router.route("/:clubId/members/:studentId/role").put(verifiedJWT, updateMemberRole); // Update Member Role

// Membership Request Routes
router.route("/:clubId/requests").get(verifyJWT, getPendingRequests); // Get Pending Requests
router.route("/:clubId/requests/:studentId/approve").post(verifiedJWT, approveMembership); // Approve Membership
router.route("/:clubId/requests/:studentId/reject").post(verifiedJWT, rejectMembership); // Reject Membership

// Club Announcement Routes
router.route("/:clubId/announcements").post(verifiedJWT, postAnnouncement); // Post Announcement

//event management routes

router.route("/:clubId/create-event").post(verifiedJWT, createEvent);
router.route("/:eventId/edit-event").put(verifiedJWT, editEvent);
router.route("/:eventId/delete-event").delete(verifiedJWT, deleteEvent);
router.route("/:clubId/get-club-events").get(verifiedJWT, getClubEvents);
router.route("/:eventId/get-event-participants").get(verifiedJWT, getEventParticipants);
router.route("/:eventId/remove-participant/:studentId").delete(verifiedJWT, removeParticipant);
router.route("/:eventId/post-announcement").post(verifiedJWT, postEventAnnouncement);


export default router;