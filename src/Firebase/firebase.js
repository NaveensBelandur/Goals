// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDVP6PemYd1bSJF2LK77eu3rKzb46gtnt4",
  authDomain: "goalfinal-dd30a.firebaseapp.com",
  projectId: "goalfinal-dd30a",
  storageBucket: "goalfinal-dd30a.appspot.com",
  messagingSenderId: "980769186566",
  appId: "1:980769186566:web:ed3d23e27f2e713269f487"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
