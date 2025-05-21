// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTiauwq0LkW-Grn8sI9IviGrVu9sxMqx4",
  authDomain: "blocks-e078e.firebaseapp.com",
  projectId: "blocks-e078e",
  storageBucket: "blocks-e078e.firebasestorage.app",
  messagingSenderId: "430286614651",
  appId: "1:430286614651:web:38aa5830607d50f32632de",
  measurementId: "G-15L701C9VT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
console.log("Firebase initialized");

export { app, analytics, database };
