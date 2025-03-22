import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import Event from "../models/event.model.js";
import Student from "../models/student.model.js";
import Club from "../models/club.model.js";

//Get clubs
const getExploreClubs = asyncHandler(async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" }; // Case-insensitive search by name
  }

  if (category) {
    query.category = category;
  }

  const clubs = await Club.find(query).select("name description");

  res
    .status(200)
    .json(new apiResponse(200, clubs, "Clubs retrieved successfully"));
});

//Join a club request
const joinClub = asyncHandler(async (req, res) => {
  const { clubId } = req.params;
  const studentId = req.user._id;

  const club = await Club.findById(clubId);
  if (!club) throw new apiError(404, "Club not found");

  // Check if already a member
  if (club.members.some((m) => m.student.toString() === studentId.toString())) {
    throw new apiError(400, "Already a member of this club");
  }

  if (club.autoApproval) {
    club.members.push({ student: studentId, role: "Member" });
  } else {
    if (club.pendingRequests.includes(studentId)) {
      throw new apiError(400, "Already requested to join");
    }
    club.pendingRequests.push(studentId);
  }

  await club.save();
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { status: club.autoApproval ? "Joined" : "Pending Approval" },
        "Club join request processed"
      )
    );
});

//Get pending requests
const getPendingRequests = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  const clubs = await Club.find({ pendingRequests: studentId }).select(
    "name description"
  );

  res
    .status(200)
    .json(
      new apiResponse(200, clubs, "Pending requests retrieved successfully")
    );
});

//Get my clubs
const getMyClubs = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  // Find clubs where the student is a member
  const clubs = await Club.find({ "members.student": studentId }).select(
    "name description members"
  );

  // Format response to include role
  const formattedClubs = clubs.map((club) => {
    const member = club.members.find(
      (m) => m.student.toString() === studentId.toString()
    );
    return {
      _id: club._id,
      name: club.name,
      description: club.description,
      role: member.role, // Fetch the student's role in the club
    };
  });

  res
    .status(200)
    .json(
      new apiResponse(200, formattedClubs, "My clubs retrieved successfully")
    );
});

//leave the club
const leaveClub = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const { clubId } = req.params;

  // Find the club
  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  // Find the member's role
  const memberIndex = club.members.findIndex(
    (m) => m.student.toString() === studentId.toString()
  );
  if (memberIndex === -1) {
    throw new apiError(400, "You are not a member of this club");
  }

  const memberRole = club.members[memberIndex].role;

  // Prevent Club Admin from leaving unless they transfer ownership
  if (memberRole === "Club Admin") {
    throw new apiError(
      403,
      "Club Admin must transfer ownership before leaving"
    );
  }

  // Remove the student from the members array
  club.members.splice(memberIndex, 1);

  // Update total members count
  club.analytics.totalMembers = club.members.length;

  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, {}, "You have successfully left the club"));
});

//get events of a specific club
const getClubEvents = asyncHandler(async (req, res) => {
  const { clubId } = req.params;

  // Check if club exists
  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  // Fetch upcoming events for this club
  const currentDate = new Date();
  const events = await Event.find({
    _id: { $in: club.events },
    date: { $gte: currentDate },
  });

  res
    .status(200)
    .json(new apiResponse(200, events, "Club events retrieved successfully"));
});

//get all events from joined clubs
const getMyClubEvents = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  // Find all clubs the student is part of
  const clubs = await Club.find({ "members.student": studentId }).select(
    "events"
  );

  // Extract event IDs from all joined clubs
  const eventIds = clubs.flatMap((club) => club.events);

  // Fetch upcoming events
  const currentDate = new Date();
  const events = await Event.find({
    _id: { $in: eventIds },
    date: { $gte: currentDate },
  });

  res
    .status(200)
    .json(
      new apiResponse(200, events, "Your club events retrieved successfully")
    );
});

//register for a club specific event
const registerForClubEvent = asyncHandler(async (req, res) => {
  const { clubId, eventId } = req.params;
  const studentId = req.user._id;

  // Check if club exists
  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  // Check if event belongs to the club
  if (!club.events.includes(eventId)) {
    throw new apiError(400, "Event does not belong to this club");
  }

  // Check if student is a member of the club
  const isMember = club.members.some((member) => member.student.toString() === studentId.toString());
  if (!isMember) {
    throw new apiError(403, "You must be a club member to register for this event");
  }

  // Register the student for the event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new apiError(404, "Event not found");
  }

  if (event.participants.includes(studentId)) {
    throw new apiError(400, "You are already registered for this event");
  }

  event.participants.push(studentId);
  await event.save();

  res.status(200).json(new apiResponse(200, {}, "Successfully registered for the event"));
});

//unregister for the club specific events they signed up for
const unregisterFromClubEvent = asyncHandler(async (req, res) => {
  const { clubId, eventId } = req.params;
  const studentId = req.user._id;

  // Check if club exists
  const club = await Club.findById(clubId);
  if (!club) {
    throw new apiError(404, "Club not found");
  }

  // Check if event belongs to the club
  if (!club.events.includes(eventId)) {
    throw new apiError(400, "Event does not belong to this club");
  }

  // Unregister the student from the event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new apiError(404, "Event not found");
  }

  if (!event.participants.includes(studentId)) {
    throw new apiError(400, "You are not registered for this event");
  }

  event.participants = event.participants.filter((id) => id.toString() !== studentId.toString());
  await event.save();

  res.status(200).json(new apiResponse(200, {}, "Successfully unregistered from the event"));
});



export {
  getExploreClubs,
  joinClub,
  getPendingRequests,
  getMyClubs,
  leaveClub,
  getClubEvents,
  getMyClubEvents, 
  registerForClubEvent,
  unregisterFromClubEvent
};
