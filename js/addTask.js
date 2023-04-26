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

function showCurrentDate(id) {
    document.getElementById(id).value = new Date().toLocaleDateString('en-GB');
}

function showAddTaskWindow() {
    resetIDs();
    document.getElementById('boardPage').classList.add('of-hidden');
    popupWindow.innerHTML = `
        <div id="popupContainer" class="popup-container" onclick="stopPropagation(event)">
            <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
        </div>
        `;
    let popupBox = document.getElementById('popupContainer');
    popupBox.innerHTML += getAddTaskHTML();
    generateTaskCategories();
    generateContacts();
    renderSubtasks();
}

function resetIDs() {
    let popupWindow = document.getElementById('popupWindow');
    popupWindow.classList.remove('d-none');
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

function removeClient(i) {
    let clientID = currentAssignedClients.indexOf(`${i}`);
    currentAssignedClients.splice(clientID, 1);
    let checkbox = document.getElementById(`contactCheckbox${i}`);
    checkbox.checked = false;
    let client = document.getElementById(`addedClient${i}`);
    client.remove();
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

function removeAddTaskWindow() {
    let popup = document.getElementById('popupWindow');
    popup.innerHTML = '';
    popup.classList.add('d-none');
    document.getElementById('boardPage').classList.remove('of-hidden');
}

function createNewContactInAddTask() {
    let dropdown = document.getElementById('contactDropdownSection');
    dropdown.innerHTML = `
        <h4 class="addTask-form-headlines">Subtasks</h4>
        <div class="dropdown grey-text">
            <input id="new-contact-input" class="new-cat-input" type="email" placeholder="Contact email" required>
            <div class="create-cat-icon-box">
                <img src="./img/plus.png" class="create-category-icon resize-icon" onclick="">
                <div class="gap-line"></div>
                <img src="./img/check_mark.png" class="create-category-icon" onclick="">
            </div>
        </div>
    `;
}

function createNewCategoryInAddTask() {
    let dropdown = document.getElementById('categoryDropdownSection');
    dropdown.innerHTML = `
        <h4 class="addTask-form-headlines">Category</h4>
        <div class="dropdown grey-text">
            <input id="new-cat-input" class="new-cat-input" minvalue="3" maxlength="16" placeholder="New Category Name" required>
            <div class="create-cat-icon-box">
                <img src="./img/plus.png" class="create-category-icon resize-icon" onclick="resetAddCategorySection()">
                <div class="gap-line"></div>
                <img src="./img/check_mark.png" class="create-category-icon" onclick="addCategory()">
            </div>
        </div>
        <div class="new-cat-color-select-box">
            <div id="pickColor1" class="addTask-category-dot dot-hover pointer" style="background-color:red;" 
            onclick="addBorderToPickedColor('pickColor1'); currentPickedColor = 'red'"></div>
            <div id="pickColor2" class="addTask-category-dot dot-hover pointer" style="background-color:orange;" 
            onclick="addBorderToPickedColor('pickColor2'); currentPickedColor = 'orange'"></div>
            <div id="pickColor3" class="addTask-category-dot dot-hover pointer" style="background-color:lightgreen;" 
            onclick="addBorderToPickedColor('pickColor3'); currentPickedColor = 'lightgreen'"></div>
            <div id="pickColor4" class="addTask-category-dot dot-hover pointer" style="background-color:lightblue;" 
            onclick="addBorderToPickedColor('pickColor4'); currentPickedColor = 'lightblue'"></div>
            <div id="pickColor5" class="addTask-category-dot dot-hover pointer" style="background-color:yellow;" 
            onclick="addBorderToPickedColor('pickColor5'); currentPickedColor = 'yellow'"></div>
            <div id="pickColor6" class="addTask-category-dot dot-hover pointer" style="background-color:aqua;" 
            onclick="addBorderToPickedColor('pickColor6'); currentPickedColor = 'aqua'"></div>
            <div id="pickColor7" class="addTask-category-dot dot-hover pointer" style="background-color:grey;" 
            onclick="addBorderToPickedColor('pickColor7'); currentPickedColor = 'grey'"></div>
        </div>
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

function addCategory() {
    checkPickedColor();
    let newCat = document.getElementById('new-cat-input');
    topics.push(
        {
            'name': `${newCat.value}`,
            'color': `${currentPickedColor}`
        }
    )
    resetAddCategorySection();
    document.getElementById('categoryDropdown').innerHTML = `
    <div style="display:flex; align-items:center;">
        <span>${newCat.value}</span>
        <div class="addTask-category-dot" style="background-color:${currentPickedColor};"></div>
    </div>
    `;
    currentCat = topics.length - 1;
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
            <input type="text" id="subtaskInput" maxlength="32" class="new-cat-input">
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
        subtaskBox.innerHTML += `
            <div class="addTask-subtask-container">
                <input id="subtask${i}" type="checkbox" class="subtask-checkbox" onclick="changeSubtaskStatus('${i}')">
                <label class="subtask-text" for="subtask${i}">${text}</label>
            </div>
            `;
        let status = currentSubtasks[i]['status'];
        if (status == true) {
            let checkbox = document.getElementById(`subtask${i}`);
            checkbox.checked = true;
        }
    }
}

function addSubtask() {
    let input = document.getElementById('subtaskInput');
    currentSubtasks.push(
        {
            'text': input.value,
            'status': false
        }
    );
    input.value = '';
    clearSubtaskSection();
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
    let checkbox = document.getElementById(`subtask${i}`);
    if (checkbox.checked === true) {
        currentSubtasks[i]['status'] = true;
    }
    else {
        currentSubtasks[i]['status'] = false;
    }
}

function checkForEmptyFields() {
    if (currentPrio == "") {
        document.getElementById('emptyInputPopupPrio').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupPrio');
    }
    if (currentCat == "") {
        document.getElementById('emptyInputPopupCat').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupCat');
    }
    else {
        fieldsFilledCorrectly = true;
    }
}

function getInputsFromForm() {
    checkForEmptyFields();
    if (fieldsFilledCorrectly == false) {
        checkForEmptyFields();
    }
    else {
        let title = document.getElementById('addTask-title-input').value;
        let desc = document.getElementById('addTask-desc-input').value;
        let date = document.getElementById('addTaskDate').value;
        addTask(title, desc, date);
    }
}

function addTask(title, desc, date) {
    tasks.push(
        {
            'id': tasks.length,
            'category': 'toDo',
            'topic': currentCat,
            'headline': title,
            'description': desc,
            'date': date,
            'subtasks': currentSubtasks,
            'clients': currentAssignedClients,
            'prioName': currentPrio,
            'prioImg': currentPrioImageSource,
        },
    );
    clearVariables();
    showTaskAddedPopup();
}

function showTaskAddedPopup() {
    let popup = document.getElementById('taskAddedPopup');
    popup.classList.add('popup-animation');
    setTimeout((changeSite), 900, BOARD_ID);
    setTimeout((removeAddTaskWindow), 900);
}

function removeFillFieldPopup(id) {
    document.getElementById(id).classList.add('d-none');
}

function clearVariables() {
    currentCat = "";
    currentPrio = "";
    currentPrioImageSource = "";
    currentAssignedClients = "";
    currentSubtasks = "";
    fieldsFilledCorrectly = false;
}