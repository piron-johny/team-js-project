const homeBtn = document.querySelector('.button-home');
const libraryBtn = document.querySelector('.button-library');
const form = document.querySelector('.search-form');
const changeBlock = document.querySelector('.change-block')

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

}

function createFirstHeader() {
    libraryBtn.style.textDecoration = 'none';
    homeBtn.style.textDecoration = 'underline #ff6b08 3px';

    const searchForm = `<form action="" class="search-form">
                <input type="text" name="search" placeholder="Поиск фильмов" autofocus>
                <button type="submit" name="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </form>`;
    
    changeBlock.innerHTML = searchForm;

}