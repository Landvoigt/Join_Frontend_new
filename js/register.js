/**
 * Registers a new user, checks if a user with the same email exists before registration.
 * @returns {Promise<void>} Resolves when the user is registered, an error message is shown, or the form is reset.
 */
async function register() {
    disableBtn('registerBtn');
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('emailSignUp').value;
    let parentDiv = document.getElementById('passwordSignUp');
    let password = parentDiv.querySelector("input").value;
    await createNewUser(name, email, password);
}


/**
 * pushes new user to the users array and shows feedback
 */
async function createNewUser(name, email, password) {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    let newUser = {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password,
    };

    let response = await fetch(API + '/registry/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        handleLoginError(errorMessage.error);
        enableBtn('registerBtn');
    }
    showSuccessBanner('New user created');
    renderLogin();
}