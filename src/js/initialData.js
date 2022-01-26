import axios from 'axios';
import moviesRender from '../hbs/render.hbs';
import form from '../hbs/form.hbs';

import { options, pagination } from './pagination__2'; // !!!!!!!!!!!

const main = document.querySelector('main');
const paginationEl = document.getElementById('pagination');

const addDataToLocalStorage = (localStorageKey, moviesArray) => {
  localStorage.setItem(localStorageKey, JSON.stringify(moviesArray));
}; // можливо потрібно записати як метод для initialData

const KEY = '2cf91cf1fed5026ae9524dc97ad33068';
const MOVIES_SET = document.querySelector('.section-movies__set');

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const initialData = {
  url: 'trending/movie/day',
  params: {
    api_key: KEY,
    page: 1,
    language: 'en-US',
  },

  mediaTypeCurrent: 'movie',
  fetchTypeCurrent: 'trending',
  timeWindowCurrent: 'day',

  languages: ['en-US', 'ru-RU'],
  mediaTypes: ['movie', 'tv'],
  fetchTypes: ['trending', 'search', 'discover'],
  timeWindows: ['day', 'week'],
  sortBys: [
    'popularity.asc',
    'popularity.desc',
    'release_date.asc',
    'release_date.desc',
    'original_title.asc',
    'original_title.desc',
    'vote_average.asc',
    'vote_average.desc',
    'vote_count.asc',
    'vote_count.desc',
  ],

  totalResults: 0,
  moviesArrayCurrent: [],
  currentPageStatus: 'fetch',
  //currentPageStatus - статус поточної сторінки:
  // 'fetch' - на сторінці відображаються фільми за запитом,
  // 'watched' - на сторінці відображаються фільми з категорії 'watched',
  //'queue' - на сторінці відображаються фільми з категорії 'queue',
  moviesArrayWatched: JSON.parse(localStorage.getItem('Watched')) || [],
  moviesArrayQueue: JSON.parse(localStorage.getItem('Queued')) || [],
  genresArray: [], // видалити після зміни запиту на жанри
  // location: '',

  async genresList() {
    await axios
      .get('genre/movie/list', { params: { api_key: '2cf91cf1fed5026ae9524dc97ad33068' } })
      .then(response => {
        this.genresArray = response.data.genres;
        addDataToLocalStorage('Genres', this.genresArray);
        return this.genresArray;
      })
      .catch(); // дописати error
  },

  namingGenres(array) {
    array.map(movie => {
      movie.genres = [];
      movie.genresForCard = [];
      if (!movie.genre_ids) {
        return;
      }
      movie.genre_ids.map(id => {
        this.genresArray.map(idArray => {
          if (id === idArray.id) {
            id = idArray.name;
            movie.genres.push(id);
            movie.genresForCard.push(id);
          }
        });
      });
      if (movie.genresForCard.length > 3) {
        movie.genresForCard.length = 3;
        movie.genresForCard[2] = 'Others';
      }
      movie.genresString = movie.genres.join(', ');
      return;
    });
  },

  yearsForCard(array) {
    array.map(movie => {
      movie.years = '';

      if (movie.first_air_date) {
        movie.years = movie.first_air_date.slice(0, 4);
        return;
      }
      if (movie.release_date) {
        movie.years = movie.release_date.slice(0, 4);
        return;
      }
      return (movie.years = 'no data');
    });
  },

  async request() {
    await axios
      .get(this.url, { params: { ...this.params } })
      .then(response => {
        const moviesData = response.data;
        this.totalResults = moviesData.total_results;
        this.moviesArrayCurrent = moviesData.results;
        options.totalItems = moviesData.total_results; // !!!!!!!!!!!
        options.page = moviesData.page; // !!!!!!!!!!!
        this.namingGenres(this.moviesArrayCurrent);
        this.yearsForCard(this.moviesArrayCurrent);
        MOVIES_SET.innerHTML = moviesRender(this.moviesArrayCurrent);
        pagination(); // !!!!!!!!!!!
        return moviesData;
      })
      .catch(); // дописати error
  },

  async firstRequest() {
    this.url = 'trending/movie/day';
    this.params = {
      api_key: KEY,
      page: 1,
      language: 'en-US',
    };
    this.request();
    localStorage.setItem('location', 'home');
    // this.location = 'home';
    // console.log(this.location);
  },

  async firstLoadingPage() {
    try {
      await this.genresList();
      await this.request();
    } catch {}
  },
};

main.insertAdjacentHTML('afterbegin', form(initialData));
initialData.firstLoadingPage();
