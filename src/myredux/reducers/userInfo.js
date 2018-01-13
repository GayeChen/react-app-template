import {GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL} from 'actions/userInfo';
import {fromJS} from 'immutable'

const initState = fromJS({
  isLoading: false,
  userInfo: {},
  errorMsg: ''
});

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return state
        .set('isLoading', true)
        .set('userInfo', {})
        .set('errorMsg', '')
    case GET_USER_INFO_SUCCESS:
      return state
      .set('isLoading', false)
      .set('userInfo', action.userInfo)
      .set('errorMsg', '')
    case GET_USER_INFO_FAIL:
      return state
      .set('isLoading', false)
      .set('userInfo', {})
      .set('errorMsg', '请求错误')
    default:
      return state;
  }
}
