import React from "react";
import Navbar from "../../../src/components/navbar"; // Import Navbar

const Attendance = () => {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="w-full p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Attendance</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Attendance for Term 1:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Math: 95%</li>
            <li>English: 98%</li>
            <li>Science: 100%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
