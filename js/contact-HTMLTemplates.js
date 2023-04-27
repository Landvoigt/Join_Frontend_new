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