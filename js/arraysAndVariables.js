const LOGIN_ID = 'loginPage'
const SUMMARY_ID = 'summaryPage'
const BOARD_ID = 'boardPage'
const CONTACTS_ID = 'contactsPage'
const ADDTASK_ID = 'addTaskPage'
const PRIVACY_ID = 'privacyPolicyPage'
const LEGALNOTICE_ID = 'legalNoticePage'
const HELP_ID = 'helpPage'

let currentPage = SUMMARY_ID;
let users = [];
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
let shownTaskID;
let shownContactIndex;
let currentPopupStyle;
let popupContentID;
let randomColor;
let fieldsFilledCorrectly = false;
let contacts = [];
let firstLetters = [];
let randomContactColor;
let addTaskSideCreateContact = false;
let contactID;
let mediaQuery = window.matchMedia("(max-width: 1050px)");
let tasks = [];
let topics = [];

// let topics = [
//     {
//         'name': 'Sales',
//         'color': 'aqua'
//     },
//     {
//         'name': 'Design',
//         'color': 'orange'
//     },
//     {
//         'name': 'Backoffice',
//         'color': 'purple'
//     },
//     {
//         'name': 'Media',
//         'color': 'lightgreen'
//     },
//     {
//         'name': 'Marketing',
//         'color': 'blue'
//     },
//     {
//         'name': 'Frontend',
//         'color': 'red'
//     },
//     {
//         'name': 'Test',
//         'color': 'yellow'
//     },
//     {
//         'name': 'Test2',
//         'color': 'blue'
//     }
// ];