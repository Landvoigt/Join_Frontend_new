async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
    }
    updateTasks();
}


async function loadTopics() {
    try {
        topics = JSON.parse(await getItem('topics'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function setItemTasks(tasks) {
    await setItem('tasks', JSON.stringify(tasks));
}


async function setItemTopics(topics) {
    await setItem('topics', JSON.stringify(topics));
}


function updateTasks() {
    updateTaskSection('toDo');
    updateTaskSection('inProgress');
    updateTaskSection('awaitFeedback');
    updateTaskSection('done');
}


function updateTaskSection(id) {
    let cat = tasks.filter(t => t['category'] == `${id}`);
    document.getElementById(`${id}`).innerHTML = '';
    for (let i = 0; i < cat.length; i++) {
        let taskSection = document.getElementById(`${id}`);
        let task = cat[i];
        getTaskInformationFromArray(task, taskSection);
        checkForSubtasks(task, task['id']);
    }
}


function getTaskInformationFromArray(task, taskSection) {
    let topicName = topics[task['topic']]['name'];
    let topicColor = topics[task['topic']]['color'];
    let doneSubtasks = task['subtasks'].filter(s => s.status === true);
    let progress = doneSubtasks.length;
    let subtasksAmount = task['subtasks'].length;
    generateTask(task, taskSection, topicName, topicColor, progress, subtasksAmount);
    showClients(task);
}


function generateTask(task, taskSection, topicName, topicColor, progress, subtasksAmount) {
    taskSection.innerHTML +=
        `
        <div class="task-box" draggable="true" ondragstart="startDragging(${task['id']})" onclick="showDetailedTask(${task['id']})">
            <span class="task-category" style="background-color: ${topicColor}">${topicName}</span>
            <span class="task-headline">${task['headline']}</span>
            <span class="task-description">${task['description']}</span>
            <div id="progressContainer${task['id']}" class="progress-container">
                <div class="progress-box">
                    <div class="progress-bar" style="width:${progress / subtasksAmount * 100}%"></div>
                  </div>
                <span>${progress}/${subtasksAmount} Done</span>
            </div>
            <div class="task-assignment-section">
                <div id="taskClientSection${task['id']}" class="task-clients-container">
                </div>
                <img src="${task['prioImg']}" class="task-prio-icon">
            </div>
        </div>
    `;
}


function showClients(task) {
    let clientSection = document.getElementById(`taskClientSection${task['id']}`);
    let clientsAmount = task['clients'].length;
    for (let i = 0; i < clientsAmount; i++) {
        let clientNumber = task['clients'][i];
        let initials = contacts[clientNumber]['initials'];
        let color = contacts[clientNumber]['color'];
        changeDesignBasedOnClientsAmount(i, clientSection, clientsAmount, initials, color);
    }
}


function changeDesignBasedOnClientsAmount(i, clientSection, clientsAmount, initials, color) {
    if (i < 2) {
        generateAssignedClientHTML(clientSection, initials, color);
        if (i == 1) {
            clientSection.getElementsByTagName('div')[1].classList.add('m-l-negative');
        }
    }
    if (i == 2 && clientsAmount > 3) {
        generateAssignedClientHTML(clientSection, `+${clientsAmount - 2}`, 'black');
        moveClientDivLeft(clientSection);
    }
    if (i == 2 && clientsAmount == 3) {
        generateAssignedClientHTML(clientSection, initials, color);
        moveClientDivLeft(clientSection);
    }
}


function generateAssignedClientHTML(clientSection, initials, color) {
    clientSection.innerHTML += `
        <div class="task-client" style="background-color:${color};">${initials}</div>
    `;
}


function moveClientDivLeft(clientSection) {
    clientSection.getElementsByTagName('div')[1].classList.add('m-l-negative');
    clientSection.getElementsByTagName('div')[2].classList.add('m-l-negative');
}


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}


async function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    await setItemTasks(tasks);
    updateTasks();
}


function showHighlight(id) {
    document.getElementById(id).classList.add('drag-over-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-over-highlight');
}


function changeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "./img/plus_lightblue.png";
}


function removeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "./img/plus.png";
}


