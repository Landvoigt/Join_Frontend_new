let inputPass = false;

let currentUser = [];

async function renderLogin() {
  setTimeout(1000);
  let card = document.getElementById('loginForm');
  card.innerHTML = loginTemplate();
  let header = document.getElementById('loginHeaderRight');
  header.classList.remove("d-none");
  loadUsers();
}

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

function loginTemplate() {
  return `
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
                    <input class="loginCheckbox margin-left-rifht-5 margin pointer" type="checkbox"> 
                    <p class="rememberMe margin-left-rifht-5 margin">Remember me</p>
                    <p class="forgotPass margin-left-rifht-5 margin pointer" onclick="newPassword()">Forgot my Password</p> 
                </div>
            </div>
            <div class="loginFooterBtns">
                <button id="loginBtn" class="loginBtn pointer" onclick="login()">Log in</button>
                <button class="guestBtn pointer" onclick="forwardToMainPage()">Guest Log in</button>
            </div>
  `;
}

function signUp() {
  let header = document.getElementById('loginHeaderRight');
  header.classList.add("d-none");
  let card = document.getElementById('loginForm');
  card.innerHTML = signUpTemplate();
}

function signUpTemplate() {
  return `
          <form onsubmit="register(); return false;">
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
                    <input class="loginE-Mail" type="password" required id="passwordSignUp" id="passwordInput" placeholder="Password">
                    <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password">
                </div>
                
            </div>
            <div class="signupFooterBtn">
                <button id="registerBtn" class="loginBtn pointer">Sign up</button>
            </div>
          </form>
  `;
}

function newPassword() {
  let header = document.getElementById('loginHeaderRight');
  header.classList.add("d-none");
  let card = document.getElementById('loginForm');
  card.innerHTML = newPasswordTemplate();
}

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

  currentUser.push(user);
  card.innerHTML = resetPasswordTemplate();
}

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
        <input class="loginE-Mail" type="password" required id="passwordReset" placeholder="New password" onkeydown="changePWSymbol()">
        <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
      </div>
      <div class="loginInputField">
        <input class="loginE-Mail" type="password" required id="passwordResetConfirm" placeholder="Confirm password" onkeydown="changePWSymbol()">
        <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
      </div>
    </div>
    <div class="signupFooterBtn">
      <button class="loginBtn pointer" onclick="updatePassword()">Send me the email</button>
    </div>
  `;
}

async function updatePassword() {
  let newPassword = '';
  let newPasswordConfirmation = '';

  while (newPassword !== newPasswordConfirmation) {
    newPassword = document.getElementById('passwordReset');
    newPasswordConfirmation = document.getElementById('passwordResetConfirm');
    if (newPassword !== newPasswordConfirmation) {
      alert('Passwords do not match. Please try again.');
    }
  }

  // Update the user's password
  currentUser.password = newPassword;

  // Save the updated user information
  //await setItem('users', JSON.stringify(users));

  alert('Your password has been reset.');
}


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

  alert('Login successful!');     /* weiterleiten zum Board */
}

function forwardToMainPage() {
  window.location.href = "./index.html";
}