// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate, Link } from "react-router-dom";
// import { auth, db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore"; // Firebase Firestore

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Log for debugging purposes
//       console.log("User logged in:", user.uid);

//       // Fetch role from Firestore
//       const parentRef = doc(db, "parents", user.uid);
//       const teacherRef = doc(db, "teachers", user.uid);
//       const adminRef = doc(db, "admins", user.uid);
//       const itStaffRef = doc(db, "itstaff", user.uid);

//       // Fetch documents from Firestore
//       const parentSnap = await getDoc(parentRef);
//       const teacherSnap = await getDoc(teacherRef);
//       const adminSnap = await getDoc(adminRef);
//       const itStaffSnap = await getDoc(itStaffRef);

//       // Log the documents retrieved for debugging
//       console.log("Parent doc exists:", parentSnap.exists());
//       console.log("Teacher doc exists:", teacherSnap.exists());
//       console.log("Admin doc exists:", adminSnap.exists());
//       console.log("IT Staff doc exists:", itStaffSnap.exists());

//       // Redirect based on role
//       if (parentSnap.exists()) {
//         console.log("Redirecting to parent dashboard...");
//         navigate("/parent-dashboard");
//       } else if (teacherSnap.exists()) {
//         console.log("Redirecting to teacher dashboard...");
//         navigate("/teacher-dashboard");
//       } else if (adminSnap.exists()) {
//         console.log("Redirecting to admin dashboard...");
//         navigate("/admin-dashboard");
//       } else if (itStaffSnap.exists()) {
//         console.log("Redirecting to IT staff dashboard...");
//         navigate("/it-staff-dashboard");
//       } else {
//         setError("No role assigned to this user");
//         console.error("No role found for this user.");
//       }
//     } catch (err) {
//       setError("Failed to login. Check your email and password.");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-semibold mb-1">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
//         >
//           Login
//         </button>
        
//         <p className="mt-4 text-center text-sm">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-indigo-600 hover:underline">
//             Sign up here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore"; // Firebase Firestore

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user.uid);
      navigate("/parent-dashboard"); // Adjust this based on user role
    } catch (err) {
      setError("Failed to login. Check your email and password.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#44C079]">Login</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#44C079]"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#44C079]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#44C079] text-white py-2 rounded-md hover:bg-[#3ba668] transition-colors duration-300"
        >
          Login
        </button>
        
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#44C079] hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
