import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Club from "../models/club.model.js";
import Event from "../models/event.model.js";

// create event
const createEvent = asyncHandler(async (req, res) => {
  const { clubId } = req.params;
  const { title, description, date, startTime, endTime, location, category } =
    req.body;

  const club = await Club.findById(clubId);
  if (!club) throw new apiError(404, "Club not found");

  // Check if the user is a club admin
  const isAdmin = club.members.some(
    (member) =>
      member.student.toString() === req.user.id && member.role === "Club Admin"
  );

  if (!isAdmin) throw new apiError(403, "Only club admins can create events");

  const newEvent = await Event.create({
    title,
    description,
    date,
    startTime,
    endTime,
    location,
    category,
    createdBy: clubId,
  });

  club.events.push(newEvent._id);
  await club.save();

  res
    .status(201)
    .json(new apiResponse(201, newEvent, "Event created successfully"));
});

// edit event
const editEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date, startTime, endTime, location, category } =
    req.body;

  const event = await Event.findById(eventId);
  if (!event) throw new apiError(404, "Event not found");

  const club = await Club.findById(event.createdBy);
  if (!club) throw new apiError(404, "Club not found");

  // Check if the user is a club admin
  const isAdmin = club.members.some(
    (member) =>
      member.student.toString() === req.user.id && member.role === "Club Admin"
  );

  if (!isAdmin) throw new apiError(403, "Only club admins can edit this event");

  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date || event.date;
  event.startTime = startTime || event.startTime;
  event.endTime = endTime || event.endTime;
  event.location = location || event.location;
  event.category = category || event.category;

  await event.save();

  res
    .status(200)
    .json(new apiResponse(200, event, "Event updated successfully"));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) throw new apiError(404, "Event not found");

  const club = await Club.findById(event.createdBy);
  if (!club) throw new apiError(404, "Club not found");

  // Check if the user is a club admin
  const isAdmin = club.members.some(
    (member) =>
      member.student.toString() === req.user.id && member.role === "Club Admin"
  );

  if (!isAdmin)
    throw new apiError(403, "Only club admins can delete this event");

  await Event.findByIdAndDelete(eventId);
  club.events = club.events.filter((e) => e.toString() !== eventId);
  await club.save();

  res
    .status(200)
    .json(new apiResponse(200, null, "Event deleted successfully"));
});

const getClubEvents = asyncHandler(async (req, res) => {
  const { clubId } = req.params;

  const club = await Club.findById(clubId).populate("events");
  if (!club) throw new apiError(404, "Club not found");

  res
    .status(200)
    .json(
      new apiResponse(200, club.events, "Club events retrieved successfully")
    );
});

const getEventParticipants = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId).populate(
    "participants",
    "name rollNumber"
  );
  if (!event) throw new apiError(404, "Event not found");

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        event.participants,
        "Event participants retrieved successfully"
      )
    );
});

const removeParticipant = asyncHandler(async (req, res) => {
  const { eventId, studentId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) throw new apiError(404, "Event not found");

  const club = await Club.findById(event.createdBy);
  if (!club) throw new apiError(404, "Club not found");

  // Check if the user is a club admin
  const isAdmin = club.members.some(
    (member) =>
      member.student.toString() === req.user.id && member.role === "Club Admin"
  );

  if (!isAdmin)
    throw new apiError(403, "Only club admins can remove participants");

  event.participants = event.participants.filter(
    (id) => id.toString() !== studentId
  );
  await event.save();

  res
    .status(200)
    .json(new apiResponse(200, null, "Participant removed successfully"));
});

const postEventAnnouncement = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { title, message } = req.body;

  const event = await Event.findById(eventId);
  if (!event) throw new apiError(404, "Event not found");

  const club = await Club.findById(event.createdBy);
  if (!club) throw new apiError(404, "Club not found");

  // Check if the user is a club admin
  const isAdmin = club.members.some(
    (member) =>
      member.student.toString() === req.user.id && member.role === "Club Admin"
  );

  if (!isAdmin)
    throw new apiError(403, "Only club admins can post announcements");

  const newAnnouncement = { title, message, createdAt: new Date() };
  event.announcements.push(newAnnouncement);
  await event.save();

  res
    .status(200)
    .json(
      new apiResponse(200, newAnnouncement, "Announcement posted successfully")
    );
});

export {
  createEvent,
  editEvent,
  deleteEvent,
  getClubEvents,
  getEventParticipants,
  removeParticipant,
  postEventAnnouncement,
};
