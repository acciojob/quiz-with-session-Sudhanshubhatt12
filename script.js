// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions"); // Ensure this matches your HTML
  questionsElement.innerHTML = ""; // Clear any existing content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Add question number
    const questionNumber = document.createElement("strong");
    questionNumber.textContent = `${i + 1}. `;
    questionElement.appendChild(questionNumber);

    // Add question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br")); // Line break after question

    // Add choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if this choice was previously selected
      const savedAnswer = localStorage.getItem(`question-${i}`);
      if (savedAnswer === choice) {
        choiceElement.checked = true;
      }

      // Save the selected answer on change
      choiceElement.addEventListener("change", () => {
        localStorage.setItem(`question-${i}`, choice);
      });

      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br")); // Line break after each choice
    }

    questionsElement.appendChild(questionElement);
    questionsElement.appendChild(document.createElement("br")); // Extra space between questions
  }
}

// Call the function to render questions on page load
document.addEventListener("DOMContentLoaded", renderQuestions);
