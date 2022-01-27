import modalRender from '../hbs/modalRender.hbs';
import { initialData } from './initialData';
import moviesRender from '../hbs/render.hbs';
import { options, paginationForLibrary } from './pagination__2';

const body = document.querySelector('body');
const btnCloseModal = document.querySelector('[data-modal-close]');
const backdropModalEl = document.querySelector('[data-backdrop]');
const cardOpenModal = document.querySelector('.section-movies__set');
const modalEl = document.querySelector('.modal__card');
const moviesSet = document.querySelector('.section-movies__set');

export const emptyLibraryMessage = document.querySelector('.empty-library');
// const paginationEl = document.getElementById('pagination');
// const elasticList = document.querySelector('.search-list');

cardOpenModal.addEventListener('click', onModalOpen);
btnCloseModal.addEventListener('click', onModalClose);
// elasticList.addEventListener('click', onModalOpen);

backdropModalEl.addEventListener('click', onBackdropClick);

window.addEventListener('keydown', onEscPress);

export let findId;
export let modalFilm;

function onModalOpen(e) {
  let target = e.target;
  const currentTarget = e.currentTarget;

  const temp = (target, currentTarget) => {
    if (target === cardOpenModal) return;
    if (target.parentElement === currentTarget) {
        backdropModalEl.classList.remove('is-hidden');
        body.style.overflow = 'hidden';

        if (localStorage.getItem('location') === 'home') { 
            initialData.moviesArrayCurrent = initialData.moviesArrayFetch;
        };

        findId = +target.id;
        modalFilm = initialData.moviesArrayCurrent.find(film => film.id === findId);
        modalEl.innerHTML = modalRender(modalFilm);

        let filmsWatchedArr = JSON.parse(localStorage.getItem('filmsWatched')) || [];
        let filmsQueuedArr = JSON.parse(localStorage.getItem('filmsQueue')) || [];
        const btnAddRemoveWatched = document.querySelector('[data-modal-watched]');
        const btnAddRemoveQueued = document.querySelector('[data-modal-queue]');
        monitorButtonStatusTextWatched();
        monitorButtonStatusTextQueue();


        const changeWatched = () => {
            if (filmsWatchedArr.length === 0) {
                emptyLibraryMessage.textContent = '';
                filmsWatchedArr.push(modalFilm);
                localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
                if (localStorage.getItem('location') === 'library-watched') {
                    initialData.moviesArrayCurrent = filmsWatchedArr;
                    moviesSet.innerHTML = moviesRender(initialData.moviesArrayCurrent);
                };
                monitorButtonStatusTextWatched();
                return;
            };
            if (filmsWatchedArr.length !== 0 && filmsWatchedArr.find(el => el.id === findId)) {
                filmsWatchedArr = filmsWatchedArr.filter(el => el.id !== findId);
                localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
                initialData.moviesArrayCurrent = filmsWatchedArr;
                options.totalItems = initialData.moviesArrayCurrent.length;
                if (localStorage.getItem('location') === 'library-watched') {
                    options.totalItems = initialData.moviesArrayCurrent.length;
                    paginationForLibrary();
                };
                if (filmsWatchedArr.length === 0) {
                    emptyLibraryMessage.textContent = 'You do not have watched movies. Add them.';
                };
                monitorButtonStatusTextWatched();
                return;
            };
            filmsWatchedArr.push(modalFilm);
            localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
            initialData.moviesArrayCurrent = filmsWatchedArr;
            options.totalItems = initialData.moviesArrayCurrent.length;
            if (localStorage.getItem('location') === 'library-watched') {
                options.totalItems = initialData.moviesArrayCurrent.length;
                paginationForLibrary();
            };
            monitorButtonStatusTextWatched();
            return;
        };

        const changeQueued = () => {
            if (filmsQueuedArr.length === 0) {
                emptyLibraryMessage.textContent = '';
                filmsQueuedArr.push(modalFilm);
                localStorage.setItem('filmsQueue', JSON.stringify(filmsQueuedArr));
                if (localStorage.getItem('location') === 'library-queued') {
                    initialData.moviesArrayCurrent = filmsQueuedArr;
                    moviesSet.innerHTML = moviesRender(initialData.moviesArrayCurrent);
                };
                monitorButtonStatusTextQueue();
                return;
            };
            if (filmsQueuedArr.length !== 0 && filmsQueuedArr.find(el => el.id === findId)) {
                filmsQueuedArr = filmsQueuedArr.filter(el => el.id !== findId);
                localStorage.setItem('filmsQueue', JSON.stringify(filmsQueuedArr));
                initialData.moviesArrayCurrent = filmsQueuedArr;
                options.totalItems = initialData.moviesArrayCurrent.length;
                if (localStorage.getItem('location') === 'library-queued') {
                    options.totalItems = initialData.moviesArrayCurrent.length;
                    paginationForLibrary();
                };
                if (filmsQueuedArr.length === 0) {
                    emptyLibraryMessage.textContent = 'You do not have to queue movies to watch. Add them.';
                };
                monitorButtonStatusTextQueue();
                return;
            };
            filmsQueuedArr.push(modalFilm);
            localStorage.setItem('filmsQueue', JSON.stringify(filmsQueuedArr));
            initialData.moviesArrayCurrent = filmsQueuedArr;
            options.totalItems = initialData.moviesArrayCurrent.length;
            if (localStorage.getItem('location') === 'library-queued') {
                options.totalItems = initialData.moviesArrayCurrent.length;
                paginationForLibrary();
            };
            monitorButtonStatusTextQueue();
            return;          
        };

        btnAddRemoveWatched.addEventListener('click', changeWatched);
        btnAddRemoveQueued.addEventListener('click', changeQueued);

        function monitorButtonStatusTextWatched() {
            if (filmsWatchedArr.length !== 0 && filmsWatchedArr.find(el => el.id === findId)) {
                btnAddRemoveWatched.textContent = 'Delete from watched';
                btnAddRemoveWatched.classList.add('btn__active');
                return;
            };
            btnAddRemoveWatched.textContent = 'Add to watched';
            btnAddRemoveWatched.classList.remove('btn__active');
        };

        function monitorButtonStatusTextQueue() {
            if (filmsQueuedArr.length !== 0 && filmsQueuedArr.find(el => el.id === findId)) {
                btnAddRemoveQueued.textContent = 'Delete from queue';
                btnAddRemoveQueued.classList.add('btn__active');
                return;
            };
            btnAddRemoveQueued.textContent = 'Add to queue';
            btnAddRemoveQueued.classList.remove('btn__active');
        };

        return;
    }
    target = target.parentElement;
    temp(target, currentTarget);
  };

  temp(target, currentTarget);
}

// логика добавления по нажатию на кнопки

function onModalClose() {
  backdropModalEl.classList.add('is-hidden');
  changeParam();
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    changeParam();
    onModalClose();
  }
}

function onEscPress(e) {
  if (e.key === 'Escape') {
    onModalClose();
    changeParam();

    window.removeEventListener('keydown', onModalClose);
  }
}

function changeParam() {
  body.style.overflow = 'visible';
  modalEl.style.flex = null;
  document.querySelector('.modal').style.padding = null;
  document.querySelector('.modal').style.display = null;
}
export default { onModalOpen };
export { cardOpenModal };
