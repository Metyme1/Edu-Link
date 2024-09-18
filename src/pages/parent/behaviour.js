import React from "react";
import Navbar from "../../../src/components/navbar"; // Import Navbar

const Behavior = () => {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="w-full p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Behavior</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">No recent behavior alerts.</p>
        </div>
      </div>
    </div>
  );
};

export default Behavior;
