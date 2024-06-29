// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKuiw7oVB4W7Ic_ZtGUUFsA7lFplj6MgE",
  authDomain: "nesara-flix-41911.firebaseapp.com",
  projectId: "nesara-flix-41911",
  storageBucket: "nesara-flix-41911.appspot.com",
  messagingSenderId: "332117578927",
  appId: "1:332117578927:web:1cff05f922004f54c7b05a",
  measurementId: "G-Q7B1RSMND2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
