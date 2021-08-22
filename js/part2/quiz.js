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
// I learned about JSX which was cool, but can't assume marker is using Babel

function buildMainScreen() {
    let body = document.getElementsByTagName("body")[0];
    // clear body
    body.innerHTML = "";

    // create and assign id to main-wrap <div>
    let mainWrap = document.createElement("div");
    mainWrap.setAttribute("id", "main-wrap");
    body.appendChild(mainWrap);

    let main = document.createElement("main");
    mainWrap.appendChild(main);

    // build question container and contents
    let questionContainer = document.createElement("div");
    questionContainer.setAttribute("id", "question-container");

    let question = document.createElement("div");
    question.setAttribute("id", "question");

    let img = document.createElement("img");

    questionContainer.appendChild(question);
    questionContainer.appendChild(img);
    main.appendChild(questionContainer);

    // build answer-container contents
    let answerContainer = document.createElement("div");
    answerContainer.setAttribute("id", "answer-container");

    // create buttons
    for (let i = 0; i < 4; i++) {
        let button = document.createElement("button");
        button.setAttribute("class", "answer");
        answerContainer.appendChild(button);
    }

    main.appendChild(answerContainer);

    // build footer
    let footer = document.createElement("footer");
    let button = document.createElement("button");
    button.setAttribute("id", "next-question");
    button.textContent = "Next \u2192";

    footer.appendChild(button);
    main.appendChild(footer);
}

function buildAnswerPage() {
    // remove content of answer container
    let answerCont = document.getElementById("answer-container");
    answerCont.innerHTML = "";

    let yourAnswer = document.createElement("div");
    yourAnswer.setAttribute("class", "answer-page-io");


    let correctAnswer = document.createElement("div");
    correctAnswer.setAttribute("class", "answer-page-io");

    yourAnswer.setAttribute("id", "your-answer");
    answerCont.appendChild(yourAnswer);

    correctAnswer.setAttribute("id", "correct-answer");
    answerCont.appendChild(correctAnswer);

}


function nextQuestion() {
    questionNumber++;
    displayQuestion();
}


/**
 * 
 * @param {int} questionNumber current question
 */
function displayQuestion() {

    if (questionNumber > QUESTION_AMOUNT) {

        // if answers are done return
        if (isAnswerSheet) {
            document.getElementById("next-question").removeEventListener("click", nextQuestion);
            return;
        }
        // else move onto answer logic
        buildAnswerPage();
        isAnswerSheet = true;
        // reset question number
        questionNumber = 1;
        // will now move through all answers

    }
    // index that will correspond to data in arrays 
    // given the current question
    let index = questionNumber - 1;



    // If answers logic - display user answer and correct answer
    if (isAnswerSheet) {
        console.log(questionNumber);
        console.log(userAnswers[index]);

        console.log(userAnswers[index].yourAnswer);
        console.log(userAnswers[index].correctAnswer);

        // if is correct answer
        if (userAnswers[index].givenAnswer == userAnswers[index].correctAnswer) {
            console.log("same answers");
            questionNumber++;
            displayQuestion();
            return;
        }
        let yourAnswer = document.getElementById("your-answer");
        let correctAnswer = document.getElementById("correct-answer");

        yourAnswer.textContent = userAnswers[questionNumber - 1].givenAnswer;
        correctAnswer.textContent = userAnswers[questionNumber - 1].correctAnswer;

        // normal question logic
    } else {
        // Fill buttons with options from current question
        for (let i = 0; i < buttons.length; i++) {
            // update button
            buttons[i].textContent = questions[questionNumber - 1].options[i];
            buttons[i].index = i;
            buttons[i].style.color = 'black';

            // set event handlers for buttons. Correct answer has different answer
            if (i == questions[questionNumber - 1].answer - 1) {
                buttons[i].addEventListener("click", correctAnswer);
            } else buttons[i].addEventListener("click", incorrectAnswer);
        }
    }

    // set image for current question
    image.src = questions[index].image;
    // set question text
    question.textContent = questions[index].question;


}

/**
 * Incorrect answer handler
 * @param {Element} button event caller 
 */
function incorrectAnswer(button) {

    // add given answer and correct answer to array
    storeUserAnswer(button);
    // make selected button red
    button.target.style.color = 'red';
    // get rid of click events (all events - only has click)
    removeButtonListeners();

}

/**
 * 
 * @param {Element} button 
 */
function correctAnswer(button) {
    correctAnswers++;
    storeUserAnswer(button);
    button.target.style.color = 'green';
    removeButtonListeners();
}

// save user anser to array
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
function removeButtonListeners() {
    let buttons = document.getElementsByClassName("answer");
    for (let button of buttons) {
        button.removeEventListener("click", correctAnswer);
        button.removeEventListener("click", incorrectAnswer);
    }
}

// **********  MAIN ************



// buildMainScreen();

let questionNumber = 1;
const image = document.getElementsByTagName("img")[0];
const buttons = document.getElementsByClassName("answer");
let question = document.getElementById("question");
const userAnswers = [];
let correctAnswers = 0;
// denotes whether we are going through answer logic
let isAnswerSheet = false;
let isQuizDone = false;
const QUESTION_AMOUNT = 3;

document.getElementById("next-question").addEventListener("click", nextQuestion);



displayQuestion(questionNumber);

