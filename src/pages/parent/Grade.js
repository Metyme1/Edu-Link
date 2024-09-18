import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Grades = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0); // to track the current semester
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

  const handleNextSemester = () => {
    setCurrentSemesterIndex((prevIndex) =>
      prevIndex + 1 >= Object.keys(children[0]?.semesters || {}).length ? 0 : prevIndex + 1
    );
  };

  const handlePreviousSemester = () => {
    setCurrentSemesterIndex((prevIndex) =>
      prevIndex - 1 < 0 ? Object.keys(children[0]?.semesters || {}).length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Call Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="w-4/5 p-6 bg-gray-100">
        {loading ? (
          <p className="text-blue-600 text-center">Loading data...</p>
        ) : children.length > 0 ? (
          <div>
            {children.map((child) => (
              <div key={child.id}>
                <h1 className="text-3xl font-bold mb-4 text-center">Grades for {child.name}</h1>

                {/* Semester Navigation */}
                <div className="flex justify-between items-center mb-4">
                  <FaChevronLeft
                    className="cursor-pointer text-2xl"
                    onClick={handlePreviousSemester}
                  />
                  <h2 className="text-xl font-semibold">
                    {Object.keys(child.semesters)[currentSemesterIndex].toUpperCase()}
                  </h2>
                  <FaChevronRight
                    className="cursor-pointer text-2xl"
                    onClick={handleNextSemester}
                  />
                </div>

                {/* Grades Table */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2">Subject</th>
                        <th className="text-right p-2">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        child.semesters[
                          Object.keys(child.semesters)[currentSemesterIndex]
                        ]
                      ).map(([subject, score]) => (
                        <tr key={subject}>
                          <td className="p-2">{subject}</td>
                          <td className="p-2 text-right">{score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Grades;