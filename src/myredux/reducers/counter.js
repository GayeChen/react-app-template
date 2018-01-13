import {INCREMENT, DECREMENT, RESET} from 'actions/counter';
import {fromJS} from 'immutable'
/*
* 初始化state
 */

const initState = fromJS({
  count: 0
});
/*
* reducer
 */
export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return state
        .set('count' ,state.get('count') + 1);
    case DECREMENT:
      return state
      .set('count' ,state.get('count') - 1);
    case RESET:
      return state
      .set('count', 0);
    default:
      return state;
  }
}