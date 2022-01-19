import axios from "axios";
import moviesRender from '../hbs/render.hbs';
import { KEY, MOVIES_SET } from "./constants";

const addDataToLocalStorage = (localStorageKey, moviesArray) => {
    localStorage.setItem(localStorageKey, JSON.stringify(moviesArray))
}; // можливо потрібно записати як метод для initialData

export const initialData = {
    key: KEY,
    page: 1,
    totalPages: null,
    genresArray: null,
    queryValue: 'cat',  // цей рядок видалити, наступний розкоментувати
    // queryValue: null,
    moviesArrayCurrent: null,
    moviesArrayWatched: null,
    moviesArrayQueue: null,
    currentFetch: null,
    // lang: 'en-US',    // для кількамовного сайту

    async genresList({key} = this) {
        await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
        )
            .then(response => {
                this.genresArray = response.data.genres;
                addDataToLocalStorage('Genres', this.genresArray)
                // console.log(this.genresArray);    // видалити потім
                return this.genresArray;
            })
            .catch()
    },
    
    async trendingMovies({ key, page } = this) {
        await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US&page=${page}`,
        )
            .then(response => {
                const moviesData = response.data;
                this.currentFetch = this.trendingMovies;
                this.totalPages = moviesData.total_pages;
                this.moviesArrayCurrent = moviesData.results;
                // можливо потрібно записувати в localStorage з ключем 'moviesArrayCurrent'
                addDataToLocalStorage('Trending', this.moviesArrayCurrent);
                const markupMoviesSet = moviesRender(this.moviesArrayCurrent);
                MOVIES_SET.insertAdjacentHTML('afterbegin', markupMoviesSet);
                // console.log(this.moviesArrayCurrent);    // видалити потім
                return moviesData;
            })
            .catch()
    },

    async searchMovies({ key, queryValue, page } = this) {
        await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${queryValue}&language=en-US&page=${page}&include_adult=false`
        )
            .then(response => {
                const moviesData = response.data;
                this.currentFetch = this.searchMovies;
                this.totalPages = moviesData.total_pages;
                this.moviesArrayCurrent = moviesData.results;
                // можливо потрібно записувати в localStorage з ключем 'moviesArrayCurrent'
                addDataToLocalStorage('SearchMovies', this.moviesArrayCurrent);
                const markupMoviesSet = moviesRender(this.moviesArrayCurrent);
                MOVIES_SET.insertAdjacentHTML('afterbegin', markupMoviesSet);
                // console.log(this.moviesArrayCurrent);    // видалити потім
                return moviesData;
            })
        .catch()
    },

    addMoviesToWatched() { },

    removeMoviesFromWatched() { },

    addMoviesToQueue() { },
      
    removeMoviesFromQueue() { },
    
    pagination() { },
    
}; 

initialData.trendingMovies();   // перевірка на спрацювання/видалити потім
initialData.genresList();   // перевірка на спрацювання/видалити потім
initialData.searchMovies();   // перевірка на спрацювання/видалити потім