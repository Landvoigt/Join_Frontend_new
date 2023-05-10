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


function getEditTaskHTML(id) {
    let task = tasks[id];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
        <div class="popup-task" onclick="stopPropagation(event)">
        <form class="edit-task-form w-100" onsubmit="saveEditedTaskInformation(${id}); return false">
            <img class="back-btn back-btn-popup back-btn-none" src="./img/plus.png" onclick="removeDetailedTaskWindow(); clearVariables()">
            <div class="popup-text-boxes">
                <h4 class="addTask-form-headlines">Title</h4>
                <input id="editTaskTitle" placeholder="Enter a title" maxlength="40" value="${task['headline']}" required>
            </div>
            <div class="popup-text-boxes">
                <h4 class="addTask-form-headlines">Description</h4>
                <textarea id="editTaskDesc" placeholder="Enter a description" maxlength="200">${task['description']}</textarea>
            </div>
            <div class="popup-text-boxes">
                <h4 class="addTask-form-headlines">Due date</h4>
                <div style="position: relative;">
                    <img class="calendar-icon" src="./img/calendar.png"></img>
                    <input type="text" class="pointer" id="editTaskDate" placeholder="dd/mm/yyyy" value="${task['date']}" onclick="showCurrentDate('editTaskDate')" required>
                </div>
            </div>
            <div class="popup-text-boxes p-relative">
                <h4 class="addTask-form-headlines">Prio</h4>
                <div class="addTask-prio-container">
                    <div id="urgent" class="prio prio-small" onclick="addPrioColor('urgent')">
                        <span>Urgent</span>
                        <img id="urgentIcon" src="./img/prio_urgent.png" class="prio-img prio-img-small">
                    </div>
                    <div id="medium" class="prio prio-small" onclick="addPrioColor('medium')">
                        <span>Medium</span>
                        <img id="mediumIcon" src="./img/prio_medium.png" class="prio-img prio-img-small">
                    </div>
                    <div id="low" class="prio prio-small" onclick="addPrioColor('low')">
                        <span>Low</span>
                        <img id="lowIcon" src="./img/prio_low.png" class="prio-img prio-img-small">
                    </div>
                </div>
                <div id="emptyInputPopupPrio" style="position: absolute;" class="pos-3 d-none">
                    <div class="exclamation-box">
                        <img src="./img/exclamation.png" class="exclamation">
                    </div>
                    <div class="empty-input-popup">Wähle die Priorität.</div>
                </div>
            </div>
            <div id="contactDropdownSection" class="w-100">
                <h4 class="addTask-form-headlines">Assigned to</h4>
                <div id="contactDropdown" class="dropdown" onclick="showSelection('contactsSelection','contactDropdown')">
                    Select contacts to assign
                </div>
                <div class="category-selection" id="contactsSelection">
                    <label onclick="createNewContactInAddTask()" class="label-hover">
                        <span>Create new contact</span>
                        <img src="./img/add_user.png" class="addTask-new-contact-img">
                    </label>
                </div>
            </div>
            <div id="addedClientsBox" class="d-flex f-wrap"></div>
            <div id="addSubtasksSection">
                <h4 class="addTask-form-headlines">Assigned to</h4>
                <div style="position: relative;" onclick="createNewSubtask()">
                    <input type="text" id="subtaskInput" placeholder="Add new subtask">
                    <img class="subtask-plus-icon pointer" src="./img/plus.png"></img>
                </div>
            </div>
            <div id="newSubtasksBox" class="new-subtask-box editTask-subtask-box"></div>
            <div class="w-100 d-flex flex-end">
                <button class="submit-btn ok-btn" type="submit">Ok ✓</button>
            </div>        
        </form>
        </div>
        `;
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