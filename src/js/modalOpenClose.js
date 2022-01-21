import modalRender from '../hbs/modalRender.hbs';

const body = document.querySelector('body');
const btnCloseModal = document.querySelector('[data-modal-close]');
const backdropModalEl = document.querySelector('[data-backdrop]');
const cardOpenModal = document.querySelector('.section-movies__set');
const modalEl = document.querySelector('.modal__card');

cardOpenModal.addEventListener('click', onModalOpen);
btnCloseModal.addEventListener('click', onModalClose);

backdropModalEl.addEventListener('click', onBackdropClick);

window.addEventListener('keydown', onEscPress);

function onModalOpen(e) {
console.log(e.target.parentElement)
  if (e.target.parentElement.className === 'section-movies__card' ||
    e.target.parentElement.className === 'movies-card__img-thumb' ||
    e.target.parentElement.className === 'card-info__detals' ||
    e.target.parentElement.className === 'card-info' ||
    e.target.parentElement.className === 'movies-card__link') {
        backdropModalEl.classList.remove("is-hidden")
        body.style.overflow = 'hidden'
          
    const findId = +e.target.parentElement.parentElement.parentElement.id
    console.dir(findId)
        const savedFilms = JSON.parse(localStorage.getItem(`Trending`));
        const modalFilm = savedFilms.find(film => film.id === +findId)

        modalEl.insertAdjacentHTML('beforeend', modalRender(modalFilm));
// логика добавления по нажатию на кнопки
        const btnWatched = document.querySelector('[data-modal-watched]')
    const btnQueued = document.querySelector('[data-modal-queue]')
    

        btnWatched.addEventListener("click", () => {
            const savedData = localStorage.getItem('Watched')
            const parsedData = JSON.parse(savedData)
       
            if (parsedData.length === 0) {
                parsedData.push(modalFilm)
                btnWatched.textContent = 'Remove from "Watched"'
                localStorage.setItem('Watched', JSON.stringify(parsedData))
                savedData;
              parsedData;       
            if (btnWatched.textContent === 'Remove from "Watched"') {
              btnWatched.addEventListener("click", () => {
                  for(let element of parsedData){
                    parsedData.splice(parsedData.indexOf(element), 1)}
                    localStorage.setItem('Watched', JSON.stringify(parsedData))
                    onModalClose()
                })
                }
                 
            }
           
            else {
              savedData;
              parsedData;
              console.log(parsedData)
              for (let el of parsedData) {
  
            
                if (modalFilm.id !== el.id) {
                  parsedData.push(modalFilm)
                  btnWatched.textContent = 'Remove from "Watched"'
                  if (btnWatched.textContent === 'Remove from "Watched"') {
              btnWatched.addEventListener("click", () => {
            
console.log(parsedData.indexOf(el))
                    parsedData.splice(parsedData.indexOf(el), 1)
                    localStorage.setItem('Watched', JSON.stringify(parsedData))
                    onModalClose()
                })
                }
                  localStorage.setItem('Watched', JSON.stringify(parsedData))
                } else {
                  btnWatched.textContent = 'Remove from "Watched"'
                  btnWatched.addEventListener("click", () => {
            
       
                    parsedData.splice(parsedData.indexOf(el), 1)
                    localStorage.setItem('Watched', JSON.stringify(parsedData))
                    onModalClose()
                })
                }
              }
            }
        })
        btnQueued.addEventListener("click", () => {
            const savedData = localStorage.getItem('Queued')
            const parsedData = JSON.parse(savedData)
       
           if (parsedData.length === 0) {
                parsedData.push(modalFilm)
                btnQueued.textContent = 'Remove from "Queued"'
                localStorage.setItem('Queued', JSON.stringify(parsedData))
                savedData;
                parsedData;
            if (btnQueued.textContent === 'Remove from "Queued"') {
                btnQueued.addEventListener("click", () => {
                    parsedData.splice(0, 1)
                    localStorage.setItem('Queued', JSON.stringify(parsedData))
                    onModalClose()
                })
            }
    
            }
        
        })
    }
}

// логика добавления по нажатию на кнопки


function onModalClose() {
  backdropModalEl.classList.add('is-hidden');
  changeParam()
  modalEl.innerHTML = '';
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    changeParam()
    onModalClose();
  }
}

function onEscPress(e) {
  if (e.key === 'Escape') {
    onModalClose();
    changeParam()
    
    window.removeEventListener('keydown', onModalClose);
  }
}

function changeParam() {
  body.style.overflow = 'visible';
  modalEl.style.height = null;
  document.querySelector('.modal').style.padding = null;
}
  export default { onModalOpen };
export { cardOpenModal }

