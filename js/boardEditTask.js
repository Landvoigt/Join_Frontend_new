/**
 * runs all function to edit the task
 */
async function editDetailedTask(id) {
    currentAssignedClients = [];
    currentSubtasks = [];
    currentCat = getTask(id)['topic'];
    currentAssignment = getTask(id)['category'];
    getEditTaskHTML(id);
    addPrioColor(currentPrio);
    pushAssignedClientsToArray(getTask(id)['assigned_clients']);
    await generateContacts();
    pushAttachedSubtasksToArray(getTask(id)['subtasks']);
    renderSubtasks();
}


/**
 * gets all assigned clients for the clicked task and pushes them in an array to edit them easier
 */
function pushAssignedClientsToArray(clients) {
    for (let i = 0; i < clients.length; i++) {
        let contact = clients[i];
        currentAssignedClients.push(contact);
    }
}


/**
 * gets all subtasks for the clicked task and pushes them in an array to edit them easier
 */
function pushAttachedSubtasksToArray(subtasks) {
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        currentSubtasks.push(subtask);
    }
}


/**
 * checks the number of subtasks if there is none its hide the subtasks container
 */
function checkForExistingSubtasks(id) {
    let task = getTask(id);
    if (task['subtasks'].length == 0) {
        let subtaskHL = document.getElementById(`popupSubtaskHeadline${id}`);
        subtaskHL.classList.add('d-none');
    }
    else {
        showDetailedSubtasks(task, id);
    }
}


/**
 * deletes the clicked task from the server then closes the window, loads the tasks again and clears variables
 */
async function deleteShownTask(id) {
    let taskToDelete = { "id": id };
    await deleteItem('tasks', taskToDelete);
    closePopupWindow();
    showSuccessBanner('Task deleted');
    await loadTasks();
    clearVariables();
}


/**
 * after checking if the input fields are filled it pushes the edited information to the task
 */
async function saveEditedTaskInformation(id) {
    checkForEmptyFields();
    if (fieldsFilledCorrectly) {
        let title = document.getElementById('editTaskTitle').value;
        let desc = document.getElementById('editTaskDesc').value;
        let date = document.getElementById('editTaskDate').value;
        await updateTaskInformation(id, title, desc, date);
        clearVariables();
    }
}


/**
 * gets all information and saves them on the server
 */
async function updateTaskInformation(id, title, desc, date) {
    let updatedTask = {
        'id': id,
        'category': currentAssignment,
        'title': title,
        'description': desc,
        'date': convertDateFormat(date),
        'subtasks': currentSubtasks,
        'prio': currentPrio,
        'topic': currentCat,
        'assigned_clients': currentAssignedClients,
    };
    await updateItem('tasks', updatedTask);
    closePopupWindow();
    showSuccessBanner('Task edited');
    await changeSite(BOARD_ID);
}