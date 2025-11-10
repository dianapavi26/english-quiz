const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Main Language", correct: false },
      { text: "High Transfer Markup Level", correct: false }
    ]
  },
  {
    question: "Which property changes the background color in CSS?",
    answers: [
      { text: "color", correct: false },
      { text: "font-color", correct: false },
      { text: "background-color", correct: true }
    ]
  },
  {
    question: "What function shows a message in JavaScript?",
    answers: [
      { text: "alert()", correct: true },
      { text: "show()", correct: false },
      { text: "print()", correct: false }
    ]
  },
  {
    question: "Which tag is used to link a CSS file?",
    answers: [
      { text: "<style>", correct: false },
      { text: "<css>", correct: false },
      { text: "<link>", correct: true }
    ]
  },
  {
    question: "What symbol starts a comment in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "#", correct: false },
      { text: "<!--", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDiv = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer) {
  const buttons = answerButtons.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  if (answer.correct) {
    score++;
    scoreDiv.innerText = "✅ Correct!";
  } else {
    scoreDiv.innerText = "❌ Wrong answer!";
  }
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    scoreDiv.innerText = "";
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `You finished the game! 🎉`;
  scoreDiv.innerText = `Your final score: ${score}/${questions.length}`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
  nextButton.onclick = startGame;
}

startGame();
