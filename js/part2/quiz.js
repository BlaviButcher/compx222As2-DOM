// TODO: Move questions to independent file
// remember to set script type='module'
// TODO: Add reset button at the end
// TODO: Stop user from moving without answering question

// array of questions to be asked
let questions = [
    {
        question: "Who can require you to undergo a breath screening test?",
        image: "../../assets/part2/img/beer.jpg",
        options: [
            "Your Mum",
            "A Police Officer",
            "Your neighbor",
            "A man welding a gun"
        ],

        answer: "2"
    },

    {
        question: "When may you use the horn on your vehicle?",
        image: "../../assets/part2/img/car-horn.jpg",
        options: [
            "To warn traffic or pedestrians",
            "To say g'day to old mate",
            "To express rage",
            "You should never use the horn"
        ],
        answer: "1"
    },

    {
        question: "What must you do when red lights are flashing at a railway crossing?",
        image: "../../assets/part2/img/train-track.jpg",
        options: [
            "Ignore it, probably faulty",
            "Stop in the middle of the crossing",
            "Stop before the crossing",
            "Turn around"
        ],
        answer: "3"
    },

    {
        question: "When must you signal when you're turning right?",
        image: "../../assets/part2/img/car-indicator.jpg",
        options: [
            "Atleast 6 seconds before turning",
            "Atleast 4 seconds before turning",
            "Atleast 5 seconds before turning",
            "Atleast 3 seconds before turning"
        ],
        answer: "4"
    },

    {
        question: "What is the speed limit when passing an accident site?",
        image: "../../assets/part2/img/car-accident.jpg",
        options: [
            "40km/h or less",
            "20km/h or less",
            "50km/h or less",
            "30km/h or less"
        ],
        answer: "2"
    },

    {
        question: "At night, when must your dip the headlights of your vehicle?",
        image: "../../assets/part2/img/car-headlights.jpg",
        options: [
            "Never!",
            "When you see animals",
            "When parked",
            "All the time"
        ],
        answer: "3"
    },

    {
        question: "What does a flashing yellow light mean at an traffic light intersection?",
        image: "../../assets/part2/img/traffic-light.jpg",
        options: [
            "Traffic light not working",
            "Slow down",
            "Speed up",
            "Stop"
        ],
        answer: "1"
    },

    {
        question: "At an intersection what does a police officer's directions overrule?",
        image: "../../assets/part2/img/police-officer.jpg",
        options: [
            "The give way rules",
            "Road signs",
            "Traffic signals",
            "All of the above"
        ],
        answer: "4"
    },

    {
        question: "When should you apply the 4 second rule?",
        image: "../../assets/part2/img/clock.jpg",
        options: [
            "All the time",
            "There is no such thing",
            "In bad weather",
            "When following motorcycles"
        ],
        answer: "3"
    },

    {
        question: "If someone is hurt in a crash, how long does the driver have to call it in?",
        image: "../../assets/part2/img/building-crash.jpg",
        options: [
            "1 hours",
            "12 hours",
            "24 hours",
            "48 hours"
        ],
        answer: "4"
    }
];
/*
    <div id="main-wrap">
        <main>
            <div id="question-container">
                <div id="question"></div>
                <img src="" alt="">
            </div>
            <div id="answer-container">
                <button class="answer"></button>
                <button class="answer"></button>
                <button class="answer"></button>
                <button class="answer"></button>
            </div>
            <footer>
                <button id="next-question">Next &#8594</button>
            </footer>
        </main>
    </div>
*/

// I built this purely for the sake of getting a better grasp of DOM api.

// TODO: buildMainScreen removal?
function buildQuestionPage() {
    // build answer-container contents
    let answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = "";

    // create buttons
    for (let i = 0; i < 4; i++) {
        let button = document.createElement("button");
        button.setAttribute("class", "answer");
        answerContainer.appendChild(button);
    }
}

