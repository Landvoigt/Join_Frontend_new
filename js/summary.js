function loadDate() {
    const currentDate = new Date();
    let dateContainer = document.getElementById('date');
    const currenthour = currentDate.getHours();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    dateContainer.innerHTML = formattedDate;
    greetAccordingToTime(currenthour);
}

function greetAccordingToTime(currenthour){
    if (currenthour < 12) {
        document.getElementById('greeting').innerHTML='Good Morning';
    }if (currenthour < 18) {
        document.getElementById('greeting').innerHTML='Good Afternoon';
    }else{
        document.getElementById('greeting').innerHTML='Good Evening';
    }
}