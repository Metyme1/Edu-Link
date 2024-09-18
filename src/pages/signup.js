import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Ensure you're importing correctly
import { auth, db } from "../firebase"; // Ensure Firebase is set up correctly
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("User created in Auth:", user.uid); // Log the user ID

      // Construct collection path based on role
      const collectionPath = role === 'parent' ? 'parents' :
                             role === 'teacher' ? 'teachers' :
                             role === 'admin' ? 'admins' :
                             'itstaff';

      // Create user profile in Firestore
      const docRef = doc(db, collectionPath, user.uid);

      await setDoc(docRef, {
        name: name,
        email: email,
        role: role,
        children: role === 'parent' ? [] : undefined // Only for parents
      });

      console.log("Document created in Firestore:", collectionPath, user.uid);

      // Redirect to dashboard based on role
      if (role === "parent") {
        navigate("/parent-dashboard");
      } else if (role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "it-staff") {
        navigate("/it-staff-dashboard");
      }

    } catch (err) {
      setError(err.message);
      console.error("Error creating account: ", err); // Log the error for debugging
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
            <option value="it-staff">IT Staff</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
