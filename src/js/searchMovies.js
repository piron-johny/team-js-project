import { initialData } from "./initialData";
import searchListRender from "../hbs/renderSearchList.hbs";

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="search"]');
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchList = document.querySelector('.search-list');


const searchMovies = event => {
  event.preventDefault();
  const inputValue = input.value.trim().toLowerCase();
  if (inputValue === '') {
    return;
  };
  searchList.innerHTML = '';
  initialData.page = 1;
  initialData.queryValue = inputValue;
  initialData.searchMovies();
  console.log(initialData.moviesArrayCurrent);

  searchList.innerHTML = searchListRender(initialData.moviesArrayCurrent);
      return;

  // input.value = '';
};

form.addEventListener("submit", searchMovies);
input.addEventListener("input", debounce(searchMovies, DEBOUNCE_DELAY));
input.addEventListener('input', searchReset);


const searchReset = el => {
  el.preventDefault();
  const inputValue = input.value.trim().toLowerCase();
  if (inputValue === '') {
    initialData.trendingMovies();
    return;
  };
  return;
};                     