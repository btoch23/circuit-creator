let addToCart = document.querySelectorAll('.addToCart');

let shortCard = document.getElementById('shortCard');
let medCard = document.getElementById('medCard');
let longCard = document.getElementById('longCard');

let short = document.getElementById('short');
let med = document.getElementById('med');
let long = document.getElementById('long');
let timeButtons = document.querySelectorAll('.timeSet');

let exercises = document.getElementById('exerciseList');

let start = document.getElementById('startWorkout');

const chosenExercises = [];

for (let i of timeButtons) {
    i.addEventListener('click', function() {
        if (this.id === 'short') {
            if (!med.disabled && !long.disabled) {
                med.disabled = true;
                long.disabled = true;
            } else {
                med.disabled = false;
                long.disabled = false;
            }
            if (this.innerText === 'Choose Me') {
                this.innerText = 'Undo';
            } else {
                this.innerText = 'Choose Me';
            }
            if (!medCard.style.opacity) {
                medCard.style.opacity = '25%';
                longCard.style.opacity = '25%';
            } else {
                medCard.style.opacity = null;
                longCard.style.opacity = null;
            }
        } 
        if (this.id === 'med') {
            if (!short.disabled && !long.disabled) {
                short.disabled = true;
                long.disabled = true;
            } else {
                short.disabled = false;
                long.disabled = false;
            }
            if (this.innerText === 'Choose Me') {
                this.innerText = 'Undo';
            } else {
                this.innerText = 'Choose Me';
            }
            if (!shortCard.style.opacity) {
                shortCard.style.opacity = '25%';
                longCard.style.opacity = '25%';
            } else {
                shortCard.style.opacity = null;
                longCard.style.opacity = null;
            }
        } 
        if (this.id === 'long') {
            if (!med.disabled && !short.disabled) {
                med.disabled = true;
                short.disabled = true;
            } else {
                med.disabled = false;
                short.disabled = false;
            }
            if (this.innerText === 'Choose Me') {
                this.innerText = 'Undo';
            } else {
                this.innerText = 'Choose Me';
            }
            if (!medCard.style.opacity) {
                medCard.style.opacity = '25%';
                shortCard.style.opacity = '25%';
            } else {
                medCard.style.opacity = null;
                shortCard.style.opacity = null;
            }
        } 
    })
}

for (let i of addToCart) {
    i.addEventListener('click', function() {
        i.disabled = true;
        i.innerText = 'Added to Circuit!'
        let workout = this.previousElementSibling.innerHTML;
        try {
            if (!chosenExercises.includes(workout)) {
                chosenExercises.push(workout);
                removeList();
                makeList();
            } else {
                throw new Error('Exercise already chosen!');
            }
        } catch(error) {
            alert(error.message);
        }
    });
}

function makeList() {
    if (chosenExercises.length === 0) {
        start.disabled = true;
    } else {
        start.disabled = false;
        start.innerText = 'Start Workout';
    }
    for (let i of chosenExercises) {
        let exercise = document.createElement('li');
        exercise.textContent = i;
        exercise.className = 'list-group-item';
        exercise.addEventListener('click', removeExercise);
        exercises.appendChild(exercise);
    }
}

function removeList() {
    while (exercises.firstChild) {
        exercises.removeChild(exercises.firstChild);
    }
}

function removeExercise(event) {
    const ex = event.currentTarget.textContent;
    let e = chosenExercises.indexOf(ex);
    chosenExercises.splice(e, 1);
    removeList();
    makeList();
    for (let i of addToCart) {
        if (i.disabled && i.previousElementSibling.innerText === ex) {
            i.disabled = false;
            i.innerText = 'Add to Circuit';
        }
    }
    if (chosenExercises.length === 0) {
        let empty = document.createElement('li');
        empty.textContent = 'Your circuit is empty';
        exercises.appendChild(empty);
    }
}
    

function startWorkout() {
    alert('Your workout starts...NOW! Hope you remembered to stretch!');
    removeList();
    chosenExercises.length = 0;
    for (let i of addToCart) {
        if (i.disabled) {
            i.disabled = false;
        }
    }
    let empty = document.createElement('li');
    empty.textContent = 'Your circuit is empty';
    exercises.appendChild(empty);
    start.disabled = true;
    start.innerText = 'Add some exercises!';
}


