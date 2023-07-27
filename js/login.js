/**
 * The key used to store the current user in localStorage.
 */
const CURRENT_USER_KEY = 'currentUser';

/**
 * The current user, obtained from localStorage, or an empty array if no user is found.
 */
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || [];

/**
 * An array containing the current user when they request to change their password.
 */
let currentUserForNewPassword = [];


/**
 * Initializes the app by rendering the login form after a 300ms delay.
 */
async function init() {
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
    await loadUsers();
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
    document.title = 'Join | Sign Up';
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
    let card = document.getElementById('loginForm');
    card.innerHTML = signUpTemplate();
}


/**
 * Changes the view to the new password form
 */
function newPassword() {
    document.title = 'Join | Reset Password';
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
    let card = document.getElementById('loginForm');
    card.innerHTML = newPasswordTemplate();
}


/**
 * Changes the view to the reset password form
 */
function resetPassword() {
    document.title = 'Join | Reset Password';
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
    let card = document.getElementById('loginForm');
    let email = document.getElementById('resetEmail').value;
    let user = users.find(user => user.email === email);

    if (!user) {
        showFailureBanner('User not found!');
        return;
    }

    currentUserForNewPassword.push(user);
    card.innerHTML = resetPasswordTemplate();
}


/**
 * Updates the user's password and saves it to the database
 */
async function updatePassword() {
    let newPassword = document.getElementById('passwordReset').value;
    let newPasswordConfirmation = document.getElementById('passwordResetConfirm').value;

    if (newPassword !== newPasswordConfirmation) {
        showFailureBanner(`Passwords dont match!<br>Try again`);
    }

    const userIndex = users.findIndex(user => user.email === currentUserForNewPassword[0].email);
    if (userIndex > -1) {
        users[userIndex].password = newPassword;
        await setItem('users', JSON.stringify(users));
        currentUserForNewPassword = [];
        showSuccessBanner('Password resetted');
        renderLogin();
    }
}


/**
 * Logs the user into the application.
 */
function login() {
    let loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    let email = document.getElementById('emailInput').value;
    let password = document.getElementById('passwordInput').value;
    let user = users.find((user) => user.email === email);
    if (!user) {
        showFailureBanner('User not found!');
        loginBtn.disabled = false;
        return;
    }
    if (password !== user.password) {
        showFailureBanner('Invalid password!');
        loginBtn.disabled = false;
        return;
    }
    createCurrentUser(user);
    forwardToMainPage();
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