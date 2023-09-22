let addToCart = document.querySelectorAll('.addToCart');
let exercises = document.getElementById('exerciseList');
const chosenExercises = [];

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
        }
    }
}

function startWorkout() {
    alert('Your workout starts...NOW! Hope you remembered to stretch!');
    removeList();
    for (let i of addToCart) {
        if (i.disabled) {
            i.disabled = false;
        }
       }
}


