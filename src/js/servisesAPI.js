import axios from 'axios';

import modalRender from '../hbs/modalRender.hbs';

function getUserId() {
  if (localStorage.getItem('userID') === 'bedPass') {
    return 'bedPass';
  } else if (localStorage.getItem('userID') === 'badEmail') {
    return 'badEmail';
  } else {
    const USER_ID = localStorage.getItem('userID');
    return USER_ID;
  }
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
  KEY = '2cf91cf1fed5026ae9524dc97ad33068';
  SERVER_URL = 'https://api.themoviedb.org/3/';
  DATA_URL = 'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users/';
  constructor() {}

  // Список популярных фильмов за неделю
  async movies(page = 1) {
    const dataMuvies = await axios.get(
      `${this.SERVER_URL}trending/all/week?api_key=${this.KEY}&language=en-US&page=${page}`,
    );
    return dataMuvies;
  }

  // Поиск фильма по ID в movies API
  async getMoviesInfo(id) {
    const moviesInformation = await axios.get(
      `${this.SERVER_URL}movie/${id}?api_key=${this.KEY}&language=en-US`,
    );
    return moviesInformation;
  }

  // Возвращает массив жанров. Принимаест массив ID с жанрами
  async genresList(idGenres) {
    const genresList = await axios.get(`${SERVER_URL}genre/movie/list?api_key=${this.KEY}`);
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
      `${this.SERVER_URL}search/movie?api_key=${this.KEY}&language=en-US&page=${page}&include_adult=false&query=${value}`,
    );
    return searchData;
  }

  // добавление фильма в Firebase "watched"
  async addToWatched(movie, id) {
    const userDataArrayOfWatched = await axios.patch(`${this.DATA_URL}${id}/watched.json`);
    console.log(userDataArrayOfWatched);
  }
}

// ==============================================
export class FirebaseServise {
  // Добавить функцию популярных фильмов

  static async userList() {
    const userList = await axios.get(
      'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    );
    const list = userList.data;
    return list;
  }

  static writeUserData(userId, name, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      // путь, куда записывается объект
      name: name,
      email: email,
      watched: [false],
      queue: [false],
    });
  }

  static addMovieToWatched() {
    // найти кнопку добавления в просмотренные
    // обработать ее
    //
  }

  static searchWatchedBtn() {
    const backdropModalEl = document.querySelector('[data-backdrop]');
    const modalEl = document.querySelector('.modal__card');
    modalEl.insertAdjacentHTML('afterbegin', modalRender());

    backdropModalEl.classList.remove('is-hidden');
    const btnWatched = document.querySelector('[data-modal-watched]');

    return btnWatched.addEventListener('click', this.handlerBtnWatched);
  }

  handlerBtnWatched(e) {
    console.log(e.trget);
  }
}
