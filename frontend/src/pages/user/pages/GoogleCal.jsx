const GoogleCalendar = () => {
  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      {/* Title */}
      <h2 className="text-2xl bg-blue-500 h-12 flex justify-center items-center rounded-xl font-bold text-gray-900 text-center mb-4">📅 Google Calendar</h2>

      {/* Embedded Calendar */}
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=UTC"
          style={{ width: "100%", height: "600px" }}
          frameBorder="0"
          scrolling="no"
          className="w-full h-[600px]"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleCalendar;

