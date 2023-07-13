// variables for page elements
// time and score
let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");

// sections
// section intro
const introEl = document.querySelector("#intro");

// section questions
//question section
const questionsEl = document.querySelector("#questions");

//where question goes
let questionEl = document.querySelector("#question");

// how many questions they have answered
let questionCount = 0;

// div yaynay
const yaynayEl = document.querySelector("#yaynay");

// section final
const finalEl = document.querySelector("#final");

// user initials
let initialsInput = document.querySelector("#initials");

// section highscores
const highscoresEl = document.querySelector("#highscores");

// ordered list
let scoreListEl = document.querySelector("#score-list");

// array of scores
let scoreList = [];

// buttons
// start
const startBtn = document.querySelector("#start");

// answer button class
const ansBtn = document.querySelectorAll("button.ansBtn")

// answer1
const ans1Btn = document.querySelector("#answer1");

// answer2
const ans2Btn = document.querySelector("#answer2");

// answer3
const ans3Btn = document.querySelector("#answer3");

// answer4
const ans4Btn = document.querySelector("#answer4");

// submit-score
const submitScrBtn = document.querySelector("#submit-score");

// goback
const goBackBtn = document.querySelector("#goback");

// clearscores
const clearScrBtn = document.querySelector("#clearscores");

// view-scores
const viewScrBtn = document.querySelector("#view-scores");

// Object for question, answer, true/false

const questions = [ // array of objects
    {
        // question 0
        question: "Web API's are:",
        answers: ["1. a stylesheet language used to describe the presentation of a document written in HTML or XML ", "2. an object-oriented computer programming language commonly used to create interactive effects within web browsers.", "3. Framework that helps us to build/develop HTTP services", "4. When an HTTP client requests a URL that points to a directory structure instead of an actual web page within the directory structure, the web server will generally serve a default page, which is often referred to as a main or index."],
        correctAnswer: "2"
    },
    {
        // question 1
        question: "What is an Array?",
        answers: ["1. It is a way of accessing, storing and retrieving data.", "2. is commonly referred to as a collection of items stored at contiguous memory locations.", "3. linear data structure performing operations", "4. a linear data structure in which the elements are not necessarily stored in a contiguous manner."],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Javascript is an _______ language?",
        answers: ["1. Procedural", "2. Object-based", "3. Object-Ortiented", "4. None of the above"],
        correctAnswer: "1"
    },
    {
        // question 3
        question: "How can a datatype be declared to be a constant type?",
        answers: ["1. constant", "2. let", "3. var", "4. const"],
        correctAnswer: "3"
    },
    {
        // question 4
        question: " The full form of CSS is:",
        answers: ["1. None of the below ", "2. color and style sheet", "3. coloured special sheets", "4. cascading stle sheet"],
        correctAnswer: "3"
    }
];


// Functions

// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// start quiz with timer and set up questions
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// function to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

    // show section for yaynay and append message
    yaynayEl.style.display = "block";
    let p = document.createElement("p");
    yaynayEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion to bring in next question when any ansBtn is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Add to local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// EventListeners
// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Add score
submitScrBtn.addEventListener("click", addScore);

// Go Back Button
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});