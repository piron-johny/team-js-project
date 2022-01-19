const axios = require('axios');

export { searchGenresName };


const KEY = '2cf91cf1fed5026ae9524dc97ad33068';

window.addEventListener('load', getGenresList);

async function getGenresList() {
    localStorage.removeItem("Genres");
    
    const genresList = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}`);
    localStorage.setItem('Genres', JSON.stringify(genresList.data.genres));
    
    return genresList.data.genres;
}


const genresLocal = JSON.parse(localStorage.getItem('Genres'));

function searchGenresName(array) {
    const genID = array.results.map(el => el.genre_ids);
    console.log(genID);

    genID.map(idArray => {

        genresLocal.forEach(el => {
                for (const id of idArray) {
               
                    if (el.id == id) {
                    // не сработало idArray.splice(0, idArray.length, el.name)// Добовляет только один жанр, из-за этого костыль 
                        idArray.push(el.name);                       
                    } 
                } 
        })
        idArray.splice(0, idArray.length / 2);
    })
    return array;
}






