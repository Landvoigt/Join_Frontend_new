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