let contacts = [{
    'firstname':'Anton',
    'lastname':'Mayer',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567'
},{
    'firstname':'Julia',
    'lastname':'Roberts',
    'mail':'juliar@gmx.com',
    'phone':'01234567'
},{
    'firstname':'Jonathan',
    'lastname':'Wick',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567'
},{
    'firstname':'Alfred',
    'lastname':'Niebuhr',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567'
},{
    'firstname':'Carlos',
    'lastname':'Sanros',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567'
},{
    'firstname':'Carmen',
    'lastname':'Müller',
    'mail':'Müller.C@gmx.com',
    'phone':'01234567'
},{
    'firstname':'Sven',
    'lastname':'Siebert',
    'mail':'Sven.T@live.de',
    'phone':'01234567'
},{
    'firstname':'Sanya',
    'lastname':'Kilic',
    'mail':'Sven.T@live.de',
    'phone':'01234567'
}
];  
let letters =[];

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
            <div class="single-contact-box">
                <div id="initials-${i}" class="initials">
                    ${id}${lastName.charAt(0)}
                </div>
                <div class="contact-names">
                    ${contact.firstname} ${contact.lastname} <br>
                    <a  href="mailto:${contact['mail']}">${contact['mail']}</a>

                </div>
            </div>
        `;addRandomColor(i);
        }
        
    }
}

function addRandomColor(i){
    let contact = document.getElementById(`initials-${i}`);
    contact.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

}