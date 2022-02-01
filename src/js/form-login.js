import { getUserId } from './servisesAPI';
import { userInfo } from './servisesAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import loginMarkup from '../hbs/login-form.hbs';
import registrationMarkup from '../hbs/registration-form.hbs';

const axios = require('axios');
const backdropModalEl = document.querySelector('[data-backdrop]');
const modalEl = document.querySelector('.modal__card');
const loginBtn = document.querySelector('#login');
const SERVER_URL =
  'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users';

let USER_ID = '';

loginBtn.addEventListener('click', onLoginBtnClick);

async function onRegistrationForm(e) {
  e.preventDefault();
  const name = e.target.elements.userName.value;
  const email = e.target.elements.userEmail.value;
  const password = e.target.elements.userPassword.value;
  const rePassword = e.target.elements.userRePassword.value;

  if (!name || !email || !password || !rePassword) return;

  if (password.length < 6) {
    Notify.success('Пароль не может быть меньше 6 знаков!');
    return;
  }
  if (password !== rePassword) {
    Notify.success('Пароли не совпадают!');
    return;
  }

  console.log('input.value', email); // удалить
  e.target.reset();
  await getUser(email).then(data => {
    const arrayOfEmail = [];
    data.forEach(el => {
      if (el.email === email) {
        Notify.info('Email занят!');
      }
      arrayOfEmail.push(el.email);
    });
    if (!arrayOfEmail.includes(email)) {
      Notify.success(`Спсибо за регистрацию! ${name}`);
      postRegistration(name, email, password); // записывает нового пользователя в базу данных
      arrayOfEmail.length = 0;
    }
  });
}

async function onLoginForm(e) {
  e.preventDefault();
  const email = e.target.elements.userEmail.value;
  const password = e.target.elements.userPassword.value;
  localStorage.removeItem('userID');

  if (!email || !password) return;

  await postUserId(email, password);
  const userId = await getUserId();

  if (userId === 'badPass') {
    Notify.success('Пароль введен не верно!');
    return;
  } else if (userId === 'badEmail') {
    Notify.success('Email введен не верно!');
    return;
  } else if (userId === 'noUser') {
    Notify.success('Пользователя с таким Email не зарегистрирован!');
  } else {
    userInfo(userId).then(data => {
      // console.log(data);

      if (data.email === email && data.pass === password) {
        Notify.success(`Добро пожаловать ${data.name}`);
        backdropModalEl.classList.add('is-hidden');
      }
    });
  }

  e.target.reset();

  return;
}
function postRegistration(name, email, pass) {
  try {
    axios.post(`${SERVER_URL}.json`, {
      name,
      email,
      pass,
      watched: [''],
      queue: [''],
    });
  } catch (error) {
    console.log(error);
  }
}

async function getUser(email) {
  const data = await axios.get(`${SERVER_URL}.json`);
  const valuesOfData = Object.values(data.data);

  return valuesOfData;
}

async function postUserId(email, pass) {
  const data = await axios.get(`${SERVER_URL}.json`);
  const DataIDEntries = Object.entries(data.data);

  // console.log('DataIDEntries', DataIDEntries); // удалить

  const arrayOfUser = await DataIDEntries.find(el => {
    if (el[1].pass === pass || el[1].email === email) return el;
  });

  // console.log('arrayOfUser', arrayOfUser); // удалить
  if (!arrayOfUser) {
    localStorage.setItem('userID', 'noUser');
  } else if (arrayOfUser[1].pass !== pass) {
    localStorage.setItem('userID', 'badPass');
  } else if (arrayOfUser[1].email !== email) {
    localStorage.setItem('userID', 'badEmail');
  } else {
    console.log('id ---->', arrayOfUser[0]); // удалить
    USER_ID = arrayOfUser[0];
    localStorage.setItem('userID', USER_ID);
  }
  return;
}

function onLoginBtnClick() {
  backdropModalEl.classList.remove('is-hidden');
  modalEl.innerHTML = '';
  modalEl.insertAdjacentHTML('afterbegin', loginMarkup());

  const registrationBtn = document.querySelector('.form__link');
  registrationBtn.addEventListener('click', onRegistrationBtnCklick);

  const formLog = document.querySelector('#login-form-get');
  formLog.addEventListener('submit', onLoginForm);
}

function onRegistrationBtnCklick(e) {
  e.preventDefault();
  modalEl.innerHTML = '';
  modalEl.insertAdjacentHTML('afterbegin', registrationMarkup());

  const formReg = document.querySelector('#login-form-post');
  formReg.addEventListener('submit', onRegistrationForm);
}
