import React, {PropTypes} from 'react'
import LoginComponent from '../components/Login/Login';
import HeaderComponent from '../components/OutSide/Header';
import FooterComponent from '../components/OutSide/Footer';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {setSession} from '../utils/index';
function Login({dispatch,loading,data,status,registerStatus}) {
  function submitHandler(values){
     dispatch({
       type:'login/enter',
       payload:values
     })
  }
  function logout() {
    setSession('PROFILE',{});
    dispatch({
      type:"login/logout",
      payload:{}
    })
  }
  function loginSuccess() {
    setSession('PROFILE',Object.assign({},data,{eid:registerStatus.eid}));
    switch (registerStatus.status){
      case -1:
      case 2:
        dispatch(routerRedux.push({
          pathname:'company/review',
          state:{registerStatus}
        }));
        break;
      case 0:
        break;
      case 1:
        dispatch(routerRedux.push({
          pathname:'company/info'
        }));
        break;

      case 3:
        dispatch(routerRedux.push({
          pathname:'home'
        }));
        break;
    }

  }
  function logoutSuccess() {
    setSession('PROFILE',{});
    dispatch(routerRedux.push({
      pathname:'login'
    }))
  }
  return (
    <div>
      <HeaderComponent showRegister={true}/>
      <LoginComponent loading={loading} onOk={submitHandler} isLogin={status} loginSuccess={loginSuccess} logout={logout} />
      <FooterComponent/>
    </div>

  )
}
function  mapStateToProps(state) {
  const {data,status,registerStatus}=state.login;
  return {
    loading:state.loading.models.login,
    data,
    status,
    registerStatus
  };
}
export default connect(mapStateToProps)(Login);
