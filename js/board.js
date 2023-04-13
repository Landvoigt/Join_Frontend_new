let tasks = [
    {
        'id': 0,
        'category': 'toDo',
        'topic': 'Sales',
        'color': 'orange',
        'headline': 'Website Redesign',
        'description': 'Modify the contents of the main website specific ...',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prio': './img/prio_urgent.png',
    },
    {
        'id': 1,
        'category': 'inProgress',
        'topic': 'Backend',
        'color': 'lightblue',
        'headline': 'Website Redesign',
        'description': 'Modify the contents of the main website specific ...',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prio': './img/prio_urgent.png',
    },
    {
        'id': 2,
        'category': 'awaitFeedback',
        'topic': 'Frontend',
        'color': 'green',
        'headline': 'Website Redesign',
        'description': 'Modify the contents of the main website specific ...',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prio': './img/prio_urgent.png',
    },
    {
        'id': 3,
        'category': 'done',
        'topic': 'Hallo',
        'color': 'aqua',
        'headline': 'Website Redesign',
        'description': 'Modify the contents of the main website specific ...',
        'subtasksNumber': 2,
        'progression': 1,
        'client1': 'SM',
        'client2': 'MV',
        'client3': 'EF',
        'prio': './img/prio_urgent.png',
    },
];

let currentDraggedElement;

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
                <img src="./img/prio_urgent.png" class="task-prio-icon">
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
    let task = tasks[id];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    popup.innerHTML = `
    <div class="popup-task" onclick="stopPropagation(event)">
        <div class="addTask-form-left-container">
            <div>
                <h4 class="addTask-form-headlines">Title</h4>
                <input id="task${id}" placeholder="Enter a title" maxlength="40">
            </div>
            <div>
                <h4 class="addTask-form-headlines">Description</h4>
                <textarea placeholder="Enter a description" maxlength="200">${task['description']}</textarea>
            </div>
        </div>
    </div>
    `;
    document.getElementById(`task${id}`).value = `${task['headline']}`;
}