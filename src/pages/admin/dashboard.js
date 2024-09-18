// src/pages/AdminDashboard.js
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome, Admin</h1>
      <h2>System Management</h2>
      <ul>
        <li>Manage Users (Teachers, Parents, IT Staff)</li>
        <li>Manage School Policies</li>
        <li>View Analytics and Reports</li>
        <li>Manage Resources (Books, Lab Equipment)</li>
        {/* Add more admin management functionalities */}
      </ul>
    </div>
  );
};

export default AdminDashboard;
