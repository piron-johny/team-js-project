import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';
import { changeTimeWindow } from './trending';
import { options, paginationForLibrary } from './pagination__2';

const logo = document.querySelector('.page-header__logo');
const btnHome = document.querySelector('#home');
const btnMyLibrary = document.querySelector('#library');
const btnWatched = document.querySelector('[name="watched"]');
const btnQueue = document.querySelector('[name="queue"]');
const paginationEl = document.getElementById('pagination');
const moviesSet = document.querySelector('.section-movies__set');
const emptyLibraryMessage = document.querySelector('.empty-library');

const renderMyLibarary = event => {
    event.preventDefault();
    renderWatchedFilm();
};

const renderHome = event => {
  event.preventDefault();
  localStorage.setItem('location', 'home');
  initialData.params.page = 1;
  changeTimeWindow();
  initialData.request();
  paginationEl.classList.remove('hidden');
  emptyLibraryMessage.textContent = '';
};

localStorage.setItem('location', 'home');

const renderWatchedFilm = () => {
    localStorage.setItem('location', 'library-watched');
    initialData.moviesArrayCurrent = JSON.parse(localStorage.getItem('filmsWatched')) || [];
    btnQueue.classList.remove('superactive');
    btnWatched.classList.add('superactive');

    if (initialData.moviesArrayCurrent.length === 0) {
        moviesSet.innerHTML = '';
        paginationEl.classList.add('hidden');
        return emptyLibraryMessage.textContent = 'You do not have watched movies. Add them.';
    };

    const rating = document.querySelectorAll('.rating');
    rating.forEach(item => item.classList.remove('rating--is-hidden'));
    emptyLibraryMessage.textContent = '';

    paginationEl.classList.remove('hidden');

    options.totalItems = initialData.moviesArrayCurrent.length;


    const tempArray = initialData.moviesArrayCurrent.slice(0, 20);
    moviesSet.innerHTML = moviesRender(tempArray);
    paginationForLibrary();
};
const renderQueuedFilm = () => {
    localStorage.setItem('location', 'library-queued');
    initialData.moviesArrayCurrent = JSON.parse(localStorage.getItem('filmsQueue')) || [];

    btnQueue.classList.add('superactive');
    btnWatched.classList.remove('superactive');

    if (initialData.moviesArrayCurrent.length === 0) {
        moviesSet.innerHTML = '';
        paginationEl.classList.add('hidden');
        return emptyLibraryMessage.textContent = 'You do not have to queue movies to watch. Add them.';
    };
    
    const rating = document.querySelectorAll('.rating');
    rating.forEach(item => item.classList.remove('rating--is-hidden'));
    emptyLibraryMessage.textContent = '';

    paginationEl.classList.remove('hidden');

    options.totalItems = initialData.moviesArrayCurrent.length;


    const tempArray = initialData.moviesArrayCurrent.slice(0, 20);
    moviesSet.innerHTML = moviesRender(tempArray);
    paginationForLibrary();
};

logo.addEventListener('click', renderHome);
btnHome.addEventListener('click', renderHome);
btnMyLibrary.addEventListener('click', renderMyLibarary);
btnWatched.addEventListener('click', renderWatchedFilm);
btnQueue.addEventListener('click', renderQueuedFilm);