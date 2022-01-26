import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import moviesRender from '../hbs/render.hbs';

const paginationEl = document.getElementById('pagination');
const moviesSet = document.querySelector('.section-movies__set');

const filmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
const filmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));

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

// const pagination = new Pagination(paginationEl, options);
// let countOfItems = Math.ceil(DATA.length / options.itemsPerPage);
// console.log(countOfItems);
// pagination.getCurrentPage();
function renderWatched(start = 0, end = 20) {
  const markupArray = [...filmsWatched];
  moviesSet.innerHTML = '';
  return moviesSet.insertAdjacentHTML('afterbegin', moviesRender(markupArray.slice(start, end)));
}
function renderQueue(start = 0, end = 20) {
  const markupArray = [...filmsQueue];
  moviesSet.innerHTML = '';
  return moviesSet.insertAdjacentHTML('afterbegin', moviesRender(markupArray.slice(start, end)));
}

// pagination.on('afterMove', eData => {
//   currentPage = eData.page;
//   let start = 20 * (currentPage - 1);
//   let end = 20 * currentPage;
//   render(start, end);
//   return;
// });

export { optionsWatched, optionsQueue, filmsWatched, renderWatched, filmsQueue, renderQueue };
