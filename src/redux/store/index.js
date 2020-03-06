
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

export const defaultState = {
    sort: {
        sfunction : 'hot',
        timeFrame : '24hours',
    },
    settings: {
        itemLimit : "25",
        progLang : localStorage.getItem('coddit_prog_lang') || 'python',
        showAllPreviews : false,
        colorTheme : localStorage.getItem('coddit_theme_name') || 'oneDark',
    },
    data: {
        subreddit: 'all',
        itemCount : 0,
        after : '',
        headerData : {}, // PostView and UserView
        pageList : [], 
    },
    isLoading: false,
};

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )
  return store;
}
