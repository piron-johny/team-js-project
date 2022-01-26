import modalRender from '../hbs/modalRender.hbs';
import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';

const body = document.querySelector('body');
const btnCloseModal = document.querySelector('[data-modal-close]');
const backdropModalEl = document.querySelector('[data-backdrop]');
const cardOpenModal = document.querySelector('.section-movies__set');
const modalEl = document.querySelector('.modal__card');
const emptyLibraryMessage = document.querySelector('.empty-library');
const paginationEl = document.getElementById('pagination');
const elasticList = document.querySelector('.search-list');

cardOpenModal.addEventListener('click', onModalOpen);
btnCloseModal.addEventListener('click', onModalClose);
elasticList.addEventListener('click', onModalOpen);

backdropModalEl.addEventListener('click', onBackdropClick);

window.addEventListener('keydown', onEscPress);

function onModalOpen(e) {
  let target = e.target;
  const currentTarget = e.currentTarget;

  const temp = (target, currentTarget) => {
    if (target === cardOpenModal) return;
    if (target.parentElement === currentTarget) {
      backdropModalEl.classList.remove('is-hidden');
      body.style.overflow = 'hidden';

        const findId = +target.id;
        // console.log(target)
        // console.log(target.id)
      const modalFilm = initialData.moviesArrayCurrent.find(film => film.id === findId);
      modalEl.insertAdjacentHTML('beforeend', modalRender(modalFilm));

      const btnWatched = document.querySelector('[data-modal-watched]');
      const btnQueued = document.querySelector('[data-modal-queue]');

      monitorButtonStatusTextWatched();
      monitorButtonStatusTextQueue();
      btnWatched.addEventListener('click', () => {
        let filmsWatchedArr = [];
        let localStorageData = localStorage.getItem('filmsWatched');
        if (localStorageData !== null) {
          filmsWatchedArr.push(...JSON.parse(localStorageData));
        }
        if (filmsWatchedArr.find(el => el.id === modalFilm.id)) {
          filmsWatchedArr = filmsWatchedArr.filter(el => el.id !== modalFilm.id);
          
          if (localStorage.getItem("location") == 'name') {
              if (filmsWatchedArr.length === 0) {
                cardOpenModal.innerHTML = '';
                emptyLibraryMessage.textContent = 'You do not have watched movies. Add them.';
                paginationEl.classList.add('hidden');
              } else {
                  cardOpenModal.innerHTML = moviesRender(filmsWatchedArr);
                  emptyLibraryMessage.textContent = '';
              }
              } else if (localStorage.getItem("location") == 'library-watched') {
                          if (filmsWatchedArr.length === 0) {
                cardOpenModal.innerHTML = '';
                emptyLibraryMessage.textContent = 'You do not have watched movies. Add them.';
                paginationEl.classList.add('hidden');
              } else {
                  cardOpenModal.innerHTML = moviesRender(filmsWatchedArr);
                  emptyLibraryMessage.textContent = '';
              }

          }
        } else {
          filmsWatchedArr.push(modalFilm);
        }
        
        localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));

        monitorButtonStatusTextWatched();
      });

      function monitorButtonStatusTextWatched() {
        let localStorageFilmsWatched = localStorage.getItem('filmsWatched');
        if(localStorageFilmsWatched === null){
          btnWatched.textContent = 'Add to watched'
        }
        else if(JSON.parse(localStorageFilmsWatched).find(el => el.id === modalFilm.id)){
          btnWatched.textContent = 'Delete from watched'
          btnWatched.classList.add('btn__active')
        }
        else{
          btnWatched.textContent = 'Add to watched'
          btnWatched.classList.remove('btn__active')
        }
      }

      btnQueued.addEventListener('click', () => {
        let filmsQueueArr = [];
        let localStorageData = localStorage.getItem('filmsQueue');
        if (localStorageData !== null) {
          filmsQueueArr.push(...JSON.parse(localStorageData));
        }
        if (filmsQueueArr.find(el => el.id === modalFilm.id)) {
          filmsQueueArr = filmsQueueArr.filter(el => el.id !== modalFilm.id);

           if (localStorage.getItem("location") == 'name') {
              if (filmsQueueArr.length === 0) {
                cardOpenModal.innerHTML = '';
                emptyLibraryMessage.textContent = 'You do not have watched movies. Add them.';
                paginationEl.classList.add('hidden');
              } else {
                  cardOpenModal.innerHTML = moviesRender(filmsQueueArr);
                  emptyLibraryMessage.textContent = '';
              }
              } else if (localStorage.getItem("location") == 'library-queued') {
                          if (filmsQueueArr.length === 0) {
                cardOpenModal.innerHTML = '';
                emptyLibraryMessage.textContent = 'You do not have watched movies. Add them.';
                paginationEl.classList.add('hidden');
              } else {
                  cardOpenModal.innerHTML = moviesRender(filmsQueueArr);
                  emptyLibraryMessage.textContent = '';
              }
          }

        } else {
          filmsQueueArr.push(modalFilm);
        }
        localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArr));
        monitorButtonStatusTextQueue();
      });
      function monitorButtonStatusTextQueue() {
        let localStorageFilmsQueue = localStorage.getItem('filmsQueue');
        if(localStorageFilmsQueue === null){
          btnQueued.textContent = 'Add to queue'
        }
        else if(JSON.parse(localStorageFilmsQueue).find(el => el.id === modalFilm.id)){
          btnQueued.textContent = 'Delete from queue'
          btnQueued.classList.add('btn__active')
        }
        else{
          btnQueued.textContent = 'Add to queue'
          btnQueued.classList.remove('btn__active')
        }
      }
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
  modalEl.innerHTML = '';
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
