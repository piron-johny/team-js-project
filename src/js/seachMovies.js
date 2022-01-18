import cardRender from "../hbs/render.hbs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const form = document.querySelector('.search-form');
const seachBtn = document.querySelector('[name="search-btn"]');
const input = document.querySelector('[name="search"]');
const moviesSet = document.querySelector('.section-movies__set');
const notification = document.querySelector('.change-block__notification');

form.addEventListener("submit", seachMovies)


async function fetchMovies(name, page=1) {
                  
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2cf91cf1fed5026ae9524dc97ad33068&query=${name}&language=en-US&page=${page}&include_adult=false`);
  
  if (response.data.results.length === 0) {
    notification.style.display="block";
    setTimeout(() => { notification.style.display='none'}, 5000)
  }

  return response.data.results;
}

function renderMoviesSet(array) {
    return moviesSet.insertAdjacentHTML('beforeend', cardRender(array))
}

function seachMovies(e) {
    e.preventDefault();

    const movies = input.value.trim().toLowerCase();
    console.log(movies)
  if (movies === '') {
      return
    }

    if (movies.length >= 1) {
        moviesSet.innerHTML = '';

        fetchMovies(movies)
            .then(renderMoviesSet)
            .catch(error => {
                Notify.failure('Oops, there is no movies with that name')
            });
    } 
}

form.addEventListener("submit", seachMovies)