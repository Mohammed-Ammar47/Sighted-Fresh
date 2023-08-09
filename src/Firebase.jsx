// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA288uJs4UKBhoFfZ_FfAGIl51wirtgYuM",
  authDomain: "sighted-fresh.firebaseapp.com",
  projectId: "sighted-fresh",
  storageBucket: "sighted-fresh.appspot.com",
  messagingSenderId: "107738643775",
  appId: "1:107738643775:web:6449eab2f0980cd944e78a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
