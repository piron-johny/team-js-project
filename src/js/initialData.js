import axios from "axios";
import moviesRender from '../hbs/render.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const paginationEl = document.getElementById('pagination');

const addDataToLocalStorage = (localStorageKey, moviesArray) => {
    localStorage.setItem(localStorageKey, JSON.stringify(moviesArray))
}; // можливо потрібно записати як метод для initialData

const KEY = '2cf91cf1fed5026ae9524dc97ad33068';
const MOVIES_SET = document.querySelector('.section-movies__set');


export const initialData = {
    key: KEY,
    page: 1,
    totalPages: 0,
    totalResults: 0,
    genresArray: [],
    queryValue: '',
    currentPageStatus: 'fetch',
    //currentPageStatus - статус поточної сторінки:
    // 'fetch' - на сторінці відображаються фільми за запитом,
    // 'watched' - на сторінці відображаються фільми з категорії 'watched',
    //'queue' - на сторінці відображаються фільми з категорії 'queue',
    moviesArrayCurrent: [],
    moviesArrayWatched: JSON.parse(localStorage.getItem('Watched')) || [],
    moviesArrayQueue: JSON.parse(localStorage.getItem('Queued')) || [],
    currentFetch: function () { },
    // lang: 'en-US',    // для кількамовного сайту

    async genresList({key} = this) {
        await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
        )
            .then(response => {
                this.genresArray = response.data.genres;
                addDataToLocalStorage('Genres', this.genresArray)
                return this.genresArray;
            })
            .catch()
    },

    namingGenres(array) {
        array.map(movie => {
            const namedGenresArray = [];
            const namedGenresArrayForCard = [];
            movie.genre_ids.map(id => {
                this.genresArray.map(idArray => {
                    if (id === idArray.id) {
                        id = idArray.name;
                        namedGenresArray.push(id);
                        namedGenresArrayForCard.push(id);
                    };
                })
            });
            if (namedGenresArrayForCard.length > 3) {
                namedGenresArrayForCard.length = 3;
                namedGenresArrayForCard[2] = 'Others'
            };

            movie.genres = namedGenresArray;
            movie.genresForCard = namedGenresArrayForCard;
            return;
        });
    },
    
    async trendingMovies({ key, page } = this) {
        // console.log('Before Fetch - currentFetch is trendingMovies:', this.currentFetch === this.trendingMovies);  // перевірка
        if (this.currentFetch !== this.trendingMovies) {
            this.page = 1;
            page = 1;
        };
        this.currentPageStatus = 'fetch';
        await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US&page=${page}`,
        )
            .then(response => {
                const moviesData = response.data;
                this.currentFetch = this.trendingMovies;
                this.totalPages = moviesData.total_pages;
                this.totalResults = moviesData.total_results;
                this.moviesArrayCurrent = moviesData.results;
                this.namingGenres(this.moviesArrayCurrent);
                addDataToLocalStorage('Trending', this.moviesArrayCurrent);
                this.pagination();
                // console.log('currentPage(response.data.page):', moviesData.page);    // перевірка на поточну сторінку
                MOVIES_SET.innerHTML = moviesRender(this.moviesArrayCurrent);
                // console.log('After Fetch - currentFetch is trendingMovies:', this.currentFetch === this.trendingMovies);  // перевірка
                return moviesData;
            })
            .catch()
    },

    async searchMovies({ key, queryValue, page } = this) {
        // console.log('Before Fetch - currentFetch is searchMovies:', this.currentFetch === this.searchMovies);  // перевірка
        if (this.currentFetch !== this.searchMovies) {
            this.page = 1;
            page = 1;
        };
        this.currentPageStatus = 'fetch';
        await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${queryValue}&language=en-US&page=${page}&include_adult=false`
        )
            .then(response => {
                const moviesData = response.data;
                this.currentFetch = this.searchMovies;
                this.totalPages = moviesData.total_pages;
                this.totalResults = moviesData.total_results;
                this.moviesArrayCurrent = moviesData.results;
                this.namingGenres(this.moviesArrayCurrent);
                this.pagination();
                // console.log('currentPage(response.data.page):', moviesData.page);    // перевірка на поточну сторінку
                MOVIES_SET.innerHTML = moviesRender(this.moviesArrayCurrent);
                // console.log('After Fetch - currentFetch is searchMovies:', this.currentFetch === this.searchMovies);  // перевірка
                return moviesData;
            })
        .catch()
    },

    addMoviesToWatched() { },

    removeMoviesFromWatched() { },

    addMoviesToQueue() { },
      
    removeMoviesFromQueue() { },
    
    pagination() { 
        const options = {
            totalItems: initialData.totalResults,
            itemsPerPage: 20,
            visiblePages: 5,
            page: initialData.page,
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

        pagination.on('afterMove', (eData) => {
            this.page = eData.page;
            this.currentFetch();
        });
    },
}; 

initialData.genresList();   
initialData.trendingMovies();