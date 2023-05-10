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


function getPopupContainerHTML() {
    return `
    <div id="popupContainer" class="popup-container" onclick="stopPropagation(event)">
        <img class="back-btn-addTask-popup" src="./img/plus.png" onclick="removeAddTaskWindow()">
    </div>
    `;
}


function removeAddTaskWindow() {
    let popupWindow = document.getElementById('popupWindow');
    let popupBox = document.getElementById('popupContainer');
    popupWindow.classList.remove('dark');
    popupBox.classList.remove('move-in');
    popupBox.classList.add('move-out');
    popupWindow.classList.add('light');
    setTimeout(deleteDarkBackground, 1200);
}


function deleteDarkBackground() {
    let popupWindow = document.getElementById('popupWindow');
    popupWindow.classList.add('d-none');
    popupWindow.innerHTML = '';
}