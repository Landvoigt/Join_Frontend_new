/**
 * Whether or not the password input field is visible.
 * @type {boolean}
 */
let inputPass = false;

/**
 * The key used to store the current user in localStorage.
 * @type {string}
 */
const CURRENT_USER_KEY = 'currentUser';

/**
 * The current user, obtained from localStorage, or an empty array if no user is found.
 * @type {Array.<Object>}
 */
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || [];

/**
 * An array containing the current user when they request to change their password.
 * @type {Array.<Object>}
 */
let currentUserForNewPassword = [];

/**
 * Initializes the app by rendering the login form after a 300ms delay.
 * @async
 */
async function init() {
  setTimeout(function() {
    renderLogin()
  }, 300);
}

/**
 * Renders the login form, loading user data beforehand.
 * @async
 */
async function renderLogin() {
  let card = document.getElementById('loginForm');
  card.innerHTML = loginTemplate();
  let header = document.getElementById('loginHeaderRight');
  header.classList.remove("d-none");
  await loadUsers();
}

/**
 * Changes the password input field icon when the user types or clears their password.
 * @async
 */
async function changePWSymbol() {
  let InputField = document.getElementById("passwordInput");
  let Symbol = document.getElementById("passwordImg");
  if (InputField.value == "") {
    Symbol.src = "../img/pasword.svg";
    Symbol.classList.remove("pointer", "opacity");
    InputField.type = "password";
    inputPass = false;
  } else if ((InputField.type = "password")) {
    Symbol.src = "../img/privacy.png";
    Symbol.classList.add("pointer", "opacity");
    inputPass = true;
  } else {
    Symbol.src = "../img/visibility.svg";
    Symbol.classList.add("pointer", "opacity");
    inputPass = true;
  }
}

/**
 * Toggles the visibility of the password input field.
 * @async
 */
async function visibilityPass() {
  let password = document.getElementById("passwordInput");
  let passSymbol = document.getElementById("passwordImg");
  if (inputPass === true) {
    if (password.type === "password") {
      password.type = "text";
      passSymbol.src = "../img/visibility.png";
    } else {
      password.type = "password";
      passSymbol.src = "../img/privacy.png";
    }
  }
}

/**
 * Returns the HTML template for the login form.
 * @returns {string} The HTML template for the login form.
 */

function loginTemplate() {
  return /*html*/`
            <div class="cardHeaderContainer">
                <h1 class="loginH1">Log In</h1>
                <span class="underlineForH1"></span>
            </div>
            <div class="loginInputFields">
                <div class="loginInputField">
                    <input class="loginE-Mail" type="email" required placeholder="E-mail" id="emailInput">
                    <img class="inputImg" src="../img/email.svg" alt="E-Mail">
                </div>
                <div class="loginInputField">
                    <input class="loginE-Mail" minlength="8" type="password" required id="passwordInput" placeholder="Password" onkeydown="changePWSymbol()">
                    <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
                </div>
                <div class="loginFooter">
                  <div class="loginFooterLeft">
                    <input class="loginCheckbox margin-left-rifht-5 margin pointer" type="checkbox"> 
                    <p class="rememberMe margin-left-rifht-5 margin">Remember me</p>
                  </div>  
                    <p class="forgotPass margin-left-rifht-5 margin pointer" onclick="newPassword()">Forgot my Password</p> 
                </div>
            </div>
            <div class="loginFooterBtns">
                <button id="loginBtn" class="loginBtn pointer" onclick="login()">Log in</button>
                <button class="guestBtn pointer" onclick="forwardToMainPage()">Guest Log in</button>
            </div>
  `;
}

/**
 * Changes the view to the sign up form
 * @function
 */
function signUp() {
  let header = document.getElementById('loginHeaderRight');
  header.classList.add("d-none");
  let card = document.getElementById('loginForm');
  card.innerHTML = signUpTemplate();
}

/**
 * Generates the HTML template for the sign up form
 * @function
 * @returns {string} - The sign up form HTML template
 */

function signUpTemplate() {
  return `
          <form class="signUpForm" onsubmit="register(); return false;">
            <div class="signupHeaderContainer">
              <div class="backImgSignUp">  
                <img onclick="renderLogin()" class="backImg pointer" src="../img/arrow-left.png" alt="Back">
              </div> 
                <h1 class="loginH1">Sign up</h1>
                <span class="underlineForH1"></span>
            </div>
            <div class="loginInputFields">
                <div class="loginInputField">
                    <input class="loginE-Mail" type="text" required id="signUpName" placeholder="Name">
                    <img class="inputImg" src="../img/human-profile.png" alt="E-Mail">
                </div>
                <div class="loginInputField">
                    <input class="loginE-Mail" type="email" required id="emailSignUp" placeholder="Email">
                    <img class="inputImg" src="../img/email.svg" alt="E-Mail">
                </div>
                <div class="loginInputField">
                    <input class="loginE-Mail" type="password" minlength="8" required id="passwordSignUp" id="passwordInput" placeholder="Password">
                    <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password">
                </div>
                
            </div>
            <div class="signupFooterBtn">
                <button id="registerBtn" class="loginBtn pointer">Sign up</button>
            </div>
          </form>
  `;
}
/**
 * Changes the view to the new password form
 * @function
 */
