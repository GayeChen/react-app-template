import 'whatwg-fetch';

export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "userInfo/GET_USER_INFO_FAILURE";

function getUserInfoRequest() {
  return {
    type: GET_USER_INFO_REQUEST
  }
}

function getUserInfoSuccess(userInfo) {
  return {
    type: GET_USER_INFO_SUCCESS,
    userInfo: userInfo
  }
}

function getUserInfoFail() {
  return {
    type: GET_USER_INFO_FAILURE
  }
}

export function getUserInfo() {
  return function (dispatch) {
    dispatch(getUserInfoRequest());

    return fetch(`/api/user`)
    .then((response => {
      return response.json()
    }))
    .then((json) => {
      dispatch(getUserInfoSuccess(json))
    }
    ).catch(
    () => {
      dispatch(getUserInfoFail());
    }
    )
  }
}

/*axios*/
// export function getUserInfo() {
//   return {
//     types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE],
//     promise: client => client.get(`http://localhost:8080/api/user.json`),
//     afterSuccess:(dispatch,getState,response)=>{
//       /*请求成功后执行的函数*/
//       dispatch(getUserInfoSuccess(response))
//     },
//     otherData:otherData
//   }
// }