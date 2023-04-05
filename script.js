const MAINPAGE_ID = 'mainpage'
const PRIVACY_ID = 'privacy'

let currentPage = MAINPAGE_ID;

async function initialize(){
    await includeHTML();
    
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function changeSite(id){
    let pageToShow = document.getElementById(id);
    let currentShownPage = document.getElementById(currentPage);

    currentShownPage.classList.add('d-none');
    pageToShow.classList.remove('d-none');

    currentPage = id;
}