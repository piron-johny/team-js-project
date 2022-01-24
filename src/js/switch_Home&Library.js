import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';

const logo = document.querySelector('.page-header__logo');
const btnHome = document.querySelector('#home');
const btnMyLibrary = document.querySelector('#library');
const watchedBtn = document.querySelector('[name="watched"]');
const queuedBtn = document.querySelector('[name="queue"]');

const moviesSet = document.querySelector('.section-movies__set');
const paginationEl = document.getElementById('pagination');
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

const renderMyLibarary = event => {
  event.preventDefault();
  moviesSet.innerHTML = moviesRender(initialData.moviesArrayWatched);
  renderWatchedFilmList();
  watchedBtn.classList.add('superactive');
  initialData.pagination();
};
const renderHome = event => {
  event.preventDefault();
  initialData.page = 1;
  initialData.trendingMovies();
  paginationEl.classList.remove('hidden');
};

logo.addEventListener('click', renderHome);
btnHome.addEventListener('click', renderHome);
btnMyLibrary.addEventListener('click', renderMyLibarary);

function renderWatchedFilmList() {
  moviesSet.innerHTML = '';
  let watchedFilmListFromLS = localStorage.getItem('filmsWatched');
  if (
    watchedFilmListFromLS !== null &&
    JSON.parse(watchedFilmListFromLS).length !== 0 &&
    JSON.parse(watchedFilmListFromLS).length <= 20
  ) {
    moviesSet.insertAdjacentHTML('afterbegin', moviesRender(JSON.parse(watchedFilmListFromLS)));
    paginationEl.classList.add('hidden');
    console.log(JSON.parse(watchedFilmListFromLS).length);
  } else if (
    watchedFilmListFromLS !== null &&
    JSON.parse(watchedFilmListFromLS).length !== 0 &&
    JSON.parse(watchedFilmListFromLS).length >= 20
  ) {
    moviesSet.insertAdjacentHTML('afterbegin', moviesRender(JSON.parse(watchedFilmListFromLS)));
    paginationEl.classList.add('hidden');
    // paginationEl.classList.remove('hidden');
    // initialData.pagination();
  } else if (watchedFilmListFromLS === null || JSON.parse(watchedFilmListFromLS).length === 0) {
    moviesSet.innerHTML = '';
    const listItem = document.createElement('li');
    listItem.classList.add('main__noFilmsInList');
    listItem.textContent = 'You do not have watched movies. Add them.';
    moviesSet.append(listItem);
  }

  queuedBtn.classList.remove('main__navigationLibraryButtonActive');
  watchedBtn.classList.add('main__navigationLibraryButtonActive');
}

watchedBtn.addEventListener('click', renderWatchedFilmList);

function renderQueuedFilmList() {
  watchedBtn.classList.remove('superactive');
  moviesSet.innerHTML = '';
  let queueFilmListFromLS = localStorage.getItem('filmsQueue');
  if (
    queueFilmListFromLS !== null &&
    JSON.parse(queueFilmListFromLS).length !== 0 &&
    JSON.parse(queueFilmListFromLS).length <= 20
  ) {
    moviesSet.insertAdjacentHTML('afterbegin', moviesRender(JSON.parse(queueFilmListFromLS)));
    paginationEl.classList.add('hidden');
  } else if (
    queueFilmListFromLS !== null &&
    JSON.parse(queueFilmListFromLS).length !== 0 &&
    JSON.parse(queueFilmListFromLS).length >= 20
  ) {
    moviesSet.insertAdjacentHTML('afterbegin', moviesRender(JSON.parse(queueFilmListFromLS)));
    paginationEl.classList.add('hidden');
    // paginationEl.classList.remove('hidden');
    // initialData.pagination();
  } else if (queueFilmListFromLS === null || JSON.parse(queueFilmListFromLS).length === 0) {
    moviesSet.innerHTML = '';
    const listItem = document.createElement('li');
    listItem.classList.add('main__noFilmsInList');
    listItem.textContent = 'You do not have to queue movies to watch. Add them.';
    moviesSet.append(listItem);
  }

  queuedBtn.classList.add('main__navigationLibraryButtonActive');
  watchedBtn.classList.remove('main__navigationLibraryButtonActive');
}

queuedBtn.addEventListener('click', renderQueuedFilmList);
