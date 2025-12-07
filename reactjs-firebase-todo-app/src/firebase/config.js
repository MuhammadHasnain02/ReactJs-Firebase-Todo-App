import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCNHM-gAt7lUnI5HuBCZPXENKa_h3ysr8",
    authDomain: "todo-application-c1854.firebaseapp.com",
    projectId: "todo-application-c1854",
    storageBucket: "todo-application-c1854.firebasestorage.app",
    messagingSenderId: "1091653968742",
    appId: "1:1091653968742:web:414297fd0c9a784adb1ea7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();