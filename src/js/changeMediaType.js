import { initialData } from "./initialData";
import { fetchTypeParam } from "./trending";
import { timeWindowParam } from "./trending";

const mediaTypeInputsArray = initialData.mediaTypes.map(mediaType => {
    const id = `#${mediaType}`;
    return document.querySelector(id);
});

export let mediaTypeParam = 'movie'; 

mediaTypeInputsArray[0].checked = 'true';

const changeMediaType = () => {
    initialData.params.page = 1;
    delete initialData.params.query;
    delete initialData.params.sort_by;

    mediaTypeInputsArray.forEach(item => {
        if (!item.checked) return;
        mediaTypeParam = item.value
        initialData.url = `${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}`;
        initialData.request();
        return;
    })
};

mediaTypeInputsArray.forEach(item => {
    item.addEventListener('change', changeMediaType);
    return;
});