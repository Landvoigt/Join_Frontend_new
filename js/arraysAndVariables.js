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

let tasks = [
    {
        'id': 0,
        'category': 'toDo',
        'topic': 4,
        'headline': 'Website redesign',
        'description': 'Modify the contents of the main website...',
        'date': '13/04/2023',
        'subtasks':
            [
                {
                    'text': 'Subtask 1',
                    'status': false
                },
                {
                    'text': 'Subtask 2',
                    'status': true
                },
                {
                    'text': 'Subtask 3',
                    'status': true
                },
                {
                    'text': 'Subtask 4',
                    'status': false
                },
            ],
        'clients': ['0', '2', '5'],
        'prioName': 'urgent',
        'prioImg': './img/prio_urgent.png',
    },
    {
        'id': 1,
        'category': 'inProgress',
        'topic': 0,
        'headline': 'Call potential clients',
        'description': 'Make the product presentation to prospective buyers',
        'date': '13/04/2023',
        'subtasks':
            [
            ],
        'clients': ['0', '2', '3', '5', '6', '4'],
        'prioName': 'medium',
        'prioImg': './img/prio_medium.png',
    },
    {
        'id': 2,
        'category': 'awaitFeedback',
        'topic': 1,
        'headline': 'Accounting invoices',
        'description': 'Write open invoices for customer',
        'date': '13/04/2023',
        'subtasks':
            [
            ],
        'clients': ['7'],
        'prioName': 'low',
        'prioImg': './img/prio_low.png',
    },
    {
        'id': 3,
        'category': 'awaitFeedback',
        'topic': 3,
        'headline': 'Video cut',
        'description': 'Edit the new company video',
        'date': '13/04/2023',
        'subtasks':
            [
                {
                    'text': 'Subtask 1',
                    'status': false
                },
                {
                    'text': 'Subtask 2',
                    'status': true
                },
                {
                    'text': 'Subtask 3',
                    'status': false
                }
            ],
        'clients': ['0', '2'],
        'prioName': 'medium',
        'prioImg': './img/prio_medium.png',
    },
    {
        'id': 4,
        'category': 'done',
        'topic': 2,
        'headline': 'Social media strategy',
        'description': 'Develop an ad campain for brand positioning',
        'date': '13/04/2023',
        'subtasks':
            [
                {
                    'text': 'Subtask 1',
                    'status': false
                },
                {
                    'text': 'Subtask 2',
                    'status': false
                }
            ],
        'clients': ['0', '2', '3', '5'],
        'prioName': 'low',
        'prioImg': './img/prio_low.png',
    }
];