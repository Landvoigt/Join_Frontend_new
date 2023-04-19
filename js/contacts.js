let contacts = [{
    'firstname':'Anton',
    'lastname':'Mayer',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'green'
},{
    'firstname':'Julia',
    'lastname':'Roberts',
    'mail':'juliar@gmx.com',
    'phone':'01234567',
    'color':'red'
},{
    'firstname':'Jonathan',
    'lastname':'Wick',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'blue'
},{
    'firstname':'Alfred',
    'lastname':'Niebuhr',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'purple'
},{
    'firstname':'Carlos',
    'lastname':'Sanros',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'grey'
},{
    'firstname':'Carmen',
    'lastname':'Müller',
    'mail':'Müller.C@gmx.com',
    'phone':'01234567',
    'color':'black'
},{
    'firstname':'Sven',
    'lastname':'Siebert',
    'mail':'Sven.T@live.de',
    'phone':'01786965354',
    'color':'cyan'
},{
    'firstname':'Robert',
    'lastname':'Koch',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
},{
    'firstname':'Peter',
    'lastname':'Heinrich',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
},{
    'firstname':'Rahul',
    'lastname':'Sharma',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
},{
    'firstname':'Michelle',
    'lastname':'Seiler',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
}
];  
let letters =[];
let contactsRandomColor;

function pushFirstLetter(){
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i]['firstname'];
        const firstLetter = name.charAt(0);
        
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }
    
    // Sortiere das letters-Array alphabetisch
    letters.sort(function(a, b){
        var letterA = a.toLowerCase();
        var letterB = b.toLowerCase();
        if (letterA < letterB) {
            return -1;
        }
        if (letterA > letterB) {
            return 1;
        }
        return 0;
    });
    
    renderLetters();
    createRandomColor();
    console.log(contactsRandomColor)
    
}

function renderLetters(){
    let contactsList = document.getElementById('contact-list');
    contactsList.innerHTML='';
    for (let j = 0; j < letters.length; j++) {
        const element = letters[j];
        contactsList.innerHTML+=/*html*/`
        <div id="${element}" class="flex-column">
            <div class="first-letter">${element}</div>
        </div>`;
        renderContacts(element)
    }
}

function renderContacts(id){
    let letterBox = document.getElementById(`${id}`);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstName = contact['firstname'];
        const lastName = contact['lastname'];
        if (firstName.includes(id)) {
             letterBox.innerHTML+=/*html*/`
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
        
    }
}

function openContact(id){
    let firstNames = contacts[id]['firstname'];
    const lastNames = contacts[id]['lastname'];
    let contactPopup = document.getElementById('card-popup');
        contactPopup.innerHTML='';
        contactPopup.innerHTML+=/*html*/`
        <div class="d-flex">
             <div style="background-color:${contacts[id]['color']};" id="initialen-${id}" class="initials-big">
                ${firstNames.charAt(0)}${lastNames.charAt(0)}
            </div>
            <div class="card-headline flex-column">
               ${firstNames} ${lastNames}
               <div onclick="showAddTaskWindow()" class="add-task-btn"> <img src="./img/plus_lightblue.png" alt=""> Add Task</div>
            </div>
        </div>
        <div class="contact-infos">
                    Contact Information    <span style="font-size:16px; "><img src="./img/pencil.png" alt=""> Edit Task</span>
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

function openCreateContact() {
    let popupBG = document.getElementById('create-contact-bg');
    let contactsForm = document.getElementById('contacts-popup');
    popupBG.classList.remove('d-none');
    contactsForm.classList.remove('move-out');
    contactsForm.classList.add('move-in');
    popupBG.classList.add('dark');
    popupBG.classList.remove('light');
  }
  
  

  function closeCreateContact(){
    let contactPopup = document.getElementById('contacts-popup');
    document.getElementById('create-contact-bg').classList.remove('dark');
    contactPopup.classList.remove('move-in')
    document.getElementById('create-contact-bg').classList.add('light');
    contactPopup.classList.add('move-out');
    setTimeout(function() {
      document.getElementById('create-contact-bg').classList.add('d-none');
    }, 1200);
    
  }
  
  function createRandomColor() {
    currentPickedColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    contactsRandomColor = currentPickedColor;
}
  function createNewContact(){
    let Firstname = document.getElementById('contacts-firstname').value;
    let Lastname = document.getElementById('contacts-lastname').value;
    let Mail = document.getElementById('contacts-mail').value;
    let Phone = document.getElementById('contacts-phone').value;
    contacts.push(
        {
            'firstname':Firstname,
            'lastname':Lastname,
            'mail':Mail,
            'phone':Phone,
            'color':contactsRandomColor
        }
    )
    console.log(contacts);
    closeCreateContact();
    pushFirstLetter();
    resetInputValue();
  }

  function resetInputValue(){
    let addContactForms = document.querySelectorAll('.add-contact-form');

    for (let i = 0; i < addContactForms.length; i++) {
     addContactForms[i].value = '';
    }

  }
