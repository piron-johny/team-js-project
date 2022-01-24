// const list = document.querySelector('.js-menu');

// list.insertAdjacentHTML('afterbegin', menuItem(menu));

// реализация переключения тем

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

if (localStorage.getItem('theme') === null || localStorage.getItem('theme') === 'light-theme') {
  document.body.classList = Theme.LIGHT;
}

const toggleSwich = document.querySelector('#theme-switch-toggle');
toggleSwich.addEventListener('change', colorTheme);

if (localStorage.getItem('theme') === 'dark-theme') {
  toggleSwich.checked = true;
  document.body.classList = localStorage.getItem('theme');
}

function colorTheme() {
  if (toggleSwich.checked === true) {
    localStorage.setItem('theme', Theme.DARK);
    document.body.classList = localStorage.getItem('theme');
  }
  if (toggleSwich.checked === false) {
    localStorage.setItem('theme', Theme.LIGHT);
    document.body.classList = localStorage.getItem('theme');
  }
}
