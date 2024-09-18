// addStudent.js
const { doc, setDoc } = require("firebase/firestore");
const { db } = require("./src/firebase"); // Import Firestore setup

// Define student data
const studentData = {
  name: "John Doe",
  grade: "10",
  semesters: {
    semester1: {
      maths: 95,
      biology: 88,
      chemistry: 92,
      physics: 85,
      history: 90,
      economics: 78,
      sport: 82
    },
    semester2: {
      maths: 89,
      biology: 91,
      chemistry: 87,
      physics: 84,
      history: 88,
      economics: 85,
      sport: 80
    },
    semester3: {
      maths: 92,
      biology: 90,
      chemistry: 93,
      physics: 88,
      history: 85,
      economics: 80,
      sport: 85
    },
    semester4: {
      maths: 87,
      biology: 90,
      chemistry: 85,
      physics: 88,
      history: 89,
      economics: 92,
      sport: 83
    }
  }
};

// Function to add student to Firestore
const addStudent = async () => {
  try {
    // Create a new document in the "students" collection with a unique ID
    await setDoc(doc(db, "students", "stud12"), studentData); // You can replace "stud12" with a dynamic ID if needed
    console.log("Student added successfully!");
  } catch (err) {
    console.error("Error adding student: ", err);
  }
};

addStudent(); // Call the function to add the student
