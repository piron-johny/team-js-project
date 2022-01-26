import { initialData } from "./initialData";

const mediaTypeInputsArray = initialData.mediaTypes.map(mediaType => {
    const id = `#${mediaType}`;
    return document.querySelector(id);
});

mediaTypeInputsArray[0].checked = 'true';

const changeMediaType = () => {
    initialData.params.page = 1;

    mediaTypeInputsArray.forEach(item => {
        if (!item.checked) return;
        initialData.mediaTypeCurrent = item.value;
        if (initialData.fetchTypeCurrent === 'trending') {
            delete initialData.params.query;
            delete initialData.params.sort_by;
            initialData.url = `${initialData.fetchTypeCurrent}/${initialData.mediaTypeCurrent}/${initialData.timeWindowCurrent}`;
            initialData.request();
        };
        if (initialData.fetchTypeCurrent === 'search') {
            delete initialData.params.sort_by;
            initialData.url = `${initialData.fetchTypeCurrent}/${initialData.mediaTypeCurrent}`;
            initialData.request();
        };
        if (initialData.fetchTypeCurrent === 'discover') {
            delete initialData.params.sort_by;
            initialData.url = `${initialData.fetchTypeCurrent}/${initialData.mediaTypeCurrent}`;
            initialData.request();
        };
        return;
    });
};

mediaTypeInputsArray.forEach(item => {
    item.addEventListener('change', changeMediaType);
    return;
});