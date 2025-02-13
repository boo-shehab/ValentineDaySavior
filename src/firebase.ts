import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyASLBbnl13WHgkGpz-hbNOf280UeovOCgk",
  authDomain: "valentine-day-savior.firebaseapp.com",
  projectId: "valentine-day-savior",
  storageBucket: "valentine-day-savior.firebasestorage.app",
  messagingSenderId: "789741157572",
  appId: "1:789741157572:web:9bf8791eb7760c59ba1d91",
  measurementId: "G-7T9NC8MJNG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);