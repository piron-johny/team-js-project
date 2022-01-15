import axios from 'axios';

function getUserId() {
  const USER_ID = localStorage.getItem('userID');
  return USER_ID;
}

async function userInfo(id) {
  const data = await axios.get(
    `https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
  );
  const dadaUser = data.data;
  return dadaUser;

  console.log(dadaUser); // удалить
}

export { userInfo, getUserId };

/// ----------------------------------------------------------

export default class FetchServise {
  constructor() {
    this.KEY = '2cf91cf1fed5026ae9524dc97ad33068';
  }

  // Список популярных фильмов за неделю
  async movies(page = 1) {
    const dataMuvies = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${this.KEY}&language=en-US&page=${page}`,
    );
    return dataMuvies;
  }

  // Поиск фильма по ID в movies API
  async getMoviesInfo(id) {
    const moviesInformation = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`,
    );
    return moviesInformation;
  }

  // Возвращает массив жанров. Принимаест массив ID с жанрами
  async genresList(idGenres) {
    const genresList = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}`,
    );
    const arrayOfGenres = [];

    genresList.data.genres.forEach(el => {
      idGenres.map(idGenr => {
        if (el.id === idGenr) {
          arrayOfGenres.push(el.name);
        }
      });
    });

    return arrayOfGenres;
  }

  // Поиск по ключевому слову. value - строка. page - старница
  async search(value, page = 1) {
    const searchData = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=${page}&include_adult=false&query=${value}`,
    );
    return searchData;
  }
}
