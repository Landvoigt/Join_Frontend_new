const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

function loadDate() {
    let dateContainer = document.getElementById('date');
    dateContainer.innerHTML = formattedDate;
}