import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
// import {combineReducers} from 'redux';
import {combineReducers} from 'redux-immutable'

export default function createReducer(injectedReducers) {
  return combineReducers({
    counter,
    userInfo,
    ...injectedReducers
  })
}
