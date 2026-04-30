// Import the functions you need from the SDKs you need
import { initializeApp, get} from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuIy19IWM9qsCHr9_HRLNuPahLrIWcOFw",
  authDomain: "web-cloud-ynov-projet-eliel.firebaseapp.com",
  projectId: "web-cloud-ynov-projet-eliel",
  storageBucket: "web-cloud-ynov-projet-eliel.firebasestorage.app",
  messagingSenderId: "29869746912",
  appId: "1:29869746912:web:235fa94e8a9b3b7d3ffe85"
};

// Initialize Firebase modular SDK
export const app = initializeApp(firebaseConfig);

// Initialize Firebase compat SDK for expo-firebase-recaptcha
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebaseConfig };
