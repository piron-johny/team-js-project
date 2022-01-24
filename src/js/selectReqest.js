import { initialData } from "./initialData";

const open = document.querySelector('.open');
const close = document.querySelector('.close');

const fetchURL = document.querySelector('.fetch__url');
const pathParams = document.querySelector('.path__params');
const fetchParams = document.querySelector('.fetch__params');
const language = [...document.querySelectorAll('input[name=language]')];
const fetchTypeArray = [...document.querySelectorAll('input[name=fetch_type]')];
const mediaTypeArray = [...document.querySelectorAll('input[name=media_type]')];
const timeWindowArray = [...document.querySelectorAll('input[name=time_window]')];
const sortBy = [...document.querySelectorAll('input[name=sort_by]')];
const queryInput = document.querySelector('.search__input');
    
let fetchTypeParam = '';
let mediaTypeParam = '';
let timeWindowParam = '';

const fetchParamsForFirstLoad = () => {
    language.forEach(item => {
        if (!item.checked) return;
        initialData.params.language = item.value;
        return;
    });
    fetchTypeArray.forEach(item => {
        if (!item.checked) return;
        fetchTypeParam = item.value;
        return;
    });
    mediaTypeArray.forEach(item => {
        if (!item.checked) return;
        mediaTypeParam = item.value;
        return;
    });
    timeWindowArray.forEach(item => {
        if (!item.checked) return;
        timeWindowParam = item.value;
        return;
    });
    fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}/`;
    pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}/`;
    initialData.url = `${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}`;
    fetchParams.textContent = 'fetchParams: ?' + Object.entries(initialData.params).map(array => array.join('=')).join('&');
    return;
};
fetchParamsForFirstLoad();

const changeLanguage = () => {
    language.forEach(item => {
        if (!item.checked) return;
        initialData.params.language = item.value;
        console.log(initialData.params.language);
        fetchParams.textContent = 'fetchParams: ?' + Object.entries(initialData.params).map(array => array.join('=')).join('&');
        initialData.request();
        return;
    });
};

const fetchTypeSave = () => {
    fetchTypeArray.forEach(item => {
        if (!item.checked) return;
        if (item.value === 'trending') {
            document.querySelector('.time_window').classList.remove('is-none');
            document.querySelector('.search').classList.add('is-none');
            document.querySelector('.sort_by').classList.add('is-none');
            fetchTypeParam = item.value;
            delete initialData.params.query;
            delete initialData.params.sort_by;
            pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}/`;
            fetchParams.textContent = `fetchParams: ?api_key=${initialData.params.api_key}&page=${initialData.params.page}`;
            fetchParams.textContent = 'fetchParams: ?' + Object.entries(initialData.params).map(array => array.join('=')).join('&');
            initialData.url = `${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}`;
            initialData.request();
            return;
        };
        if (item.value === 'search') {
            initialData.params.query = queryInput.value;
            document.querySelector('.time_window').classList.add('is-none');
            document.querySelector('.search').classList.remove('is-none');
            document.querySelector('.sort_by').classList.add('is-none');
            fetchTypeParam = item.value;
            delete initialData.params.sort_by;
            fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/`;
            pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/`;
            fetchParams.textContent = 'fetchParams: ?' + Object.entries(initialData.params).map(array => array.join('=')).join('&');
            initialData.url = `${fetchTypeParam}/${mediaTypeParam}`;
            initialData.request();
            return;
        };
        if (item.value === 'discover') {
            sortBy.forEach(item => {
                if (!item.checked) return;
                initialData.params.sort_by = item.value;
            })
            document.querySelector('.time_window').classList.add('is-none');
            document.querySelector('.search').classList.add('is-none');
            document.querySelector('.sort_by').classList.remove('is-none');
            fetchTypeParam = item.value;
            delete initialData.params.query;
            fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/`;
            pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/`;
            fetchParams.textContent = 'fetchParams: ?' + Object.entries(initialData.params).map(array => array.join('=')).join('&');
            initialData.url = `${fetchTypeParam}/${mediaTypeParam}`;
            initialData.request();
            return;
        };
    });
};

const mediaTypeSave = () => {
    mediaTypeArray.forEach(item => {
        if (!item.checked) return;
        mediaTypeParam = item.value;
        return;
    });
    fetchTypeArray.forEach(item => {
        if (!item.checked) return;
        if (item.value === 'trending') {
            fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}/`;
            pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}/`;
            initialData.url = `${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}`;
            initialData.request();
            return;
        };
        if (item.value === 'search') {
            fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/`;
            pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/`;
            initialData.url = `${fetchTypeParam}/${mediaTypeParam}`;
            initialData.request();
            return;
        };
        if (item.value === 'discover') {
            fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/`;
            pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/`;
            initialData.url = `${fetchTypeParam}/${mediaTypeParam}`;
            initialData.request();
            return;
        };
    });
};

const timeWindow = () => {
    timeWindowArray.forEach(item => {
        if (!item.checked) return;
        timeWindowParam = item.value;
        return;
    });
    fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}/`;
    pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}/`;
    initialData.url = `${fetchTypeParam}/${mediaTypeParam}/${timeWindowParam}`;
    initialData.request();
    return;
};

const contentSortBy = () => {
    sortBy.forEach(item => {
        if (!item.checked) return;
        initialData.params.sort_by = item.value;
        console.log(initialData.params);
        fetchURL.textContent = `fetchURL: ${initialData.baseURL}${fetchTypeParam}/${mediaTypeParam}/`;
        pathParams.textContent = `pathParams: /${fetchTypeParam}/${mediaTypeParam}/`;
        initialData.url = `${fetchTypeParam}/${mediaTypeParam}/`;
        console.log(initialData.url);
        fetchParams.textContent = 'fetchParams: ?' + Object.entries(initialData.params).map(array => array.join('=')).join('&');
        initialData.request();
        return;
    });
};

fetchTypeArray.forEach(item => {
    item.addEventListener('change', fetchTypeSave)
});
mediaTypeArray.forEach(item => {
    item.addEventListener('change', mediaTypeSave)
});
timeWindowArray.forEach(item => {
    item.addEventListener('change', timeWindow)
});
sortBy.forEach(item => {
    item.addEventListener('change', contentSortBy)
});
language.forEach(item => {
    item.addEventListener('change', changeLanguage)
});
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