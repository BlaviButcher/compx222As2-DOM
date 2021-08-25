/**
 * Checks if input keeps to certain constraints
 * @param {String} input The user input 
 * @return {boolean}
 */
function checkInputErrors(input) {
    if (isNaN(input))
        feedbackContainer.innerText = "Please enter a number!";

    // If a game is less than 4 squares there it is entirely unfair, there is no chance
    // that the second player can win
    else if (input < 4)
        feedbackContainer.innerText = "4 squares are needed for a fair game!";

    else if (input > 50)
        feedbackContainer.innerText = "Anymore than 50 is squares out of hand!"

    else return true;
    return false;
}

/**
 * Draws number of squares requested by user
 * @param {int} userInput 
 * @param {HTMLElement} container box squares will be drawn in
 */
function drawSquares(userInput, container) {
    // destroy all children of paper-container
    paperContainer.innerHTML = "";
    for (let i = 0; i < userInput; i++) {
        let square = document.createElement('div');
        square.className = 'square';
        container.appendChild(square);
    }
}

/**
 * alternate colors depending on player turn
 * @param {Element} square 
 * @param {int} turn players turn (1 or 2)
 */
function colorSquare(square, turn) {
    if (turn == 1)
        square.style.backgroundColor = '#83B5D1';
    else square.style.backgroundColor = '#FF6B6B';
}

/**
 * changes current players turn and resets selection to first
 */
function changeTurns(turnInfo) {
    // Inverse current players turn
    turnInfo.playersTurn = turnInfo.playersTurn == 1 ? 2 : 1;
    turnInfo.selection = 1;
    updateFeedbackContainer(turnInfo);
}

/**
 * returns if clicked square is adjacent to first
 * @param {Element} square 
 * @param {int} index index of first square selection - this is second
 * @return {boolean}
 */
function isAdjacent(square, index) {
    return (square.index - 1 == index) || (square.index + 1 == index);
}

function storeAdjacentSquares(squares) {
    // cases for first and last so underfined isn't stored
    squares[0].adjacent = [squares[1]];
    squares[squares.length - 1].adjacent = [squares[squares.length - 2]];
    // store adjacent
    for (let i = 1; i < squares.length - 1; i++) {
        squares[i].adjacent = [squares[i - 1], squares[i + 1]];
    }
}
/**
 * 
 * @param {HTMLCollectionOf<Element>} squares 
 * @return {boolean} true if nothing is reachable
 */
function checkReachability(squares) {
    isNoReachable = true;
    for (let square of squares) {
        // if not reachable can skip
        if (!square.reachable) continue;

        // flag
        let isReachable = false;
        // check if any adjacent squares are reachable
        for (let adjacentSquare of square.adjacent) {
            if (adjacentSquare.reachable == true) {
                isReachable = true;
                break;
            }
        }
        // if no adjacent squares were reachable then this square
        // can't be
        if (!isReachable) square.reachable = false;
        else isNoReachable = false;
    }
    return isNoReachable;
}

/**
 * 
 * @param {boolean} turn true for player 1 false for 2
 */
function gameOver(turn) {
    buttonPlay.innerText = "Play!";
    feedbackContainer.innerText = `Player ${turn} wins! Play again?`;
}


function playGame(userInput) {
    let turnInfo = {
        firstSelectionIndex: -1,
        selection: 1,
        playersTurn: 1
    }

    // error handling for userInput
    if (!checkInputErrors(userInput)) {
        return true;
    }
    userInput = parseInt(userInput);

    // Get container that will hold squares
    let gameContainer = document.getElementById("paper-container");
    drawSquares(userInput, gameContainer);

    // get squares
    let squares = document.getElementsByClassName("square");
    storeAdjacentSquares(squares);

    feedbackContainer.innerText = "Player 1, choose your first square";
    // using a for loop rather than a foreach as we need an index, becausewant to be able to store the placement 
    // of square
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        // becomes false if has no adjacent reachable siblings or is already colored 
        square.reachable = true;
        // store placement in strip
        square.index = i;
        square.addEventListener("click", () => {

            if (square.reachable == true) {

                // if players second pick and chosen square is not adjacent
                if (turnInfo.selection == 2 && !isAdjacent(square, turnInfo.firstSelectionIndex)) {
                    feedbackContainer.innerText = "Your second choice must be adjacent to the first!"
                    return;
                }

                colorSquare(square, turnInfo.playersTurn);
                square.reachable = false;

                // if second selection of players turn
                if (turnInfo.selection == 2) {
                    if (checkReachability(squares)) {
                        gameOver(turnInfo.playersTurn);
                        return;
                    }

                    changeTurns(turnInfo);

                    return;
                }
                turnInfo.firstSelectionIndex = square.index;
                turnInfo.selection++;
                updateFeedbackContainer(turnInfo);
            }
        })
    }
}


function updateFeedbackContainer(turnInfo) {
    let selection = turnInfo.selection == 1 ? "first" : "second";
    feedbackContainer.innerText = `Player ${turnInfo.playersTurn}, choose your ${selection} square`;
}


// ********* MAIN **************

// get html elements
// play button
let buttonPlay = document.getElementById("button-play");
// container holding squares
let paperContainer = document.getElementById("paper-container");
// container that gives feedback to user
let feedbackContainer = document.getElementById("feedback-container");
drawSquares(0, paperContainer);

// add click event
buttonPlay.addEventListener("click", element => {

    // if returns an error
    playGame(document.getElementById("box-count").value);

});

// TODO: Call function after playgame for clean up -- use true false return
// to see if error occured (empty board somethimes)