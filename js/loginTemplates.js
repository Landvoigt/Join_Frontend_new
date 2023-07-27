/**
 * Generates the HTML template for the reset password form
 * @returns {string} - The reset password form HTML template
 */
function resetPasswordTemplate() {
    return `
        <div class="signupHeaderContainer f-column a-i-center p-relative">
            <div class="backImgResetContainer f-center">  
                <img onclick="newPassword()" class="backImg pointer" src="../assets/icons/back_arrow_lightblue.png">
            </div> 
            <h1>Reset your password</h1>
            <span class="parting-line"></span>
        </div>
        <div class="login-input-container">
            <div>
                <span class="subheaderNewPassword d-flex j-center">Change your account password</span>
            </div>
            <div class="login-input" id="passwordReset">
                <input class="loginE-Mail" type="password" minlength="8" placeholder="New password" required onkeydown="changePWSymbol('passwordReset')">
                <img src="../assets/icons/password.svg" class="inputImg password-img" onclick="showPassword('passwordReset')">
            </div>
            <div class="login-input" id="passwordResetConfirm">
                <input class="loginE-Mail" type="password" minlength="8" required placeholder="Confirm password" onkeydown="changePWSymbol('passwordResetConfirm')">
                <img id="passwordConfirmImg" class="inputImg password-img" src="../assets/icons/password.svg" onclick="showPassword('passwordResetConfirm')">
            </div>
        </div>
        <div class="sign-up-btn-container d-flex j-center">
            <button class="loginBtn pointer" onclick="updatePassword()">Continue</button>
        </div>
        `;
}


/**
 * Returns the HTML template for the login form.
 * @returns {string} The HTML template for the login form.
 */
function loginTemplate() {
    return `
      <div class="cardHeaderContainer f-column a-i-center">
          <h1>Log In</h1>
          <span class="parting-line"></span>
      </div>
      <div class="login-input-container f-column a-i-center">
          <div class="login-input">
              <input class="loginE-Mail" type="email" required placeholder="E-mail" id="emailInput">
              <img class="inputImg" src="../assets/icons/mail.png">
          </div>
          <div class="login-input" id="passwordLogin">
              <input id="passwordInput" class="loginE-Mail" minlength="8" type="password" required placeholder="Password" onkeydown="changePWSymbol('passwordLogin')">
              <img class="inputImg password-img" src="../assets/icons/password.svg" onclick="showPassword('passwordLogin')">
          </div>
          <div class="loginFooter d-flex j-center">
              <div class="d-flex">
                  <input class="loginCheckbox mlr-5 margin pointer" type="checkbox"> 
                  <p class="rememberMe mlr-5 margin">Remember me</p>
              </div>  
              <p class="forgotPass mlr-5 margin pointer" onclick="newPassword()">Forgot Password ?</p> 
          </div>
      </div>
      <div class="loginFooterBtns d-flex">
          <button id="loginBtn" class="loginBtn pointer" onclick="login()">Login</button>
          <button class="guestBtn pointer" onclick="forwardToMainPage()">Guest Login</button>
      </div>
      `;
}


/**
 * Generates the HTML template for the sign up form
 * @returns {string} - The sign up form HTML template
 */
function signUpTemplate() {
    return `
      <form class="signUpForm" onsubmit="register(); return false;">
          <div class="signupHeaderContainer f-column a-i-center p-relative">
              <div class="backImgSignUp f-center">  
                  <img onclick="renderLogin()" class="backImg pointer" src="../assets/icons/back_arrow_lightblue.png">
              </div> 
              <h1>Sign up</h1>
              <span class="underlineForH1"></span>
          </div>
          <div class="login-input-container">
              <div class="login-input">
                  <input class="loginE-Mail" type="text" required id="signUpName" placeholder="Name">
                  <img class="inputImg" src="../assets/icons/person.png">
              </div>
              <div class="login-input">
                  <input class="loginE-Mail" type="email" required id="emailSignUp" placeholder="Email">
                  <img class="inputImg" src="../assets/icons/mail.png">
              </div>
              <div class="login-input" id="passwordSignUp">
                  <input class="loginE-Mail" type="password" minlength="8" required placeholder="Password" onkeydown="changePWSymbol('passwordSignUp')">
                  <img class="inputImg password-img" src="../assets/icons/password.svg" onclick="showPassword('passwordSignUp')">
              </div>     
          </div>
          <div class="sign-up-btn-container d-flex j-center">
              <button id="registerBtn" class="loginBtn pointer">Sign up</button>
          </div>
      </form>
      `;
}


/**
 * Generates the HTML template for the new password form
 * @returns {string} - The new password form HTML template
 */
function newPasswordTemplate() {
    return `
      <div class=" f-column a-i-center">
          <div class="backImgContainer f-center">
              <img src="../assets/icons/back_arrow_lightblue.png" onclick="renderLogin()" class="backImg pointer" alt="Back">
          </div> 
          <h1>Forgot Password</h1>
          <span class="parting-line"></span>
      </div>
      <div class="login-input-container">
          <div>
              <span class="subheaderNewPassword d-flex j-center">Don't worry! We will send you an email with the instructions to reset your password.</span>
          </div>
          <div class="login-input">
              <input id="resetEmail" class="loginE-Mail" type="email" placeholder="Email" required>
              <img src="../assets/icons/mail.png" class="inputImg">
          </div>
      </div>
      <div class="sign-up-btn-container d-flex j-center">
          <button class="loginBtn pointer" onclick="resetPassword()">Send Email</button>
      </div>
      `;
}