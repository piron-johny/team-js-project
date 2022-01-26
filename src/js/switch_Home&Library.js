import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';

const logo = document.querySelector('.page-header__logo');
const btnHome = document.querySelector('#home');
const btnMyLibrary = document.querySelector('#library');
const watchedBtn = document.querySelector('[name="watched"]');
const queuedBtn = document.querySelector('[name="queue"]');
const paginationEl = document.getElementById('pagination');
const moviesSet = document.querySelector('.section-movies__set');
const emptyLibraryMessage = document.querySelector('.empty-library');

const renderMyLibarary = event => {
  event.preventDefault();
  moviesSet.innerHTML = moviesRender(initialData.moviesArrayWatched);
  renderWatchedFilmList();
  watchedBtn.classList.add('superactive');
  if (JSON.parse(localStorage.getItem('filmsWatched')).length <= 20) {
    paginationEl.classList.add('hidden');
  }
  const rating = document.querySelectorAll('.rating');
  rating.forEach(item => item.classList.remove('rating--is-hidden'));
};
const renderHome = event => {
  event.preventDefault();
  initialData.page = 1;
  initialData.request();
  paginationEl.classList.remove('hidden');
  emptyLibraryMessage.textContent = '';
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
    emptyLibraryMessage.textContent = '';

  } else if (
    watchedFilmListFromLS !== null &&
    JSON.parse(watchedFilmListFromLS).length !== 0 &&
    JSON.parse(watchedFilmListFromLS).length >= 20
  ) {
    moviesSet.insertAdjacentHTML('afterbegin', moviesRender(JSON.parse(watchedFilmListFromLS)));
    paginationEl.classList.add('hidden');
    emptyLibraryMessage.textContent = '';
    // paginationEl.classList.remove('hidden');
    // initialData.pagination();
  } else if (watchedFilmListFromLS === null || JSON.parse(watchedFilmListFromLS).length === 0) {
    moviesSet.innerHTML = '';
    // const listItem = document.createElement('li');
    // listItem.classList.add('main__noFilmsInList');
    emptyLibraryMessage.textContent = 'You do not have watched movies. Add them.';
    // moviesSet.append(listItem);
    // paginationEl.classList.add('hidden');
  }
  queuedBtn.classList.remove('superactive');
  watchedBtn.classList.add('superactive');

  const rating = document.querySelectorAll('.rating');
  rating.forEach(item => item.classList.remove('rating--is-hidden'));
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
    emptyLibraryMessage.textContent = '';
  } else if (
    queueFilmListFromLS !== null &&
    JSON.parse(queueFilmListFromLS).length !== 0 &&
    JSON.parse(queueFilmListFromLS).length >= 20
  ) {
    moviesSet.insertAdjacentHTML('afterbegin', moviesRender(JSON.parse(queueFilmListFromLS)));
    paginationEl.classList.add('hidden');
    emptyLibraryMessage.textContent = '';
    // paginationEl.classList.remove('hidden');
    // initialData.pagination();
  } else if (queueFilmListFromLS === null || JSON.parse(queueFilmListFromLS).length === 0) {
    moviesSet.innerHTML = '';
    // const listItem = document.createElement('li');
    // listItem.classList.add('main__noFilmsInList');
    emptyLibraryMessage.textContent = 'You do not have to queue movies to watch. Add them.';
    // moviesSet.append(listItem);
    paginationEl.classList.add('hidden');
  }
  queuedBtn.classList.add('superactive');
  watchedBtn.classList.remove('superactive');

  const rating = document.querySelectorAll('.rating');
  rating.forEach(item => item.classList.remove('rating--is-hidden'));
}
queuedBtn.addEventListener('click', renderQueuedFilmList);
