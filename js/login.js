/**
 * The key used to store the current user in localStorage.
 */
const CURRENT_USER_KEY = 'currentUser';


/**
 * The current user, obtained from localStorage, or an empty array if no user is found.
 */
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || [];


/**
 * Initializes the app by rendering the login form after a 300ms delay.
 */
function init() {
    setTimeout(function () {
        renderLogin()
    }, 300);
}


/**
 * Renders the login form, loading user data beforehand.
 */
async function renderLogin() {
    document.title = 'Join | Log in';
    let card = document.getElementById('loginForm');
    card.innerHTML = loginTemplate();
    let header = document.getElementById('loginHeaderRight');
    header.classList.remove("d-none");
}


/**
 * Changes the password input field icon when the user types or clears their password.
 */
function changePWSymbol(id) {
    let parentDiv = document.getElementById(`${id}`);
    let input = parentDiv.querySelector("input");
    let symbol = parentDiv.querySelector("img");
    if (input.value == "") {
        symbol.src = "../assets/icons/password.svg";
        symbol.classList.remove("pointer", "opa-05");
        input.type = "password";
    } else if ((input.type = "password")) {
        symbol.src = "../assets/icons/privacy.png";
        symbol.classList.add("pointer", "opa-05");
    } else {
        symbol.src = "../assets/icons/visibility.png";
        symbol.classList.add("pointer", "opa-05");
    }
}


/**
 * Toggles the visibility of the password input field.
 */
function showPassword(id) {
    let parentDiv = document.getElementById(`${id}`);
    let input = parentDiv.querySelector("input");
    let symbol = parentDiv.querySelector("img");
    if (input.value.length > 0) {
        if (input.type === "password") {
            input.type = "text";
            symbol.src = "../assets/icons/visibility.png";
        } else {
            input.type = "password";
            symbol.src = "../assets/icons/privacy.png";
        }
    }
}


/**
 * Changes the view to the sign up form
 */
function signUp() {
    adjustHeader('Join | Sign Up');
    let card = document.getElementById('loginForm');
    card.innerHTML = signUpTemplate();
}


/**
 * Changes the view to the new password form
 */
function newPassword() {
    adjustHeader('Join | Reset Password');
    let card = document.getElementById('loginForm');
    card.innerHTML = newPasswordTemplate();
}


/**
 * Sends a password reset request to the server.
 */
async function resetPassword() {
    disableBtn('sendMailBtn');
    const email = document.getElementById('resetEmail').value;
    const resetPasswordUrl = API + '/api/password_reset/';

    try {
        const response = await fetch(resetPasswordUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email }),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            showFailureBanner('User not found!');
        }

        showSuccessBanner('Link to reset password sent!');
        setTimeout(renderLogin, 500);
    } catch (error) {
        showFailureBanner('An unexpected error occurred. Please try again.');
        enableBtn('sendMailBtn');
    }
}


/**
 * Logs the user into the application.
 * @throws {Error} If an unexpected error occurs during login.
 */
async function login() {
    disableBtn('loginBtn');
    let email = document.getElementById('emailInput').value;
    let password = document.getElementById('passwordInput').value;
    let loginData = {
        "email": email,
        "password": password
    };
    try {
        debugger
        let response = await fetch(API + '/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            let user = await response.json();
            localStorage.setItem('token', user.token);
            createCurrentUser(user);
            forwardToMainPage();
        } else {
            const errorMessage = await response.json();
            handleLoginError(errorMessage.error);
        }
    } catch (error) {
        showFailureBanner('An unexpected error occurred. Please try again.');
    } finally {
        enableBtn('loginBtn');
    }
}


/**
 * Handles login errors and displays appropriate banners.
 * @param {string} error - The error message received from the server.
 */
function handleLoginError(error) {
    if (error === 'Email does not exist.') {
        showFailureBanner('User not found!');
    } else if (error === 'Invalid password.') {
        showFailureBanner('Invalid password!');
    } else {
        showFailureBanner('An unexpected error occurred. Please try again.');
    }
    enableBtn('loginBtn');
}


/**
 * Handles the guest login.
 */
async function guestLogin() {
    let guestLoginData = {
        "email": "guestlogin@email.com",
        "password": "Guest12345",
        "token": "c0a9adba3ffd550a7ada34339827c036719ce385"
    };

    try {
        let response = await fetch(API + '/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guestLoginData),
        });

        if (response.ok) {
            let user = await response.json();
            createCurrentUser(user);
            forwardToMainPage();
        } else {
            showFailureBanner('Error, please try again');
        }
    } catch (error) {
        showFailureBanner('Error, please try again');
    }
}


/**
 * Creates a new user session.
 * @param {Object} user - The user object.
 */
function createCurrentUser(user) {
    currentUser.push(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
}


/**
 * Redirects the user to the main page of the application.
 */
function forwardToMainPage() {
    window.location.href = "../html/mainpage.html";
}


/**
 * Logs the user out of the application.
 */
function logOut() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = "../index.html";
}


/**
 * hides the header and adjusts the document title
 */
function adjustHeader(text) {
    document.title = `${text}`;
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
}


/**
 * disables a specific button
 * @param {*string} btnID - Id of button
 */
function disableBtn(btnID) {
    let button = document.getElementById(`${btnID}`);
    button.disabled = true;
}


/**
 * enables a specific button
 * @param {*string} btnID - Id of button
 */
function enableBtn(btnID) {
    let button = document.getElementById(`${btnID}`);
    button.disabled = false;
}