let inputPass = false;

async function changePWSymbol() {
  let InputField = document.getElementById("passwordInput");
  let Symbol = document.getElementById("passwordImg");
  if (InputField.value == "") {
    Symbol.src = "../img/pasword.svg";
    Symbol.classList.remove("pointer");
    InputField.type = "password";
    inputPass = false;
  } else if ((InputField.type = "password")) {
    Symbol.src = "../img/privacy.png";
    Symbol.classList.add("pointer");
    inputPass = true;
  } else {
    Symbol.src = "../img/visibility.svg";
    Symbol.classList.add("pointer");
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
