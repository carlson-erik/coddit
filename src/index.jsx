import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { bindActionCreators } from 'redux';
/* ---------- Data/Redux ---------- */
import configureStore, { history, defaultState } from './redux/store';
import * as actionCreators from './redux/actions';
/* ---------- Views ---------- */
import Subreddit from './views/subreddit';
/* ---------- Reset Default CSS ---------- */
import './reset.css';

const Coddit = (props) => {
  const settingsChanged = (event) => {
    console.log('local storage settings changed', event);
  }

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

  return (
    <React.Fragment>
      <Route
        exact
        path="/about"
        component={() => <div>about page</div>}
      />
      <Route
        exact
        path="/"
        render={(routeprops) => <Subreddit {...props} {...routeprops} />}
      />
      <Route
        exact
        path="/r/"
        render={(routeprops) => <Subreddit {...props} {...routeprops} />}
      />
      <Route
        exact
        path="/r/:subreddit_id"
        render={(routeprops) => <Subreddit {...props} {...routeprops} />}
      />
      <Route
        exact
        path="/r/:subreddit_id/comments/:post_id/:post_title?"
        render={(routeprops) => {
          const {match} = routeprops;
          const {params} = match;
          const {post_id, post_title, subreddit_id} = params;
          return(
          <div>{post_id}<br/>{post_title}<br/>{subreddit_id}<br/>post page</div>
          )
        }}
      />
      <Route
        exact
        path="/user/:user_id"
        render={(routeprops) => {
          const {match} = routeprops;
          const {params} = match;
          const {user_id} = params;
          return(
            <div>{user_id} user page</div>
          )
        }}
      />
    </React.Fragment>
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