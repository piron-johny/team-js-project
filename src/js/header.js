const homeBtn = document.getElementById('home');
const libraryBtn = document.getElementById('library');
const form = document.querySelector('.search-form');
const changeBlock = document.querySelector('.change-block');
const pageHeaderEl = document.querySelector('.page-header');


libraryBtn.addEventListener('click', createSecondHeader);
homeBtn.addEventListener('click', createFirstHeader);

function createSecondHeader() {
    libraryBtn.classList.add("button-nav--current");
    homeBtn.classList.remove("button-nav--current");
    // if ("button-nav--current") {
        
    // }
    
    const ourLibrary = `<div class="our-library">
    <button class="our-library__btn" type="submit" name="watched">WATCHED</button>
    <button class="our-library__btn" type="submit" name="queue">QUEUE</button>
    </div>`;

    changeBlock.innerHTML = ourLibrary;

    pageHeaderEl.classList.remove("page-header");
    pageHeaderEl.classList.add("page-header__library");

    
}

function createFirstHeader(e) {
    e.preventDefault();

    libraryBtn.classList.remove("button-nav--current");
    homeBtn.classList.add("button-nav--current");


    const searchForm = `<form action="" class="search-form">
                <input type="text" name="search" placeholder="Поиск фильмов" autofocus autocomplete="off">
                <button class="search-btn" type="submit" name="search-btn"></button>
            </form>
                <p class="change-block__notification">Search result not successful. Enter the correct movie name and</p>
    `;
    
    changeBlock.innerHTML = searchForm;

    pageHeaderEl.classList.remove("page-header__library");
    pageHeaderEl.classList.add("page-header");
}