import { ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "../config.js"; // Aapki config file

const currentUserId = localStorage.getItem("user_uid");
const userName = localStorage.getItem("userName"); 

if (!currentUserId) {
    window.location.href = "../login/login.html";
}

const postA = document.getElementById('postA');       
const postInput = document.getElementById('postinp'); 
const postNowBtn = document.getElementById('postNow'); 
const userGreet = document.querySelector('.wlcm'); 

postInput.style.display = "none";
postNowBtn.style.display = "none";

if(userName) {
    userGreet.innerText = `Welcome ${userName}!`;
}
