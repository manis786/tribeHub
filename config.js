import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyAMS9s7V5APakgC8es-YdxceSzGUBlkDjE",
    authDomain: "tribehub-c053c.firebaseapp.com",
    projectId: "tribehub-c053c",
    storageBucket: "tribehub-c053c.firebasestorage.app",
    messagingSenderId: "172729599814",
    appId: "1:172729599814:web:27811da8b52101672c4747",
    measurementId: "G-K8SYPKMY74",
     databaseURL: "https://tribehub-c053c-default-rtdb.firebaseio.com/"

};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const database = getDatabase(app);