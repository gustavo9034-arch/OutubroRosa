
const questions = [
  {
    question: "Qual é o principal objetivo do Outubro Rosa?",
    answers: [
      "Promover a conscientização sobre o câncer de mama",
      "Substituir consultas médicas por pesquisas na internet",
      "Falar somente sobre alimentação",
      "Incentivar todas as pessoas a fazerem o mesmo exame na mesma idade"
    ],
    correct: 0,
    explanation: "Isso mesmo! A campanha divulga informações e incentiva o cuidado com a saúde das mamas."
  },
  {
    question: "O que fazer ao perceber uma alteração nova na mama?",
    answers: [
      "Ignorar, porque toda alteração é normal",
      "Esperar até o próximo Outubro Rosa",
      "Procurar uma unidade de saúde ou profissional de saúde",
      "Tomar medicamentos por conta própria"
    ],
    correct: 2,
    explanation: "Uma alteração não significa necessariamente câncer, mas deve ser avaliada por um profissional."
  },
  {
    question: "O autoexame substitui os exames e as consultas recomendados por profissionais?",
    answers: [
      "Sim, sempre",
      "Não. Perceber o próprio corpo é importante, mas não substitui a avaliação profissional",
      "Sim, se for feito uma vez por ano",
      "Não é importante conhecer o próprio corpo"
    ],
    correct: 1,
    explanation: "Correto! Conhecer o corpo ajuda a notar mudanças, mas não substitui o acompanhamento de saúde."
  },
  {
    question: "Qual destas opções pode contribuir para reduzir o risco de câncer de mama?",
    answers: [
      "Fumar regularmente",
      "Evitar qualquer consulta de rotina",
      "Manter hábitos saudáveis, como praticar atividade física",
      "Usar remédios sem orientação"
    ],
    correct: 2,
    explanation: "Hábitos saudáveis podem contribuir para reduzir riscos, embora não eliminem totalmente a possibilidade da doença."
  },
  {
    question: "Qual é uma fonte brasileira confiável para consultar informações sobre câncer?",
    answers: [
      "Uma mensagem anônima nas redes sociais",
      "O Instituto Nacional de Câncer (INCA)",
      "Uma propaganda sem referências",
      "Um comentário sem autoria"
    ],
    correct: 1,
    explanation: "O INCA e o Ministério da Saúde são fontes oficiais para consultar informações sobre câncer."
  }
];

const questionCounter = document.getElementById("question-counter");
const scoreLabel = document.getElementById("score-label");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const answerHint = document.getElementById("answer-hint");

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const item = questions[currentQuestion];

  answered = false;

  questionCounter.textContent =
    `Pergunta ${currentQuestion + 1} de ${questions.length}`;

  scoreLabel.textContent = `Pontuação: ${score}`;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionText.textContent = item.question;
  answersContainer.innerHTML = "";
  feedback.textContent = "";
  answerHint.textContent = "Escolha uma alternativa.";

  nextButton.disabled = true;

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Ver resultado"
      : "Próxima pergunta";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-option";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${answer}`;

    button.addEventListener("click", () => selectAnswer(index));

    answersContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const item = questions[currentQuestion];
  const options =
    answersContainer.querySelectorAll(".answer-option");

  options.forEach((button, index) => {
    button.disabled = true;

    if (index === item.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== item.correct) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === item.correct) {
    score++;

    feedback.textContent =
      `Resposta correta! ${item.explanation}`;
  } else {
    feedback.textContent =
      `Não foi dessa vez. ${item.explanation}`;
  }

  scoreLabel.textContent = `Pontuação: ${score}`;
  answerHint.textContent = "Resposta registrada.";

  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  nextButton.disabled = false;
}

function showResult() {
  questionCounter.textContent = "Quiz concluído";

  scoreLabel.textContent =
    `Pontuação: ${score} de ${questions.length}`;

  progressBar.style.width = "100%";

  questionText.textContent =
    "Você concluiu o Quiz do Outubro Rosa!";

  answersContainer.innerHTML = "";

  let message;

  if (score === questions.length) {
    message =
      "Excelente! Você acertou todas as perguntas. Continue compartilhando informações confiáveis.";
  } else if (score >= 3) {
    message =
      "Muito bem! Você aprendeu pontos importantes. Continue consultando fontes confiáveis.";
  } else {
    message =
      "Valeu pela participação! Aproveite para revisar as informações da página e tente novamente.";
  }

  const result = document.createElement("p");

  result.className = "result-title";
  result.textContent =
    `Você acertou ${score} de ${questions.length} perguntas.`;

  answersContainer.appendChild(result);

  feedback.textContent = message;
  answerHint.textContent =
    "A informação é uma forma de cuidado.";

  nextButton.disabled = false;
  nextButton.textContent = "Refazer quiz";
  nextButton.dataset.restart = "true";
}

nextButton.addEventListener("click", () => {
  if (nextButton.dataset.restart === "true") {
    currentQuestion = 0;
    score = 0;

    delete nextButton.dataset.restart;

    renderQuestion();
    return;
  }

  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

// Menu para celulares

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  });
});

// Atualiza o ano automaticamente

document.getElementById("year").textContent =
  new Date().getFullYear();

// Inicia o quiz

renderQuestion();
