function addPrioColor(id) {
    let element = document.getElementById(id);
    let target = element.classList.contains(`${id}-highlight`);
    let icon = document.getElementById(`${id}Icon`);
    document.getElementById('redIcon').classList.remove('img-brightening');
    document.getElementById('yellowIcon').classList.remove('img-brightening');
    document.getElementById('greenIcon').classList.remove('img-brightening');
    if (target) {
        element.classList.remove(`${id}-highlight`);
    }
    else {
        if (id == 'red') {
            element.classList.add('red-highlight');
            document.getElementById('yellow').classList.remove('yellow-highlight');
            document.getElementById('green').classList.remove('green-highlight');
            icon.classList.add('img-brightening');
        }
        if (id == 'yellow') {
            element.classList.add('yellow-highlight');
            document.getElementById('red').classList.remove('red-highlight');
            document.getElementById('green').classList.remove('green-highlight');
            icon.classList.add('img-brightening');
        }
        if (id == 'green') {
            element.classList.add('green-highlight');
            document.getElementById('yellow').classList.remove('yellow-highlight');
            document.getElementById('red').classList.remove('red-highlight');
            icon.classList.add('img-brightening');
        }
    }
}

function showCurrentDate() {
    document.getElementById('addTaskDate').value = new Date().toLocaleDateString('en-GB');
}