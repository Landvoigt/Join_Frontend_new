/**
 * checks the dropdowns and the prio buttons if they are filled and shows a alert popup if not
 */
function checkForEmptyFields() {
    if (currentCat.length == 0 && currentPrio.length == 0) {
        document.getElementById('emptyInputPopupCat').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupCat');
        document.getElementById('emptyInputPopupPrio').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupPrio');
    } else if (currentCat.length == 0) {
        document.getElementById('emptyInputPopupCat').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupCat');
    } else if (currentPrio.length == 0) {
        document.getElementById('emptyInputPopupPrio').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupPrio');
    } else {
        fieldsFilledCorrectly = true;
    }
}


/**
 * if the fields are empty it refreshes the function above otherwise it runs the tasks push function
 */
async function getInputsFromForm() {
    checkForEmptyFields();
    if (fieldsFilledCorrectly) {
        let title = document.getElementById('addTask-title-input').value;
        let desc = document.getElementById('addTask-desc-input').value;
        let date = document.getElementById('addTaskDate').value;
        await addTask(title, desc, date);
    }
}


/**
 * pushes the task information to the server, clears the variables afterwards and shows a logo and changes the site to the board
 */
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
    if(!(currentPage == ADDTASK_ID)){
        closePopupWindow();
    }
    showSuccessBanner('Task created');
    changeSite(BOARD_ID);
}


/**
 * removes the empty field popup
 */
function removeFillFieldPopup(id) {
    document.getElementById(id).classList.add('d-none');
}


/**
 * positions the empty field popup correct 
 */
function emptyFieldPopupPositioning() {
    let emptyCat = document.getElementById('emptyInputPopupCat');
    let emptyPrio = document.getElementById('emptyInputPopupPrio');
    emptyCat.classList.add('empty-field-popup-repositioning-1');
    emptyPrio.classList.add('empty-field-popup-repositioning-2');
}


/**
 * clear all variables and resets the already given properties of the new task
 */
function clearAddTaskSide() {
    document.getElementById('addedClientsBox').innerHTML = '';
    document.getElementById('contactsSelection').innerHTML = '';
    clearVariables();
    clearDropDownSection();
    clearPrioSection();
    clearSubtaskSection();
    generateTaskCategories();
    generateContacts();
}


/**
 * clears the task category selection and renews it
 */
function clearDropDownSection() {
    let dropdown = document.getElementById('categoryDropdownSection');
    dropdown.innerHTML = '';
    dropdown.innerHTML = getTopicDropdownHTML();
}


/**
 * clears the task prio selection and renews it
 */
function clearPrioSection() {
    let prioSelect = document.getElementById('prioContainer');
    prioSelect.innerHTML = getPrioContainerHTML();
}