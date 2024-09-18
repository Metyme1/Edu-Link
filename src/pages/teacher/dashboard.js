// src/pages/TeacherDashboard.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";

const TeacherDashboard = () => {
  const [sections, setSections] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sectionsSnap = await getDocs(collection(db, "sections"));
        setSections(sectionsSnap.docs.map(doc => doc.data()));
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };
    fetchSections();
  }, [user]);

  return (
    <div>
      <h1>Welcome, Teacher</h1>
      <h2>Your Sections</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.SectionID}>{section.SectionName} - Grade {section.GradeLevel}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
