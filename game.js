const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: '¿Dentro de qué elemento HTML metemos Javascript?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1
    },
    {
        question: '¿Cuál es la sintaxis correcta para referirse a un script externo llamado "xxx.js"?',
        choice1: '<script href="xxx.js">',
        choice2: '<script name="xxx.js">',
        choice3: '<script src="xxx.js">',
        choice4: '<script file="xxx.js">',
        answer: 3
    },
    {
        question: '¿Cómo se escribe "Hello world" en un alert?',
        choice1: 'msgBox("Hello world");',
        choice2: 'alertBox("Hello world");',
        choice3: 'msg("Hello world");',
        choice4: 'alert("Hello world");',
        answer: 4
    },
];

/* CONSTANTES */

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS )
        return window.location.assign('end.html');
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers)
            return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        getNewQuestion();
    });
});

startGame();