import { initialData } from "./initialData";

const trendingType = document.querySelector('#trending');

const timeWindowInputsArray = initialData.timeWindows.map(timeWindow => {
    const id = `#${timeWindow}`;
    return document.querySelector(id);
});

trendingType.checked = 'true';
timeWindowInputsArray[0].checked = 'true';

export const changeTimeWindow = () => {
    trendingType.checked = 'true';
    initialData.fetchTypeCurrent = trendingType.value;
    initialData.params.page = 1;
    delete initialData.params.query;
    delete initialData.params.sort_by;

    timeWindowInputsArray.forEach(item => {
        if (!item.checked) return;
        initialData.timeWindowCurrent = item.value;
        initialData.url = `${initialData.fetchTypeCurrent}/${initialData.mediaTypeCurrent}/${initialData.timeWindowCurrent}`;
        initialData.request();
    });
};

timeWindowInputsArray.forEach(item => {
    item.addEventListener('change', changeTimeWindow);
});