const homeBtn = document.getElementById('home');
const libraryBtn = document.getElementById('library');
const form = document.querySelector('.search-form');
const formBlock = document.querySelector('.form-block');
const pageHeaderEl = document.querySelector('.page-header');
const libraryBtns = document.querySelector('.our-library');
const logo = document.querySelector('.page-header__logo');

libraryBtn.addEventListener('click', createSecondHeader);
homeBtn.addEventListener('click', createFirstHeader);
logo.addEventListener('click', createFirstHeader);

function createSecondHeader() {
    libraryBtn.classList.add("button-nav--current");
    homeBtn.classList.remove("button-nav--current");
    
    formBlock.style.display = 'none';
    libraryBtns.style.display = 'flex';
    
    pageHeaderEl.classList.remove("page-header");
    pageHeaderEl.classList.add("page-header__library");
}

function createFirstHeader() {
    
    libraryBtn.classList.remove("button-nav--current");
    homeBtn.classList.add("button-nav--current");

    formBlock.style.display = 'block';
    libraryBtns.style.display = 'none';

    pageHeaderEl.classList.remove("page-header__library");
    pageHeaderEl.classList.add("page-header");
}