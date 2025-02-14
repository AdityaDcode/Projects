const topic = document.getElementById("topic");
const queLevel = document.getElementById("level");
const number = document.getElementById("numberOfQue");
const form = document.getElementById("quizForm");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let sTopic, level, num, link, apiurl = "";
let questions = [];  // Global variable to store fetched questions
let currentQuestionIndex = 0;
let score = 0;

function select() {
    sTopic = topic.value;
    level = queLevel.value;
    num = number.value;
    link = `https://the-trivia-api.com/api/questions?limit=${num}&categories=${sTopic}&difficulty=${level}`;
    apiurl = link;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    select();
    fetchQuestions();
});

// Fetch questions from API and store them globally
async function fetchQuestions() {
    const response = await fetch(apiurl);
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        questions = await response.json(); // Store fetched questions
        startQuiz();
    }
}

// Start the quiz after questions are fetched
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Show the current question and answers
function showQuestion() {
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question
    questionElement.innerHTML = currentQuestion.question; // Display question
    
    let answersArray = [...currentQuestion.incorrectAnswers.map(ans => ({ text: ans, correct: false })), 
                        { text: currentQuestion.correctAnswer, correct: true }];
    
    // Shuffle answers
    answersArray.sort(() => Math.random() - 0.5);

    answersArray.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Remove previous answers
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Handle answer selection
function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Move to the next question or finish the quiz
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// Display the final score
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}
