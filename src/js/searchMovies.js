// import { initialData } from './initialData';
// import searchListRender from '../hbs/renderSearchList.hbs';
// const notification = document.querySelector('.change-block__notification');
// notification.style.display = 'none';

// const form = document.querySelector('.search-form');
// const input = document.querySelector('[name="search"]');
// const searchType = document.querySelector('#search');
// const debounce = require('lodash.debounce');
// const DEBOUNCE_DELAY = 300;
// const searchList = document.querySelector('.search-list');

// input.addEventListener('focus', () => {
//   searchType.checked = 'true';
//   initialData.fetchTypeCurrent = searchType.value;
//   delete initialData.params.sort_by;
//   initialData.url = `${initialData.fetchTypeCurrent}/${initialData.mediaTypeCurrent}`;
//   return;
// });

// const searchMovies = event => {
//   event.preventDefault();
//   initialData.params.query = input.value.trim().toLowerCase();

//   if (initialData.params.query === '') {
//     return;
//   }
//   // searchList.innerHTML = '';
//   initialData.params.page = 1;
//   searchList.innerHTML = searchListRender(initialData.moviesArrayCurrent);

//   initialData.request().then(data => {
//     if (initialData.totalResults === 0) {
//       //   paginationEl.classList.add('hidden');
//       // notification.style.display = 'block';
//       setTimeout(() => {
//         notification.style.display = 'none';
//         input.value = '';
//       }, 3000);

//       // дописати завантаження популярних фільмів при відсутності фільмів за пошуком
//     }
//     return;
//   });
// };

// input.addEventListener('input', debounce(searchMovies, DEBOUNCE_DELAY));

// const searchReset = el => {
//   el.preventDefault();
//   //   const inputValue = input.value.trim().toLowerCase();
//   //   if (inputValue === '') {
//   //   initialData.initialData.request();

//   //     };

//   // return;
// };

// input.addEventListener('input', searchReset);

// ----------------------------------------------------------

import { initialData } from './initialData';
const notification = document.querySelector('.change-block__notification');

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="search"]');
const searchType = document.querySelector('#search');

input.addEventListener('focus', () => {
  searchType.checked = 'true';
  //   document.querySelector('.time_window').classList.add('is-none');
  //   document.querySelector('.sort_by').classList.add('is-none');
  let fetchTypeParam = searchType.value;
  delete initialData.params.sort_by;
  initialData.url = `${fetchTypeParam}/movie`; // переписати на динамічне підтягнення movie
  return;
});

const searchMovies = event => {
  event.preventDefault();
  initialData.params.query = input.value.trim().toLowerCase();

  if (initialData.params.query === '') {
    return;
  }
  initialData.params.page = 1;
  initialData.request().then(data => {
    if (initialData.totalResults === 0) {
      console.log(initialData.totalResults);
      //   paginationEl.classList.add('hidden');
      notification.style.display = 'block';
      initialData.firstRequest();
      setTimeout(() => {
        notification.style.display = 'none';
        input.value = '';
      }, 2000);
      // дописати завантаження популярних фільмів при відсутності фільмів за пошуком
    }
    return;
  });
};

form.addEventListener('submit', searchMovies);
