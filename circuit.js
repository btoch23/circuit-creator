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
//The buttons that choose the muscle type
const muscleBtns = document.querySelectorAll('.muscle');
for (let i of muscleBtns) {
    i.disabled = true;
}
//The div containing the exercises fetched from the API
const exerciseDiv = document.querySelector('#chosenExerciseList');

//FETCH DATA FROM THE API
let muscle = '';
const apiKey = process.env.API_KEY;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
	}
};

async function getExercises() {
    const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscle}`;
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const jsonResult = JSON.parse(result);
        console.log(jsonResult);
        displayExercises(jsonResult);
    } catch (error) {
        console.error(error);
    }
}

//ADDS EVENT LISTENERS TO EACH TIME BUTTON TO DISABLE AND FADE THE NON-CHOSEN OPTIONS
//ALSO ACTIVATES THE MUSCLE BUTTONS
for (let i of timeButtons) {
    i.addEventListener('click', function() {
        for (let i of muscleBtns) {
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
};

//EVENT LISTENERS FOR MUSCLE BUTTONS
const bicepBtn = document.querySelector('#bis');
const tricepBtn = document.querySelector('#tris');
const glutesBtn = document.querySelector('#glutes');
const hamstringsBtn = document.querySelector('#hamstrings');
const absBtn = document.querySelector('#abs');

bicepBtn.addEventListener('click', () => {
    muscle = 'biceps';
    removeExercises();
    getExercises();
});
tricepBtn.addEventListener('click', () => {
    muscle = 'triceps';
    removeExercises();
    getExercises();
});
glutesBtn.addEventListener('click', () => {
    muscle = 'glutes';
    removeExercises();
    getExercises();
});
hamstringsBtn.addEventListener('click', () => {
    muscle = 'hamstrings';
    removeExercises();
    getExercises();
});
abs.addEventListener('click', () => {
    muscle = 'abdominals';
    removeExercises();
    getExercises();
});

//Populates the exercises from the API in the exercise div
function displayExercises(exercises) {
    for (let i = 0; i < 6; i++) {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'card mb-4 h-100';
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        const col = document.createElement('div');
        col.className = 'col-4';
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = exercises[i].name;
        const difficulty = document.createElement('header');
        difficulty.className = 'card-header';
        difficulty.textContent = exercises[i].difficulty;
        const instructions = document.createElement('p');
        instructions.className = 'card-text';
        instructions.textContent = exercises[i].instructions;
        const button = document.createElement('button');
        button.className = 'btn addToCart';
        button.type = 'button';
        button.innerText = 'Add To Circuit!';
        cardBody.appendChild(title);
        cardBody.appendChild(instructions);
        cardBody.appendChild(button);
        exerciseCard.appendChild(difficulty);
        exerciseCard.appendChild(cardBody);
        col.appendChild(exerciseCard);
        exerciseDiv.appendChild(col);
        button.addEventListener('click', () => {
            button.disabled = true;
            button.innerText = 'Added to Circuit!';
            let workout = exercises[i].name;
            if (chosenExercises.length === circuitLength - 1) {
                let cartBtns = document.querySelectorAll('.addToCart');
                for (let i of cartBtns) {
                    i.disabled = true;
                }
            }
            try {
                if (chosenExercises.includes(workout)) {
                    throw new Error('Exercise already chosen!');
                } else {
                    chosenExercises.push(workout);
                    console.log(chosenExercises);
                    removeList();
                    makeList();
                }
            } catch(error) {
                alert(error.message);
            }
        });
    }
}
//removes the exercise list everytime a muscle button is clicked to prevent too many cards from populating
function removeExercises() {
    while (exerciseDiv.firstChild) {
        exerciseDiv.removeChild(exerciseDiv.firstChild);
    }
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
        // exercise.addEventListener('click', removeExercise);
        exercises.appendChild(exercise);
    }
}

//DELETES THE LIST TO PREVENT DUPLICATE PRINTING
function removeList() {
    while (exercises.firstChild) {
        exercises.removeChild(exercises.firstChild);
    }
}

// //REMOVES A CHOSEN EXERCISE FROM THE LIST AND THE ARRAY
// function removeExercise(event) {
//     const ex = event.currentTarget.textContent;
//     let e = chosenExercises.indexOf(ex);
//     chosenExercises.splice(e, 1);
//     removeList();
//     makeList();
//     for (let i of addToCart) {
//         let sibling = i.previousElementSibling;
//         let exercise = sibling.previousElementSibling.innerText;
//         if (i.disabled && sibling.previousElementSibling.innerText === ex) {
//             i.disabled = false;
//             i.innerText = 'Add to Circuit';
//         } if (i.disabled && chosenExercises.length < circuitLength && !chosenExercises.includes(exercise)) {
//             i.disabled = false;
//         }
//     }
//     if (chosenExercises.length === 0) {
//         let empty = document.createElement('li');
//         empty.textContent = 'Your circuit is empty';
//         exercises.appendChild(empty);
//     }
// }
    
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