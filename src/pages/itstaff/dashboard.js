// src/pages/ItStaffDashboard.js
import React, { useState, useEffect } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming Firebase setup is in firebase.js

const ItStaffDashboard = () => {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    // Fetch parents and students from Firestore
    const fetchData = async () => {
      const parentsSnap = await getDocs(collection(db, "parents"));
      const studentsSnap = await getDocs(collection(db, "students"));

      setParents(parentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setStudents(studentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const linkParentToStudents = async () => {
    const parentDoc = doc(db, "parents", selectedParent);
    const studentsToLink = selectedStudents.map(studentId => studentId);

    try {
      // Update the parent document with the list of children
      await updateDoc(parentDoc, {
        children: studentsToLink
      });
      alert("Parent linked to children successfully");
    } catch (err) {
      console.error("Error linking parent to children:", err);
      alert("Error linking parent to children");
    }
  };

  return (
    <div>
      <h1>IT Staff Dashboard</h1>
      <h2>Link Parent to Children</h2>

      <div>
        <label>Select Parent:</label>
        <select onChange={(e) => setSelectedParent(e.target.value)} value={selectedParent}>
          <option value="">Select Parent</option>
          {parents.map((parent) => (
            <option key={parent.id} value={parent.id}>
              {parent.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Children:</label>
        <select multiple onChange={(e) => setSelectedStudents([...e.target.selectedOptions].map(option => option.value))}>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={linkParentToStudents}>Link Parent to Children</button>
    </div>
  );
};

export default ItStaffDashboard;
