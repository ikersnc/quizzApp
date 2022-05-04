window.addEventListener('popstate', function() {
    let home = document.getElementById('home');
    let form = document.getElementById('form');

    if(!home.classList.contains('hidden'))
        home.classList.add('hidden');
    form.classList.remove('hidden');
});

