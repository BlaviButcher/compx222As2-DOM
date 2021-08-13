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



document.getElementById("next-question").addEventListener("click", nextQuestion);


function nextQuestion() {
    displayQuestion(++questionNumber);
}


/**
 * 
 * @param {int} questionNumber current question
 */
function displayQuestion(questionNumber) {
    if (questionNumber == 2) {
        quizDone();
        document.getElementById("next-question").removeEventListener("click", nextQuestion);
        return;
    }
    // set image for current question
    image.src = questions[questionNumber - 1].image;
    question.textContent = questions[questionNumber - 1].question;
    // Fill buttons with options from current question
    for (let i = 0; i < buttons.length; i++) {
        // update button
        buttons[i].textContent = questions[questionNumber - 1].options[i];
        buttons[i].index = i;
        buttons[i].style.color = 'black';

        // if i is the same index as the answer
        if (i == questions[questionNumber - 1].answer - 1) {
            buttons[i].addEventListener("click", correctAnswer);
        } else buttons[i].addEventListener("click", incorrectAnswer);
    }


}

function quizDone() {
    let body = document.getElementsByTagName("body")[0];
    for (let answer of incorrectAnswers) {
        let givenAnswer = document.createElement("p");
        givenAnswer.textContent = `Your answer was: ${answer.givenAnswer}`;

        let correctAnswer = document.createElement("p");
        correctAnswer.textContent = `Correct answer: ${answer.correctAnswer}`;

        body.appendChild(givenAnswer);
        body.appendChild(correctAnswer);
    }



}

/**
 * Incorrect answer handler
 * @param {Element} button event caller 
 */
function incorrectAnswer(button) {
    // get correct answer index
    let answer = questions[questionNumber - 1].answer;
    // add given answer and correct answer to array
    incorrectAnswers.push({
        // get contents of given answer
        givenAnswer: questions[questionNumber - 1].options[button.target.index],
        // get correct answer
        correctAnswer: questions[questionNumber - 1].options[answer - 1]
    });
    console.log(questions[questionNumber - 1].options[button.target.index]);
    console.log(questions[questionNumber - 1].options[answer - 1]);
    button.target.style.color = 'red';
    removeButtonListeners();

}

/**
 * Correct answer handler
 */
function correctAnswer(button) {
    correctAnswers++;
    button.target.style.color = 'green';
    removeButtonListeners();
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


let questionNumber = 1;
let image = document.getElementsByTagName("img")[0];
let buttons = document.getElementsByClassName("answer");
let question = document.getElementById("question");
let incorrectAnswers = [];
let correctAnswers = 0;

displayQuestion(questionNumber);