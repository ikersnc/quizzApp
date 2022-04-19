const userName = document.getElementById('username');
const saveScore = document.getElementById('saveScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalscore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = mostRecentScore;

userName.addEventListener('keyup', () => {
    saveScore.disabled = !userName.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: userName.value
    };
    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};