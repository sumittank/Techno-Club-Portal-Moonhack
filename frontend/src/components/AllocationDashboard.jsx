import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllocationDashboard = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/resource-data")
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  const chartData = {
    labels: resources.map((r) => r.resource_name),
    datasets: [
      {
        label: "Available Units",
        data: resources.map((r) => r.available_units),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Total Units",
        data: resources.map((r) => r.total_units),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold text-center text-primary mb-4">
      Resource Allocation Dashboard
    </h2>

    {/* ✅ Fix "Canvas already in use" error */}
    <div className="overflow-x-auto">
      <Bar key={JSON.stringify(chartData)} data={chartData} width={1000} height={500} />
    </div>
  </div>
  );
};

export default AllocationDashboard;
