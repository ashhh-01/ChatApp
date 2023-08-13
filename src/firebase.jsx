// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASEAPI}`|| process.env.VITE_FIREBASEAPI|| process.env.REACT_APP_FIREBASEAPI,
  appId: `${import.meta.env.VITE_APPID}`|| process.env.VITE_APPID|| process.env.REACT_APP_APPID,
  authDomain: `${import.meta.env.VITE_AUTDOM}`|| process.env.VITE_AUTDOM || process.env.REACT_APP_AUTDOM,
  projectId: "chatapp-86d62",
  storageBucket: "chatapp-86d62.appspot.com",
  messagingSenderId: "401830521055",
  measurementId: "G-KG0PVJ6JZM",
  //   apiKey:process.env.VITE_FIREBASEAPI,
  // authDomain:process.env.VITE_AUTDOM,
  // appId:process.env.VITE_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// const analytics = getAnalytics(app);
