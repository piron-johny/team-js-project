const link = document.querySelector('.footer__link');
const backdropModalEl = document.querySelector('[data-backdrop]');
const modalCartEl = document.querySelector('.modal__card');
const modalEl = document.querySelector('.modal');
import teamMarkup from '../hbs/team-list.hbs';

link.addEventListener('click', onOpenTeamList);

function onOpenTeamList(e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden';
  modalEl.style.padding = 0;
  modalCartEl.style.height = '100%';
  backdropModalEl.classList.remove('is-hidden');
  modalCartEl.innerHTML = teamMarkup();

  const nameList = document.querySelectorAll('.name__item span');
  const descriptionList = document.querySelectorAll('.description__item');
  nameList.forEach((el, ind) => {
    el.addEventListener('click', e => {
      document.querySelector('.name__item.active').classList.remove('active');
      document.querySelector('.description__item.active').classList.remove('active');
      e.target.parentNode.classList.add('active');
      descriptionList[ind].classList.add('active');
    });
  });
}
