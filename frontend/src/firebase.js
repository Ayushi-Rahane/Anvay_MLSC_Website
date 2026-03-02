// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPIkrViDgnr4NjMNwdGHJqocyMQrEtglU",
  authDomain: "block-city-281c6.firebaseapp.com",
  projectId: "block-city-281c6",
  storageBucket: "block-city-281c6.firebasestorage.app",
  messagingSenderId: "38983594655",
  appId: "1:38983594655:web:6884b38d477f88005728aa",
  measurementId: "G-EF95N782YC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);

export const db = getFirestore(app);