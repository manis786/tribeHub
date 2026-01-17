const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
signupBtn.addEventListener('click', () => {
    window.location.href = './signup/signup.html';
});
loginBtn.addEventListener('click', () => {
    window.location.href = '../login/login.html';
});