function checkForSubtasks(task, id) {
    let subtasksAmount = task['subtasks'].length;
    let progress = document.getElementById(`progressContainer${id}`);
    if (subtasksAmount == 0) {
        progress.innerHTML = '';
    }
    else {
        progress.style = 'padding-bottom: 20px;'
    }
}


function showDetailedTask(id) {
    checkPriority(id);
    getDetailedTaskHTML(id);
    showDetailedAssignedClients(id);
    checkForExistingSubtasks(id);
}


function removeDetailedTaskWindow() {
    let popupWindow = document.getElementById('popupWindow');
    popupWindow.classList.add('light');
    popupWindow.classList.remove('dark');
    popupWindow.innerHTML = '';
    setTimeout(deleteDarkBackground, 325);
}


function showDetailedAssignedClients(id) {
    let task = tasks[id];
    let clientsSection = document.getElementById(`popupClientSection${id}`);
    for (let i = 0; i < task['clients'].length; i++) {
        let clientNumber = task['clients'][i];
        let initials = contacts[clientNumber]['initials'];
        let color = contacts[clientNumber]['color'];
        let firstName = contacts[clientNumber]['firstname'];
        let lastName = contacts[clientNumber]['lastname'];
        clientsSection.innerHTML += `
            <div class="popup-client-box">
                <div class="task-client task-client-big" style="background-color:${color};">${initials}</div>
                <span class="popup-client-span">${firstName} ${lastName}</span>
            </div>
            `;
    }
}


function showDetailedSubtasks(task, id) {
    let subtaskSection = document.getElementById(`popupSubtaskSection${id}`);
    for (let i = 0; i < task['subtasks'].length; i++) {
        let subtask = task['subtasks'][i]['text'];
        let status = task['subtasks'][i]['status'];
        if (status == true) {
            getCrossedOutSubtaskHTML(subtaskSection, subtask);
        }
        if (status == false) {
            getSubtaskHTML(subtaskSection, subtask);
        }
    }
}


function getSubtaskHTML(subtaskSection, subtask) {
    subtaskSection.innerHTML += `
    <div class="d-flex gap-8">
        <span>-</span>
        <span class="popup-subtask-span">${subtask}</span>
    </div>
    `;
}


function getCrossedOutSubtaskHTML(subtaskSection, subtask) {
    subtaskSection.innerHTML += `
    <div class="d-flex gap-8">
        <span class="opa-03">-</span>
        <span class="popup-subtask-span line-through opa-03">${subtask}</span>
    </div>
    `;
}


function checkPriority(id) {
    let prio = tasks[id]['prioName'];
    if (prio == 'urgent') {
        currentPrioColor = '#ff3d00';
        currentPrio = prio;
    }
    if (prio == 'medium') {
        currentPrioColor = '#ffa800';
        currentPrio = prio;
    }
    if (prio == 'low') {
        currentPrioColor = '#7ae229';
        currentPrio = prio;
    }
}


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


function filterTasks() {
    showFilteredTasks('toDo');
    showFilteredTasks('inProgress');
    showFilteredTasks('awaitFeedback');
    showFilteredTasks('done');
}


function showFilteredTasks(id) {
    let searchField = document.getElementById('searchTasks').value.toLowerCase();
    let cat = tasks.filter(t => t['category'] == `${id}`);
    document.getElementById(`${id}`).innerHTML = '';
    for (let i = 0; i < cat.length; i++) {
        let taskSection = document.getElementById(`${id}`);
        let task = cat[i];
        let filterHeadline = task.headline.toLowerCase().includes(searchField);
        let filterDescription = task.description.toLowerCase().includes(searchField);
        if (filterHeadline) {
            getTaskInformationFromArray(task, taskSection);
            checkForSubtasks(task, task['id']);
        }
        else if (filterDescription) {
            getTaskInformationFromArray(task, taskSection);
            checkForSubtasks(task, task['id']);
        }
    }
}


function clearSearchField() {
    document.getElementById('searchTasks').value = '';
}