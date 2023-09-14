const questions = [
    {
        question: "Which clef is it?",
        image: "images/trebleclef.png",
        answers: [
            { text: "Bass Clef", correct: false},
            { text: "Treble Clef", correct: true},
            { text: "Alto Clef", correct: false},
        ]
    },
    {
        question: "Which clef is it?",
        image: "images/altoclef.png",
        answers: [
            { text: "Bass Clef", correct: false},
            { text: "Treble Clef", correct: false},
            { text: "Alto Clef", correct: true},
        ]
    },
    {
        question: "Which clef is it?",
        image: "images/bassclef2.png",
        answers: [
            { text: "Bass Clef", correct: true},
            { text: "Treble Clef", correct: false},
            { text: "Alto Clef", correct: false},
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