import React from "react";
import Navbar from "../../../src/components/navbar"; // Import Navbar

const Messages = () => {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="w-full p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">You have no new messages.</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
