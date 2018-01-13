import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from './reducers.js';
import {fromJS} from 'immutable';

const initialState = {}

const enhancers = [
  applyMiddleware(thunkMiddleware),
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
    // Prevent recomputing reducers for `replaceReducer`
    shouldHotReload: false,
  })
  : compose;

let store = createStore(
  createReducer(),
  fromJS(initialState),
  composeEnhancers(...enhancers)
);

store.injectedReducers = {}

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(createReducer(store.injectedReducers));
  });
}

export default store