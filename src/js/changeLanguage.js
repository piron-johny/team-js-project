import { initialData } from "./initialData";

const languageInputsArray = initialData.languages.map(language => {
    const id = `#${language}`;
    return document.querySelector(id);
});

languageInputsArray[0].checked = 'true';

const changeLanguage = () => {
    initialData.params.page = 1;

    languageInputsArray.forEach(item => {
        if (!item.checked) return;
        initialData.params.language = item.value;
        initialData.request();
    })
};


languageInputsArray.forEach(item => {
    item.addEventListener('change', changeLanguage);
    return;
})