/*
<div id="answer-container">
    <div id="correct-answer-container"></div>
    <div id="bottom-answer-wrap">
        <div id="your-answer" class="answer-page-io">
            <div id="your-answer-title" class="answer-title">Your Answer</div>
            div id="your-answer-body" class="answer-body"></div>
        </div>
        <div id="correct-answer" class="answer-page-io">
            <div id="correct-answer-title" class="answer-title">Correct Answer</div>
            div id="correct-answer-body" class="answer-body"></div>

        </div>
    </div>
</div>

*/
/**
 * Modifies html to handle answer display
 */
function buildAnswerPage() {
    // remove content of answer container
    let answerCont = document.getElementById("answer-container");
    answerCont.innerHTML = "";

    // handle correct answerCount /display
    let correctAnswerCount = document.createElement("div");
    correctAnswerCount.setAttribute("id", "correct-answer-count");
    correctAnswerCount.textContent = `You answered ${correctAnswers} out of ${NUMBER_OF_QUESTIONS}
    questions correct!`
    answerCont.appendChild(correctAnswerCount);

    // bottom container that will hold yourAnswer and correctAnswer
    let bottomAnswer = document.createElement("div");
    bottomAnswer.setAttribute("id", "bottom-answer-wrap");
    answerCont.appendChild(bottomAnswer);

    // answer and correct answer cards
    let yourAnswer = document.createElement("div");
    yourAnswer.setAttribute("class", "answer-page-io");


    let correctAnswer = document.createElement("div");
    correctAnswer.setAttribute("class", "answer-page-io");


    yourAnswer.setAttribute("id", "your-answer");
    bottomAnswer.appendChild(yourAnswer);

    correctAnswer.setAttribute("id", "correct-answer");
    bottomAnswer.appendChild(correctAnswer);

    // Containers within correctAnswer and yourAnswer to hold cotent
    let correctAnswerTitle = document.createElement("div");
    correctAnswerTitle.setAttribute("id", "correct-answer-title");
    correctAnswerTitle.setAttribute("class", "answer-title");
    correctAnswerTitle.textContent = "Correct Answer";
    correctAnswer.appendChild(correctAnswerTitle);

    let correctAnswerBody = document.createElement("div");
    correctAnswerBody.setAttribute("id", "correct-answer-body");
    correctAnswerBody.setAttribute("class", "answer-body");
    correctAnswer.appendChild(correctAnswerBody);

    let yourAnswerTitle = document.createElement("div");
    yourAnswerTitle.setAttribute("id", "your-answer-title");
    yourAnswerTitle.setAttribute("class", "answer-title");
    yourAnswerTitle.textContent = "Your answer";
    yourAnswer.appendChild(yourAnswerTitle);

    let yourAnswerBody = document.createElement("div");
    yourAnswerBody.setAttribute("id", "your-answer-body");
    yourAnswerBody.setAttribute("class", "answer-body");

    yourAnswer.appendChild(yourAnswerBody);


}


/**
 * Itterate question and repeat display new question
 */
function nextQuestion() {
    questionNumber++;
    displayQuestion();
}

function nextAnswer() {
    questionNumber++;
    displayAnswer();
}


// TODO: Create condition for having all correct answers
// TODO: Create heading for answers
// container.insertBefore(newFreeformLabel, container.firstChild);

/**
 *  displays the current question and answer buttons or answers
 *  depending on which stage program is at ie. (isAnswerSheet)
 * 
 * @param {int} questionNumber current question
 */
