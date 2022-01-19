import moviesRender from '../hbs/render.hbs';

const btnMyLibrary = document.querySelector('#library');
const btnHome = document.querySelector('#home');

const moviesSet = document.querySelector('.section-movies__set');

const renderMyLibarary = () => {
    const libaryMarkup = moviesRender(JSON.parse(localStorage.getItem('Watched')));
    moviesSet.innerHTML = libaryMarkup;
}
const renderHome = () => {
    const libaryMarkup = moviesRender(JSON.parse(localStorage.getItem('Trending')));
    moviesSet.innerHTML = libaryMarkup;
}

btnMyLibrary.addEventListener('click', renderMyLibarary);
btnHome.addEventListener('click', renderHome);