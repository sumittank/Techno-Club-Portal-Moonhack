// import React, { useState } from "react";
// import "../styles/services.css";

// const Services = () => {
//   const [activeService, setActiveService] = useState("workshops");

//   const servicesContent = {
//     workshops: (
//       <div className="service-content">
//         <h2>📚 Tech Workshops</h2>
//         <p>
//           Learn cutting-edge technologies through hands-on workshops conducted by industry experts and top tech mentors.  
//         </p>
//         <ul>
//           <li>🚀 AI for Beginners - April 20, 2024</li>
//           <li>💻 React.js Crash Course - May 5, 2024</li>
//           <li>🔐 Cybersecurity Essentials - June 15, 2024</li>
//         </ul>
//         <p>
//           Our workshops cover topics from **basic programming** to **advanced machine learning** and **cloud computing**.
//         </p>
//       </div>
//     ),
//     automation: (
//       <div className="service-content">
//         <h2>🛠 Club Automation Tools</h2>
//         <p>
//           Our powerful automation tools help tech clubs operate smoothly by handling administrative tasks like event management, attendance, and communication.
//         </p>
//         <ul>
//           <li>📅 Event Scheduler – Automate event planning & reminders.</li>
//           <li>📊 Attendance Tracking – Track participation effortlessly.</li>
//           <li>📢 Automated Announcements – Notify members instantly.</li>
//         </ul>
//         <p>With our automation tools, tech clubs can focus more on **innovation and growth** rather than manual tasks.</p>
//       </div>
//     ),
//     mentorship: (
//       <div className="service-content">
//         <h2>👥 Mentorship Programs</h2>
//         <p>
//           Gain industry insights and career guidance through 1-on-1 mentorship from experienced tech professionals.
//         </p>
//         <ul>
//           <li>🔗 AI & Data Science Mentors – Learn about machine learning and AI applications.</li>
//           <li>🔗 Web & Mobile Development Mentors – Master full-stack and mobile app development.</li>
//           <li>🔗 Cybersecurity & Cloud Experts – Secure applications and explore cloud infrastructure.</li>
//         </ul>
//         <p>
//           We connect students with **top professionals** from companies like Google, Microsoft, and Amazon to provide **career advice, project guidance, and networking opportunities**.
//         </p>
//       </div>
//     ),
//     jobs: (
//       <div className="service-content">
//         <h2>💼 Job & Internship Portal</h2>
//         <p>
//           Access exclusive job and internship opportunities in top tech firms, along with resume-building and interview preparation resources.
//         </p>
//         <ul>
//           <li>🚀 Software Engineering Internship at Google</li>
//           <li>📈 Data Science Role at Microsoft</li>
//           <li>🔐 Cybersecurity Analyst at IBM</li>
//         </ul>
//         <p>
//           We also provide **mock interviews, coding challenges, and resume reviews** to help you land your dream job!
//         </p>
//       </div>
//     ),
//     competitions: (
//       <div className="service-content">
//         <h2>🏆 Tech Competitions</h2>
//         <p>
//           Participate in hackathons, coding contests, and innovation challenges to test your skills and win exciting prizes.
//         </p>
//         <ul>
//           <li>⚡ Hack The Future - May 20, 2024</li>
//           <li>📌 Google Code Jam - June 15, 2024</li>
//           <li>🏅 AI Innovation Challenge - July 5, 2024</li>
//         </ul>
//         <p>
//           Compete against **top students worldwide** and get noticed by leading tech companies.
//         </p>
//       </div>
//     ),
//     events: (
//       <div className="service-content">
//         <h2>🤝 Tech Networking Events</h2>
//         <p>
//           Expand your professional network by attending **virtual meet-ups, panel discussions, and tech summits**.
//         </p>
//         <ul>
//           <li>🎤 Tech Meet-Up - April 25, 2024</li>
//           <li>💼 Startup Pitch Event - May 10, 2024</li>
//           <li>📚 AI & ML Conference - June 1, 2024</li>
//         </ul>
//         <p>
//           Get the chance to **interact with recruiters, industry leaders, and startup founders** to boost your career opportunities.
//         </p>
//       </div>
//     ),
//   };

//   return (
//     <div className="services-container">
//       <h1>💡 Our Services</h1>
//       <p>Explore a variety of tech services designed to help you grow and succeed in your career.</p>
      
//       <div className="buttons-container">
//         <button onClick={() => setActiveService("workshops")}>Workshops</button>
//         <button onClick={() => setActiveService("automation")}>Automation</button>
//         <button onClick={() => setActiveService("mentorship")}>Mentorship</button>
//         <button onClick={() => setActiveService("jobs")}>Jobs</button>
//         <button onClick={() => setActiveService("competitions")}>Competitions</button>
//         <button onClick={() => setActiveService("events")}>Events</button>
//       </div>

