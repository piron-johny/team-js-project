// // 1. Пагинация с помощью плагина tui-pagination https://www.npmjs.com/package/tui-pagination
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import moviesRender from '../hbs/render.hbs';

const paginationEl = document.getElementById('pagination');
const galleryEl = document.querySelector('.section-movies__set');
// console.log(galleryEl);

const options = {
  totalItems: 400,
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
const pagination = new Pagination(paginationEl, options);
pagination.getCurrentPage();

pagination.on('afterMove', eData => {
  const currentPage = eData.page;
  // console.log(currentPage);
  return fetchServise.movies(currentPage).then(data => {
    galleryEl.innerHTML = '';
    galleryEl.insertAdjacentHTML('afterbegin', moviesRender(data.data.results));
    // moviesRender(data);
    // console.log(data.data.results);
    return;
  });
});
