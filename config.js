import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMS9s7V5APakgC8es-YdxceSzGUBlkDjE",
    authDomain: "tribehub-c053c.firebaseapp.com",
    projectId: "tribehub-c053c",
    storageBucket: "tribehub-c053c.firebasestorage.app",
    messagingSenderId: "172729599814",
    appId: "1:172729599814:web:27811da8b52101672c4747",
    measurementId: "G-K8SYPKMY74"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);