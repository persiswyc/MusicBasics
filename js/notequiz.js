const questions = [
    {
        question: "Which note is it?",
        image: "images/eighthnote.png",
        answers: [
            { text: "Whole Note", correct: false},
            { text: "Eighth Note", correct: true},
            { text: "Half Note", correct: false},
        ]
    },
    {
        question: "Which note is it?",
        image: "images/wholenote.png",
        answers: [
            { text: "Whole Note", correct: true},
            { text: "Sixteenth Note", correct: false},
            { text: "Quarter Note", correct: false},
        ]
    },
    {
        question: "Which note is it?",
        image: "images/quarternote.png",
        answers: [
            { text: "Half Note", correct: false},
            { text: "Quarter Note", correct: true},
            { text: "Sixteenth Note", correct: false},
        ]
    },
    {
        question: "Which note is it?",
        image: "images/sixteenthnote.png",
        answers: [
            { text: "Whole Note", correct: false},
            { text: "Eighth Note", correct: false},
            { text: "Sixteenth Note", correct: true},
        ]
    },
    {
        question: "Which note is it?",
        image: "images/halfnote.png",
        answers: [
            { text: "Eighth Note", correct: false},
            { text: "Half Note", correct: true},
            { text: "Quarter Note", correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const questionImageElement = document.getElementById("qimage");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const otherButton = document.getElementById("other-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    otherButton.innerHTML = "Other";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionImageElement.src = currentQuestion.image;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    otherButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    otherButton.style.display = "none";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    questionImageElement.src = "images/fight.png";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    otherButton.innerHTML = "Try Another Quiz";
    otherButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();