import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { app } from "../config.js";
const auth = getAuth(app);
const database = getDatabase(app);
const fname = document.getElementById("fname");
const lastname = document.getElementById("lastname");
const useremail = document.getElementById("useremail");
const userpassword = document.getElementById("userpassword");
const password2 = document.getElementById("password2");
const createAccountBtn = document.getElementById("createAccountBtn");
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetForm);
createAccountBtn.addEventListener("click", validateForm);
function validateForm() {
  if (!fname.value || !lastname.value || !useremail.value || !userpassword.value || !password2.value) {
    Swal.fire({
      title: "Opps!",
      text: "You have left some fields empty.",
      icon: "error",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    });
    return;
  }
  if (userpassword.value !== password2.value) {
    Swal.fire({
      title: "Password Mismatch!",
      text: "Please ensure both passwords match.",
      icon: "warning",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    });
    return;
  }
  submittForm();
}
async function submittForm() {
  const signupEmail = useremail.value;
  const signupPassword = userpassword.value;
  const firstName = fname.value;
  const lastName = lastname.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
    const user = userCredential.user;
    const userId = user.uid;

    console.log("User created with UID:", userId);
    await set(ref(database, 'users/' + userId), {
      firstName: firstName,
      lastName: lastName,
      fullname: firstName + " " + lastName,
      email: signupEmail,
      createdAt: new Date().toISOString(),
      profileStatus: "active"
    });
    await sendEmailVerification(user);
    Swal.fire({
      title: "Account Created!",
      text: "User profile saved. Please verify your email.",
      icon: "success",
      toast: true,
      position: "top-end",
      timer: 4000,
      showConfirmButton: false
    });
    resetForm();
  } catch (error) {
    console.error("Error:", error.code, error.message);
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    });
  }
}
function resetForm() {
  fname.value = "";
  lastname.value = "";
  useremail.value = "";
  userpassword.value = "";
  password2.value = "";
}