import moviesRender from '../hbs/render.hbs';

const logo = document.querySelector('.page-header__logo');
const btnHome = document.querySelector('#home');
const btnMyLibrary = document.querySelector('#library');

const moviesSet = document.querySelector('.section-movies__set');

const renderMyLibarary = event => {
    event.preventDefault();
    const libaryMarkup = moviesRender(JSON.parse(localStorage.getItem('Watched')));
    moviesSet.innerHTML = libaryMarkup;
}
const renderHome = event => {
    event.preventDefault();
    const libaryMarkup = moviesRender(JSON.parse(localStorage.getItem('Trending')));
    moviesSet.innerHTML = libaryMarkup;
}

logo.addEventListener('click', renderHome);
btnHome.addEventListener('click', renderHome);
btnMyLibrary.addEventListener('click', renderMyLibarary);
