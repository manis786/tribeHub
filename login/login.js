import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { app } from "../config.js";
const auth = getAuth(app);
const database = getDatabase(app);
const jumpin = document.getElementById("jumpin");
window.loginuser = async (event) => {
    if (event) event.preventDefault();
    const useremail = document.getElementById("loginemail").value.trim();
    const userpassword = document.getElementById("userpassword").value.trim();
    if (!useremail || !userpassword) {
        return Swal.fire({
            icon: 'warning',
            title: 'Oye!',
            posistion: 'top-left',
            toast: true,
            text: 'Please Fill all the Feilds.',
            confirmButtonColor: '#28a745'
        });
    }
    jumpin.disabled = true;
    jumpin.innerText = "Checking...";
    try {
        const userCredential = await signInWithEmailAndPassword(auth, useremail, userpassword);
        const user = userCredential.user;
        if (user.emailVerified) {
            localStorage.setItem("user_uid", user.uid);
            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);
            let name = "User";
            if (snapshot.exists()) {
                name = snapshot.val().fullname || "User";
            }
            localStorage.setItem("userName", name);

            Swal.fire({
                icon: 'success',
                title: 'Jee Aayan Nu!',
                text: `Welcome, ${name}!`,
                position: 'top-end',
                toast: true,
                timer: 2000,
                showConfirmButton: false,
                 showprgessBar: true
            }).then(() => {
                window.location.href = "../../dashboard/dashboard.html";
            });
        } else {
            await sendEmailVerification(auth.currentUser);
            Swal.fire({
                icon: 'info',
                title: 'Email Validation Pending',
                text: 'Your Email is not verified. A verification link has been sent to your email address. Please verify and try logging in again.',
                confirmButtonColor: '#28a745',
                timer: 5000,
                showprgessBar: true
            });
            jumpin.disabled = false;
            jumpin.innerText = "Login";
        }
    } catch (error) {
        jumpin.disabled = false;
        jumpin.innerText = "Login";

        let msg = "User Login Failed. Try Again.";
        if (error.code === "auth/invalid-credential") {
            msg = "Invalid Credentials.";
        } else if (error.code === "auth/user-not-found") {
            msg = "No Such User with this Email ID.";
        }
        Swal.fire({
            icon: 'error',
            title: 'Hey!!!!!',
            text: msg,
            position: 'top-end',
            toast: true,
            confirmButtonColor: '#28a745',
            timer: 3000,
            showConfirmButton: false,
             showprgessBar: true
        });
    }
};
if (jumpin) {
    jumpin.addEventListener("click", window.loginuser);
}