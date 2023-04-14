let tasks = [
    {
        'id': 0,
        'category': 'toDo',
        'topic': 'Design',
        'color': 'orange',
        'headline': 'Website Redesign',
        'description': 'Modify the contents of the main website specific ...',
        'date': '13/04/2023',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prioName': 'urgent',
        'prioImg': './img/prio_urgent.png',
    },
    {
        'id': 1,
        'category': 'inProgress',
        'topic': 'Sales',
        'color': 'aqua',
        'headline': 'Call potential clients',
        'description': 'Make the product presentation to prospective buyers',
        'date': '13/04/2023',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prioName': 'medium',
        'prioImg': './img/prio_medium.png',
    },
    {
        'id': 2,
        'category': 'awaitFeedback',
        'topic': 'Backoffice',
        'color': 'purple',
        'headline': 'Accounting invoices',
        'description': 'Write open invoices for customer',
        'date': '13/04/2023',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prioName': 'low',
        'prioImg': './img/prio_low.png',
    },
    {
        'id': 3,
        'category': 'awaitFeedback',
        'topic': 'Media',
        'color': 'yellow',
        'headline': 'Video cut',
        'description': 'Edit the new company video',
        'date': '13/04/2023',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prioName': 'medium',
        'prioImg': './img/prio_medium.png',
    },
    {
        'id': 4,
        'category': 'done',
        'topic': 'Marketing',
        'color': 'blue',
        'headline': 'Social media strategy',
        'description': 'Develop an ad campain for brand positioning',
        'date': '13/04/2023',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prioName': 'low',
        'prioImg': './img/prio_low.png',
    }
];

let currentDraggedElement;
let currentPrioColor;

function updateTasks() {
    let todo = tasks.filter(t => t['category'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('toDo').innerHTML += generateTask(element);
    }

    let inProgress = tasks.filter(t => t['category'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTask(element);
    }

    let awaitFeedback = tasks.filter(t => t['category'] == 'awaitFeedback');
    document.getElementById('awaitFeedback').innerHTML = '';

    for (let i = 0; i < awaitFeedback.length; i++) {
        const element = awaitFeedback[i];
        document.getElementById('awaitFeedback').innerHTML += generateTask(element);
    }

    let done = tasks.filter(t => t['category'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTask(element);
    }
}

function generateTask(task) {
    return /*html*/ `
        <div class="task-box" draggable="true" ondragstart="startDragging(${task['id']})" onclick="showDetailedTask(${task['id']})">
            <span class="task-category" style="background-color: ${task['color']}">${task['topic']}</span>
            <span class="task-headline">${task['headline']}</span>
            <span class="task-description">${task['description']}</span>
            <div class="progress-container">
                <div class="progress-box">
                    <div class="progress-bar" style="width:50%"></div>
                  </div>
                <span>1/2 Done</span>
            </div>
            <div class="task-assignment-section">
                <div class="task-clients-container">
                    <div class="task-client">SM</div>
                    <div class="task-client m-l-negative">MV</div>
                    <div class="task-client m-l-negative">EF</div>
                </div>
                <img src="${task['prioImg']}" class="task-prio-icon">
            </div>
        </div>
    `;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    updateTasks();
}

function showHighlight(id) {
    document.getElementById(id).classList.add('drag-over-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-over-highlight');
}

function changeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "./img/plus_lightblue.png";
}

function removeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "./img/plus.png";
}

function showDetailedTask(id) {
    checkPrioColor(id);
    let task = tasks[id];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
    <div class="popup-task" onclick="stopPropagation(event)">
        <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
        <img class="edit-btn" src="./img/pencil_white.png" onclick="editDetailedTask(${id})">
        <span class="task-category popup-category" style="background-color: ${task['color']}">${task['topic']}</span>
        <h2 class="popup-headline">${task['headline']}</h2>
        <span class="popup-span">${task['description']}</span>
        <span class="popup-span"><b>Due date:</b>${task['date']}</span>
        <div class="popup-span" style="display:flex; align-items:center">
            <span><b>Priority:</b></span>
            <span class="task-category" style="background-color: ${currentPrioColor}">${task['prioName']}
                <img src="${task['prioImg']}" class="popup-prio-icon img-brightening">
            </span>
        </div>
        <span class="popup-span"><b>Assigned to:</b></span>
        <div id="popupClientContainer${id}" class="popup-clients-container">
            <div class="popup-client-box">
                <div class="task-client task-client-big">DE</div>
                <span class="popup-client-span">David Eisenberg</span>
            </div>
            <div class="popup-client-box">
                <div class="task-client task-client-big">DE</div>
                <span class="popup-client-span">David Eisenberg</span>
            </div>
            <div class="popup-client-box">
                <div class="task-client task-client-big">DE</div>
                <span class="popup-client-span">David Eisenberg</span>
            </div>
            <div class="popup-client-box">
                <div class="task-client task-client-big">DE</div>
                <span class="popup-client-span">David Eisenberg</span>
            </div>
            <div class="popup-client-box">
                <div class="task-client task-client-big">DE</div>
                <span class="popup-client-span">David Eisenberg</span>
            </div>
        </div>
    </div>
    `;
}

function checkPrioColor(id) {
    let prio = tasks[id]['prioName'];
    if (prio == 'urgent') {
        currentPrioColor = '#ff3d00';
    }
    if (prio == 'medium') {
        currentPrioColor = '#ffa800';
    }
    if (prio == 'low') {
        currentPrioColor = '#7ae229';
    }
}

function editDetailedTask(id) {
    let task = tasks[id];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
    <div class="popup-task" onclick="stopPropagation(event)">
        <img class="back-btn" src="./img/plus.png" onclick="removeAddTaskWindow()">
        <button class="submit-btn btn-absolute" onclick="saveEditedTaskInformation(${id})">Ok ✓</button>
        <div class="popup-text-boxes">
            <h4 class="addTask-form-headlines">Title</h4>
            <input id="task${id}" placeholder="Enter a title" maxlength="40" onfocus="this.value=''" value="${task['headline']}">
        </div>
        <div class="popup-text-boxes">
            <h4 class="addTask-form-headlines">Description</h4>
            <textarea id="desc${id}" placeholder="Enter a description" maxlength="200" onfocus="this.value=''">${task['description']}</textarea>
        </div>
        <div class="popup-text-boxes">
            <h4 class="addTask-form-headlines">Due date</h4>
            <div style="position: relative;">
                <img class="calendar-icon" src="./img/calendar.png"></img>
                <input class="pointer" id="addTaskDate" placeholder="dd/mm/yyyy" value="${task['date']}">
            </div>
        </div>
        <div class="popup-text-boxes">
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
        <div class="popup-text-boxes">
            <h4 class="addTask-form-headlines">Assigned to</h4>
            <select id="addTaskAssignedContacts">
                <option value="" disabled selected>Select contacts to assign</option>
                <option>Kaser</option>
                <option>Niko</option>
                <option>Tim</option>
            </select>
        </div>
        <div class="popup-text-boxes">
            <div class="task-clients-container m-t-20">
                <div class="task-client task-client-big m-r-8">SM</div>
                <div class="task-client task-client-big m-r-8">MV</div>
                <div class="task-client task-client-big m-r-8">EF</div>
            </div>
        </div>
    </div>
    `;
}

function saveEditedTaskInformation(id) {
    updateTasks();
    showDetailedTask(id);
}