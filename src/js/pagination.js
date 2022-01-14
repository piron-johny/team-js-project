// 1. Пагинация с помощью плагина tui-pagination https://www.npmjs.com/package/tui-pagination

// Вставить в index.html >
//<link rel="stylesheet" href="https://uicdn.toast.com/tui.pagination/latest/tui-pagination.css"/>
//<script src="https://uicdn.toast.com/tui.pagination/latest/tui-pagination.js"></script>
//<div id="tui-pagination-container" class="tui-pagination"></div>

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const options = {
  // below default value of options
  totalItems: 400,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
  usageStatistics: false,
};
const pagination = new Pagination('pagination', options);

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, options);

instance.getCurrentPage();
