/* Action Creators - These fire events which the reducer will handle */
/* ----------------------------------------------------------------- */

/* update sort state object */
export function updateSort(sfunction, timeFrame){
    return {
        type: 'UPDATE_SORT',
        sfunction,
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
export function createPage(itemCount, after, subreddit, headerData, page){
    return {
        type: 'CREATE_PAGE',
        itemCount,
        after, 
        subreddit,
        headerData,
        page
    }
}

/* add page data to data state object */
export function updatePage(itemCount, after, subreddit, headerData, page){
    return {
        type: 'UPDATE_PAGE',
        itemCount,
        after, 
        subreddit,
        headerData,
        page
    }
}

/* create new page data in data state object */
export function createPageData(itemCount, after, subreddit, page){
    return {
        type: 'CREATE_PAGEDATA',
        itemCount,
        after, 
        subreddit,
        page
    }
}

/* add page data to data state object */
export function updatePageData(itemCount, after, subreddit, page){
    return {
        type: 'UPDATE_PAGEDATA',
        itemCount,
        after, 
        subreddit,
        page
    }
}

export function setLoadingStatus(param){
    return {
        type: 'UPDATE_LOADING_STATUS',
        isLoading: param
    }
}
