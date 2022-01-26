import { initialData } from "./initialData";
import { mediaTypeParam } from "./changeMediaType";

const trendingType = document.querySelector('#trending');

const timeWindowInputsArray = initialData.timeWindows.map(timeWindow => {
    const id = `#${timeWindow}`;
    return document.querySelector(id);
});

export let timeWindowParam = 'day';
export let fetchTypeParam = 'trending';

trendingType.checked = 'true';
timeWindowInputsArray[0].checked = 'true';

const changeTimeWindow = () => {
    trendingType.checked = 'true';
    fetchTypeParam = trendingType.value;
    initialData.params.page = 1;
    delete initialData.params.query;
    delete initialData.params.sort_by;

    timeWindowInputsArray.forEach(item => {
        if (!item.checked) return;
        timeWindowParam = item.value;
        initialData.url = `${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}`;
        initialData.request();
    });
};

timeWindowInputsArray.forEach(item => {
    item.addEventListener('change', changeTimeWindow);
});