function displayQuestion() {

    // When we are out of questions
    if (questionNumber > NUMBER_OF_QUESTIONS) {
        // else move onto answer logic
        buildAnswerPage();
        // reset question number
        questionNumber = 1;
        let nextButton = document.getElementById("next-question");
        nextButton.removeEventListener("click", nextQuestion);
        nextButton.addEventListener("click", nextAnswer);
        displayAnswer();
    }

    // Fill buttons with options from current question
    for (let i = 0; i < buttons.length; i++) {
        // update button
        buttons[i].textContent = questions[questionNumber - 1].options[i];
        buttons[i].index = i;
        buttons[i].style.color = 'black';
        buttons[i].style.fontWeight = "400";

        // set event handlers for buttons. Correct vs incorrect answer
        if (i == questions[questionNumber - 1].answer - 1) {
            buttons[i].addEventListener("click", correctAnswer);
        } else buttons[i].addEventListener("click", incorrectAnswer);
    }


    // set image for current question
    image.src = questions[questionNumber - 1].image;
    // set question text
    question.textContent = questions[questionNumber - 1].question;
}
/**
 * 
 * @returns {null}
 */
function displayAnswer() {

    // if is correct answer - skip
    if (userAnswers[questionNumber - 1].givenAnswer == userAnswers[questionNumber - 1].correctAnswer) {
        questionNumber++;
        displayAnswer();
        return;
    }
    incorrectAnswerCounter++;

    let yourAnswerBody = document.getElementById("your-answer-body");
    let correctAnswerBody = document.getElementById("correct-answer-body")
    yourAnswerBody.textContent = userAnswers[questionNumber - 1].givenAnswer;
    correctAnswerBody.textContent = userAnswers[questionNumber - 1].correctAnswer;

    // out of incorrect answers
    if (incorrectAnswerCounter >= NUMBER_OF_QUESTIONS - correctAnswers) {

        let nextButton = document.getElementById("next-question");
        nextButton.removeEventListener("click", nextAnswer);
        nextButton.textContent = "↺";
        nextButton.addEventListener("click", reset);
    }
}

/**
 * logic for incorrect answer selected
 * @param {Element} button event caller 
 */
function incorrectAnswer(button) {

    // add given answer and correct answer to array
    storeUserAnswer(button);
    // make selected button red
    button.target.style.color = '#B80C09';
    button.target.style.fontWeight = "500";

    // get rid of click events (all events - only has click)
    removeAnswerListeners();

}

/**
 * logic for correct answer selected
 * @param {Element} button 
 */
function correctAnswer(button) {
    correctAnswers++;
    storeUserAnswer(button);
    button.target.style.color = '#8FB339';
    button.target.style.fontWeight = "500";
    removeAnswerListeners();
}

/**
 * stores users answers in array
 * @param {Element} button event caller 
 */
function storeUserAnswer(button) {

    // get correct answer index
    let answer = questions[questionNumber - 1].answer;
    userAnswers.push({
        // get contents of given answer
        givenAnswer: questions[questionNumber - 1].options[button.target.index],
        // get correct answer
        correctAnswer: questions[questionNumber - 1].options[answer - 1],
    });
}

/**
 * Drops the click event on all buttons
 */
function removeAnswerListeners() {
    let buttons = document.getElementsByClassName("answer");
    for (let button of buttons) {
        button.removeEventListener("click", correctAnswer);
        button.removeEventListener("click", incorrectAnswer);
    }
}

function initialize() {
    questionNumber = 1;
    userAnswers = [];
    correctAnswers = 0;
    isQuizDone = false;
    incorrectAnswerCounter = 0;

    // add eventListener for next button - nextQuestion
    let nextButton = document.getElementById("next-question");
    nextButton.addEventListener("click", nextQuestion);
    nextButton.textContent = "⟶";
    // display first question
    displayQuestion();
}

function reset() {
    document.getElementById("next-question").removeEventListener("click", reset);
    buildQuestionPage();
    initialize();



}

// **********  MAIN ************

// corresponds to current question being viewed
let questionNumber;
// image element
const image = document.getElementsByTagName("img")[0];
// array of answer buttons
const buttons = document.getElementsByClassName("answer");
// question text
let question = document.getElementById("question");
// array of answers user selects
let userAnswers;
// number of correct answers
let correctAnswers;
// is the quiz over - have we went through questions
// and answers
let isQuizDone;
// What incorrect answer we are up to
let incorrectAnswerCounter;
const NUMBER_OF_QUESTIONS = 2;

initialize();


