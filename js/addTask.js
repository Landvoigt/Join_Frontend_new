let topics = [
    {
        'name': 'Sales',
        'color': 'aqua'
    },
    {
        'name': 'Design',
        'color': 'orange'
    },
    {
        'name': 'Backoffice',
        'color': 'purple'
    },
    {
        'name': 'Media',
        'color': 'lightgreen'
    },
    {
        'name': 'Marketing',
        'color': 'blue'
    }
];
let showCheckBoxes = true;

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
    resetIDs();
    popupWindow.innerHTML = `
        <div id="popupContainer" class="popup-container" onclick="stopPropagation(event)">
            <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
        </div>
        `;
    let popupBox = document.getElementById('popupContainer');
    popupBox.innerHTML += getAddTaskHTML();
    generateTaskCategories();
    generateContacts();
}

function resetIDs() {
    let popupWindow = document.getElementById('popupWindow');
    popupWindow.classList.remove('d-none');
    popupWindow.innerHTML = '';
    let addTaskSite = document.getElementById('addTaskSite');
    addTaskSite.innerHTML = '';
    return popupWindow
}

function getAddTaskHTML() {
    return `
        <h2>Add Task</h2>
        <form class="addTask-form" onsubmit="addTask()">
            <div class="addTask-form-left-container">
                <div>
                    <h4 class="addTask-form-headlines">Title</h4>
                    <input placeholder="Enter a title" maxlength="40">
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Description</h4>
                    <textarea placeholder="Enter a description" maxlength="250"></textarea>
                </div>
                <div id="categoryDropdownSection" class="category-select">
                    <h4 class="addTask-form-headlines">Category</h4>
                    <div id="categoryDropdown" class="dropdown" onclick="showSelection1()">
                        Select task category
                    </div>
                    <div class="category-selection" id="categorySelection">
                        <label class="addTask-category-label" onclick="createNewCategoryInAddTask()">
                            <span>Create new category</span>
                        </label>
                    </div>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Assigned to</h4>
                    <div id="contactDropdown" class="dropdown" onclick="showSelection2()">
                        Select contacts to assign
                    </div>
                    <div class="category-selection" id="contactsSelection">
                        <label onclick="createNewContactInAddTask()">
                            <span>Create new contact</span>
                            <img src="./img/add_user.png" class="addTask-new-contact-img">
                        </label>
                    </div>
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
                        <input id="subtaskInput" placeholder="Add new subtask">
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
    `;
}

function showSelection1() {
    let options = document.getElementById(`categorySelection`);
    let dropdown = document.getElementById('categoryDropdown');
    if (showCheckBoxes) {
        options.style.display = "flex";
        showCheckBoxes = !showCheckBoxes;
        dropdown.classList.add('selection-border-align');
    } else {
        options.style.display = "none";
        showCheckBoxes = !showCheckBoxes;
        dropdown.classList.remove('selection-border-align');
    }
}

function showSelection2() {
    var options = document.getElementById(`contactsSelection`);
    let dropdown = document.getElementById('contactDropdown');
    if (showCheckBoxes) {
        options.style.display = "flex";
        showCheckBoxes = !showCheckBoxes;
        dropdown.classList.add('selection-border-align');
    } else {
        options.style.display = "none";
        showCheckBoxes = !showCheckBoxes;
        dropdown.classList.remove('selection-border-align');
    }
}

function generateTaskCategories() {
    let select = document.getElementById('categorySelection');
    for (let i = 0; i < topics.length; i++) {
        let cat = topics[i]['name'];
        let color = topics[i]['color'];
        select.innerHTML += `
        <label class="addTask-category-label">
            <span>${cat}</span>
            <div class="addTask-category-dot" style="background-color:${color};"></div>
        </label>
        `;
    }
}

function generateContacts() {
    let select = document.getElementById('contactsSelection');
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        select.innerHTML += `
        <label>
            <span>${contact['firstname']} ${contact['lastname']}</span>
            <input type="checkbox">
        </label>
        `;
    }
}

function removeAddTaskWindow() {
    let popup = document.getElementById('popupWindow');
    popup.innerHTML = '';
    popup.classList.add('d-none');
}

function createNewContactInAddTask() {
    
}

function createNewCategoryInAddTask() { 
    let dropdown = document.getElementById('categoryDropdownSection');
    dropdown.innerHTML = `
        <h4 class="addTask-form-headlines">Category</h4>
        <div class="dropdown grey-text">
            New Category Name
            <div class="create-cat-icon-box">
                <img src="./img/plus.png" class="create-category-icon resize-icon">
                <div class="gap-line"></div>
                <img src="./img/check_mark.png" class="create-category-icon">
            </div>
        </div>
    `;
}