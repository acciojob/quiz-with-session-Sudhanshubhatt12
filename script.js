// Array of quiz questions and choices
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Function to render the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear any existing content

  // Retrieve saved answers from local storage
  const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    question.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Check if this choice was previously selected
      if (savedAnswers[`question-${i}`] === choice) {
        choiceInput.checked = true;
      }

      // Save the user's choice when selected
      choiceInput.addEventListener("change", () => {
        savedAnswers[`question-${i}`] = choice;
        localStorage.setItem("userAnswers", JSON.stringify(savedAnswers));
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to calculate and display the user's score
function submitQuiz() {
  const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};
  let score = 0;

  questions.forEach((question, i) => {
    if (savedAnswers[`question-${i}`] === question.answer) {
      score++;
    }
  });

  // Display the score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save the score in local storage
  localStorage.setItem("score", score);
}

// Function to display the saved score from local storage
function displaySavedScore() {
  const savedScore = localStorage.getItem("score");
  const scoreElement = document.getElementById("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your previous score was ${savedScore} out of ${questions.length}.`;
  }
}

// Initialize the quiz on page load
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  displaySavedScore();

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", submitQuiz);
});
