// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASEAPI,
    authDomain: process.env.REACT_APP_AUTDOM,
    projectId: "chatapp-86d62",
    storageBucket: "chatapp-86d62.appspot.com",
    messagingSenderId: "401830521055",
    appId: process.env.REACT_APP_APPID,
    measurementId: "G-KG0PVJ6JZM"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth()
export const storage = getStorage();
export const db=getFirestore()

// const analytics = getAnalytics(app);