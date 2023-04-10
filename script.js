const SUMMARY_ID = 'summary'
const PRIVACY_ID = 'privacyPolicy'
const ADDTASK_ID = 'addTask'
const LEGALNOTICE_ID = 'legalNotice'
const LOGIN_ID = 'login'

let currentPage = SUMMARY_ID;
/**
 * this function is used to include HTML Template
 * 
 */
async function initialize() {
    await includeHTML();
    showMainpage();
    loadDate();
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

    currentPage = id;
}