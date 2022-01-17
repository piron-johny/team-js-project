// import cardRender from "../hbs/render.hbs";
// const axios = require('axios');

// const list = document.querySelector(".section-movies__set");


// function renderMoviesSet(array) {
//     return list.insertAdjacentHTML('beforeend', cardRender(array))
// }



// const KEY = '2cf91cf1fed5026ae9524dc97ad33068';

// async function fetchTopMovies() {
//     try {
             
//       const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=2cf91cf1fed5026ae9524dc97ad33068',);
//       console.log(response.data.results)
//       renderMoviesSet(response.data.results);
//       fetchMoviesGeners();
//       return response.data.results;
//     }
    
//     catch (error) {
//       console.error(error);
//   }
// }
  
// window.addEventListener('load', fetchTopMovies);



// // https://api.themoviedb.org/3/genre/movie/list?api_key=2cf91cf1fed5026ae9524dc97ad33068'

// async function fetchMoviesGeners() {
//     try {
             
//       const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2cf91cf1fed5026ae9524dc97ad33068');
//       console.log(response.data)
      
//       return response;
//     }
    
//     catch (error) {
//       console.error(error);
//   }
// }