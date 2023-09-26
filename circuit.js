//ALL BUTTONS ADDING AN EXERCISE TO THE WORKOUT
let addToCart = document.querySelectorAll('.addToCart');
//THE CARDS CONTAINING THE TIME OPTIONS
let shortCard = document.getElementById('shortCard');
let medCard = document.getElementById('medCard');
let longCard = document.getElementById('longCard');
//THE BUTTONS IN THE TIME CARDS
let short = document.getElementById('short');
let med = document.getElementById('med');
let long = document.getElementById('long');
let timeButtons = document.querySelectorAll('.timeSet');
//ELEMENT DISPLAYING CHOSEN LENGTH OF CIRCUIT
let lengthDisplay = document.querySelector('#circuitLength');
//THE ORDERED LIST RECIEVING THE EXERCISES
let exercises = document.getElementById('exerciseList');
//THE BUTTON TO START THE WORKOUT AND ITS EVENT LISTENER
let start = document.getElementById('startWorkout');
start.addEventListener('click', startWorkout);
//ARRAY OF CHOSEN EXERCISES
const chosenExercises = [];
// Get the timer element from the HTML
const timerElement = document.getElementById("timer");
// Change this to the desired countdown time
let countdownTime;
let circuitLength;

//ADDS EVENT LISTENERS TO EACH TIME BUTTON TO DISABLE AND FADE THE NON-CHOSEN OPTIONS
//ALSO ACTIVATES THE ADDTOCART BUTTONS
for (let i of timeButtons) {
    i.addEventListener('click', function() {
        for (let i of addToCart) {
            i.disabled = false;
        }
        if (this.id === 'short') {
            circuitLength = 4;
            lengthDisplay.innerText = '15 Minute Circuit'
            countdownTime = 900;
            med.disabled = true;
            long.disabled = true;
            medCard.style.opacity = '25%';
            longCard.style.opacity = '25%';
            this.innerText = 'Short Circuit Chosen';
            this.disabled = true;
        } 
        if (this.id === 'med') {
            circuitLength = 6;
            lengthDisplay.innerText = '30 Minute Circuit'
            countdownTime = 1800;
            short.disabled = true;
            long.disabled = true;
            shortCard.style.opacity = '25%';
            longCard.style.opacity = '25%';
            this.innerText = 'Medium Circuit Chosen';
            this.disabled = true;
        } 
        if (this.id === 'long') {
            circuitLength = 8;
            lengthDisplay.innerText = '45 Minute Circuit'
            countdownTime = 2700;
            med.disabled = true;
            short.disabled = true;
            medCard.style.opacity = '25%';
            shortCard.style.opacity = '25%';
            this.innerText = 'Long Circuit Chosen';
            this.disabled = true;
        } 
    })
}

//ADDS AN EVENT LISTENER TO EACH 'ADD TO CIRCUIT' BUTTON AND ADDS CHOSEN EXERCISE TO THE EXERCISE ARRAY
for (let i of addToCart) {
    i.disabled = true;
    i.addEventListener('click', function() {
        i.disabled = true;
        i.innerText = 'Added to Circuit!'
        let workout = this.previousElementSibling.innerHTML;
        if (chosenExercises.length === circuitLength - 1) {
            for (let i of addToCart) {
                i.disabled = true;
            }
        } else if (chosenExercises.length === circuitLength - 1) {
            for (let i of addToCart) {
                i.disabled = true;
            }
        } else if (chosenExercises.length === circuitLength - 1) {
            for (let i of addToCart) {
                i.disabled = true;
            }
        }
        try {
            if (chosenExercises.includes(workout)) {
                throw new Error('Exercise already chosen!');
            } else {
                chosenExercises.push(workout);
                removeList();
                makeList();
            }
        } catch(error) {
            alert(error.message);
        }
    });
}

//HANDLES THE DISABLED STATE OF THE START BUTTON AND POPULATES THE CHOSEN EXERCISES INTO THE SIDEBAR
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

//DELETES THE LIST TO PREVENT DUPLICATE PRINTING
function removeList() {
    while (exercises.firstChild) {
        exercises.removeChild(exercises.firstChild);
    }
}

//REMOVES A CHOSEN EXERCISE FROM THE LIST AND THE ARRAY
function removeExercise(event) {
    const ex = event.currentTarget.textContent;
    let e = chosenExercises.indexOf(ex);
    chosenExercises.splice(e, 1);
    removeList();
    makeList();
    for (let i of addToCart) {
        let exercise = i.previousElementSibling.innerHTML
        if (i.disabled && i.previousElementSibling.innerText === ex) {
            i.disabled = false;
            i.innerText = 'Add to Circuit';
        } if (i.disabled && chosenExercises.length < circuitLength && !chosenExercises.includes(exercise)) {
            i.disabled = false;
        }
    }
    if (chosenExercises.length === 0) {
        let empty = document.createElement('li');
        empty.textContent = 'Your circuit is empty';
        exercises.appendChild(empty);
    }
}
    
//NOTIFIES USER THAT WORKOUT IS BEGINNING, STARTS THE TIMER, AND RESETS EVERYTHING
function startWorkout() {
    timerElement.hidden = false;
    try {
        if (!countdownTime) {
            throw new Error('Please choose a circuit length');
        } else {
            start.removeEventListener('click', startWorkout);
            let empty = document.createElement('li');
            empty.className = 'display-6 pt-3 text-center';
            empty.textContent = 'It\'s go time!';
            exercises.appendChild(empty);
            start.disabled = true;
            start.innerText = 'Finish as many rounds as possible!';
            let timerInterval = setInterval(() => {
                // Calculate minutes and seconds
                const minutes = Math.floor(countdownTime / 60);
                const seconds = countdownTime % 60;
                // Display the remaining time
                timerElement.textContent = `${minutes} minutes ${seconds} seconds`;
                // Check if the countdown has reached zero
                if (countdownTime === 0) {
                    clearInterval(timerInterval); // Stop the countdown when it reaches zero
                    timerElement.textContent = "Countdown expired!";
                    chosenExercises.length = 0;
                    removeList();
                } else {
                    countdownTime--; // Decrement the countdown time
                }
            }, 1000);
        }
    } catch (error) {
        timerElement.textContent = `${error.message}`;
    }
        
}