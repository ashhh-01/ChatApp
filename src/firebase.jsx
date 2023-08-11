// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASEAPI}`,
  authDomain: `${import.meta.env.VITE_AUTDOM}`,
  projectId: "chatapp-86d62",
  storageBucket: "chatapp-86d62.appspot.com",
  messagingSenderId: "401830521055",
  appId: `${import.meta.env.VITE_APPID}`,
  measurementId: "G-KG0PVJ6JZM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// const analytics = getAnalytics(app);
