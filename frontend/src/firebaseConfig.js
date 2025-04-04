// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"; // 🔥
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC-rABiAKTEJIJpEnthiKs_I1rv3lCsPo",
  authDomain: "flask-vite.firebaseapp.com",
  projectId: "flask-vite",
  storageBucket: "flask-vite.firebasestorage.app",
  messagingSenderId: "791557319002",
  appId: "1:791557319002:web:a2d8e9579747b7fb436b63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export const db = getFirestore(app); 