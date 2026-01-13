import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { app } from "../config.js";
const auth = getAuth(app);

const jumpin = document.getElementById("jumpin");

const loginuser = async () => {
    const useremail = document.getElementById("loginemail").value;
    const userpassword = document.getElementById("userpassword").value;
    console.log("Email", useremail)

    signInWithEmailAndPassword(auth, useremail, userpassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("USer", user)
            if (user.emailVerified) {
                localStorage.setItem("user_uid", user.uid);
                window.location = "../../dashboard/dashboard.html"
            } else {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert("Please verify your email.")
                    });
            }


            console.log("User logged in with UID:", user.uid);

        })
}
jumpin.addEventListener("click", loginuser)