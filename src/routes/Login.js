import React, {PropTypes} from 'react'
import LoginComponent from '../components/Login/Login'
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {setSession} from '../utils/index'
function Login({dispatch,loading,data,status}) {
  function submitHandler(values){
     dispatch({
       type:'login/enter',
       payload:values
     })
  }
  function loginSuccess() {
    setSession('PROFILE',data);
    dispatch(routerRedux.push({
      pathname:'home'
    }))
  }
  function logoutSuccess() {
    setSession('PROFILE',{});
    dispatch(routerRedux.push({
      pathname:'login'
    }))
  }
  return (
    <LoginComponent loading={loading} onOk={submitHandler} isLogin={status} loginSuccess={loginSuccess} />
  )
}
function  mapStateToProps(state) {
  const {data,status}=state.login;
  return {
    loading:state.loading.models.login,
    data,
    status
  };
}
export default connect(mapStateToProps)(Login);
