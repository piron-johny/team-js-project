import modalRender from '../hbs/modalRender.hbs';

const body = document.querySelector("body");
const btnCloseModal = document.querySelector("[data-modal-close]");
const backdropModalEl = document.querySelector("[data-backdrop]");
export const cardOpenModal = document.querySelector(".section-movies__set");
const modalEl = document.querySelector('.modal__card');


cardOpenModal.addEventListener('click', onModalOpen);
btnCloseModal.addEventListener('click', onModalClose);

backdropModalEl.addEventListener('click', onBackdropClick);

window.addEventListener('keydown', onEscPress);

function onModalOpen(e) {

      if (e.target.parentElement.className === 'section-movies__card' || e.target.parentElement.className === 'movies-card__genres-list')  {
          backdropModalEl.classList.remove("is-hidden")
          body.style.overflow = 'hidden'
          
          const findId = e.target.parentNode.id
          const savedFilms = JSON.parse(localStorage.getItem(`Trending`));
          const modalFilm = savedFilms.find(film => film.id === +findId)

        modalEl.insertAdjacentHTML('beforeend', modalRender(modalFilm));
    }     
}

export default function onModalClose() {
    backdropModalEl.classList.add("is-hidden")
    modalEl.innerHTML = ''
}

function onBackdropClick(e){
    if (e.currentTarget === e.target) {
        onModalClose()
    }
}

function onEscPress(e) {
    if (e.key === 'Escape') {
        onModalClose()
        window.removeEventListener('keydown', onModalClose);
 }
}

export { cardOpenModal }