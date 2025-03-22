import React from "react";
import ResourceRequestForm from "../../components/ResourceRequestForm";
import AllocationDashboard from "../../components/AllocationDashboard";

function ResourceOptimizationSystem() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Resource Optimization System
      </h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <ResourceRequestForm />
      </div>

      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mt-6">
        <AllocationDashboard />
      </div>
    </div>
  );
}

export default ResourceOptimizationSystem;

