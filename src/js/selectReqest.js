import { initialData } from "./initialData";
import { mediaTypeParam } from "./changeMediaType";

const open = document.querySelector('.open');
const close = document.querySelector('.close');

open.addEventListener('click', () => {
    open.classList.add('is-none');
    close.classList.remove('is-none');
    document.querySelector('.select').style.height = 'auto';
});
close.addEventListener('click', () => {
    close.classList.add('is-none');
    open.classList.remove('is-none');
    document.querySelector('.select').style.height = '50px';
});