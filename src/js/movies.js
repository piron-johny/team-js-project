const axios = require('axios');

const buttonWatched = document.querySelector('.button__watched')
const watched = [];
const SERVER_URL =
  'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users.json';
async function fetchMovies(id) {
    // const response = await fetch(`https://api.themoviedb.org/3/movie/524434/images?api_key=3c97a1babd597f31c1fa5b3567357dfb&language=en-US`)
    
   const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3c97a1babd597f31c1fa5b3567357dfb`)
    const data = await response.json()
    
    // const renderMarkup = `<img src="${data.backdrop_path}" alt="${data.belongs_to_collection}"  width="30px">
    //          <p >${data.genres}</p>`
    //     ;
 
    return data;
}

function findMovie() {
    
    
    addWatchedMovies(data)
    
}

 async function getWatchedMovies() {
const userData = await axios.get('https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users/-MtEL9CdKQsDhNmhkgGo.json');
     
     console.log(userData.data.watched)
     return userData.data.watched;
}
getWatchedMovies()
    function addWatchedMovies(movie) {
  try {
    axios.patch(SERVER_URL, {
        watched:[movie]
    });
  } catch (error) {
    console.log(error);
  }
}
    

fetchMovies(550)


// buttonWatched.addEventListener('click', addWatchedMovies)