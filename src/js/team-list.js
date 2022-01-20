const link = document.querySelector('.footer__link');
const backdropModalEl = document.querySelector("[data-backdrop]");
const modalEl = document.querySelector('.modal__card');
import teamMarkup from '../hbs/team-list.hbs';

link.addEventListener('click', onOpenTeamList)

function onOpenTeamList(e) {
  e.preventDefault()

  backdropModalEl.classList.remove("is-hidden")
  modalEl.innerHTML = teamMarkup()
}




