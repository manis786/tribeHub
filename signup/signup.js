const resetBtn = document.getElementById("resetBtn");
const createAccountBtn = document.getElementById("createAccountBtn");
const fname = document.getElementById("fname");
const lastname = document.getElementById("lastname");
const useremail = document.getElementById("useremail");
const userpassword = document.getElementById("userpassword");
const password2 = document.getElementById("password2");
resetBtn.addEventListener("click", () => {
    fname.value = ""
    lastname.value = ""
    useremail.value = ""
    userpassword.value = ""
    password2.value = ""
})
createAccountBtn.addEventListener("click", () => {
    if (userpassword.value !== password2.value) {
        alert("Passwords do not match");
        fname.value = ""
        lastname.value = ""
        useremail.value = ""
        userpassword.value = ""
        password2.value = ""
        return;
    }
    else {
        alert("Account created successfully");
    }
    fname.value = ""
    lastname.value = ""
    useremail.value = ""
    userpassword.value = ""
    password2.value = ""
})