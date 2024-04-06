const registrationForm = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (username.length < 6) {
        usernameError.textContent = 'Username must be at least 6 characters';
    }

    if (!isValidEmail(email)) {
        emailError.textContent = 'Invalid email format';
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
    } else if (!(/[A-Z]/.test(password) && /\d/.test(password))) {
        passwordError.textContent = 'Password must contain at least one uppercase letter and one number';
    }

    if (username.length >= 6 && isValidEmail(email) && password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
        alert('Registration successful!');
        registrationForm.reset();
    }
});

function clearErrors() {
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
