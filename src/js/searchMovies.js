import { initialData } from './initialData';
import { changeTimeWindow } from './trending';
const notification = document.querySelector('.change-block__notification');

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="search"]');
const searchType = document.querySelector('#search');
const paginationEl = document.getElementById('pagination');

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
  searchType.checked = 'true';
  //   document.querySelector('.time_window').classList.add('is-none');
  //   document.querySelector('.sort_by').classList.add('is-none');
  let fetchTypeParam = searchType.value;
  delete initialData.params.sort_by;
  initialData.url = `${fetchTypeParam}/movie`; // переписати на динамічне підтягнення movie

  initialData.params.query = input.value.trim().toLowerCase();

  if (initialData.params.query === '') {
    return;
  }
  initialData.params.page = 1;
  initialData.request().then(data => {
      paginationEl.classList.remove('hidden');
    if (initialData.totalResults === 0) {
      paginationEl.classList.add('hidden');
      notification.style.display = 'block';
      setTimeout(() => {
        changeTimeWindow();
        notification.style.display = 'none';
        input.value = '';
      }, 2000);
      // дописати завантаження популярних фільмів при відсутності фільмів за пошуком
    }
    return;
  });
};

form.addEventListener('submit', searchMovies);
