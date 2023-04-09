function showPassword() {
    let password = document.getElementById('passwordInput');
    let passwordImg = document.getElementById('passwordImg');
    if (password.type === "password") {
        password.type = "text";
        passwordImg.src = `./img/privacy.png`;
      } else {
        password.type = "password";
        passwordImg.src = `./img/visibility.png`;
      }
}