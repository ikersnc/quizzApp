function play() {
    let home = document.getElementById('home');
    let form = document.getElementById('form');

    home.classList.add('hidden');
    form.classList.remove('hidden');
};

addEventListener('backbutton', function() {
    let home = document.getElementById('home');
    let form = document.getElementById('form');

    home.classList.remove('hidden');
    form.classList.add('hidden');
});