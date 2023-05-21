function singleContactBoxTemplate(i,id,contact,firstName,lastName){
    return/*html*/`
    <div class="single-contact-box" id="single-contact-box-${i}" onclick="openContact(${i})">
        <div id="initials-${i}" style="background-color:${contact['color']};" class="initials">
            ${id}${lastName.charAt(0)}
        </div>
        <div class="contact-names">
            ${contact.firstname} ${contact.lastname} <br>
            <a  href="mailto:${contact['mail']}">${contact['mail']}</a>
        </div>
    </div>
`;
}


function openContactTemplate(firstNames,lastNames,id){
    return/*html*/`
    <div class="d-flex">
         <div style="background-color:${contacts[id]['color']};" id="initialen-${id}" class="initials-big">
            ${firstNames.charAt(0)}${lastNames.charAt(0)}
        </div>
        <div class="card-headline flex-column">
           ${firstNames} ${lastNames}
           <div onclick="showAddTaskWindow()" class="add-task-btn"> <img src="./img/plus_lightblue.png" alt=""><span>Add Task</span> </div>
        </div>
    </div>
    <div class="contact-infos">
         Contact Information <span class="edit-contact" id="edit-contact" onclick="openEditContact(${id})"><img src="./img/pencil.png" alt=""> Edit Contact</span>
    </div>
    <div class="card-mail flex-column">
        <b>Email</b>
        <a href="mailto:${contacts[id]['mail']}">${contacts[id]['mail']}</a>
    </div>
    <div style="font-size:16px; gap:15px; margin-top:22px" class="flex-column">
        <b style="font-weight:700;">Phone</b>
        <span>${contacts[id]['phone']}</span>
    </div> `;
}