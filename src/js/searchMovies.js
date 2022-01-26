import { initialData } from "./initialData";
import { mediaTypeParam } from "./changeMediaType";
const notification = document.querySelector('.change-block__notification');


const form = document.querySelector('.search-form');
const input = document.querySelector('[name="search"]');
const searchType = document.querySelector('#search');

input.addEventListener('focus', () => {
    searchType.checked = 'true';
    let fetchTypeParam = searchType.value;
    delete initialData.params.sort_by;
    initialData.url = `${fetchTypeParam}/${mediaTypeParam}`;    // переписати на динамічне підтягнення movie
    return;
});

const searchMovies = event => {
    event.preventDefault();
    initialData.params.query = input.value.trim().toLowerCase();

  if (initialData.params.query === '') {
    return;
  };
    initialData.params.page = 1;
    initialData.request()
        .then(data => {
            if (initialData.totalResults === 0) {
                console.log(initialData.totalResults)
                //   paginationEl.classList.add('hidden');
                setTimeout(() => {
                    notification.style.display = 'none';
                    input.value = "";
                }, 3000);
                // дописати завантаження популярних фільмів при відсутності фільмів за пошуком
            }
        return;
    });
};

form.addEventListener("submit", searchMovies);


// const searchReset = el => {
//   el.preventDefault();
// //   const inputValue = input.value.trim().toLowerCase();
// //   if (inputValue === '') {
// //   initialData.request();
      
// //     };
    

// // return;
// };

// input.addEventListener('input', searchReset);