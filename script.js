const LOGIN_ID = 'loginPage'
const SUMMARY_ID = 'summaryPage'
const BOARD_ID = 'boardPage'
const CONTACTS_ID = 'contactsPage'
const ADDTASK_ID = 'addTaskPage'
const PRIVACY_ID = 'privacyPolicyPage'
const LEGALNOTICE_ID = 'legalNoticePage'
const HELP_ID = 'helpPage'

let currentPage = SUMMARY_ID;
let previousPage;

async function initialize() {
    setURL('http://developerakademie.com/smallest_backend_ever');
    await includeHTML();
    showMainpage();
    loadDate();
    updateTasks();
    pushFirstLetter();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function showMainpage() {
    changeSite(SUMMARY_ID);
}

function changeSite(id) {
    let pageToShow = document.getElementById(id);
    let currentShownPage = document.getElementById(currentPage);

    currentShownPage.classList.add('d-none');
    pageToShow.classList.remove('d-none');

    previousPage = currentPage;
    currentPage = id;
}

function showLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    popup.classList.remove('d-none');
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
}

function stopPropagation(event) {
    event.stopPropagation();
}

function closeLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    popup.classList.add('d-none');
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
}