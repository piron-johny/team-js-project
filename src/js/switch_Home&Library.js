import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';

const logo = document.querySelector('.page-header__logo');
const btnHome = document.querySelector('#home');
const btnMyLibrary = document.querySelector('#library');

const moviesSet = document.querySelector('.section-movies__set');

const renderMyLibarary = event => {
    event.preventDefault();
    moviesSet.innerHTML = moviesRender(initialData.moviesArrayWatched);
}
const renderHome = event => {
    event.preventDefault();
    initialData.trendingMovies();
}

logo.addEventListener('click', renderHome);
btnHome.addEventListener('click', renderHome);
btnMyLibrary.addEventListener('click', renderMyLibarary);
