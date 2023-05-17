function editDetailedTask(id) {
    resetIDs();
    currentAssignedClients = [];
    currentSubtasks = [];
    currentCat = tasks[id]['topic'];
    currentAssasignation = tasks[id]['category'];
    getEditTaskHTML(id);
    addPrioColor(currentPrio);
    pushAssignedClientsToArray(id);
    generateContacts();
    pushAttachedSubtasksToArray(id);
    renderSubtasks();
}


function pushAssignedClientsToArray(id) {
    let clients = tasks[id]['clients'];
    for (let i = 0; i < clients.length; i++) {
        let contact = clients[i];
        currentAssignedClients.push(contact);
    }
}


function pushAttachedSubtasksToArray(id) {
    let subtasks = tasks[id]['subtasks'];
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        currentSubtasks.push(subtask);
    }
}


function checkForExistingSubtasks(id) {
    let task = tasks[id];
    if (task['subtasks'].length == 0) {
        let subtaskHL = document.getElementById(`popupSubtaskHeadline${id}`);
        subtaskHL.classList.add('d-none');
    }
    else {
        showDetailedSubtasks(task, id);
    }
}


async function deleteShownTask(id) {
    try {
        let tasks = JSON.parse(await getItem('tasks'));
        let index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            await setItem('tasks', JSON.stringify(tasks));
            console.log(`task${id} has been deleted.`);
        } else {
            console.log(`task${id} not found.`);
        }
    } catch (e) {
        console.error('Deleting error:', e);
    }
    removeDetailedTaskWindow();
    await updateTasksID();
    loadTasks();
    clearVariables();
}


async function updateTasksID() {
    try {
        let tasks = JSON.parse(await getItem('tasks'));
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]['id'] = i;
            await setItem('tasks', JSON.stringify(tasks));
        }
    } catch (e) {
        console.error('Refreshing IDs error:', e);
    }
}


async function saveEditedTaskInformation(id) {
    if (fieldsFilledCorrectly == false) {
        checkForEmptyFields();
    }
    if (fieldsFilledCorrectly == true) {
        let title = document.getElementById('editTaskTitle').value;
        let desc = document.getElementById('editTaskDesc').value;
        let date = document.getElementById('editTaskDate').value;
        await updateTaskInformation(id, title, desc, date);
        clearVariables();
    }
}


async function updateTaskInformation(id, title, desc, date) {
    tasks[id] = {
        'id': id,
        'category': currentAssasignation,
        'topic': currentCat,
        'headline': title,
        'description': desc,
        'date': date,
        'subtasks': currentSubtasks,
        'clients': currentAssignedClients,
        'prioName': currentPrio,
        'prioImg': currentPrioImageSource,
    };
    await setItemTasks(tasks);
    updateTasks(id);
    removeDetailedTaskWindow();
}