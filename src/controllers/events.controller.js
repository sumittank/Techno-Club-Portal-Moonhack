import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import Event from "../models/event.model.js";
import Student from "../models/student.model.js";

// GET My Events (Events where student is a participant)
const getMyEvents = asyncHandler(async (req, res) => {
  const studentId = req.user._id; // Assuming student is authenticated

  const today = new Date();

  // Retrieve all events where the student is a participant
  const events = await Event.find({ participants: studentId }).populate(
    "club hostedBy"
  );

  // Categorizing events based on completion status
  const ongoingEvents = events.filter((event) => event.date >= today);
  const completedEvents = events.filter((event) => event.date < today);

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { ongoingEvents, completedEvents },
        "Student events retrieved successfully"
      )
    );
});

// GET details of the events
const getEventDetails = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // Find the event and populate related fields
  const event = await Event.findById(eventId)
    .populate("club", "name logo") // Fetch club name and logo
    .populate("hostedBy", "name email") // Fetch club admin name and email
    .populate("participants", "name email rollNumber") // Fetch participant details
    .lean(); // Convert to a plain JavaScript object for easier manipulation

  if (!event) {
    throw new apiError(404, "Event not found");
  }

  res
    .status(200)
    .json(new apiResponse(200, event, "Event details retrieved successfully"));
});

// GET Explore Events (With Filters & Sorting)
const getExploreEvents = asyncHandler(async (req, res) => {
  const { theme, club, sortBy } = req.query;
  const filters = { date: { $gte: new Date() } };

  if (theme) filters.theme = theme;
  if (club) filters.club = club;

  let sortOption = { date: 1 };
  if (sortBy === "popularity") sortOption = { interestedStudents: -1 };

  const events = await Event.find(filters)
    .populate("club", "name")
    .populate("hostedBy", "name")
    .sort(sortOption);

  res.status(200).json({
    success: true,
    data: events,
  });
});

// GET Recommended Events (Based on Student Interests)
const getRecommendedEvents = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  const recommendedEvents = await Event.find({
    interestedStudents: studentId,
    date: { $gte: new Date() },
  })
    .populate("club", "name")
    .populate("hostedBy", "name")
    .sort({ date: 1 });

  res.status(200).json({
    success: true,
    data: recommendedEvents,
  });
});

// register for the event
const registerForEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const studentId = req.user._id; // Extracting student ID from authenticated user

  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    throw new apiError(404, "Event not found.");
  }

  // Check if the event is already completed
  if (event.date < new Date()) {
    throw new apiError(400, "Event has already been completed.");
  }

  // Check if the student is already registered
  if (event.participants.includes(studentId)) {
    throw new apiError(400, "You are already registered for this event.");
  }

  // Check seat availability
  if (event.participants.length >= event.seatCapacity) {
    throw new apiError(403, "No seats available for this event.");
  }

  // Register the student
  event.participants.push(studentId);
  await event.save();

  return res
    .status(201)
    .json(
      new apiResponse(201, { eventId, studentId }, "Registration successful!")
    );
});

// unregister for the event
const unregisterFromEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const studentId = req.user._id; // Extracting student ID from authenticated user

  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    throw new apiError(404, "Event not found.");
  }

  // Calculate the time difference between now and the event start time
  const currentTime = new Date();
  const eventStartTime = new Date(event.date);
  const timeDifferenceInHours =
    (eventStartTime - currentTime) / (1000 * 60 * 60);

  // Restrict unregistration if the event is within 24 hours
  if (timeDifferenceInHours <= 24) {
    throw new apiError(
      400,
      "Unregistration is not allowed within 24 hours of the event."
    );
  }

  // Check if the student is registered
  if (!event.participants.includes(studentId)) {
    throw new apiError(400, "You are not registered for this event.");
  }

  // Remove the student from participants
  event.participants = event.participants.filter(
    (id) => id.toString() !== studentId.toString()
  );
  await event.save();

  return res
    .status(200)
    .json(
      new apiResponse(200, { eventId, studentId }, "Unregistration successful!")
    );
});

// Mark Interest in an Event
const markEventInterest = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const studentId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new apiError(404, "Event not found");
  }

  // Check if student has already marked interest
  if (event.savedBy.includes(studentId)) {
    throw new apiError(400, "You have already marked interest in this event");
  }

  // Add student to event's savedBy list
  event.savedBy.push(studentId);
  await event.save();

  // Add event to student's interested events list
  await Student.findByIdAndUpdate(studentId, {
    $addToSet: { interestedEvents: eventId },
  });

  res
    .status(200)
    .json({ success: true, message: "Event marked as interested." });
});

// Unmark Interest in an Event
const unmarkEventInterest = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const studentId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new apiError(404, "Event not found");
  }

  // Check if student has not marked interest
  if (!event.savedBy.includes(studentId)) {
    throw new apiError(400, "You have not marked interest in this event");
  }

  // Remove student from event's savedBy list
  event.savedBy = event.savedBy.filter(
    (id) => id.toString() !== studentId.toString()
  );
  await event.save();

  // Remove event from student's interested events list
  await Student.findByIdAndUpdate(studentId, {
    $pull: { interestedEvents: eventId },
  });

  res
    .status(200)
    .json({ success: true, message: "Event unmarked from interested list." });
});

export {
  getMyEvents,
  getEventDetails,
  getExploreEvents,
  getRecommendedEvents,
  registerForEvent,
  unregisterFromEvent,
  markEventInterest,
  unmarkEventInterest,
};
