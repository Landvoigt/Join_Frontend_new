/**
 * loads Contacts from the Backend server
 */
async function loadContacts() {
    try {
        contacts = await getItem('contacts');
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * shows all first letters by browsing all contacts
 */
async function showContactsFirstLetters() {
    await loadContacts();
    getFirstLetters();
    sortFirstLetters();
    renderLetters();
    document.getElementById('contactInfo').innerHTML = '';
}


/**
 * pushes every first character (if not already included) of the firstname from each contact in the letters array
 */
function getFirstLetters() {
    firstLetters = [];
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['first_name'];
        let firstLetter = name.charAt(0);

        if (!firstLetters.includes(firstLetter)) {
            firstLetters.push(firstLetter);
        }
    }
}


/**
 * sort all the first letters from all contacts alphabetical
 */
function sortFirstLetters() {
    firstLetters.sort(function (a, b) {
        let letterA = a.toLowerCase();
        let letterB = b.toLowerCase();
        if (letterA < letterB) {
            return -1;
        }
        if (letterA > letterB) {
            return 1;
        }
        return 0;
    });
}


/**
 * shows the letters sorted in the contact list
 */
function renderLetters() {
    let contactsList = document.getElementById('contactList');
    contactsList.innerHTML = '';
    for (let i = 0; i < firstLetters.length; i++) {
        let letter = firstLetters[i];
        contactsList.innerHTML += firstLetterHTML(letter);
        renderContacts(letter);
    }
}


/**
 * shows every single contact sorted to each letter in the contact list
 * @param {string} id - first char from each contact 
 */
async function renderContacts(id) {
    let contactContainer = document.getElementById(`${id}`);
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstName = contact['first_name'];
        if (firstName.startsWith(id)) {
            contactContainer.innerHTML += contactBoxHTML(contact, i);
        }
    }
}


/**
 * opens a detailed info of the selected contact
 * @param {number} i - the index of the selected contact 
 */
function openDetailedContactCard(i) {
    onContactCard = true;
    let contactPopup = document.getElementById('contactInfo');
    contactPopup.innerHTML = openContactTemplate(i);
    if (mediaQuery.matches) {   //Responsive view, removes Buttons
        adjustStyleForResponsiveView();
    } else {
        highlightSelectedContact(i);
    }
}


/**
 * removes and adds buttons at a certain resolution
 */
function adjustStyleForResponsiveView() {
    document.getElementById('createContactBtn').classList.add("d-none");
    document.getElementById('contactCard').classList.add('d-flex');
    document.getElementById('closeContactCardBtn').classList.add('d-flex');
    document.getElementById('editContact').classList.add('d-none');
    document.getElementById('editContactBtnBox').classList.remove('d-none');
}


/**
 * closes a popup window at a certain resolution
 */
function closeContactCard() {
    if (mediaQuery.matches) {
        document.getElementById('createContactBtn').classList.remove("d-none");
        document.getElementById('contactCard').classList.remove('d-flex');
        document.getElementById('closeContactCardBtn').classList.remove('d-flex');
        document.getElementById('editContactBtnBox').classList.add('d-none');
    }
    onContactCard = false;
    removeAllHighlightsFromContacts();
}


/**
 * gives the selected contact a background color
 * @param {number} id - the ID of the selected contact 
 */
function highlightSelectedContact(i) {
    removeAllHighlightsFromContacts();
    let currentContact = document.getElementById(`contactBox${i}`);
    currentContact.classList.add('bg-highlight');
}


/**
 * removes the dark background from all contact boxes
 */
function removeAllHighlightsFromContacts() {
    let contactBoxes = document.getElementsByClassName('contact-box');
    for (let i = 0; i < contactBoxes.length; i++) {
        let element = contactBoxes[i];
        element.classList.remove('bg-highlight');
    }
}


/**
 * opens up the popup to create a new contact
 */
function openCreateContact() {
    if (inAddTaskPopup) {
        saveCurrentInput();
        closePopupWindow();
        taskSavedInCache = true;
        setTimeout(slideInCreateContact, 350);
    } else {
        slideInCreateContact();
    }
}


/**
 * slides in the contact template
 */
function slideInCreateContact() {
    currentPopupStyle = 'slide';
    popupContentID = 'addContactPopup';
    let template = addContactTemplate();
    slideInContent(template, popupContentID);
}


/**
 * creates a new contact on the server, closes the popup
 */
async function createNewContact() {
    let firstname = document.getElementById('createContactFirstname').value;
    let lastname = document.getElementById('createContactSurname').value;
    let mail = document.getElementById('createContactMail').value;
    let phone = document.getElementById('createContactPhone').value;
    checkForExistingID();
    let randomContactColor = createRandomColor();

    await pushNewContact(firstname, lastname, mail, phone, randomContactColor);
    await loadContacts();
    await refreshContactPage();
    showSuccessBanner('Contact created');
}


/**
 * creates a new contact
 */
async function pushNewContact(firstname, lastname, mail, phone, randomContactColor) {
    let newContact = {
        "first_name": firstname,
        "last_name": lastname,
        "initials": firstname.charAt(0) + lastname.charAt(0),
        "email": mail,
        "phone": phone,
        "color": randomContactColor
    };
    await saveNewItem('contacts', newContact);
}


/**
 * checks if the ID already exists to assign a new ID
 */
function checkForExistingID() {
    contactID = contacts.length;
}


/**
 * opens up the edit contact popup 
 * @param {number} i - the index of the selected contact
 */
function openEditContact(i) {
    shownContactIndex = i;
    popupContentID = 'editContactPopup';
    currentPopupStyle = 'slide';
    let template = editContactTemplate();
    slideInContent(template, popupContentID);
}


/**
 * deletes the selected contact
 */
async function deleteContact(id) {
    let contactToDelete = { 'id': id }
    await deleteItem('contacts', contactToDelete);
    await loadContacts();
    await refreshContactPage();
    showSuccessBanner('Contact deleted');
}


/**
 * puts the ID´s on the server in the right order after deleting one
 */
async function updateContactIDs() {
    for (let i = 0; i < contacts.length; i++) {
        contacts[i]['id'] = i;
    }
}


/**
 * updates the selected contact's data 
 */
async function changeContactsData(id) {
    let updatedContact = {
        "id": id,
        "first_name": document.getElementById('editContactFirstname').value,
        "last_name": document.getElementById('editContactSurname').value,
        "initials": document.getElementById('editContactFirstname').value.charAt(0) + document.getElementById('editContactSurname').value.charAt(0),
        "email": document.getElementById('editContactMail').value,
        "phone": document.getElementById('editContactPhone').value,
    }
    await updateItem('contacts', updatedContact);
    await refreshContactPage();
    showSuccessBanner('Contact edited');
}


/**
 * closes the contact informations card and popup window, refreshs the contact list
 */
async function refreshContactPage() {
    if (mediaQuery.matches) {
        closeContactCard();
        await generateContacts();
    }

    closePopupWindow();
    showContactsFirstLetters();

    if (addTaskSideCreateContact) {
        addTaskSideCreateContact = false;
    }
}