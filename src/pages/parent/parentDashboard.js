// src/pages/ParentDashboard.js
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Firebase setup
import Navbar from "../../../src/components/navbar"; // Import Navbar

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const parentRef = doc(db, "parents", user.uid);
        const parentSnap = await getDoc(parentRef);
        if (parentSnap.exists()) {
          const parentData = parentSnap.data();
          const childrenIds = parentData.children;

          const childrenDataPromises = childrenIds.map(async (studentId) => {
            const studentRef = doc(db, "students", studentId);
            const studentSnap = await getDoc(studentRef);
            if (studentSnap.exists()) {
              return { id: studentId, ...studentSnap.data() };
            } else {
              console.error(`No student found with ID: ${studentId}`);
              return null;
            }
          });

          const childrenData = await Promise.all(childrenDataPromises);
          setChildren(childrenData.filter((child) => child !== null));
        } else {
          console.error("No parent found.");
        }
      } catch (err) {
        console.error("Error fetching children:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [user]);

  return (
    <div className="min-h-screen flex">
      {/* Navigation Bar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="w-3/4 p-6 bg-gray-100">
        {loading ? (
          <p className="text-blue-600 text-center">Loading data...</p>
        ) : children.length > 0 ? (
          <div>
            {children.map((child) => (
              <div key={child.id}>
                <h1 className="text-3xl font-bold mb-4">
                  Welcome, Parent of {child.name}
                </h1>

                {/* Grades Summary */}
                <div id="grades" className="bg-white p-4 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold">Grades Summary</h2>
                  <p className="mt-2">
                    <strong>Overall Average:</strong> {/* Add logic to calculate */}
                    <br />
                    <strong>Class Rank:</strong> {/* Add rank if available */}
                    <br />
                    <strong>Progress Report:</strong> {/* Add progress details */}
                  </p>
                </div>

                {/* Behavior Alerts */}
                <div id="behavior" className="bg-white p-4 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold">Behavior Alerts</h2>
                  <p>No recent behavior alerts.</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center">No children found linked to this parent.</p>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
