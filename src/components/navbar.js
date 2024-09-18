// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-1/6 bg-[#44C079] text-white p-4 h-screen">
      <nav>
        <ul className="space-y-4">
          <li>
            <button 
              onClick={() => navigate("/parent-dashboard")} 
              className="block text-lg font-semibold text-left w-full"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/grades")} 
              className="block text-lg font-semibold text-left w-full"
            >
              Grades
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/Behavior")} 
              className="block text-lg font-semibold text-left w-full"
            >
              Behavior
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/Attendance")} 
              className="block text-lg font-semibold text-left w-full"
            >
              Attendance
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/messages")} 
              className="block text-lg font-semibold text-left w-full"
            >
              Messages
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/calendar")} 
              className="block text-lg font-semibold text-left w-full"
            >
              Calendar
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/payment")} 
              className="block text-lg font-semibold text-left w-full"
            >
              Payments
            </button>
          </li>
      
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
