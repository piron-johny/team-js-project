import axios from 'axios';
import moviesRender from '../hbs/render.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
// import './select';

const paginationEl = document.getElementById('pagination');

const addDataToLocalStorage = (localStorageKey, moviesArray) => {
    localStorage.setItem(localStorageKey, JSON.stringify(moviesArray));
}; // можливо потрібно записати як метод для initialData

const KEY = '2cf91cf1fed5026ae9524dc97ad33068';
const MOVIES_SET = document.querySelector('.section-movies__set');

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const initialData = {
    baseURL: 'https://api.themoviedb.org/3/',

    url: '',
    params: {
        api_key: KEY,
        page: 1,
        language: 'en-US',
    },

    totalResults: 0,
    moviesArrayCurrent: [],
    currentPageStatus: 'fetch',
    //currentPageStatus - статус поточної сторінки:
    // 'fetch' - на сторінці відображаються фільми за запитом,
    // 'watched' - на сторінці відображаються фільми з категорії 'watched',
    //'queue' - на сторінці відображаються фільми з категорії 'queue',
    moviesArrayWatched: JSON.parse(localStorage.getItem('Watched')) || [],
    moviesArrayQueue: JSON.parse(localStorage.getItem('Queued')) || [],
    genresArray: [],    // видалити після зміни запиту на жанри
    // location: '',

    async genresList() {
        await axios.get(
            'genre/movie/list',
            { params: { api_key: '2cf91cf1fed5026ae9524dc97ad33068' } },
        )
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
            return movie.years = 'no data';
        });
    },

    async request() {
        await axios.get(
            this.url,
            { params: { ...this.params } },
        )
            .then(response => {
                const moviesData = response.data;
                this.totalResults = moviesData.total_results;
                this.moviesArrayCurrent = moviesData.results;
                this.namingGenres(this.moviesArrayCurrent);
                this.yearsForCard(this.moviesArrayCurrent);
                this.pagination();
                MOVIES_SET.innerHTML = moviesRender(this.moviesArrayCurrent);
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
        localStorage.setItem("location", "home");
        // this.location = 'home';
        // console.log(this.location);
    },

  addMoviesToWatched() {},

  removeMoviesFromWatched() {},

  addMoviesToQueue() {},

  removeMoviesFromQueue() {},

    async firstLoadingPage() {
        try {
            await this.genresList();
            await this.firstRequest();
        } catch {}
    },

    pagination() {
        const options = {
            totalItems: this.totalResults,
            itemsPerPage: 20,
            visiblePages: 5,
            page: this.params.page,
            centerAlign: true,
            firstItemClassName: 'tui-first-child',
            lastItemClassName: 'tui-last-child',
            usageStatistics: false,
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
        };
        const pagination = new Pagination(paginationEl, options);

        pagination.on('afterMove', eData => {
            this.params.page = eData.page;
            this.request();
        });
    },
};

initialData.firstLoadingPage();

