function showDetailedTask(id) {
    checkPriority(id);
    getDetailedTaskHTML(id);
    showDetailedAssignedClients(id);
    checkForExistingSubtasks(id);
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


function getDetailedTaskHTML(id) {
    let task = tasks[id];
    let topicName = topics[task['topic']]['name'];
    let topicColor = topics[task['topic']]['color'];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.classList.remove('light');
    popup.classList.add('dark');
    popup.innerHTML = '';
    popup.innerHTML = detailedTaskHTML(task, id, topicName, topicColor);
}


function detailedTaskHTML(task, id, topicName, topicColor) {
    return `
    <div class="popup-task" onclick="stopPropagation(event)">
        <img class="back-btn back-btn-none" src="./img/plus.png" onclick="removeDetailedTaskWindow()">
        <img src="./img/back_arrow.png" class="back-arrow-responsive-popup" onclick="removeDetailedTaskWindow()">
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
        <span id="popupSubtaskHeadline${id}" class="popup-span m-t-5"><b>Subtasks</b></span>
        <div id="popupSubtaskSection${id}" class="popup-subtask-container"></div>
    </div>
     `;
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