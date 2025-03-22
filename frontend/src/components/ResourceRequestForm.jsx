import React, { useState } from "react";

const ResourceRequestForm = () => {
  const [clubName, setClubName] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // // 🔽 Static club options from your database
  // const clubs = ["IEEE_001", "ACM", "GDG", "STIC", "CSI"];

  // // 🔽 Static resource options from your database
  // const resources = ["Venue", "Project Funding", "Lab Equipment", "Robotics Kits", "Cloud Servers"];

  const clubs = ["IEEE_001", "ACM_002", "GDG_003", "STIC_004", "CSI_005"];
  const resources = ["resource_venue", "resource_funding", "resource_lab", "resource_kits", "resource_servers"];


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clubName || !resourceName) {
      setResponseMessage("Please select both a club and a resource.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/allocate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ club_name: clubName, resource_name: resourceName }),
    });

    const data = await response.json();
    setResponseMessage(data.message);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Request Resource Allocation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🔽 Club Name Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">Club Name:</label>
          <select
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Club</option>
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>

        {/* 🔽 Resource Name Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">Resource Name:</label>
          <select
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Resource</option>
            {resources.map((resource) => (
              <option key={resource} value={resource}>
                {resource}
              </option>
            ))}
          </select>
        </div>

        {/* 🔽 Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Request
        </button>
      </form>

      {/* 🔽 Response Message */}
      {responseMessage && (
        <p className="mt-4 text-center text-lg font-medium text-green-600">
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default ResourceRequestForm;
