import { initialData } from "./initialData";

const discoverType = document.querySelector('#discover');

const sortByInputsArray = [...document.querySelectorAll('input[name=sortBy]')];

sortByInputsArray[0].checked = 'true';

const mediaSortBy = () => {
    discoverType.checked = 'true';
    initialData.fetchTypeCurrent = discoverType.value;
    initialData.params.page = 1;
    delete initialData.params.query;
    
    sortByInputsArray.forEach(item => {
        if (!item.checked) return;
        initialData.params.sort_by = item.value;
        initialData.url = `${initialData.fetchTypeCurrent}/${initialData.mediaTypeCurrent}`;
        initialData.request();
    });
};

sortByInputsArray.forEach(item => {
    item.addEventListener('change', mediaSortBy);
});