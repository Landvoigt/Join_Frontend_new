/**
 * checks if the current clicked button already contains a color, then removes the highlighted icon. 
 * @param {*ID of clicked prio button} id 
 */
function addPrioColor(id) {
    let element = document.getElementById(id);
    let target = element.classList.contains(`${id}-highlight`);
    removeIMGBrightening();
    if (target) {
        removePrioHighlight(element, id);
    }
    else {
        detectCurrentClickedPrio(id);
    }
}


/**
 * removes highlighted Icon from all buttons
 */
function removeIMGBrightening() {
    document.getElementById('urgentIcon').classList.remove('img-brightening');
    document.getElementById('mediumIcon').classList.remove('img-brightening');
    document.getElementById('lowIcon').classList.remove('img-brightening');
}


/**
 * removes color from highlighted button and resets variables
 * @param {*clicked prio button} element 
 * @param {*ID of clicked prio button} id 
 */
function removePrioHighlight(element, id) {
    element.classList.remove(`${id}-highlight`);
    currentPrio = '';
    currentPrioImageSource = '';
}


/**
 * detects the right button by the ID
 * @param {*ID of clicked prio button} id 
 */
function detectCurrentClickedPrio(id) {
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


/**
 * adds the color to the clicked prio button and icon and removes it from the others
 * @param {*ID of clicked prio button} shownPrio 
 * @param {*ID of nonclicked prio button} hidingPrio1 
 * @param {*ID of nonclicked prio button} hidingPrio2 
 */
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


/**
 * resets ID´s of popup container and addTask site
 * @returns ID of popup container
 */
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


/**
 * if dropdown gets clicked it shows the options menu otherwise it closes the options menu
 * @param {*ID of current dropdown options} select 
 * @param {*ID of current dropdown container} container 
 */
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


/**
 * closes all dropdowns
 */
function closeDropdown() {
    let closeOptions = document.querySelectorAll('.category-selection');
    let removeBorder = document.querySelectorAll('.dropdown');
    for (let i = 0; i < closeOptions.length; i++) {
        closeOptions[i].style.display = "none";
        removeBorder[i].classList.remove('selection-border-align');
    }
    showCheckBoxes = !showCheckBoxes;
}


/**
 * generates the categories in the hidden category options menu
 */
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


/**
 * shows the clicked category in the input field with it´s color
 * @param {ID of the clicked category} i 
 */
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


/**
 * generates your contacts in the hidden contact options menu, then shows already assigned contacts 
 */
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


/**
 * if checkbox is checked removes contact from current assigned otherwise adds contact
 * @param {ID of clicked contact} i 
 */
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


/**
 * shows a little colored container with initials for every assigned contact
 */
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


/**
 * removes clicked current assigned client container and resets checkbox
 * @param {*ID of clicked contact} i 
 */
function removeClient(i) {
    let clientID = currentAssignedClients.indexOf(`${i}`);
    currentAssignedClients.splice(clientID, 1);
    let checkbox = document.getElementById(`contactCheckbox${i}`);
    checkbox.checked = false;
    let client = document.getElementById(`addedClient${i}`);
    client.remove();
}


/**
 * HTML for the assigned client container with initials and color
 * @param {*ID of clicked contact} id 
 */
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


/**
 * removes borders from all colors first then adds a border to clicked color
 * @param {*ID of picked color} id 
 */
function addBorderToPickedColor(id) {
    const colors = document.querySelectorAll('.dot-hover');
    for (let i = 0; i < colors.length; i++) {
        colors[i].classList.remove('color-dot-bg');
    }
    let pickedColor = document.getElementById(`${id}`);
    pickedColor.classList.add('color-dot-bg');
}


/**
 * gets the clicked color the creates new category, saves it, resets the dropdown and shows the new category 
 */
async function addCategory() {
    checkPickedColor();
    let newCat = document.getElementById('new-cat-input');
    if (newCat.value.length > 1) {
        topics.push(
            {
                'name': `${newCat.value}`,
                'color': `${currentPickedColor}`
            }
        );
        await setItemTopics(topics);
        resetAddCategorySection();
        document.getElementById('categoryDropdown').innerHTML = newGivenCategoryHTML(newCat);
        currentCat = topics.length - 1;
    }
}


/**
 * if no color is chosen or color already exists it creates random color
 */
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


/**
 * shows all subtasks and checks the boxes if already done
 */
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


/**
 * pushes a new subtask in subtask array and clears subtask container
 */
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


/**
 * if the user presses the "Enter" key on the keyboard it also adds new subtask
 */
function addSubtaskOnEnter() {
    let subtaskInputField = document.getElementById('subtaskInput');
    subtaskInputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addSubtask();
        }
    });
}


/**
 * changes subtask status
 */
function changeSubtaskStatus(i) {
    if (currentSubtasks[i]['status'] === true) {
        currentSubtasks[i]['status'] = false;
    }
    else {
        currentSubtasks[i]['status'] = true;
    }
}