function loadDate() {
    const currentDate = new Date();
    let dateContainer = document.getElementById('date');
    const currenthour = currentDate.getHours();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    dateContainer.innerHTML = formattedDate;
    greetAccordingToTime(currenthour);
}

function greetAccordingToTime(currenthour) {
    if (currenthour < 12) {
        document.getElementById('greeting').innerHTML = 'Good Morning';
    } if (currenthour < 18) {
        document.getElementById('greeting').innerHTML = 'Good Afternoon';
    } else {
        document.getElementById('greeting').innerHTML = 'Good Evening';
    }
}

/// gerne kürzer und einfacher machen wenn jemand weiß wie :) gruß Tim 

function checkForTaskNumbers() {
    let allTasks = document.getElementById('allTasksNr');
    allTasks.innerHTML = tasks.length;
    let toDos = 0;
    let progressTasks = 0;
    let awaitTasks = 0;
    let doneTasks = 0;
    let urgentTasks = 0;
    for (let i = 0; i < tasks.length; i++) {
        let cat = tasks[i]['category'];
        let prio = tasks[i]['prioName'];
        if(cat == 'toDo'){
            toDos++;
        } 
        if(cat == 'inProgress'){
            progressTasks++;
        } 
        if(cat == 'awaitFeedback'){
            awaitTasks++;
        } 
        if(cat == 'done'){
            doneTasks++;
        } 
        if(prio == 'urgent'){
            urgentTasks++;
        } 
    }
    document.getElementById('progressTasksNr').innerHTML = progressTasks;
    document.getElementById('waitingTasksNr').innerHTML = awaitTasks;
    document.getElementById('toDoTasksNr').innerHTML = toDos;
    document.getElementById('doneTasksNr').innerHTML = doneTasks;
    document.getElementById('urgentTasksNr').innerHTML = urgentTasks;
}