function newPassword() {
  let header = document.getElementById('loginHeaderRight');
  header.classList.add("d-none");
  let card = document.getElementById('loginForm');
  card.innerHTML = newPasswordTemplate();
}

/**
 * Generates the HTML template for the new password form
 * @function
 * @returns {string} - The new password form HTML template
 */

function newPasswordTemplate() {
  return `
    <div class="signupHeaderContainer">
      <div class="backImgContainer">  
        <img onclick="renderLogin()" class="backImg pointer" src="../img/arrow-left.png" alt="Back">
      </div> 
      <h1 class="loginH1">I forgot my password</h1>
      <span class="underlineForH1"></span>
    </div>
    <div class="loginInputFields">
      <div class="">
        <span class="subheaderNewPassword">Don't worry! We will send you an email with the instructions to reset your password.</span>
      </div>
      <div class="loginInputField">
        <input class="loginE-Mail" type="email" id="resetEmail" required placeholder="Email">
        <img class="inputImg" src="../img/email.svg" alt="E-Mail">
      </div>
    </div>
    <div class="signupFooterBtn">
      <button class="loginBtn pointer" onclick="resetPassword()">Send me the email</button>
    </div>
  `;
}

/**
 * Changes the view to the reset password form
 * @function
 */
function resetPassword() {
  let header = document.getElementById('loginHeaderRight');
  header.classList.add("d-none");
  let card = document.getElementById('loginForm');
  let email = document.getElementById('resetEmail').value;
  let user = users.find(user => user.email === email);

  if (!user) {
    alert('User not found');
    return;
  }

  currentUserForNewPassword.push(user);
  card.innerHTML = resetPasswordTemplate();
}

/**
 * Generates the HTML template for the reset password form
 * @function
 * @returns {string} - The reset password form HTML template
 */
function resetPasswordTemplate() {
  return `
    <div class="signupHeaderContainer">
      <div class="backImgResetContainer">  
        <img onclick="newPassword()" class="backImg pointer" src="../img/arrow-left.png" alt="Back">
      </div> 
      <h1 class="loginH1">Reset your password</h1>
      <span class="underlineForH1"></span>
    </div>
    <div class="loginInputFields">
      <div class="">
        <span class="subheaderNewPassword">Change your account password</span>
      </div>
      <div class="loginInputField">
        <input class="loginE-Mail" type="password" minlength="8" required id="passwordReset" placeholder="New password">
        <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
      </div>
      <div class="loginInputField">
        <input class="loginE-Mail" type="password" minlength="8" required id="passwordResetConfirm" placeholder="Confirm password">
        <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
      </div>
    </div>
    <div class="signupFooterBtn">
      <button class="loginBtn pointer" onclick="updatePassword()">Continue</button>
    </div>
  `;
}

/**
 * Updates the user's password and saves it to the database
 * @function
 * @async
 */
async function updatePassword() {
  let newPassword = document.getElementById('passwordReset').value;
  let newPasswordConfirmation = document.getElementById('passwordResetConfirm').value;

  if (newPassword !== newPasswordConfirmation) {
      alert('Passwords do not match. Please try again.');
  }

  const userIndex = users.findIndex(user => user.email === currentUserForNewPassword[0].email);
  if (userIndex > -1) {
    users[userIndex].password = newPassword;
    await setItem('users', JSON.stringify(users));
    currentUserForNewPassword = [];
    showSuccessfullyResettedPassword()
    renderLogin();
  } 
}

/**
 * Displays a success message when the user's password has been reset.
 * @returns {void}
 */
function showSuccessfullyResettedPassword(){
  createdSuccessfully();
  document.getElementById('created-successfully-logo').innerHTML='Your password has been reset!';
}

/**
 * Logs the user into the application.
 * @returns {void}
 */
function login() {
  let loginBtn = document.getElementById('loginBtn');
  loginBtn.disabled = true;
  let email = document.getElementById('emailInput').value;
  let password = document.getElementById('passwordInput').value;
  let user = users.find((user) => user.email === email);
  if (!user) {
    alert('User not found');
    loginBtn.disabled = false;
    return;
  }
  if (password !== user.password) {
    alert('Invalid password');
    loginBtn.disabled = false;
    return;
  }
  createCurrentUser(user);
  forwardToMainPage();
}

/**
 * Creates a new user session.
 * @param {Object} user - The user object.
 * @returns {void}
 */
function createCurrentUser(user) {
  currentUser.push(user);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  console.log(currentUser);
}

/**
 * Redirects the user to the main page of the application.
 * @returns {void}
 */
function forwardToMainPage() {
  window.location.href = "../mainpage.html";
}

/**
 * Logs the user out of the application.
 * @returns {void}
 */
function logOut() {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = "../index.html";
}