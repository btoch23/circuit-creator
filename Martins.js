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
//THE ORDERED LIST RECIEVING THE EXERCISES
let exercises = document.getElementById('exerciseList');
//THE BUTTON TO START THE WORKOUT
let start = document.getElementById('startWorkout');
//ARRAY OF CHOSEN EXERCISES
const chosenExercises = [];

//ADDS EVENT LISTENERS TO EACH TIME BUTTON TO DISABLE AND FADE THE NON-CHOSEN OPTIONS
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

//ADDS AN EVENT LISTENER TO EACH 'ADD TO CIRCUIT' BUTTON AND ADDS CHOSEN EXERCISE TO THE EXERCISE ARRAY
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
    
//NOTIFIES USER THAT WORKOUT IS BEGINNING AND RESETS EVERYTHING
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
    empty.textContent = 'It\'s go time!';
    exercises.appendChild(empty);
    start.disabled = true;
    start.innerText = 'Finish as many rounds as possible!';
}

//Countdown timer

 // Change this to the desired countdown time
  let countdownTime = 600;

    // Get the timer element from the HTML
    const timerElement = document.getElementById("timer");
    document.getElementById("startWorkout").addEventListener('click', updateTimer)

    // Function to update and display the countdown timer
    function updateTimer() {
        setInterval(() => {
    
      // Calculate minutes and seconds
      const minutes = Math.floor(countdownTime / 60);
      const seconds = countdownTime % 60;

      // Display the remaining time
      timerElement.textContent = `Countdown: ${minutes} minutes ${seconds} seconds`;

      // Check if the countdown has reached zero
      if (countdownTime === 0) {
        clearInterval(timerInterval); // Stop the countdown when it reaches zero
        timerElement.textContent = "Countdown expired!";
      } else {
        countdownTime--; // Decrement the countdown time
      }
    }, 1000);
}

    // Call the updateTimer function immediately to display the initial time
    //updateTimer();

    // Update the timer every second (1000 milliseconds)
    //const timerInterval = setInterval(updateTimer, 1000);
   