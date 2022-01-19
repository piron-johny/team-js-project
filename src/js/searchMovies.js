import cardRender from "../hbs/render.hbs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { searchGenresName } from "./creadCard";

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="search"]');
const moviesSet = document.querySelector('.section-movies__set');
const notification = document.querySelector('.change-block__notification');

form.addEventListener("submit", searchMovies)


async function fetchMovies(name, page=1) {
                  
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2cf91cf1fed5026ae9524dc97ad33068&query=${name}&language=en-US&page=${page}&include_adult=false`);
    
    localStorage.setItem('Trending', JSON.stringify(searchGenresName(response.data)));
    renderMoviesSet(JSON.parse(localStorage.getItem('Trending')).results)
  
  
  if (response.data.results.length === 0) {
    notification.style.display="block";
    setTimeout(() => { notification.style.display='none'}, 5000)
  }

  return response.data;
}

function renderMoviesSet(array) {
    return moviesSet.insertAdjacentHTML('beforeend', cardRender(array))
}

function searchMovies(e) {
    e.preventDefault();
    localStorage.removeItem("Trending");

    const movies = input.value.trim().toLowerCase();
    console.log(movies)
    if (movies === '') {
      return
    }

    if (movies.length >= 1) {
        moviesSet.innerHTML = '';
        fetchMovies(movies);
     } 
}