//       <div className="content-display">{servicesContent[activeService]}</div>
//     </div>
//   );
// };

// export default Services;


import React, { useState } from "react";

const Services = () => {
  const [activeService, setActiveService] = useState("workshops");

  const servicesContent = {
    workshops: (
      <div className="bg-white p-6 shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-2">📚 Tech Workshops</h2>
        <p className="text-lg">
          Learn cutting-edge technologies through hands-on workshops conducted by industry experts and top tech mentors.
        </p>
        <ul className="mt-3 space-y-2">
          <li className="text-blue-700">🚀 AI for Beginners - April 20, 2024</li>
          <li className="text-blue-700">💻 React.js Crash Course - May 5, 2024</li>
          <li className="text-blue-700">🔐 Cybersecurity Essentials - June 15, 2024</li>
        </ul>
      </div>
    ),
    automation: (
      <div className="bg-white p-6 shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-2">🛠 Club Automation Tools</h2>
        <p className="text-lg">
          Our powerful automation tools help tech clubs operate smoothly by handling administrative tasks like event management, attendance, and communication.
        </p>
        <ul className="mt-3 space-y-2">
          <li className="text-blue-700">📅 Event Scheduler – Automate event planning & reminders.</li>
          <li className="text-blue-700">📊 Attendance Tracking – Track participation effortlessly.</li>
          <li className="text-blue-700">📢 Automated Announcements – Notify members instantly.</li>
        </ul>
      </div>
    ),
    mentorship: (
      <div className="bg-white p-6 shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-2">👥 Mentorship Programs</h2>
        <p className="text-lg">
          Gain industry insights and career guidance through 1-on-1 mentorship from experienced tech professionals.
        </p>
        <ul className="mt-3 space-y-2">
          <li className="text-blue-700">🔗 AI & Data Science Mentors</li>
          <li className="text-blue-700">🔗 Web & Mobile Development Mentors</li>
          <li className="text-blue-700">🔗 Cybersecurity & Cloud Experts</li>
        </ul>
      </div>
    ),
    jobs: (
      <div className="bg-white p-6 shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-2">💼 Job & Internship Portal</h2>
        <p className="text-lg">
          Access exclusive job and internship opportunities in top tech firms, along with resume-building and interview preparation resources.
        </p>
        <ul className="mt-3 space-y-2">
          <li className="text-blue-700">🚀 Software Engineering Internship at Google</li>
          <li className="text-blue-700">📈 Data Science Role at Microsoft</li>
          <li className="text-blue-700">🔐 Cybersecurity Analyst at IBM</li>
        </ul>
      </div>
    ),
    competitions: (
      <div className="bg-white p-6 shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-2">🏆 Tech Competitions</h2>
        <p className="text-lg">
          Participate in hackathons, coding contests, and innovation challenges to test your skills and win exciting prizes.
        </p>
        <ul className="mt-3 space-y-2">
          <li className="text-blue-700">⚡ Hack The Future - May 20, 2024</li>
          <li className="text-blue-700">📌 Google Code Jam - June 15, 2024</li>
          <li className="text-blue-700">🏅 AI Innovation Challenge - July 5, 2024</li>
        </ul>
      </div>
    ),
    events: (
      <div className="bg-white p-6 shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-2">🤝 Tech Networking Events</h2>
        <p className="text-lg">
          Expand your professional network by attending **virtual meet-ups, panel discussions, and tech summits**.
        </p>
        <ul className="mt-3 space-y-2">
          <li className="text-blue-700">🎤 Tech Meet-Up - April 25, 2024</li>
          <li className="text-blue-700">💼 Startup Pitch Event - May 10, 2024</li>
          <li className="text-blue-700">📚 AI & ML Conference - June 1, 2024</li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-10 px-6 rounded-lg shadow-lg">
      {/* Title Section */}
      <h1 className="text-center text-3xl font-bold text-dark">💡 Our Services</h1>
      <p className="text-center text-lg text-gray-800 mt-2">
        Explore a variety of tech services designed to help you grow and succeed in your career.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {["workshops", "automation", "mentorship", "jobs", "competitions", "events"].map((service) => (
          <button
            key={service}
            onClick={() => setActiveService(service)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeService === service
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      {/* Service Content */}
      <div className="mt-6">{servicesContent[activeService]}</div>
    </div>
  );
};

export default Services;
