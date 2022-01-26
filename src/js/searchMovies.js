import { initialData } from "./initialData";
import searchListRender from "../hbs/renderSearchList.hbs";
const notification = document.querySelector('.change-block__notification');


const form = document.querySelector('.search-form');
const input = document.querySelector('[name="search"]');
const searchType = document.querySelector('#search');
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchList = document.querySelector('.search-list');

input.addEventListener('focus', () => {
    searchType.checked = 'true';
    initialData.fetchTypeCurrent = searchType.value;
    delete initialData.params.sort_by;
    initialData.url = `${initialData.fetchTypeCurrent}/${initialData.mediaTypeCurrent}`;
    return;
});

const searchMovies = event => {
    event.preventDefault();
    initialData.params.query = input.value.trim().toLowerCase();

  if (initialData.params.query === '') {
    return;
    };
    // searchList.innerHTML = '';
    initialData.params.page = 1;
    searchList.innerHTML = searchListRender(initialData.moviesArrayCurrent);

    initialData.request()
        .then(data => {
            if (initialData.totalResults === 0) {
                //   paginationEl.classList.add('hidden');
                setTimeout(() => {
                    notification.style.display = 'none';
                    input.value = "";
                }, 3000);

                // дописати завантаження популярних фільмів при відсутності фільмів за пошуком
            }
        return;
    });
};

input.addEventListener("input", debounce(searchMovies, DEBOUNCE_DELAY));


// const searchReset = el => {
//   el.preventDefault();
// //   const inputValue = input.value.trim().toLowerCase();
// //   if (inputValue === '') {
// //   initialData.initialData.request();
      
// //     };
    

// // return;
// };

// input.addEventListener('input', searchReset);