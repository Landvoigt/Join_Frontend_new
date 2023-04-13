function addPrioColor(id) {
    let element = document.getElementById(id);
    let target = element.classList.contains(`${id}-highlight`);
    let icon = document.getElementById(`${id}Icon`);
    document.getElementById('redIcon').classList.remove('img-brightening');
    document.getElementById('yellowIcon').classList.remove('img-brightening');
    document.getElementById('greenIcon').classList.remove('img-brightening');
    if (target) {
        element.classList.remove(`${id}-highlight`);
    }
    else {
        if (id == 'red') {
            element.classList.add('red-highlight');
            document.getElementById('yellow').classList.remove('yellow-highlight');
            document.getElementById('green').classList.remove('green-highlight');
            icon.classList.add('img-brightening');
        }
        if (id == 'yellow') {
            element.classList.add('yellow-highlight');
            document.getElementById('red').classList.remove('red-highlight');
            document.getElementById('green').classList.remove('green-highlight');
            icon.classList.add('img-brightening');
        }
        if (id == 'green') {
            element.classList.add('green-highlight');
            document.getElementById('yellow').classList.remove('yellow-highlight');
            document.getElementById('red').classList.remove('red-highlight');
            icon.classList.add('img-brightening');
        }
    }
}

function showCurrentDate() {
    document.getElementById('addTaskDate').value = new Date().toLocaleDateString('en-GB');
}

function showAddTaskWindow() {
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
    <div class="popup-container" onclick="stopPropagation(event)">
        <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
        <h2>Add Task</h2>
        <form class="addTask-form" onsubmit="addTask()">
            <div class="addTask-form-left-container">
                <div>
                    <h4 class="addTask-form-headlines">Title</h4>
                    <input placeholder="Enter a title" maxlength="40">
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Description</h4>
                    <textarea placeholder="Enter a description" maxlength="200"></textarea>
                </div>
                <div class="category-select">
                    <h4 class="addTask-form-headlines">Category</h4>
                    <select>
                        <option value="0">Select task category</option>
                        <option value="1">New category</option>
                        <option value="2">Sales</option>
                        <option value="3">Backoffice</option>
                    </select>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Assigned to</h4>
                    <select id="addTaskAssignedContacts">
                        <option value="" disabled selected>Select contacts to assign</option>
                        <option>Kaser</option>
                        <option>Niko</option>
                        <option>Tim</option>
                    </select>
                </div>
            </div>
            <div class="addTask-form-right-container">
                <div>
                    <h4 class="addTask-form-headlines">Due date</h4>
                    <div style="position: relative;">
                        <img class="calendar-icon" src="./img/calendar.png"></img>
                        <input class="pointer" id="addTaskDate" placeholder="dd/mm/yyyy" onclick="showCurrentDate()">
                    </div>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Prio</h4>
                    <div class="addTask-prio-container">
                        <div id="red" class="prio" onclick="addPrioColor('red')">
                            <span>Urgent</span>
                            <img id="redIcon" src="./img/prio_urgent.png" class="prio-img">
                        </div>
                        <div id="yellow" class="prio" onclick="addPrioColor('yellow')">
                            <span>Medium</span>
                            <img id="yellowIcon" src="./img/prio_medium.png" class="prio-img extra">
                        </div>
                        <div id="green" class="prio" onclick="addPrioColor('green')">
                            <span>Low</span>
                            <img id="greenIcon" src="./img/prio_low.png" class="prio-img">
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Subtasks</h4>
                    <div style="position: relative;">
                        <img class="subtask-plus-icon pointer" src="./img/plus.png"></img>
                        <input placeholder="Add new subtask">
                    </div>
                </div>
                <div class="addTask-subtask-container">
                    <input id="subtask1" type="checkbox" class="subtask-checkbox">
                    <label for="subtask1">Subtask 1</label>
                </div>
            </div>
        </form>
        <div class="addTask-commit-buttons">
            <button class="addTask-clear-btn">Clear x</button>
            <button class="submit-btn">Create Task ✓</button>
        </div>
    </div>
    `;
}

function removeAddTaskWindow() {
    let popup = document.getElementById('popupWindow');
    popup.innerHTML = '';
    popup.classList.add('d-none');
}