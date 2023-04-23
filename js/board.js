let tasks = [
    {
        'id': 0,
        'category': 'toDo',
        'topic': 4,
        'headline': 'Hallo',
        'description': 'Hallo',
        'date': '13/04/2023',
        'subtasks':
            [
                {
                    'text': 'Moin Leudeeee!',
                    'status': false
                },
                {
                    'text': 'Moin Leudeeee!',
                    'status': true
                },
                {
                    'text': 'Moin Leudeeee!',
                    'status': true
                }
            ],
        'clients': ['0', '2', '5'],
        'prioName': 'urgent',
        'prioImg': './img/prio_urgent.png',
    },
    {
        'id': 1,
        'category': 'inProgress',
        'topic': 0,
        'headline': 'Call potential clients',
        'description': 'Hallo',
        'date': '13/04/2023',
        'subtasks':
            [
            ],
        'clients': ['0', '2', '3', '5', '6', '4'],
        'prioName': 'medium',
        'prioImg': './img/prio_medium.png',
    },
    {
        'id': 2,
        'category': 'awaitFeedback',
        'topic': 1,
        'headline': 'Accounting invoices',
        'description': 'Write open invoices for customer',
        'date': '13/04/2023',
        'subtasks':
            [
            ],
        'clients': ['7'],
        'prioName': 'low',
        'prioImg': './img/prio_low.png',
    },
    {
        'id': 3,
        'category': 'awaitFeedback',
        'topic': 3,
        'headline': 'Video cut',
        'description': 'Edit the new company video',
        'date': '13/04/2023',
        'subtasks':
            [
                {
                    'text': 'Moin Leudeeee!',
                    'status': false
                },
                {
                    'text': 'Moin Leudeeee!',
                    'status': true
                },
                {
                    'text': 'Moin Leudeeee!',
                    'status': false
                }
            ],
        'clients': ['0', '2'],
        'prioName': 'medium',
        'prioImg': './img/prio_medium.png',
    },
    {
        'id': 4,
        'category': 'done',
        'topic': 2,
        'headline': 'Social media strategy',
        'description': 'Develop an ad campain for brand positioning',
        'date': '13/04/2023',
        'subtasks':
            [
                {
                    'text': 'Moin Leudeeee!',
                    'status': false
                },
                {
                    'text': 'Moin Leudeeee!',
                    'status': false
                }
            ],
        'clients': ['0', '2', '3', '5'],
        'prioName': 'low',
        'prioImg': './img/prio_low.png',
    }
];

let currentDraggedElement;
let currentPrioColor;

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
        let task = cat[i];
        let taskSection = document.getElementById(`${id}`);
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
    showAssignedClients(task);
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

function showAssignedClients(task) {
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

function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
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
    let task = tasks[id];
    let topicName = topics[task['topic']]['name'];
    let topicColor = topics[task['topic']]['color'];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
    <div class="popup-task" onclick="stopPropagation(event)">
        <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
        <div class="edit-and-delete-box">
            <img class="delete-btn" src="./img/delete.png" onclick="deleteShownTask(${id})">
            <img class="edit-btn" src="./img/pencil_white.png" onclick="editDetailedTask(${id})">
        </div>
        <span class="task-category popup-category" style="background-color: ${topicColor}">${topicName}</span>
        <h2 class="popup-headline">${task['headline']}</h2>
        <span class="popup-span">${task['description']}</span>
        <span class="popup-span"><b>Due date:</b>${task['date']}</span>
        <div class="popup-span" style="display:flex; align-items:center">
            <span><b>Priority:</b></span>
            <span class="task-category popup-prio" style="background-color: ${currentPrioColor}">${currentPrio}
                <img src="${task['prioImg']}" class="popup-prio-icon img-brightening">
            </span>
        </div>
        <span class="popup-span"><b>Assigned to:</b></span>
        <div id="popupClientSection${id}" class="popup-clients-container">
        </div>
        <span class="popup-span m-t-5"><b>Subtasks</b></span>
        <div id="popupSubtaskSection${id}" class="popup-subtask-container"></div>
    </div>
    `;
    showDetailedAssignedClients(task, id);
    showDetailedSubtasks(task, id);
}

function showDetailedAssignedClients(task, id) {
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
            subtaskSection.innerHTML += `
            <div class="d-flex gap-8">
                <span class="opa-03">-</span>
                <span class="popup-client-span line-through opa-03">${subtask}</span>
            </div>
            `;
        }
        if (status == false) {
            subtaskSection.innerHTML += `
            <div class="d-flex gap-8">
                <span>-</span>
                <span class="popup-client-span">${subtask}</span>
            </div>
            `;
        }
    }
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
    let task = tasks[id];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
    <div class="popup-task" onclick="stopPropagation(event)">
        <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
        <button class="submit-btn btn-absolute" onclick="saveEditedTaskInformation(${id})">Ok ✓</button>
        <div class="popup-text-boxes">
            <h4 class="addTask-form-headlines">Title</h4>
            <input id="task${id}" placeholder="Enter a title" maxlength="40" value="${task['headline']}">
        </div>
        <div class="popup-text-boxes">
        <h4 class="addTask-form-headlines">Description</h4>
        <textarea id="desc${id}" placeholder="Enter a description" maxlength="200">${task['description']}</textarea>
        </div>
        <div class="popup-text-boxes">
        <h4 class="addTask-form-headlines">Due date</h4>
        <div style="position: relative;">
        <img class="calendar-icon" src="./img/calendar.png"></img>
        <inputclass="pointer" id="addTaskDate" placeholder="dd/mm/yyyy" value="${task['date']}">
        </div>
        </div>
        <div class="popup-text-boxes">
        <h4 class="addTask-form-headlines">Prio</h4>
        <div class="addTask-prio-container">
        <div id="urgent" class="prio" onclick="addPrioColor('urgent')">
        <span>Urgent</span>
        <img id="urgentIcon" src="./img/prio_urgent.png" class="prio-img">
        </div>
        <div id="medium" class="prio" onclick="addPrioColor('medium')">
        <span>Medium</span>
        <img id="mediumIcon" src="./img/prio_medium.png" class="prio-img extra">
        </div>
        <div id="low" class="prio" onclick="addPrioColor('low')">
        <span>Low</span>
        <img id="lowIcon" src="./img/prio_low.png" class="prio-img">
        </div>
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
                    <div id="addedClientsBox" style="display:flex;"></div>
        </div>
        </div>
        </div>
        `;
    addPrioColor(currentPrio);
    generateContacts2(id);
}

