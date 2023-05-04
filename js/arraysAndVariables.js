const LOGIN_ID = 'loginPage'
const SUMMARY_ID = 'summaryPage'
const BOARD_ID = 'boardPage'
const CONTACTS_ID = 'contactsPage'
const ADDTASK_ID = 'addTaskPage'
const PRIVACY_ID = 'privacyPolicyPage'
const LEGALNOTICE_ID = 'legalNoticePage'
const HELP_ID = 'helpPage'

let currentPage = SUMMARY_ID;
let previousPage;
let previousBackground = 'summarySidebar';
let currentDraggedElement;
let currentPrioColor;
let currentAssasignation;
let currentAssignedClients = [];
let currentSubtasks = [];
let showCheckBoxes = true;
let currentPickedColor = '';
let currentPrio = "";
let currentPrioImageSource;
let currentCat = "";
let randomColor;
let fieldsFilledCorrectly = false;


let topics = [
    {
        'name': 'Sales',
        'color': 'aqua'
    },
    {
        'name': 'Design',
        'color': 'orange'
    },
    {
        'name': 'Backoffice',
        'color': 'purple'
    },
    {
        'name': 'Media',
        'color': 'lightgreen'
    },
    {
        'name': 'Marketing',
        'color': 'blue'
    }
];

let tasks = [];