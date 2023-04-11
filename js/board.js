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
        'id': 2,
        'category': 'awaitFeedback',
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
        'id': 3,
        'category': 'done',
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
];



function generateTask(){
    return `
    <div class="task-box">
            <span class="task-category">Sales</span>
            <span class="task-headline">Website Redesign</span>
            <span class="task-description">Modify the contents of the main website specific ...</span>
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