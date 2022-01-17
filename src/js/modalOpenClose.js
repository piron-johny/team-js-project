const btnCloseModal = document.querySelector("[data-modal-close]");
const backdropModalEl = document.querySelector("[data-backdrop]");
const cardOpenModal = document.querySelector(".section-movies__set");


cardOpenModal.addEventListener('click', onModalOpen);
btnCloseModal.addEventListener('click', onModalClose);
backdropModalEl.addEventListener('click', onBackdropClick);
window.addEventListener('keydown', onEscPress);

function onModalOpen(e) {
    if (e.target.nodeName !== `LI`) {
        backdropModalEl.classList.remove("is-hidden")
    }   
}

function onModalClose() {
    backdropModalEl.classList.add("is-hidden")
}

function onBackdropClick(e){
    if (e.currentTarget === e.target) {
        onModalClose()
    }
}

function onEscPress(e) {
    console.log(e);
    if (e.key === 'Escape') {
        onModalClose()
        window.removeEventListener('keydown', onEscPress);
 }
}