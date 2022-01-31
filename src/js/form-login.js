import { getUserId } from './servisesAPI';
import { userInfo } from './servisesAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import loginMarkup from '../hbs/login-form.hbs'
import registrationMarkup from '../hbs/registration-form.hbs'

const axios = require('axios');
const backdropModalEl = document.querySelector('[data-backdrop]')
const modalEl = document.querySelector('.modal')
// const formReg = document.querySelector('#login-form-post');
// const formLog = document.querySelector('#login-form-get');
const loginBtn = document.querySelector('#login')
const SERVER_URL =
  'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users';

let USER_ID = '';
console.log('login', loginBtn);

loginBtn.addEventListener('click', onLoginBtnClick)

// formReg.addEventListener('submit', onRegistrationForm);
// formLog.addEventListener('submit', onLoginForm);

async function onRegistrationForm(e) {
  e.preventDefault();

  const name = e.target.elements.userName.value;
  const email = e.target.elements.userEmail.value;
  const password = e.target.elements.userPassword1.value;
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

  userInfo(userId).then(data => {
    if (!data) {
      Notify.info('Пароль или Email введены не верно!');
      return;
    } else if (data.email === email && data.pass === password) {
      Notify.success(`Добро пожаловать ${data.name}`);
    }
  });
  e.target.reset();

  return;
}

function postRegistration(name, email, pass) {
  try {
    axios.post(`${SERVER_URL}.json`, {
      name,
      email,
      pass,
      watched: [],
      queue: [],
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
    if (el[1].pass === pass && el[1].email === email) return el;
  });

  // console.log('arrayOfUser', arrayOfUser); // удалить
  if (arrayOfUser) {
    console.log('id ---->', arrayOfUser[0]); // удалить
    USER_ID = arrayOfUser[0];
    localStorage.setItem('userID', USER_ID);
  }
  return;
}

function onLoginBtnClick() {
  backdropModalEl.classList.remove('is-hidden');
  modalEl.innerHTML = '';
  modalEl.insertAdjacentHTML('afterbegin', loginMarkup())

  const registrationBtn = document.querySelector('.form__link')
  registrationBtn.addEventListener('click', onRegistrationBtnCklick)
}

function onRegistrationBtnCklick(e) {
  e.preventDefault()
  modalEl.innerHTML = '';
  modalEl.insertAdjacentHTML('afterbegin', registrationMarkup())
}