import modalRender from '../hbs/modalRender.hbs';

const btnCloseModal = document.querySelector("[data-modal-close]");
const backdropModalEl = document.querySelector("[data-backdrop]");
export const cardOpenModal = document.querySelector(".section-movies__set");
const modalEl = document.querySelector('.modal__card');


cardOpenModal.addEventListener('click', onModalOpen);
btnCloseModal.addEventListener('click', onModalClose);

backdropModalEl.addEventListener('click', onBackdropClick);

window.addEventListener('keydown', onEscPress);

function onModalOpen(e) {

    if (e.target.nodeName !== `LI`) {
        backdropModalEl.classList.remove("is-hidden")
        const savedFilms = JSON.parse(localStorage.getItem(`Trending`));
        console.log(savedFilms.results)
        modalEl.insertAdjacentHTML('beforeend', modalRender(savedFilms));
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
    // console.log(e);
    if (e.key === 'Escape') {
        onModalClose()
        window.removeEventListener('keydown', onModalClose);
 }
}