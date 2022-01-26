import { initialData } from "./initialData";
import { mediaTypeParam } from "./changeMediaType";

const discoverType = document.querySelector('#discover');

let fetchTypeParam = '';

const sortByInputsArray = [...document.querySelectorAll('input[name=sortBy]')];

sortByInputsArray[0].checked = 'true';

const mediaSortBy = () => {
    discoverType.checked = 'true';
    fetchTypeParam = discoverType.value;
    initialData.params.page = 1;
    delete initialData.params.query;
    
    sortByInputsArray.forEach(item => {
        if (!item.checked) return;
        initialData.params.sort_by = item.value;
        initialData.url = `${fetchTypeParam}/${mediaTypeParam}`;
        initialData.request();
    });
};

sortByInputsArray.forEach(item => {
    item.addEventListener('change', mediaSortBy);
});