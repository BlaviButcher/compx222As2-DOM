let questions = [
    {
        question: "Who can require you to undergo a breath screening test?",
        image: "../../assets/part2/img/beer.jpg",
        options: [
            "Your Mum",
            "A Police Officer",
            "Your neighbor",
            "A man welding a gun",
        ],

        answer: "2"
    }
];

let questionNumber = 1;
let image = document.getElementsByTagName("img")[0];
let buttons = document.getElementsByClassName("answer");


displayQuestion();
function displayQuestion() {
    // set image for current question
    image.src = questions[questionNumber - 1].image;

    // Fill buttons with options from current question
    for (let i = 0; i < buttons.length; i++)
        buttons[i].textContent = questions[questionNumber - 1].options[i];
}




