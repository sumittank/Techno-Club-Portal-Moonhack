import express from "express";
import {
  registerStudent,
  loginStudent,
} from "../controllers/studentAuth.controller.js";
import {
  getMyEvents,
  getEventDetails,
  getExploreEvents,
  getRecommendedEvents,
  registerForEvent,
  unregisterFromEvent,
  markEventInterest,
  unmarkEventInterest,
} from "../controllers/events.controller.js";

import {
  getExploreClubs,
  joinClub,
  getPendingRequests,
  getMyClubs,
  leaveClub,
  getMyClubEvents,
  getClubEvents,
  registerForClubEvent,
  unregisterFromClubEvent,
} from "../controllers/clubs.controller.js";

import { verifiedJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register Student
router.post("/register", registerStudent);

// Login Student
router.post("/login", loginStudent);

// secured routes

// Event Routes
router.route("/my-events").get(verifiedJWT, getMyEvents);
router.route("/:eventId/details").get(verifiedJWT, getEventDetails);
router.route("/explore").get(verifiedJWT, getExploreEvents);
router.route("/recommended").get(verifiedJWT, getRecommendedEvents);
router.route("/:eventId/register").post(verifiedJWT, registerForEvent);
router.route("/:eventId/unregister").post(verifiedJWT, unregisterFromEvent);
router.route("/:eventId/interest").post(verifiedJWT, markEventInterest);
router.route("/:eventId/uninterest").post(verifiedJWT, unmarkEventInterest);

// Clubs routes
router.route("/explore").get(verifiedJWT, getExploreClubs);
router.route("/:clubId/join").post(verifiedJWT, joinClub);
router.route("/:clubId/pending-requests").get(verifiedJWT, getPendingRequests);
router.route("/my-clubs").get(verifiedJWT, getMyClubs);
router.route("/:clubId/leave").post(verifiedJWT, leaveClub);
router.route("/:clubId/events").get(verifiedJWT, getClubEvents);
router.route("/my-events").get(verifiedJWT, getMyClubEvents);
router.route("/:clubId/register/:eventId").post(verifiedJWT, registerForClubEvent);
router.route("/:clubId/unregister/:eventId").post(verifiedJWT, unregisterFromClubEvent);

export default router;
