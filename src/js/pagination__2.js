import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';

const paginationEl = document.getElementById('pagination');
const moviesSet = document.querySelector('.section-movies__set');

export const options = {     // !!!!!!!!!!!
  totalItems: 0,    // !!!!!!!!!!!
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,     // !!!!!!!!!!!
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

export const pagination = () => {     // !!!!!!!!!!!
    const paginationRender = new Pagination(paginationEl, options);

    paginationRender.on('afterMove', eData => {
        initialData.params.page = eData.page;  // !!!!!!!!!!!
        initialData.request()  // !!!!!!!!!!!
        return;
    });
};