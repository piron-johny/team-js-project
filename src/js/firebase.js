import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import loginMarkup from '../hbs/login-form.hbs';
import registrationMarkup from '../hbs/registration-form.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FirebaseServise } from './servisesAPI';
import modalRender from '../hbs/modalRender.hbs'; //watched btn

const axios = require('axios');
const backdropModalEl = document.querySelector('[data-backdrop]');
const modalEl = document.querySelector('.modal__card');
const loginBtn = document.querySelector('#login');

// console.log('proc', process.env);
const firebaseConfig = {
  apiKey: 'AIzaSyCRA62g4159ND0UswGY5gl2ZVPp2puSvxc',
  authDomain: 'team-project-1da18.firebaseapp.com',
  databaseURL: 'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'team-project-1da18',
  storageBucket: 'team-project-1da18.appspot.com',
  messagingSenderId: '100240833017',
  appId: '1:100240833017:web:36c4080590e304e90f6528',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const db = getDatabase();

loginBtn.addEventListener('click', onLoginBtnClick);

// login
function onLoginForm(e) {
  e.preventDefault();
  const email = e.target.elements.userEmail.value;
  const password = e.target.elements.userPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      const starCountRef = ref(db, 'users/' + user.uid);
      onValue(starCountRef, snapshot => {
        const data = snapshot.val();
        Notify.success(`Добро пожаловать ${data.name}`);
        console.log('12', data);
        // updateStarCount(postElement, data);

        // watched btn =====================

        const backdropModalEl = document.querySelector('[data-backdrop]');
        backdropModalEl.classList.remove('is-hidden');
        const modalEl = document.querySelector('.modal__card');
        modalEl.insertAdjacentHTML('afterbegin', modalRender());

        const btnWatched = document.querySelector('[data-modal-watched]');

        btnWatched.addEventListener('click', handlerBtnWatched);

        function handlerBtnWatched(e) {
          console.log(e.target);
        }

        // =====================================
      });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  backdropModalEl.classList.add('is-hidden');

  e.target.reset();

  return;
}

// registration
function onRegistrationForm(e) {
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

  createUserWithEmailAndPassword(auth, email, password, name)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      FirebaseServise.writeUserData(user.uid, name, email);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  e.target.reset();
  return;
}

// login btn
function onLoginBtnClick() {
  backdropModalEl.classList.remove('is-hidden');
  modalEl.innerHTML = '';
  modalEl.insertAdjacentHTML('afterbegin', loginMarkup());

  const registrationBtn = document.querySelector('.form__link');
  registrationBtn.addEventListener('click', onRegistrationBtnCklick);

  const formLog = document.querySelector('#login-form-get');
  formLog.addEventListener('submit', onLoginForm);
}

// registration btn
function onRegistrationBtnCklick(e) {
  e.preventDefault();
  modalEl.innerHTML = '';
  modalEl.insertAdjacentHTML('afterbegin', registrationMarkup());

  const formReg = document.querySelector('#login-form-post');
  formReg.addEventListener('submit', onRegistrationForm);
}

FirebaseServise.userList();
