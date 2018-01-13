import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";

class UserInfo extends Component {
  
  render() {
    // const {userInfo, isLoading, errorMsg} = this.props.userInfo;
    const userInfo = this.props.userInfo.get('userInfo');
    const isLoading = this.props.userInfo.get('isLoading');
    const errorMsg = this.props.userInfo.get('errorMsg');
    
    return (
      <div>
        {
          isLoading ? '请求信息中......' :
          (
          errorMsg ? errorMsg :
          <div>
            <p>用户信息：</p>
            <p>用户名：{userInfo.name}</p>
            <p>介绍：{userInfo.intro}</p>
          </div>
          )
        }
        <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
      </div>
    )
  }
}

export default connect(
  (state) => ({userInfo: state.get('userInfo')}),
  {getUserInfo}
)(UserInfo);