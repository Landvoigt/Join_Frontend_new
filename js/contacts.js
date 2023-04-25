let contacts = [{
    'firstname': 'Anton',
    'lastname': 'Mayer',
    'initials': 'AM',
    'mail': 'anton-mayer@gmx.com',
    'phone': '01234567',
    'color': 'green'
}, {
    'firstname': 'Julia',
    'lastname': 'Roberts',
    'initials': 'JR',
    'mail': 'juliar@gmx.com',
    'phone': '01234567',
    'color': 'red'
}, {
    'firstname': 'Jonathan',
    'lastname': 'Wick',
    'initials': 'JW',
    'mail': 'anton-mayer@gmx.com',
    'phone': '01234567',
    'color': 'blue'
}, {
    'firstname': 'Alfred',
    'lastname': 'Niebuhr',
    'initials': 'AN',
    'mail': 'anton-mayer@gmx.com',
    'phone': '01234567',
    'color': 'purple'
}, {
    'firstname': 'Carlos',
    'lastname': 'Sanros',
    'initials': 'CS',
    'mail': 'anton-mayer@gmx.com',
    'phone': '01234567',
    'color': 'grey'
}, {
    'firstname': 'Carmen',
    'lastname': 'Müller',
    'initials': 'CM',
    'mail': 'Müller.C@gmx.com',
    'phone': '01234567',
    'color': 'orange'
}, {
    'firstname': 'Peter',
    'lastname': 'Heinrich',
    'initials': 'PH',
    'mail': 'Sven.T@live.de',
    'phone': '01234567',
    'color': 'brown'
}, {
    'firstname': 'Rahul',
    'lastname': 'Sharma',
    'initials': 'RS',
    'mail': 'Sven.T@live.de',
    'phone': '01234567',
    'color': 'brown'
}
];
let letters = [];
let contactsRandomColor;
let lastSelectedContact;

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }

}

async function setItemContacts(contacts) {
    await setItem('contacts', JSON.stringify(contacts));
}

async function pushFirstLetter() {
    await loadContacts();
    letters = [];
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i]['firstname'];
        const firstLetter = name.charAt(0);

        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }

    // Sortiere das letters-Array alphabetisch
    letters.sort(function (a, b) {
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
}

function renderLetters() {
    let contactsList = document.getElementById('contact-list');
    contactsList.innerHTML = '';
    for (let j = 0; j < letters.length; j++) {
        const letter = letters[j];
        contactsList.innerHTML +=/*html*/`
        <div id="${letter}" class="flex-column">
            <div class="first-letter">${letter}</div>
        </div>`;
        renderContacts(letter)
    }
}

async function renderContacts(id) {
    console.log(contacts)
    let letterBox = document.getElementById(`${id}`);

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstName = contact['firstname'];
        const lastName = contact['lastname'];
        if (firstName.startsWith(id)) {
            letterBox.innerHTML +=/*html*/`
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
function openContact(id) {
    highlightSelectedContact(id)
    let firstNames = contacts[id]['firstname'];
    const lastNames = contacts[id]['lastname'];
    let contactPopup = document.getElementById('card-popup');
    contactPopup.innerHTML = '';
    contactPopup.innerHTML +=/*html*/`
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
             Contact Information<span class="edit-contact" onclick="openEditContact(${id})"><img src="./img/pencil.png" alt=""> Edit Contact</span>
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
function highlightSelectedContact(id) {
    const currentContact = document.getElementById(`single-contact-box-${id}`);
    if (lastSelectedContact !== undefined) {//wenn lastselectedcontact nicht undefiniert wird von dem ausgewählten contact die hintergrundfarbe entfernt
        lastSelectedContact.classList.remove('bg-highlight');

    }
    currentContact.classList.add('bg-highlight');
    lastSelectedContact = currentContact;

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



function closeCreateContact() {
    let contactPopup = document.getElementById('contacts-popup');
    document.getElementById('create-contact-bg').classList.remove('dark');
    contactPopup.classList.remove('move-in')
    document.getElementById('create-contact-bg').classList.add('light');
    contactPopup.classList.add('move-out');
    setTimeout(function () {
        document.getElementById('create-contact-bg').classList.add('d-none');
    }, 1200);

}

function createRandomColor() {
    currentPickedColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    contactsRandomColor = currentPickedColor;
}
async function createNewContact() {
    let Firstname = document.getElementById('contacts-firstname').value;
    Firstname = Firstname.charAt(0).toUpperCase() + Firstname.slice(1);
    let Lastname = document.getElementById('contacts-lastname').value;
    Lastname = Lastname.charAt(0).toUpperCase() + Lastname.slice(1);
    let Mail = document.getElementById('contacts-mail').value;
    let Phone = document.getElementById('contacts-phone').value;
    contacts.push(
        {
            'firstname': Firstname,
            'lastname': Lastname,
            'initials': Firstname.charAt(0) + Lastname.charAt(0),
            'mail': Mail,
            'phone': Phone,
            'color': contactsRandomColor
        }
    )
    await setItemContacts(contacts);
    closeCreateContact();
    pushFirstLetter();
    resetInputValue();
    createdSuccessfully();
}
function createdSuccessfully() {
    let banner = document.getElementById('created-successfully-logo');
    banner.classList.remove('move-down');
    banner.classList.add('move-up');
    setTimeout(function () {
        banner.classList.remove('move-up');
        banner.classList.add('move-down');
    }, 1500);
}
function resetInputValue() {
    let addContactForms = document.querySelectorAll('.add-contact-form');

    for (let i = 0; i < addContactForms.length; i++) {
        addContactForms[i].value = '';
    }

}
function openEditContact(){
    let editBG = document.getElementById('edit-contact-bg');
    editBG.classList.remove('d-none');
    editBG.classList.add('dark');

}
async function deleteContactByFirstname(firstname) {
    try {
        let contacts = JSON.parse(await getItem('contacts'));

        // den Kontakt mit dem übergebenen Vornamen finden
        let index = contacts.findIndex(contact => contact.firstname === firstname);

        if (index !== -1) {
            // den Kontakt aus dem Array entfernen
            contacts.splice(index, 1);

            // das aktualisierte Array zurück in den Speicher schreiben
            await setItem('contacts', JSON.stringify(contacts));
            console.log(`Contact with firstname ${firstname} has been deleted.`);
        } else {
            console.log(`Contact with firstname ${firstname} not found.`);
        }
    } catch (e) {
        console.error('Deleting error:', e);
    }
}
