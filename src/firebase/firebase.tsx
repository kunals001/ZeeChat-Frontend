// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "zeechat-f7b9b.firebaseapp.com",
  projectId: "zeechat-f7b9b",
  storageBucket: "zeechat-f7b9b.firebasestorage.app",
  messagingSenderId: "956115424562",
  appId: "1:956115424562:web:6cf3f11d94bc94a747b32b"
};


const app = initializeApp(firebaseConfig);