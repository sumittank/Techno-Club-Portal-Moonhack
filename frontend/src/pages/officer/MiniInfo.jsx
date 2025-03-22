import React, { useState } from "react";
import axios from "axios";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaUtensils, FaMusic, FaLaptopCode } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const eventTypes = {
  dinner: {
    title: "Dinner Event",
    icon: <FaUtensils className="w-6 h-6" />,
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    img : "https://media.istockphoto.com/id/165179632/photo/banquet-and-dinner-party.jpg?s=612x612&w=0&k=20&c=zL4R8Nb1xoLOJsSesp5bGymwZgz19iRXQf5CyrUxRFQ="
  },
  music: {
    title: "Music Concert",
    icon: <FaMusic className="w-6 h-6" />,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    img : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
  },
  hackathon: {
    title: "Hackathon",
    icon: <FaLaptopCode className="w-6 h-6" />,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    img : "https://s3.ap-southeast-1.amazonaws.com/files-scs-prod/public%2Fimages%2F1680145603531-Hackathon+Singapore+Header+Image.jpg",
  },
  // Add other event types similarly
};

const TemplateRenderer = ({ data, eventType }) => {
  const templateConfig = eventTypes[eventType] || eventTypes.dinner;

  return (
    <div className={`mt-6 p-8 rounded-xl ${templateConfig.bgColor} border ${templateConfig.borderColor} shadow-lg`}>
            {/* Featured Image Section */}
            <div className="my-8 rounded-lg overflow-hidden">
        <img 
          src={`${templateConfig.img}`}
          alt="Event visual"
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-lg bg-white shadow-sm">
          {templateConfig.icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{templateConfig.title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaCalendar className="w-5 h-5 mt-1 text-rose-600" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Event Dates</h3>
              <p className="text-gray-600">{data.dates[0]}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaClock className="w-5 h-5 mt-1 text-blue-600" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Event Time</h3>
              <p className="text-gray-600">{data.times[0]}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="w-5 h-5 mt-1 text-emerald-600" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Location</h3>
              <p className="text-gray-600">{data.locations.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaUsers className="w-5 h-5 mt-1 text-purple-600" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Organizers</h3>
              <p className="text-gray-600">{data.organizations.join(", ")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MdEmail className="w-5 h-5 mt-1 text-amber-600" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Contact Email</h3>
              <p className="text-gray-600">{data.emails[0]}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MdPhone className="w-5 h-5 mt-1 text-green-600" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Contact Number</h3>
              <p className="text-gray-600">{data.phone_numbers[0]}</p>
            </div>
          </div>
        </div>
      </div>



      {data.topics.length > 0 && (
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Featured Topics</h3>
          <div className="flex flex-wrap gap-2">
            {data.topics.map(topic => (
              <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const EventExtractor = () => {
  const [text, setText] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("dinner");

  const handleExtract = async () => {
    if (!text.trim()) {
      alert("Please enter event details.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/extract", { text });
      setExtractedData(response.data);
    } catch (error) {
      console.error("Error extracting details:", error);
      alert("Failed to extract event details.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-primary text-transparent">
        Event Information Extractor
      </h2>

      {/* Event Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Event Type</label>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(eventTypes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedEventType(key)}
              className={`p-4 rounded-lg flex flex-col items-center ${
                selectedEventType === key ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {value.icon}
              <span className="mt-2 text-sm font-medium">{value.title}</span>
            </button>
          ))}
        </div>
      </div>

      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="6"
        placeholder="Enter event description..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleExtract}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
        disabled={loading}
      >
        {loading ? "Generating Beautiful Template..." : "Generate Event Template"}
      </button>

      {extractedData && (
        <TemplateRenderer data={extractedData} eventType={selectedEventType} />
      )}
    </div>
  );
};

export default EventExtractor;


// import React from "react";
// import {
//   FaCalendar,
//   FaClock,
//   FaMapMarkerAlt,
//   FaUsers,
//   FaUtensils,
//   FaMusic,
//   FaLaptopCode,
// } from "react-icons/fa";
// import { MdEmail, MdPhone } from "react-icons/md";

// const eventTypes = {
//   dinner: {
//     title: "Dinner Event",
//     icon: <FaUtensils className="text-primary" />,
//     img: "https://media.istockphoto.com/id/165179632/photo/banquet-and-dinner-party.jpg?s=612x612&w=0&k=20&c=zL4R8Nb1xoLOJsSesp5bGymwZgz19iRXQf5CyrUxRFQ=",
//   },
//   music: {
//     title: "Music Concert",
//     icon: <FaMusic className="text-primary" />,
//     img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
//   },
//   hackathon: {
//     title: "Hackathon",
//     icon: <FaLaptopCode className="text-primary" />,
//     img: "https://s3.ap-southeast-1.amazonaws.com/files-scs-prod/public%2Fimages%2F1680145603531-Hackathon+Singapore+Header+Image.jpg",
//   },
//   // Add more events as needed
// };

// const TemplateRenderer = ({ data, eventType }) => {
//   const templateConfig = eventTypes[eventType] || eventTypes.dinner;

//   return (
//     <div className="mt-4 p-4 bg-light rounded shadow">
//       {/* Featured Image */}
//       <div className="mb-4">
//         <img
//           src={templateConfig.img}
//           alt="Event"
//           className="img-fluid rounded"
//         />
//       </div>

//       {/* Event Title */}
//       <div className="d-flex align-items-center mb-4">
//         <div className="bg-white p-2 rounded-circle shadow">
//           {templateConfig.icon}
//         </div>
//         <h2 className="ms-3 fs-3 fw-bold text-dark">
//           {templateConfig.title}
//         </h2>
//       </div>

//       {/* Event Details */}
//       <div className="row">
//         {/* Left Column */}
//         <div className="col-md-6">
//           <div className="d-flex align-items-start mb-3">
//             <FaCalendar className="me-2 text-danger" />
//             <div>
//               <h6 className="fw-bold">Event Dates</h6>
//               <p className="text-muted">{data.dates[0]}</p>
//             </div>
//           </div>
//           <div className="d-flex align-items-start mb-3">
//             <FaClock className="me-2 text-info" />
//             <div>
//               <h6 className="fw-bold">Event Time</h6>
//               <p className="text-muted">{data.times[0]}</p>
//             </div>
//           </div>
//           <div className="d-flex align-items-start mb-3">
//             <FaMapMarkerAlt className="me-2 text-success" />
//             <div>
//               <h6 className="fw-bold">Location</h6>
//               <p className="text-muted">{data.locations.join(", ")}</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="col-md-6">
//           <div className="d-flex align-items-start mb-3">
//             <FaUsers className="me-2 text-purple" />
//             <div>
//               <h6 className="fw-bold">Organizers</h6>
//               <p className="text-muted">{data.organizations.join(", ")}</p>
//             </div>
//           </div>
//           <div className="d-flex align-items-start mb-3">
//             <MdEmail className="me-2 text-warning" />
//             <div>
//               <h6 className="fw-bold">Contact Email</h6>
//               <p className="text-muted">{data.emails[0]}</p>
//             </div>
//           </div>
//           <div className="d-flex align-items-start mb-3">
//             <MdPhone className="me-2 text-success" />
//             <div>
//               <h6 className="fw-bold">Contact Number</h6>
//               <p className="text-muted">{data.phone_numbers[0]}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Featured Topics */}
//       {data.topics.length > 0 && (
//         <div className="mt-4 p-3 bg-white rounded shadow">
//           <h6 className="fw-bold">Featured Topics</h6>
//           <div className="d-flex flex-wrap">
//             {data.topics.map((topic) => (
//               <span key={topic} className="badge bg-info text-dark me-2">
//                 {topic}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateRenderer;
