const link = document.querySelector('.footer__link');
const backdropModalEl = document.querySelector('[data-backdrop]');
const modalCartEl = document.querySelector('.modal__card');
const modalEl = document.querySelector('.modal');
const arrowTop = document.querySelector('.arrowTop');
const header = document.querySelector('header');
const debounce = require('lodash.debounce');
import teamMarkup from '../hbs/team-list.hbs';

link.addEventListener('click', onOpenTeamList);
window.addEventListener('scroll', debounce(onFetchToScroll, 150));
arrowTop.addEventListener('click', onScrollUp);

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

function onFetchToScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop >= 300) {
    arrowTop.classList.add('show');
  } else {
    arrowTop.classList.remove('show');
  }
}

function onScrollUp(e) {
  e.preventDefault();
  header.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
