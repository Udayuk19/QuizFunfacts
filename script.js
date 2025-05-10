const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Coded Style Sheets", "Computer Style Sheet"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hot Mail", "How To Make Landingpage", "Hyper Tool Multi Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995"
  },
  {
    question: "What is the output of `typeof null` in JavaScript?",
    options: ["object", "null", "undefined", "string"],
    answer: "object"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<script>", "<css>", "<link>"],
    answer: "<style>"
  },
  {
    question: "What is the default position value in CSS?",
    options: ["static", "relative", "absolute", "fixed"],
    answer: "static"
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()"
  },
  {
    question: "What does the `this` keyword refer to in JavaScript?",
    options: [
      "The current function",
      "The global object",
      "The object that owns the function",
      "The parent object"
    ],
    answer: "The object that owns the function"
  },
  {
    question: "What is the output of `2 + '2'` in JavaScript?",
    options: ["4", "22", "NaN", "undefined"],
    answer: "22"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const progressInner = document.getElementById('progress-inner');
const timerDisplay = document.getElementById('time');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score');

function startQuiz() {
  shuffleQuestions();
  showQuestion();
  startTimer();
}

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionElement.innerText = q.question;
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.addEventListener('click', () => selectAnswer(btn, q.answer));
    optionsContainer.appendChild(btn);
  });

  updateProgress();
}

function resetState() {
  nextBtn.style.display = "none";
  optionsContainer.innerHTML = "";
}

function selectAnswer(button, correctAnswer) {
  const isCorrect = button.innerText === correctAnswer;
  if (isCorrect) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
  }

  Array.from(optionsContainer.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) btn.classList.add('correct');
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressInner.style.width = `${progress}%`;
}

function startTimer() {
  timerDisplay.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizBox.classList.add('hidden');
  resultBox.classList.remove('hidden');
  scoreText.innerText = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 60;
  clearInterval(timer); // Clear previous timer
  resultBox.classList.add('hidden');
  quizBox.classList.remove('hidden');
  startQuiz();
}
startQuiz();

function showQuiz() {
  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("joke-section").classList.add("hidden");
  document.querySelector(".grid-layout").classList.add("hidden");
}

function showJokeApp() {
  document.getElementById("joke-section").classList.remove("hidden");
  document.getElementById("quiz-box").classList.add("hidden");
  document.querySelector(".grid-layout").classList.add("hidden");
}

function backToGrid() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("joke-section").classList.add("hidden");
  document.querySelector(".grid-layout").classList.remove("hidden");
}

function fetchJoke() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then(response => response.json())
    .then(data => {
      document.getElementById("joke").innerText = data.value;
    })
    .catch(err => {
      document.getElementById("joke").innerText = "Failed to fetch joke.";
    });
}