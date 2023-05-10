let users = [];


async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
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
  } else {
    users.push({
      name: name,
      email: email,
      password: password,
    })
  };

  await setItem('users', JSON.stringify(users));
  alert('Registration successful!');
  renderLogin();
}


async function deleteUser(email) {
  try {
    // das Array aus dem Backend abrufen
    let users = JSON.parse(await getItem('users'));

    // das Element mit der übergebenen E-Mail-Adresse finden
    let index = users.findIndex(user => user.email === email);

    if (index !== -1) {
      // das Element aus dem Array entfernen
      users.splice(index, 1);

      // das aktualisierte Array zurück in den Speicher schreiben
      await setItem('users', JSON.stringify(users));
      console.log(`User with email ${email} has been deleted.`);
    } else {
      console.log(`User with email ${email} not found.`);
    }
  } catch (e) {
    console.error('Deleting error:', e);
  }
}