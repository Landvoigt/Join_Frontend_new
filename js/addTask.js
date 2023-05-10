function addPrioColor(id) {
    let element = document.getElementById(id);
    let target = element.classList.contains(`${id}-highlight`);
    document.getElementById('urgentIcon').classList.remove('img-brightening');
    document.getElementById('mediumIcon').classList.remove('img-brightening');
    document.getElementById('lowIcon').classList.remove('img-brightening');
    if (target) {
        element.classList.remove(`${id}-highlight`);
        currentPrio = '';
        currentPrioImageSource = '';
    }
    else {
        if (id == 'urgent') {
            changePrioProperties(id, 'medium', 'low');
        }
        if (id == 'medium') {
            changePrioProperties(id, 'urgent', 'low');
        }
        if (id == 'low') {
            changePrioProperties(id, 'medium', 'urgent');
        }
    }
}


function changePrioProperties(shownPrio, hidingPrio1, hidingPrio2) {
    let element = document.getElementById(shownPrio);
    element.classList.add(`${shownPrio}-highlight`);
    document.getElementById(hidingPrio1).classList.remove(`${hidingPrio1}-highlight`);
    document.getElementById(hidingPrio2).classList.remove(`${hidingPrio2}-highlight`);
    let icon = document.getElementById(`${shownPrio}Icon`);
    icon.classList.add('img-brightening');
    currentPrio = shownPrio;
    currentPrioImageSource = `./img/prio_${shownPrio}.png`;
}


function resetIDs() {
    let popupWindow = document.getElementById('popupWindow');
    popupWindow.classList.remove('d-none');
    popupWindow.classList.remove('light');
    popupWindow.classList.add('dark');
    popupWindow.innerHTML = '';
    let addTaskSite = document.getElementById('addTaskSite');
    addTaskSite.innerHTML = '';
    return popupWindow
}


function showSelection(select, container) {
    let options = document.getElementById(`${select}`);
    let dropdown = document.getElementById(`${container}`);
    let closeOptions = document.querySelectorAll('.category-selection');
    let removeBorder = document.querySelectorAll('.dropdown');
    if (showCheckBoxes) {
        options.style.display = "flex";
        showCheckBoxes = !showCheckBoxes;
        dropdown.classList.add('selection-border-align');
    } else {
        for (let i = 0; i < closeOptions.length; i++) {
            closeOptions[i].style.display = "none";
            removeBorder[i].classList.remove('selection-border-align');
        }
        showCheckBoxes = !showCheckBoxes;
    }
}


function closeDropdown() {
    let closeOptions = document.querySelectorAll('.category-selection');
    let removeBorder = document.querySelectorAll('.dropdown');
    for (let i = 0; i < closeOptions.length; i++) {
        closeOptions[i].style.display = "none";
        removeBorder[i].classList.remove('selection-border-align');
    }
    showCheckBoxes = !showCheckBoxes;
}


function generateTaskCategories() {
    let select = document.getElementById('categorySelection');
    for (let i = 0; i < topics.length; i++) {
        let cat = topics[i]['name'];
        let color = topics[i]['color'];
        select.innerHTML += `
        <label class="addTask-category-label label-hover" onclick="showSelectedCategory(${i})">
            <span>${cat}</span>
            <div class="addTask-category-dot" style="background-color:${color};"></div>
        </label>
        `;
    }
}


function showSelectedCategory(i) {
    let container = document.getElementById('categoryDropdown');
    let cat = topics[i]['name'];
    let color = topics[i]['color'];
    container.innerHTML = `
    <div style="display:flex; align-items:center;">
        <span>${cat}</span>
        <div class="addTask-category-dot" style="background-color:${color};"></div>
    </div>
    `;
    showSelection('categorySelection', 'categoryDropdown');
    currentCat = i;
    currentPickedColor = color;
}


function generateContacts() {
    let select = document.getElementById('contactsSelection');
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        select.innerHTML += `
        <label class="label-hover">
            <span>${contact['firstname']} ${contact['lastname']}</span>
            <input id="contactCheckbox${i}" type="checkbox" class="checkbox" name="${i}" onclick="addOrRemoveClients(${i})">
        </label>
        `;
    }
    showAssignedClients();
}


