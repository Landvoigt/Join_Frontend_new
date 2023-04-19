let users = [
    {   'name': 'Niko',
        'email': 'niko@test.de',
        'password': 'test123'}
  ];
  
  function register() {
    let name = document.getElementById('signUpName');
    let email = document.getElementById('emailSignUp');
    let password = document.getElementById('passwordSignUp');
    users.push({name: name.value, email: email.value, password: password.value})
    renderLogin();
    /* should be replaced with if else question (if user exist - alert, else new user function) */
    /*need to make animation that show if user successfully registrated is*/
  }