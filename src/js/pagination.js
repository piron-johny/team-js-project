// 1. Пагинация с помощью плагина tui-pagination https://www.npmjs.com/package/tui-pagination
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import FetchServise from './servisesAPI.js';
const fetchServise = new FetchServise();

import renderMoviesSet from './seachMovies.js';
// import fetchTopFilms from './watched_queued_movies';
import fetchMovies from './seachMovies';

const paginationEl = document.getElementById('tui-pagination-container');
const galleryEl = document.querySelector('.section-movies__set');
// console.log(galleryEl);

function tuiPagination() {
  const options = {
    totalItems: 400,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    // template: {
    //   page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    //   currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    //   moveButton:
    //     '<a href="#" class="tui-page-btn tui-{{type}}">' +
    //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
    //     '</a>',
    //   disabledMoveButton:
    //     '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
    //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
    //     '</span>',
    //   moreButton:
    //     '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
    //     '<span class="tui-ico-ellip">...</span>' +
    //     '</a>',
    // },
    usageStatistics: false,
  };

  const pagination = new Pagination('pagination', options);

  pagination.on('beforeMove', function (eData) {
    fetchServise.page = eData.page;
    // console.log(fetchServise.page);
    fetchServise.movies().then(films => {
      galleryEl.innerHTML = '';
      // renderMoviesSet(films.data.results);
      console.log(films.data.results);
    });
  });
}

export { tuiPagination };
