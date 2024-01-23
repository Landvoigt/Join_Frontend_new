document.addEventListener("DOMContentLoaded", function () {
    passwordResetToken = new URLSearchParams(window.location.search).get('token');
    if (!passwordResetToken) {
        window.location.href = "../index.html";
    } else {
        adjustHeader('Join | Change Password');
    }
});


/**
 * checks if the new given password input is correct
 */
async function updatePassword() {
    let parentDiv = document.getElementById('passwordReset');
    let newPassword = parentDiv.querySelector("Input").value;
    let parentDivConfirm = document.getElementById('passwordResetConfirm');
    let newPasswordConfirm = parentDivConfirm.querySelector("Input").value;

    if (newPassword === newPasswordConfirm) {
        await setNewPassword(newPassword);
    } else {
        showFailureBanner(`Passwords dont match!<br>Try again`);
    }
}


/**
 * saves the new password on the server and shows feedback
 */
async function setNewPassword(newPassword) {
    const changePasswordUrl = API + '/api/password_reset/confirm/';
    try {
        const response = await fetch(changePasswordUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: passwordResetToken, password: newPassword }),
        });

        if (!response.ok) {
            showFailureBanner('Error changing password');
        } else {
            showSuccessBanner('Password resetted');
            renderLogin();
        }
    } catch (error) {
        console.error('Error changing password:', error.message);
    }
}