function addOrRemoveClients(i) {
    let checkbox = document.getElementById(`contactCheckbox${i}`);
    if (checkbox.checked != true) {
        removeClient(i);
    }
    else {
        currentAssignedClients.push(`${i}`);
        showAssignedClients();
    }
}


function showAssignedClients() {
    let dropdown = document.getElementById('addedClientsBox');
    dropdown.innerHTML = '';
    for (let i = 0; i < currentAssignedClients.length; i++) {
        let assignedClientID = currentAssignedClients[i];
        createAssignedClientContainer(assignedClientID);
        let checkbox = document.getElementById(`contactCheckbox${assignedClientID}`);
        checkbox.checked = true;
    }
}


function removeClient(i) {
    let clientID = currentAssignedClients.indexOf(`${i}`);
    currentAssignedClients.splice(clientID, 1);
    let checkbox = document.getElementById(`contactCheckbox${i}`);
    checkbox.checked = false;
    let client = document.getElementById(`addedClient${i}`);
    client.remove();
}


function createAssignedClientContainer(id) {
    let dropdown = document.getElementById('addedClientsBox');
    let initials = contacts[id]['initials'];
    let color = contacts[id]['color'];
    dropdown.innerHTML += `
        <div style="display:flex;">
            <div id="addedClient${id}" class="task-client task-client-big added-client-style pointer" style="background-color:${color};" 
            onclick="removeClient(${id})">${initials}</div>
        <div>
        `;
}


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


function addBorderToPickedColor(id) {
    const colors = document.querySelectorAll('.dot-hover');
    for (let i = 0; i < colors.length; i++) {
        colors[i].classList.remove('color-dot-bg');
    }
    let pickedColor = document.getElementById(`${id}`);
    pickedColor.classList.add('color-dot-bg');
}


async function addCategory() {
    checkPickedColor();
    let newCat = document.getElementById('new-cat-input');
    if (input.value.length > 1) {
        topics.push(
            {
                'name': `${newCat.value}`,
                'color': `${currentPickedColor}`
            }
        );
        await setItemTopics(topics);
        resetAddCategorySection();
        document.getElementById('categoryDropdown').innerHTML = `
            <div style="display:flex; align-items:center;">
                <span>${newCat.value}</span>
                <div class="addTask-category-dot" style="background-color:${currentPickedColor};"></div>
            </div>
        `;
        currentCat = topics.length - 1;
    }
}


function checkPickedColor() {
    if (currentPickedColor == '') {
        createRandomColor();
    }
    else {
        for (let i = 0; i < topics.length; i++) {
            const element = topics[i]['color'];
            if (currentPickedColor == element) {
                createRandomColor();
            }
        }
        return
    }
}


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


function renderSubtasks() {
    let subtaskBox = document.getElementById('newSubtasksBox');
    subtaskBox.innerHTML = '';
    for (let i = 0; i < currentSubtasks.length; i++) {
        let text = currentSubtasks[i]['text'];
        let status = currentSubtasks[i]['status'];
        if (status == true) {
            checkmark = 'checked';
            subtaskBox.innerHTML += getSubtaskBoxHTML(i, text, checkmark);
        }
        if (status == false) {
            checkmark = '';
            subtaskBox.innerHTML += getSubtaskBoxHTML(i, text, checkmark);
        }
    }
}


function getSubtaskBoxHTML(i, text, checkmark) {
    return `
    <div class="addTask-subtask-container">
        <input id="editTaskSubtask${i}" type="checkbox" class="subtask-checkbox" onclick="changeSubtaskStatus(${i})" ${checkmark}>
        <label class="subtask-text" for="editTaskSubtask${i}">${text}</label>
    </div>
    `;
}


function addSubtask() {
    let input = document.getElementById('subtaskInput');
    if (input.value.length > 1) {
        currentSubtasks.push(
            {
                'text': input.value,
                'status': false
            }
        );
        input.value = '';
        clearSubtaskSection();
    }
}


function addSubtaskOnEnter() {
    let subtaskInputField = document.getElementById('subtaskInput');
    subtaskInputField.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            addSubtask();
        }
    });
}


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


function changeSubtaskStatus(i) {
    if (currentSubtasks[i]['status'] === true) {
        currentSubtasks[i]['status'] = false;
    }
    else {
        currentSubtasks[i]['status'] = true;
    }
}


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