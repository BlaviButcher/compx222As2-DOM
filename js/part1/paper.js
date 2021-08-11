/**
 * Add two numbers together
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return {Number}      The total of the two numbers
 */


let userInput = "6";
let isPlayer1Turn = true;
let secondSquarePick = false;
let firstSelectionIndex;

// error handling for userInput
while (true) {
    // userInput = prompt("Please enter a number");
    if (checkInputErrors(userInput)) break;
}


/**
 * Checks if input keeps to certain constraints
 * @param {String} input The user input 
 * @return {boolean}
 */
function checkInputErrors(input) {
    if (isNaN(input))
        alert("Please enter a number!");

    // If a game is less than 4 squares there it is entirely unfair, there is no chance
    // that the second player can win
    else if (input < 4)
        alert("Must have atleast 4 squares for game to be somewhat fair!");
    else return true;
    return false;
}

let gameContainer = document.getElementById("paper-container");

for (let i = 0; i < userInput; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    gameContainer.appendChild(square);
}

let squares = document.getElementsByClassName("square");

// using a for loop as we want to be able to store the placement of square
for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    square.reachable = true;
    square.index = i;
    square.addEventListener("click", () => {
        if (square.reachable === true) {
            console.log(`first index = ${firstSelectionIndex}`);
            console.log(square.index);
            // if players second pick check that it is adjacent
            if (secondSquarePick) {
                if ((square.index - 1 != firstSelectionIndex) && (square.index + 1 != firstSelectionIndex)) {
                    alert("Your second choice must be adjacent to the" +
                        " first");
                    return;
                }
                console.log(square.index - 1 != firstSelectionIndex);
                console.log(square.index + 1 != firstSelectionIndex);

            }

            // alternate colors depending on player turn
            if (isPlayer1Turn === true)
                square.style.backgroundColor = 'blue';
            else square.style.backgroundColor = 'red';
            square.reachable = false;

            if (secondSquarePick) {
                changeTurns();
                return;
            }
            firstSelectionIndex = square.index;
            secondSquarePick = !secondSquarePick;


        }
    })
}

function changeTurns() {
    isPlayer1Turn = !isPlayer1Turn;
    secondSquarePick = !secondSquarePick;
}

