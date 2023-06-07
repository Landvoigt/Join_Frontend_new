/**
 * Shows the current Date
 */
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
    setUsernameToGreet();
}

/**
 * This function is to greet with the right form 
 * @param {number} currenthour 
 */
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

/**
 * Greets according the Username
 */
function setUsernameToGreet() {
    if (currentUser.length == 0) {
        document.getElementById('userFirstName').innerHTML = 'Dear Guest';
    }
    else {
        document.getElementById('userFirstName').innerHTML = `${currentUser[0]['name']}`;
    }
}

/**
 * Show the number of Tasks in Summary
 */
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
    document.getElementById('doneTasksNr').innerHTML = done.length;
    document.getElementById('urgentTasksNr').innerHTML = urgentTasks.length;
}