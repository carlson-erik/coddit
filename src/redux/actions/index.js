/* Action Creators - These fire events which the reducer will handle */
/* ----------------------------------------------------------------- */

/* update sort state object */
export function updateSort(method, timeFrame){
    return {
        type: 'UPDATE_SORT',
        method,
        timeFrame,
    }
}

/* update settings state object */
export function updateSettings(itemLimit, progLang, showAllPreviews, colorTheme){
    return {
        type: 'UPDATE_SETTINGS',
        itemLimit,
        progLang,
        showAllPreviews,
        colorTheme
    }
}


/* create new page and headerData data in data state object */
export function createPage(itemCount, after, headerData, page){
    return {
        type: 'CREATE_PAGE',
        itemCount,
        after,
        headerData,
        page
    }
}

/* add page data to data state object */
export function updatePage(itemCount, after, headerData, page){
    return {
        type: 'UPDATE_PAGE',
        itemCount,
        after, 
        headerData,
        page
    }
}

/* create new page data in data state object */
export function createPageData(itemCount, after, page){
    return {
        type: 'CREATE_PAGEDATA',
        itemCount,
        after,
        page
    }
}

/* add page data to data state object */
export function updatePageData(itemCount, after, page){
    return {
        type: 'UPDATE_PAGEDATA',
        itemCount,
        after,
        page
    }
}

export function setLoadingStatus(param){
    return {
        type: 'UPDATE_LOADING_STATUS',
        isLoading: param
    }
}
