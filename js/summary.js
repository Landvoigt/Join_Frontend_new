function loadDate(){
    let dateContainer = document.getElementById('date');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});
console.log(new Date())
    dateContainer.innerHTML = formattedDate;

}