/**
 * shows the popup window for adding a new task, generates all informations and effects
 */
function showAddTaskWindow() {
    resetIDs();
    clearVariables();
    popupWindow.innerHTML = getPopupContainerHTML();
    let popupBox = document.getElementById('popupContainer');
    popupBox.innerHTML += getAddTaskHTML();
    generateTaskCategories();
    generateContacts();
    renderSubtasks();
    popupBox.classList.add('move-in');
    document.getElementById('commitButtonsBox').style.right = '65px';
    emptyFieldPopupPositioning();
}


/**
 * extra container for the add task site to fit better in the popup
 */
function getPopupContainerHTML() {
    return `
    <div id="popupContainer" class="popup-container" onclick="stopPropagation(event)">
        <img class="back-btn-addTask-popup" src="./img/plus.png" onclick="removeAddTaskWindow()">
    </div>
    `;
}


/**
 * removes the add task popup
 */
function removeAddTaskWindow() {
    let popupWindow = document.getElementById('popupWindow');
    let popupBox = document.getElementById('popupContainer');
    popupWindow.classList.remove('dark');
    popupBox.classList.remove('move-in');
    popupBox.classList.add('move-out');
    popupWindow.classList.add('light');
    setTimeout(deleteDarkBackground, 325, popupWindow);
}


/**
 * fades the background
 */
function deleteDarkBackground(backgroundID) {
    backgroundID.classList.add('d-none');
    backgroundID.innerHTML = '';
}