/**
 * loads tasks from server
 */
async function loadTasks() {
    try {
        tasks = await getItem('tasks');
        if (tasks) {
            updateTasks();
        }
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * loads task topics from server
 */
async function loadTopics() {
    try {
        topics = await getItem('topics');
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * updates every section of the board
 */
function updateTasks() {
    updateTaskSection('toDo');
    updateTaskSection('inProgress');
    updateTaskSection('awaitFeedback');
    updateTaskSection('done');
}


/**
 * filters all the tasks by topics then shows them in the right section on the board
 */
function updateTaskSection(id) {
    let cat = tasks.filter(t => t['category'] == `${id}`);
    document.getElementById(`${id}`).innerHTML = '';
    for (let i = 0; i < cat.length; i++) {
        let taskSection = document.getElementById(`${id}`);
        let task = cat[i];
        getTaskInformationFromArray(task, taskSection);
        checkForSubtasks(task, task['id']);
        showClients(task);
    }
}


/**
 * gets some information from the tasks and shows them in the small task container 
 */
function getTaskInformationFromArray(task, taskSection) {
    let topicId = task['topic'];
    let matchingTopic = topics.find(topic => topic.id === topicId);
    let topicName = matchingTopic.title;
    let topicColor = matchingTopic.color;
    let doneSubtasks = task['subtasks'].filter(s => s.status === true);
    let progress = doneSubtasks.length;
    let subtasksAmount = task['subtasks'].length;
    generateTask(task, taskSection, topicName, topicColor, progress, subtasksAmount);
}


/**
 * shows every assigned client of the task
 */
function showClients(task) {
    let clientSection = document.getElementById(`taskClientSection${task['id']}`);
    let clientsAmount = task['assigned_clients'].length;
    let clients = task['assigned_clients'];
    for (let i = 0; i < clients.length; i++) {
        let clientID = clients[i];
        let index = contacts.findIndex(c => c['id'] == clientID);
        if (index !== -1) {
            let initials = contacts[index]['initials'];
            let color = contacts[index]['color'];
            changeDesignBasedOnClientsAmount(i, clientSection, clientsAmount, initials, color);
        }
    }
}


/**
 * shows the style of the assigned clients different based on the amount of clients
 */
function changeDesignBasedOnClientsAmount(i, clientSection, clientsAmount, initials, color) {
    if (i < 2) {
        generateAssignedClientHTML(clientSection, initials, color);
        if (i == 1) {
            clientSection.getElementsByTagName('div')[1].classList.add('m-l-negative');
        }
    }
    if (i == 2 && clientsAmount > 3) {
        generateAssignedClientHTML(clientSection, `+${clientsAmount - 2}`, 'black');
        moveClientDivLeft(clientSection);
    }
    if (i == 2 && clientsAmount == 3) {
        generateAssignedClientHTML(clientSection, initials, color);
        moveClientDivLeft(clientSection);
    }
}


/**
 * generates the container for the clients
 */
function generateAssignedClientHTML(clientSection, initials, color) {
    clientSection.innerHTML += `
        <div class="task-client f-center" style="background-color:${color};">${initials}</div>
    `;
}


/**
 * moves the circles to the left for better optic
 */
function moveClientDivLeft(clientSection) {
    clientSection.getElementsByTagName('div')[1].classList.add('m-l-negative');
    clientSection.getElementsByTagName('div')[2].classList.add('m-l-negative');
}


/**
 * saves the task ID fro the dragging function
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * allows the element to drop
 */
function allowDrop(event) {
    event.preventDefault();
}


/**
 * saves the new location of the task on the server and updates the tasks after
 */
async function moveTo(category) {
    getTask(currentDraggedElement)['category'] = category;
    updateTasks();
    let taskToUpdate = {
        "id": currentDraggedElement,
        "category": category
    }
    await updateItem('tasks', taskToUpdate);
}


/**
 * Moves the selected task to the category above it.
 * @param {number} elementId - The ID of the task to be moved.
 */
async function upCategory(elementId) {
    let currentTask = getTask(elementId);
    let currentCategoryIndex = categoriesOrder.indexOf(currentTask.category);
    if (currentCategoryIndex > 0) {
        currentTask.category = categoriesOrder[currentCategoryIndex - 1];
        updateTasks();
        let taskToUpdate = {
            "id": elementId,
            "category": currentTask.category
        }
        await updateItem('tasks', taskToUpdate);
    }
}


/**
 * Moves the selected task to the category below it.
 * @param {number} elementId - The ID of the task to be moved.
 */
async function downCategory(elementId) {
    let currentTask = getTask(elementId);
    let currentCategoryIndex = categoriesOrder.indexOf(currentTask.category);
    if (currentCategoryIndex < categoriesOrder.length - 1) {
        currentTask.category = categoriesOrder[currentCategoryIndex + 1];
        updateTasks();
        let taskToUpdate = {
            "id": elementId,
            "category": currentTask.category
        }
        await updateItem('tasks', taskToUpdate);
    }
}


/**
 * shows a darker color when hovered over the drop container
 */
function showHighlight(id) {
    document.getElementById(id).classList.add('drag-over-highlight');
}


/**
 * removes the hover color from the container
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-over-highlight');
}


/**
 * changes the color of the small icon when hovered
 */
function changeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "../assets/icons/plus_lightblue.png";
}


/**
 * removes the hovered color of the small icon
 */
function removeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "../assets/icons/plus_blue.png";
}


/**
 * shows the progress of the subtasks based on the amount of subtasks
 */
function checkForSubtasks(task, id) {
    let subtasksAmount = task['subtasks'].length;
    let progress = document.getElementById(`progressContainer${id}`);
    if (subtasksAmount == 0) {
        progress.innerHTML = '';
    }
    else {
        progress.style = 'padding-bottom: 20px;'
    }
}


/**
 * shows the filtered tasks in every board section
 */
function filterTasks() {
    showFilteredTasks('toDo');
    showFilteredTasks('inProgress');
    showFilteredTasks('awaitFeedback');
    showFilteredTasks('done');
}


/**
 * filters the tasks by headline and/or description
 */
function showFilteredTasks(id) {
    let searchField = document.getElementById('searchTasks').value.toLowerCase();
    let cat = tasks.filter(t => t['category'] == `${id}`);
    document.getElementById(`${id}`).innerHTML = '';
    for (let i = 0; i < cat.length; i++) {
        let taskSection = document.getElementById(`${id}`);
        let task = cat[i];
        let filterHeadline = task.title.toLowerCase().includes(searchField);
        let filterDescription = task.description.toLowerCase().includes(searchField);
        if (filterHeadline) {
            getTaskInformationFromArray(task, taskSection);
            checkForSubtasks(task, task['id']);
        } else if (filterDescription) {
            getTaskInformationFromArray(task, taskSection);
            checkForSubtasks(task, task['id']);
        }
    }
}


/**
 * sets the current assigned category
 */
function setAssignment(id) {
    currentAssignment = id;
}


/**
 * Retrieves a task by its ID from the tasks array.
 * @param {number} taskID - The ID of the task to retrieve.
 * @returns {?Object} - The task object if found, or null if not found.
 */
function getTask(taskID) {
    let foundTask = tasks.find(task => task.id === taskID);
    return foundTask;
}


/**
 * Retrieves the topic associated with a task by its ID from the topics array.
 * @param {number} taskID - The ID of the task to retrieve the topic for.
 * @returns {?Object} - The topic object if found, or null if not found.
 */
function getTopic(taskID) {
    let task = tasks.find(task => task.id === taskID);
    let topicID = task['topic'];
    let foundTopic = topics.find(topic => topic.id === topicID);
    return foundTopic;
}