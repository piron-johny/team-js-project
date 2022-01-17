const homeBtn = document.querySelector('.button-home');
const libraryBtn = document.querySelector('.button-library');
const form = document.querySelector('.search-form');
const changeBlock = document.querySelector('.change-block');
const pageHeaderEl = document.querySelector('.page-header');

libraryBtn.addEventListener('click', createSecondHeader);
homeBtn.addEventListener('click', createFirstHeader);

function createSecondHeader() {
    homeBtn.style.textDecoration = 'none';
    libraryBtn.style.textDecoration = 'underline #ff6b08 3px';
    
    const ourLibrary = `<div class="our-library">
    <button class="our-library__btn" type="submit" name="watched">WATCHED</button>
    <button class="our-library__btn" type="submit" name="queue">QUEUE</button>
    </div>`;

    changeBlock.innerHTML = ourLibrary;

    pageHeaderEl.classList.remove("page-header");
    pageHeaderEl.classList.add("page-header__current");


}

function createFirstHeader() {
    libraryBtn.style.textDecoration = 'none';
    homeBtn.style.textDecoration = 'underline #ff6b08 3px';

    const searchForm = `<form action="" class="search-form">
                <input type="text" name="search" placeholder="Поиск фильмов" autofocus>
                <button class="search-btn" type="submit" name="search-btn"></button>
            </form>`;
    
    changeBlock.innerHTML = searchForm;

    pageHeaderEl.classList.remove("page-header__current");
    pageHeaderEl.classList.add("page-header");


}