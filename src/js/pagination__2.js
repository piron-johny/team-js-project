import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import moviesRender from '../hbs/render.hbs';
import { initialData } from './initialData';
import { emptyLibraryMessage } from './modalOpenClose';

const paginationEl = document.getElementById('pagination');
const moviesSet = document.querySelector('.section-movies__set');

export const options = {
  totalItems: 0,
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

export const paginationForHome = () => {
    const pagination = new Pagination(paginationEl, options);

    pagination.on('afterMove', eData => {
        initialData.params.page = eData.page;
        initialData.request();
        return;
    });
};

export const paginationForLibrary = () => {
    const pagination = new Pagination(paginationEl, options);

    options.totalItems = initialData.moviesArrayCurrent.length;
    if (options.totalItems <= options.itemsPerPage) {
        options.page = 1;
        paginationEl.classList.add('hidden');
    };

    emptyLibraryMessage.textContent = '';

    const partArrayForPage = [];
    const start = options.itemsPerPage * (options.page - 1);
    const end = Math.min(options.itemsPerPage * options.page, options.totalItems);
    for (let i = start; i < end; i += 1) {
        partArrayForPage.push(initialData.moviesArrayCurrent[i]);
    };
    moviesSet.innerHTML = moviesRender(partArrayForPage);
    

    pagination.on('afterMove', eData => {
        options.page = eData.page;
        const partArrayForPage = [];
        const start = options.itemsPerPage * (options.page - 1);
        const end = Math.min(options.itemsPerPage * options.page, options.totalItems);
        for (let i = start; i < end; i += 1) {
            partArrayForPage.push(initialData.moviesArrayCurrent[i]);
        };
        moviesSet.innerHTML = moviesRender(partArrayForPage);
        return;
    });
};