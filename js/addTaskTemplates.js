/**
 * HTML for the addTask site and popup
 */
function getAddTaskHTML() {
    return `
        <div class="spanMainpage d-none">Kanban Project Management Tool</div>
        <h2>Add Task</h2>
        <form class="addTask-form" onsubmit="getInputsFromForm(); return false" onclick="closeDropdown()">
            <div class="addTask-form-left-container">
                <div>
                    <h4 class="addTask-form-headlines">Title</h4>
                    <input type="text" id="addTask-title-input" placeholder="Enter a title" maxlength="40" required>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Description</h4>
                    <textarea id="addTask-desc-input" placeholder="Enter a description" maxlength="250" required></textarea>
                </div>
                <div id="categoryDropdownSection" class="category-select" onclick="stopPropagation(event)">
                    <h4 class="addTask-form-headlines">Category</h4>
                    <div id="categoryDropdown" class="dropdown" onclick="showSelection('categorySelection','categoryDropdown')">
                        Select task category
                    </div>
                    <div class="category-selection" id="categorySelection">
                        <label class="addTask-category-label label-hover" onclick="createNewCategoryInAddTask()">
                            <span>Create new category</span>
                        </label>
                    </div>
                </div>
                <div id="contactDropdownSection" onclick="stopPropagation(event)">
                    <h4 class="addTask-form-headlines">Assigned to</h4>
                    <div id="contactDropdown" class="dropdown" onclick="showSelection('contactsSelection','contactDropdown')">
                        Select contacts to assign
                    </div>
                    <div class="category-selection" id="contactsSelection">
                        <label onclick="openCreateContact()" class="label-hover">
                            <span>Create new contact</span>
                            <img src="./img/add_user.png" class="addTask-new-contact-img">
                        </label>
                    </div>
                    <div id="addedClientsBox" class="added-clients-box"></div>
                </div>
            </div>
            <div class="addTask-form-right-container">
                <div>
                    <h4 class="addTask-form-headlines">Due date</h4>
                    <div style="position: relative;">
                        <img class="calendar-icon" src="./img/calendar.png"></img>
                        <input type="text" class="pointer" id="addTaskDate" placeholder="dd/mm/yyyy" onclick="showCurrentDate('addTaskDate')" required>
                    </div>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Prio</h4>
                    <div id="prioContainer" class="addTask-prio-container" required>
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
                <div id="addSubtasksSection">
                    <h4 class="addTask-form-headlines">Assigned to</h4>
                    <div id="emptyInputPopupPrio" style="position: absolute;" class="pos-1 d-none">
                        <div class="exclamation-box">
                            <img src="./img/exclamation.png" class="exclamation">
                         </div>
                        <div class="empty-input-popup">Wähle die Priorität.</div>
                    </div>
                    <div style="position: relative;" onclick="createNewSubtask()">
                        <input type="text" id="subtaskInput" placeholder="Add new subtask">
                        <img class="subtask-plus-icon pointer" src="./img/plus.png"> </img>
                    </div>
                </div>
                <div id="newSubtasksBox" class="new-subtask-box"></div>
            </div>
            <div class="addTask-commit-buttons" id="commitButtonsBox">
                <button class="addTask-clear-btn" type="reset" onclick="clearAddTaskSide()">Clear x</button>
                <button class="submit-btn" type="submit">Create Task ✓</button>
            </div>
            <div id="emptyInputPopupCat" style="position: absolute;" class="pos-2 d-none">
                <div class="exclamation-box">
                    <img src="./img/exclamation.png" class="exclamation">
                </div>
                <div class="empty-input-popup">Wähle eine Kategorie.</div>
            </div>
        </form>
        <div id="taskAddedPopup" class="task-added-popup-container d-none">
            <span>Task added to board</span>
            <img src="./img/grid.png" class="popup-icon">
        </div>
    `;
}


/**
 * HTML for the category dropdown options menu
 */
function getTopicDropdownHTML() {
    return `
    <h4 class="addTask-form-headlines">Category</h4>
    <div id="categoryDropdown" class="dropdown" onclick="showSelection('categorySelection','categoryDropdown')">
        Select task category
    </div>
    <div class="category-selection" id="categorySelection">
        <label class="addTask-category-label label-hover" onclick="createNewCategoryInAddTask()">
            <span>Create new category</span>
        </label>
    </div>
    `;
}


/**
 * HTML for new category
 */
function newGivenCategoryHTML(newCat) {
    return `
    <div style="display:flex; align-items:center;">
        <span>${newCat.value}</span>
        <div class="addTask-category-dot" style="background-color:${currentPickedColor};"></div>
    </div>
    `;
}


/**
 * resets the HTML for the category dropdown
 */
function resetAddCategorySection() {
    let select = document.getElementById('categoryDropdownSection');
    select.innerHTML = `
            <h4 class="addTask-form-headlines">Category</h4>
            <div id="categoryDropdown" class="dropdown" onclick="showSelection('categorySelection','categoryDropdown')">
                Select task category
            </div>
            <div class="category-selection" id="categorySelection">
                <label class="addTask-category-label label-hover" onclick="createNewCategoryInAddTask()">
                    <span>Create new category</span>
                </label>
            </div>
    `;
    generateTaskCategories();
    showCheckBoxes = !showCheckBoxes;
}


/**
 * HTML for the prio buttons
 */
function getPrioContainerHTML() {
    return `
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
    `;
}


/**
 * HTML for subtasks
 */
function getSubtaskBoxHTML(i, text, checkmark) {
    return `
    <div class="addTask-subtask-container">
        <input id="editTaskSubtask${i}" type="checkbox" class="subtask-checkbox" onclick="changeSubtaskStatus(${i})" ${checkmark}>
        <label class="subtask-text" for="editTaskSubtask${i}">${text}</label>
    </div>
    `;
}


/**
 * changes the input field container to add a new subtask
 */
function createNewSubtask() {
    let container = document.getElementById('addSubtasksSection');
    container.innerHTML = `
        <h4 class="addTask-form-headlines">Assigned to</h4>
        <div class="dropdown grey-text padding-r-15">
            <input type="text" id="subtaskInput" maxlength="32" class="new-cat-input" onkeydown="addSubtaskOnEnter()">
            <div class="create-cat-icon-box">
                <img src="./img/plus.png" class="create-category-icon resize-icon" onclick="clearSubtaskSection()">
                <div class="gap-line"></div>
                <img src="./img/check_mark.png" class="create-category-icon" onclick="addSubtask()">
            </div>
        </div>
    `;
    getFocusOnInputField('subtaskInput');
}


/**
 * resets subtask input HTML and shows current subtasks
 */
function clearSubtaskSection() {
    let container = document.getElementById('addSubtasksSection');
    container.innerHTML = `
        <h4 class="addTask-form-headlines">Assigned to</h4>
        <div style="position: relative;" onclick="createNewSubtask()">
            <input type="text" id="subtaskInput" placeholder="Add new subtask">
            <img class="subtask-plus-icon pointer" src="./img/plus.png"></img>
        </div>
        `;
    renderSubtasks();
}