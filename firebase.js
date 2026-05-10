// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3SEQVpiIdGszJ-1N-wQL9s7Oc6l_gY74",
  authDomain: "truqorun-au.firebaseapp.com",
  projectId: "truqorun-au",
  storageBucket: "truqorun-au.firebasestorage.app",
  messagingSenderId: "219336322891",
  appId: "1:219336322891:web:dea66be3a0b748a775c2ce",
  measurementId: "G-LBCL2FNY27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
