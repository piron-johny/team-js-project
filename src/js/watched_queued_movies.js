import moviesRender from '../hbs/moviesRenderHBS.hbs';
const axios = require('axios');
const buttonWatched = document.querySelector('.button__watched');
const dataDiv = document.querySelector('.movie_data')


const Watched = [];

const Queued = [];

async function fetchMovies() {
   const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=3c97a1babd597f31c1fa5b3567357dfb`)
    const data = await response.json();
    console.log(data.results)
       dataDiv.insertAdjacentHTML('afterbegin', moviesRender(data.results));
   
    getClickedElem()
    return data;
}




function addArrayToLocalStorage(array) {
    localStorage.setItem('Watched', JSON.stringify(array))
    localStorage.setItem('Queued', JSON.stringify(array))
}
fetchMovies(550)

addArrayToLocalStorage([])

function addMovieToWatched(e) {
     e.preventDefault();
    fetchMovies(550).then(data => {
        
      
        data.results.forEach(elem => {
            console.log(+e.srcElement.parentElement.attributes.value.value === elem.id);
            if (+e.srcElement.parentElement.attributes.value.value === elem.id) {
                try {
                    const savedData = localStorage.getItem('Watched')
                    const parsedData = JSON.parse(savedData)
                    console.log(parsedData)
                    parsedData.push(elem)
                    localStorage.setItem('Watched', JSON.stringify(parsedData))
                    
                    
                } catch (error) {
                    console.log(error)
                }
        
            }
        })
    
    })
    
     
}






function getClickedElem() {
       const movieWrapper = document.querySelectorAll('.movie-wrapper')
    console.log(movieWrapper)
    movieWrapper.forEach(elem => elem.addEventListener('click', addMovieToWatched))
}









