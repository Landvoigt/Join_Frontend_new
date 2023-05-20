/**
 * gets all information from the server, shows mainpage, loads current date and refreshes the summary
 */
async function initialize() {
    await includeHTML();
    await pushFirstLetter();
    await loadTasks();
    await loadTopics();
    showMainpage();
    loadDate();
    checkForTaskNumbers();
}


/**
 * gets all HTML pages and links them
 */
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


/**
 * changes the site to the mainpage
 */
function showMainpage() {
    changeSite(SUMMARY_ID);
    addBackgroundColorForMainPages('summarySidebar');
}


/**
 * changes the site, shows some effects and resets some variables
 * @param {*ID of the page you want to go to} id 
 */
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


/**
 * changes the site to the add new task site and generates the dropdowns
 */
function changeToAddTaskSite(id) {
    changeSite(id);
    let addTaskSite = document.getElementById('addTaskSite');
    addTaskSite.innerHTML = getAddTaskHTML();
    generateTaskCategories();
    generateContacts();
}


/**
 * shows a popup for the logout
 */
function showLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    popup.classList.remove('d-none');
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    let newContactBtn = document.getElementById('Create-Contact');
    newContactBtn.classList.add('d-none');
}


/**
 * prevents a element in the background not to trigger 
 */
function stopPropagation(event) {
    event.stopPropagation();
}


/**
 * closes the logout popup
 */
function closeLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    popup.classList.add('d-none');
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
    let newContactBtn = document.getElementById('Create-Contact');
    newContactBtn.classList.remove('d-none');
}


/**
 * adds background to sidebar element you go to (only for the sites you cant go back)
 */
function addBackgroundColorForMainPages(id) {
    document.getElementById(`${id}`).classList.add('backgroundSidebar');
    previousBackground = id;
}


/**
 * adds background to sidebar element you go to (for the sites you can go back)
 */
function addBackgroundColorForSpecialPages(id) {
    document.getElementById(`${id}`).classList.add('backgroundSidebar');
}


/**
 * searches for all elements with class .bgdHover then remove the background from each one of this classes
 */
function deleteBackgroundColors() {
    const background = document.querySelectorAll('.bgdHover');
    for (let i = 0; i < background.length; i++) {
        background[i].classList.remove('backgroundSidebar');
    }
}


/**
 * creates a random color and pushes it to a variable
 */
function createRandomColor() {
    currentPickedColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    contactsRandomColor = currentPickedColor;
}


/**
 * shows the current date
 */
function showCurrentDate(id) {
    document.getElementById(id).value = new Date().toLocaleDateString('en-GB');
}


/**
 * sets the focus on the clicked input field
 */
function getFocusOnInputField(id) {
    let input = document.getElementById(`${id}`);
    input.focus();
    input.select();
}


/**
 * resets variables 
 */
function clearVariables() {
    currentCat = "";
    currentPrio = "";
    currentPrioImageSource = "";
    currentAssignedClients = [];
    currentSubtasks = [];
    fieldsFilledCorrectly = false;
}


/**
 * clears the search field
 */
function clearSearchField() {
    document.getElementById('searchTasks').value = '';
}