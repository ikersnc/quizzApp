window.addEventListener('popstate', function() {
    let home = document.getElementById('home');
    let form = document.getElementById('form');

    if(!home.classList.contains('container'))
        home.classList.add('container');
    form.classList.remove('hidden');
});