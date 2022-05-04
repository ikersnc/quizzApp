const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//GENERAR URL PARA LA PARTIDA ACORDE A LO ELEGIDO EN EL FORMULARIO
let categoria = document.getElementsByName('trivia_category');
let dificultad = document.getElementsByName('dificultad');
let numPeg = document.getElementById('numPeg');
let startGame = document.getElementById('startGame');
let url = 'https://opentdb.com/api.php?amount=';
let form = document.getElementById('form');
let juego = document.getElementById('juego');

startGame.addEventListener('click', function() {

    form.classList.add('hidden');
    juego.classList.remove('hidden');
    juego.classList.add('container');

    url += `${numPeg.value}&category=${categoria[0].value}&difficulty=${dificultad[0].value}&type=multiple`;
    console.log(url);
//
let questions = [];
//https://opentdb.com/
fetch(url)
    .then( res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map( loadedQuestion => {
            const formattedQuestions = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestions.answer - 1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestions['choice' + (index + 1)] = choice;
            });

            return formattedQuestions;
        });
        startGame();
    })
    .catch( err => {
        console.error(err);
    });

/* CONSTANTES */

const CORRECT_BONUS = 10;
//const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {

    localStorage.setItem('mostRecentScore', score);
    if(availableQuestions.length === 0 || questionCounter >= questions.length )
        return window.location.assign('end.html');
    
    questionCounter++;
    // progressText.innerText = `Pregunta: ${questionCounter}/${MAX_QUESTIONS}`;
    progressText.innerText = `Pregunta: ${questionCounter}/${questions.length}`;
    //Actualizar barra de progreso
    // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

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

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply === 'correct') incrementScore(CORRECT_BONUS);

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
});

