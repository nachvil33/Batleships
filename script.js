document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');
    const logOutButton = document.getElementById('logOutButton');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userContent = document.getElementById('userContent');
    const currentUsername = document.getElementById('currentUsername');
    const saveContentButton = document.getElementById('saveContent');
    let users = {};

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm(signUpForm)) {
            const username = signUpForm.username.value;
            const password = signUpForm.password.value;
            users[username] = { password };
            signInForm.style.display = 'block';
            signUpForm.style.display = 'none';
        }
    });

    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = signInForm.signInUsername.value;
        const password = signInForm.signInPassword.value;

        if (users[username] && users[username].password === password) {
            welcomeMessage.textContent = `Welcome ${username}`;
            userContent.style.display = 'block';
            currentUsername.textContent = username;
            logOutButton.style.display = 'block';
            signInForm.style.display = 'none';
        } else {
            alert('Invalid username or password');
        }
    });

    logOutButton.addEventListener('click', function () {
        welcomeMessage.textContent = '';
        userContent.style.display = 'none';
        logOutButton.style.display = 'none';
        signInForm.style.display = 'block';
    });

    function validateForm(form) {
        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(function (input) {
            if (input.validity.valid) {
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
                isValid = false;
            }
        });

        return isValid;
    }
});
