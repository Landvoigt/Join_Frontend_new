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
    if (currenthour > 5 && currenthour <= 12) {
        document.getElementById('greeting').innerHTML = 'Good Morning';
    } if (currenthour > 12 && currenthour <= 18) {
        document.getElementById('greeting').innerHTML = 'Good Afternoon';
    } if (currenthour > 18 && currenthour <= 24) {
        document.getElementById('greeting').innerHTML = 'Good Evening';
    } if (currenthour >= 0 && currenthour <= 5) {
        document.getElementById('greeting').innerHTML = 'Good Night';
    }
}

/// gerne kürzer und einfacher machen wenn jemand weiß wie :) gruß Tim 
// hab's versucht :) gruß Kaser
// aja geht ja auch mit filter funktion danke nice :)

function checkForTaskNumbers() {
    let allTasks = document.getElementById('allTasksNr');
    const toDos = tasks.filter(t => t.category === 'toDo');
    const progressTasks = tasks.filter(p => p.category === 'inProgress');
    const awaitFeedback = tasks.filter(a => a.category === 'awaitFeedback');
    const done = tasks.filter(d => d.category === 'done');
    const urgentTasks = tasks.filter(u => u.prioName === 'urgent');
    allTasks.innerHTML = tasks.length;
    document.getElementById('toDoTasksNr').innerHTML = toDos.length;
    document.getElementById('progressTasksNr').innerHTML = progressTasks.length;
    document.getElementById('waitingTasksNr').innerHTML = awaitFeedback.length;
    document.getElementById('doneTasksNr').innerHTML = done.length;;
    document.getElementById('urgentTasksNr').innerHTML = urgentTasks.length;

}

/** 
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
    */