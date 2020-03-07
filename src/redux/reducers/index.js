import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
/* ------------------------------------------------------------------------------- 
      -------------------------- REDUCERS START HERE--------------------------  
   ------------------------------------------------------------------------------- */
function sort(state={}, action ){
    switch(action.type){
        case 'UPDATE_SORT':
            const {method, timeFrame} = action;
            return {
                method,
                timeFrame
            };
        default: 
            return state;
    }
}

function settings(state={}, action ){
    const {type, itemLimit, progLang, showAllPreviews, colorTheme} = action;
    switch(type){
        case 'UPDATE_SETTINGS':
            return {
                itemLimit, 
                progLang, 
                showAllPreviews, 
                colorTheme
            };
        default: 
            return state;
    }
}

function data(state={}, action ){
    const {itemCount, after, page} = action;
    switch(action.type){
        case 'CREATE_PAGE':
            return {
                itemCount,
                after,
                headerData: action.headerData,
                pageList : [
                    page
                ]
            };
        case 'UPDATE_PAGE':
            return {
                itemCount,
                after,
                headerData : action.headerData,
                pageList : [
                    ...state.pageList,
                    page
                ]
            };
        case 'CREATE_PAGEDATA':
            return {
                itemCount,
                after,
                headerData : {},
                pageList : [
                    page
                ]
            };
        case 'UPDATE_PAGEDATA':
            return {
                itemCount,
                after,
                headerData : {},
                pageList : [
                    ...state.pageList,
                    page
                ]
            };
        default: 
            return state;
    }
}

function isLoading(state = false, action){
    switch (action.type){
        case 'UPDATE_LOADING_STATUS': 
            return action.isLoading;
        default:
            return state;
    }
}

/* ------------------------------------------------------------------------------- 
       -------------------------- REDUCERS END HERE--------------------------  
   ------------------------------------------------------------------------------- */

export default (history) => combineReducers({
    router: connectRouter(history),
    sort, 
    settings, 
    data,
    isLoading
});