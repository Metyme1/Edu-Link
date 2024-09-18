import React from "react";
import Navbar from "../../../src/components/navbar"; // Import Navbar

const Calendar = () => {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="w-full p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">School Calendar</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Upcoming School Events:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Parent-Teacher Conference: November 3, 2024</li>
            <li>Mid-Term Break: December 10, 2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
