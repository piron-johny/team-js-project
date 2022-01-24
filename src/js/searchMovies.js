import { initialData } from "./initialData";

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="search"]');

const searchMovies = event => {
  event.preventDefault();
  const inputValue = input.value.trim().toLowerCase();
  if (inputValue === '') {
    return;
  };
  initialData.page = 1;
  initialData.queryValue = inputValue;
  initialData.searchMovies();
  // input.value = '';
};

form.addEventListener("submit", searchMovies);


const searchReset = el => {
  el.preventDefault();
  const inputValue = input.value.trim().toLowerCase();
  if (inputValue === '') {
    initialData.trendingMovies();
    return;
  };
  return;
};

input.addEventListener('input', searchReset);