function generateContacts2(id) {            ///// not finished
    let select = document.getElementById('contactsSelection');
    let clients = tasks[id]['clients'];
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        select.innerHTML += `
        <label class="label-hover">
        <span>${contact['firstname']} ${contact['lastname']}</span>
        <input id="contactCheckbox${i}" type="checkbox" class="checkbox" name="${i}" onclick="showAddedClients('contactCheckbox${i}')">
        </label>
        `;
    }
    for (let i = 0; i < clients.length; i++) {
        let contact = clients[i];
        currentAssignedClients.push(contact);
    }
    for (let i = 0; i < currentAssignedClients.length; i++) {
        let assigned = currentAssignedClients[i];
        let checkbox = document.getElementById(`contactCheckbox${assigned}`);
        checkbox.checked = true;

        let dropdown = document.getElementById('addedClientsBox');
        let initials = contacts[assigned]['initials'];
        let color = contacts[assigned]['color'];
        dropdown.innerHTML += `
            <div style="display:flex;">
                <div id="addedClient${i}" class="task-client task-client-big added-client-style pointer" style="background-color:${color};" 
                onclick="removeClient('addedClient${assigned}','contactCheckbox${assigned}','${assigned}')">${initials}</div>
            <div>
            `;
    }
}

function deleteShownTask(id) {
    tasks.splice(id, 1);
    removeAddTaskWindow();
    updateTasksID();
    updateTasks();
}

function updateTasksID() {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i]['id'] = i;
    }
}

function saveEditedTaskInformation(id) {
    // updateTaskInformations(id);
    // updateTasks(id);
    showDetailedTask(id);
}

// function updateTaskInformations(id) {
//     let title = document.getElementById('addTask-title-input').value;
//     let desc = document.getElementById('addTask-desc-input').value;
//     let date = document.getElementById('addTaskDate').value;
//     let doneSubtasks = currentSubtasks.filter(s => s.status === true);
//     let progress = doneSubtasks.length;
//     tasks[id] = {
//         'id': id,
//         'category': 'toDo',
//         'topic': currentCat,
//         'color': currentPickedColor,
//         'headline': title,
//         'description': desc,
//         'date': date,
//         'subtasksNumber': currentSubtasks.length,
//         'progression': progress,
//         'client1': 'SM',
//         'client2': 'MV',
//         'client3': 'EF',
//         'prioName': currentPrio,
//         'prioImg': currentPrioImageSource,
//     }
// }

function filterTasks() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    let searchField = document.getElementById('searchTasks');
    let resultHL = tasks.filter(t => t['headline'].includes(searchField.value));
    let resultD = tasks.filter(t => t['description'].includes(searchField.value));
    //     console.log(resultHL, resultD);
}