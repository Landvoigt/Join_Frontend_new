function getDetailedTaskHTML(id) {
    let task = tasks[id];
    let topicName = topics[task['topic']]['name'];
    let topicColor = topics[task['topic']]['color'];
    let popup = document.getElementById('popupWindow');
    popup.classList.remove('d-none');
    popup.classList.remove('light');
    popup.classList.add('dark');
    popup.innerHTML = '';
    popup.innerHTML = `
        <div class="popup-task" onclick="stopPropagation(event)">
            <img class="back-btn back-btn-none" src="./img/plus.png" onclick="removeDetailedTaskWindow()">
            <img src="./img/back_arrow.png" class="back-arrow-responsive-popup" onclick="removeDetailedTaskWindow()">
            <div class="edit-and-delete-box">
                <img class="delete-btn" src="./img/delete.png" onclick="deleteShownTask(${id})">
                <img class="edit-btn" src="./img/pencil_white.png" onclick="editDetailedTask(${id})">
            </div>
            <span class="task-category popup-category" style="background-color: ${topicColor}">${topicName}</span>
            <h2 class="popup-headline">${task['headline']}</h2>
            <span class="popup-span">${task['description']}</span>
            <span class="popup-span"><b>Due date:</b>${task['date']}</span>
            <div class="popup-span" style="display:flex; align-items:center">
                <span><b>Priority:</b></span>
                <span class="task-category popup-prio" style="background-color: ${currentPrioColor}">${currentPrio}
                    <img src="${task['prioImg']}" class="popup-prio-icon img-brightening">
                </span>
            </div>
            <span class="popup-span"><b>Assigned to:</b></span>
            <div id="popupClientSection${id}" class="popup-clients-container">
            </div>
            <span id="popupSubtaskHeadline${id}" class="popup-span m-t-5"><b>Subtasks</b></span>
            <div id="popupSubtaskSection${id}" class="popup-subtask-container"></div>
        </div>
         `;
}