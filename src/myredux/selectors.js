/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectCounter = (state) => {
  return state.get('counter')
};
//
// const selectRoute = (state) => state.get('route');
//
const makeSelectCount = () => createSelector(
  selectCounter,
  (counterState) => counterState.get('count')
);
//
// const makeSelectLoading = () => createSelector(
//   selectGlobal,
//   (globalState) => globalState.get('loading')
// );
//
// const makeSelectError = () => createSelector(
//   selectGlobal,
//   (globalState) => globalState.get('error')
// );
//
// const makeSelectRepos = () => createSelector(
//   selectGlobal,
//   (globalState) => globalState.getIn(['userData', 'repositories'])
// );
//
// const makeSelectLocation = () => createSelector(
//   selectRoute,
//   (routeState) => routeState.get('location').toJS()
// );

export {
  selectCounter,
  makeSelectCount,
  // makeSelectCurrentUser,
  // makeSelectLoading,
  // makeSelectError,
  // makeSelectRepos,
  // makeSelectLocation,
};
