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
let previousBackground = 'summarySidebar';

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
    addBackgroundColorForMainPages('summarySidebar');
}

function changeSite(id) {
    let pageToShow = document.getElementById(id);
    let currentShownPage = document.getElementById(currentPage);

    currentShownPage.classList.add('d-none');
    pageToShow.classList.remove('d-none');

    previousPage = currentPage;
    currentPage = id;
    deleteBackgroundColors();
    // removePreviousPageBackground();
    // changeBackgroundInSidebar(currentPage);
}

function changeToAddTaskSite(id) {
    changeSite(id);
    let addTaskSite = document.getElementById('addTaskSite');
    addTaskSite.innerHTML = getAddTaskHTML();
    generateTaskCategories();
    generateContacts();
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

/* --- Habt ihr evtl. ein Tipp wie man die zwei folgende funktionen sauberer umsetzen kann? --- 
*/

// function removePreviousPageBackground() {
//     document.getElementById('summarySidebar').classList.remove('backgroundSidebar');
//     document.getElementById('boardSidebar').classList.remove('backgroundSidebar');
//     document.getElementById('addTaskSidebar').classList.remove('backgroundSidebar');
//     document.getElementById('contactsSidebar').classList.remove('backgroundSidebar');
//     document.getElementById('legalNoticeSidebar').classList.remove('backgroundSidebar');
//     document.getElementById('privacyPolicySidebar').classList.remove('backgroundSidebar');

// }

// function changeBackgroundInSidebar(currentPage) {
//     if (currentPage == SUMMARY_ID) {
//         document.getElementById('summarySidebar').classList.add('backgroundSidebar');
//     }
//     if (currentPage == BOARD_ID) {
//         document.getElementById('boardSidebar').classList.add('backgroundSidebar');
//     }
//     if (currentPage == ADDTASK_ID) {
//         document.getElementById('addTaskSidebar').classList.add('backgroundSidebar');
//     }
//     if (currentPage == CONTACTS_ID) {
//         document.getElementById('contactsSidebar').classList.add('backgroundSidebar');
//     }
//     if (currentPage == PRIVACY_ID) {
//         document.getElementById('privacyPolicySidebar').classList.add('backgroundSidebar');
//     }
//     if (currentPage == LEGALNOTICE_ID) {
//         document.getElementById('legalNoticeSidebar').classList.add('backgroundSidebar');
//     }
// }



// schau mal hier     https://www.w3schools.com/jsref/met_document_queryselectorall.asp
// so sollte es gehen !

function addBackgroundColorForMainPages(id) {           // adds bg to sidebar element you go to (only for the sites you cant go back)
    document.getElementById(`${id}`).classList.add('backgroundSidebar');
    previousBackground = id;
}

function addBackgroundColorForSpecialPages(id) {        // adds bg to sidebar element you go to (for the sites you can go back)
    document.getElementById(`${id}`).classList.add('backgroundSidebar');
}

function deleteBackgroundColors() {         // searches for all elements with class .bgdHover then remove the bg from each one of this classes
    const background = document.querySelectorAll('.bgdHover');
    for (let i = 0; i < background.length; i++) {
        background[i].classList.remove('backgroundSidebar');
    }
}