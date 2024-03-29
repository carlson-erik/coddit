import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { bindActionCreators } from 'redux';
// ---------- Data/Redux ----------
import configureStore, { history, defaultState } from './redux/store';
import * as actionCreators from './redux/actions';
// ---------- Components ----------
import EditorSettings from './components/editor-settings';
// ---------- Views ----------
import Post from './views/post';
import PostList from './views/post-list';
// ---------- Themes ----------
import { getTheme, ThemeContext } from './themes';
// ---------- Reset Default CSS ----------
import './reset.css';

const Coddit = (props) => {
  const {settings, updateSettings} = props;
  const {colorTheme} = settings;

  const value = {
    theme: getTheme(colorTheme),
    setTheme: (newThemeName) => {
      const {itemLimit, showAllPreviews, progLang} = props.settings;
      updateSettings(itemLimit, progLang, showAllPreviews, newThemeName);
    },
  }
  const { background, foreground } = value.theme;
  document.body.style.backgroundColor = background;
  document.body.style.color = foreground;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add event to listen for local storage changes
      window.addEventListener('storage', settingsChanged)
      return function cleanup() {
        // Remove event listeners
        window.removeEventListener('storage', settingsChanged);
      };
    }
  });

  const settingsChanged = () => {
    const {updateSettings, settings} = props;
		const newThemeName = localStorage.getItem("coddit_theme_name");
		const newProgLang = localStorage.getItem("coddit_prog_lang");
    // update the settings in state
    const {itemLimit, showAllPreviews} = settings;
    updateSettings(itemLimit, newProgLang, showAllPreviews, newThemeName);
  };

  return (
    <ThemeContext.Provider value={value}>
      <EditorSettings {...props}/>
      <Route
        exact
        path="/"
        render={(routeprops) => <PostList {...props} {...routeprops} />}
      />
      <Route
        exact
        path="/r/"
        render={(routeprops) => <PostList {...props} {...routeprops} />}
      />
      <Route
        exact
        path="/r/:subreddit_id"
        render={(routeprops) => <PostList {...props} {...routeprops} />}
      />
      <Route
        exact
        path="/r/:subreddit_id/comments/:post_id/:post_title?"
        render={(routeprops) => <Post {...props} {...routeprops} />}
      />
    </ThemeContext.Provider>
  )
};

const Routing = () => {
  /* This maps state to props that will be used by the application*/
  const mapStateToProps = (state) => {
    return {
      sort: state.sort,
      settings: state.settings,
      data: state.data,
      isLoading: state.isLoading,
    };
  }

  /* This binds our actions to dispatch (make them fire-able) and makes the actions available via props*/
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
  }
  const store = configureStore(defaultState);
  const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Coddit);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <ConnectedApp />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

ReactDOM.render(<Routing />, document.getElementById('root'));