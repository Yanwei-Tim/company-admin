import React from 'react';
import { connect } from 'dva';
import {routerRedux } from 'dva/router';
import styles from './Register.css';
import RegisterComponent from '../components/Register/Register';
import HeaderComponent from '../components/OutSide/Header';
import FooterComponent from '../components/OutSide/Footer';
import {setSession} from '../utils/index';
function Register({dispatch,loading,status,check,data,registerStatus}) {
    function submitHandler(values){
        dispatch({
            type:'register/register',
            payload:values
        })
    }
    function getCode(phone) {
        dispatch({
            type:'utils/validCode',
            payload:phone
        })
    }
    function validAccount(account){
      dispatch({
        type:'utils/validAccount',
        payload:account
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
  return (
    <div className={styles.main}>
        <HeaderComponent current={1}/>
        <RegisterComponent onOk={submitHandler} getCode={getCode} checkAccount={validAccount} isLogin={status} status={check} loading={loading} loginSuccess={loginSuccess}/>
        <FooterComponent/>
    </div>
  );
}
function mapStateToProps(state) {
  const {status,registerStatus,data} =state.register;
  return {
    loading:state.loading.models.utils,
    check:state.utils.status,
    status,
    data,
    registerStatus
  };
}
export default connect(mapStateToProps)(Register);
