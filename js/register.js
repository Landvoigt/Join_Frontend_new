let users = [];
  
  async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function register() {
    registerBtn.disabled = true;
    let name = document.getElementById('signUpName');
    let email = document.getElementById('emailSignUp');
    let password = document.getElementById('passwordSignUp');

    users.push({
        name: name.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    renderLogin();
}