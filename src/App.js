import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "../src/pages/signup";
import Login from "../src/pages/login";
import ParentDashboard from "../src/pages/parent/parentDashboard";
import TeacherDashboard from "../src/pages/teacher/dashboard";
import AdminDashboard from "../src/pages/admin/dashboard";
import ITStaffDashboard from "../src/pages/itstaff/dashboard";
import Grades from "../src/pages/parent/Grade"; 
import Payments from "./pages/parent/payment";
import Attendance from "./pages/parent/attendance";
import Messages from "./pages/parent/message";
import Behavior from "./pages/parent/behaviour";
import Calendar from "./pages/parent/calendar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route is the login page */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/it-staff-dashboard" element={<ITStaffDashboard />} />
        <Route path="/grades" element={<Grades />} />  {/* Add route for Grades */}
        <Route path="/payment" element={<Payments />} />  {/* Add route for Grades */} 
        <Route path="/Attendance" element={<Attendance/>} />  {/* Add route for Grades */}
        <Route path="/messages" element={<Messages />} />  {/* Add route for Grades */}
        <Route path="/Behavior" element={<Behavior />} />  {/* Add route for Grades */}
        <Route path="/calendar" element={<Calendar />} />  {/* Add route for Grades */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
