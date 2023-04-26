function getEditTaskHTML(id) {
    let task = tasks[id];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
        <div class="popup-task" onclick="stopPropagation(event)">
        <form>
            <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
            <button class="submit-btn btn-absolute ok-btn-responsive" onclick="saveEditedTaskInformation(${id})">Ok ✓</button>
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
            <div class="popup-text-boxes">
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
            <div id="addSubtasksSection" class="w-80">
                <h4 class="addTask-form-headlines">Assigned to</h4>
                <div style="position: relative;" onclick="createNewSubtask()">
                    <input type="text" id="subtaskInput" placeholder="Add new subtask">
                    <img class="subtask-plus-icon pointer" src="./img/plus.png"></img>
                </div>
            </div>
            <div id="newSubtasksBox" class="new-subtask-box editTask-subtask-box"></div>
        </form>
        </div>
        `;
}