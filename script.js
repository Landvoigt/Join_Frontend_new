async function initialize() {
    await includeHTML();
    await pushFirstLetter();
    showMainpage();
    loadDate();
    updateTasks();
    checkForTaskNumbers();
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
    currentAssignedClients = [];
    updateTasks();
    clearSearchField();
    deleteBackgroundColors();
    checkForTaskNumbers();
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

function createRandomColor() {
    currentPickedColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    contactsRandomColor = currentPickedColor;
}

function getFocusOnInputField(id) {
    let input = document.getElementById(`${id}`);
    input.focus();
    input.select();
}
