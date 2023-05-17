/**
 * HTML for detailed information of clicked task
 * @param {*clicked task} task 
 * @param {*ID of clicked task} id 
 * @param {*name of clicked tasks category} topicName 
 * @param {*color of clicked tasks category} topicColor 
 */
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


/**
 * HTML for edit task information of clicked task
 * @param {*ID of clicked task} id 
 */
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