function checkForEmptyFields() {
    if (currentCat.length == 0 && currentPrio.length == 0) {
        document.getElementById('emptyInputPopupCat').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupCat');
        document.getElementById('emptyInputPopupPrio').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupPrio');
    }
    else if (currentCat.length == 0) {
        document.getElementById('emptyInputPopupCat').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupCat');
    }
    else if (currentPrio.length == 0) {
        document.getElementById('emptyInputPopupPrio').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupPrio');
    }
    else {
        fieldsFilledCorrectly = true;
    }
}


function getInputsFromForm() {
    if (fieldsFilledCorrectly == false) {
        checkForEmptyFields();
    }
    if (fieldsFilledCorrectly == true) {
        let title = document.getElementById('addTask-title-input').value;
        let desc = document.getElementById('addTask-desc-input').value;
        let date = document.getElementById('addTaskDate').value;
        addTask(title, desc, date);
    }
}


async function addTask(title, desc, date) {
    tasks.push(
        {
            'id': tasks.length,
            'category': 'toDo',
            'topic': currentCat,
            'headline': title,
            'description': desc,
            'date': date,
            'subtasks': currentSubtasks,
            'clients': currentAssignedClients,
            'prioName': currentPrio,
            'prioImg': currentPrioImageSource,
        }
    );
    await setItemTasks(tasks);
    clearVariables();
    showSuccessfullyCreatedLogo();
    removeAddTaskWindow();
}


function showSuccessfullyCreatedLogo() {
    createdSuccessfully();
    document.getElementById('created-successfully-logo').innerHTML = 'Task added successfully';
    changeSite(BOARD_ID);
}


function removeFillFieldPopup(id) {
    document.getElementById(id).classList.add('d-none');
}


function emptyFieldPopupPositioning() {
    let emptyCat = document.getElementById('emptyInputPopupCat');
    let emptyPrio = document.getElementById('emptyInputPopupPrio');
    emptyCat.classList.add('empty-field-popup-repositioning-1');
    emptyPrio.classList.add('empty-field-popup-repositioning-2');
}


function clearAddTaskSide() {
    clearVariables();
    let dropdown = document.getElementById('categoryDropdownSection');
    let prioSelect = document.getElementById('prioContainer');
    dropdown.innerHTML = '';
    dropdown.innerHTML = getTopicDropdownHTML();
    prioSelect.innerHTML = getPrioContainerHTML();
    generateTaskCategories();
    generateContacts();
    document.getElementById('addedClientsBox').innerHTML = '';
    clearSubtaskSection();
}