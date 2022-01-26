import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';

const paginationEl = document.getElementById('pagination');
const moviesSet = document.querySelector('.section-movies__set');

const filmsWatched = JSON.parse(localStorage.getItem('filmsWatched')) || [];
const filmsQueue = JSON.parse(localStorage.getItem('filmsQueue')) || [];

const optionsWatched = {
  totalItems: filmsWatched.length,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong id="selected-btn" class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const optionsQueue = {
  totalItems: filmsQueue.length,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong id="selected-btn" class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paginationWatched = new Pagination(paginationEl, optionsWatched);
const paginationQueue = new Pagination(paginationEl, optionsWatched);
paginationWatched.getCurrentPage();

function renderWatched(start = 0, end = 20) {
  initialData.moviesArrayCurrent = JSON.parse(localStorage.getItem('filmsWatched')) || [];

  moviesSet.innerHTML = '';
  // initialData.moviesArrayCurrent = markupArray.slice(start, end);
  return moviesSet.insertAdjacentHTML(
    'afterbegin',
    moviesRender(initialData.moviesArrayCurrent).slice(start, end),
  );
}

function renderQueue(start = 0, end = 20) {
  moviesSet.innerHTML = '';
  moviesArrayCurrent = markupArray.slice(start, end);
  return moviesSet.insertAdjacentHTML('afterbegin', moviesRender(initialData.moviesArrayCurrent));
}

paginationWatched.on('afterMove', eData => {
  currentPage = eData.page;
  let start = 20 * (currentPage - 1);
  let end = 20 * currentPage;

  if (localStorage.get('location') === 'library-watched') {
    renderWatched(start, end);
  }

  return;
});

paginationQueue.on('afterMove', eData => {
  currentPage = eData.page;
  let start = 20 * (currentPage - 1);
  let end = 20 * currentPage;

  if (localStorage.get('location') === 'library-queued') {
    renderQueue(start, end);
  }

  return;
});

export { optionsWatched, optionsQueue, filmsWatched, renderWatched, filmsQueue, renderQueue };
