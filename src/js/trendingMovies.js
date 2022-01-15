import axios from 'axios';
import moviesRender from '../hbs/render.hbs';
// import FetchServise from "./servisesAPI";

const KEY = '2cf91cf1fed5026ae9524dc97ad33068';
const moviesSet = document.querySelector('.section-movies__set');

 const trendingMovies = async (page = 1) => {
    const dataMovies = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${KEY}&language=en-US&page=${page}`,
     );
    return dataMovies.data;
};

const addTrendingMoviesToLocalStorage = array => {
    localStorage.setItem('Trending', JSON.stringify(array))
};

trendingMovies()
    .then(data => {
        addTrendingMoviesToLocalStorage(data);
        const markupMoviesSet = moviesRender(data.results);
        moviesSet.insertAdjacentHTML('afterbegin', markupMoviesSet);
        return data;
    });