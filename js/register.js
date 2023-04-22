let users = [];
  
  async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function register() {
    let registerBtn = document.getElementById('registerBtn');
    registerBtn.disabled = true;
    
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('emailSignUp').value;
    let password = document.getElementById('passwordSignUp').value;

    let userExists = users.some((user) => user.email === email);
    if (userExists) {
        alert('User with this email already exists');
        registerBtn.disabled = false;
        return;
    } else { users.push({
        name: name,
        email: email,
        password: password,
        })
    };

    await setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    renderLogin();
}