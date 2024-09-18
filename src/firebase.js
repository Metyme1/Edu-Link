
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCElEh2kRVZsJaXk2X6qtwAuAABGUspnRs",
  authDomain: "edulink-mvp.firebaseapp.com",
  projectId: "edulink-mvp",
  storageBucket: "edulink-mvp.appspot.com",
  messagingSenderId: "475641597817",
  appId: "1:475641597817:web:0c319226075604739329a8",
  measurementId: "G-V5RMHNN76M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  // Firestore DB
export const auth = getAuth(app); 