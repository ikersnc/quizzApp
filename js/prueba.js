let categoria = document.getElementsByName('trivia_category');
let dificultad = document.getElementsByName('dificultad');
let numPeg = document.getElementById('numPeg');
let startGame = document.getElementById('startGame');
let url = 'https://opentdb.com/api.php?amount=';

startGame.addEventListener('click', function() {

    url += `${numPeg.value}&category=${categoria[0].value}&difficulty=${dificultad[0].value}&type=multiple`;
    console.log(url);
});
