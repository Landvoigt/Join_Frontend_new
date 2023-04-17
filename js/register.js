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
    //window.location.href = '../templates/login.html?msg=successfully registered';
  }