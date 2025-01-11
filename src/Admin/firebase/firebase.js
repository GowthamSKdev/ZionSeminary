import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDihIV51M3lICX6dSKFFCU-wNdEyCO6SRw",
  authDomain: "zions-788b3.firebaseapp.com",
  projectId: "zions-788b3",
  storageBucket: "zions-788b3.appspot.com",
  messagingSenderId: "417678721325",
  appId: "1:417678721325:web:052612c91c66cd0d8e53a4",
  measurementId: "G-P5N0KBS3F1",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app); // Firestore database
const storage = getStorage(app); // Firebase storage
const auth = getAuth(app); // Firebase auth

// Initialize Google Auth provider
const googleProvider = new GoogleAuthProvider();

// Export everything needed for authentication and database operations
export { db, storage, auth, googleProvider, signInWithPopup };
