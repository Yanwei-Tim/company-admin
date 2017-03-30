import React from 'react';
import { connect } from 'dva';
import {routerRedux } from 'dva/router';
import styles from './Register.css';
import FindPwdComponent from '../components/Login/FindPwd';
import FindPwdSuccessComponent from '../components/Login/FindPwdSuccess';
import HeaderComponent from '../components/OutSide/Header';
import FooterComponent from '../components/OutSide/Footer';
import {setSession} from '../utils/index';
function Register({dispatch,loading,status}) {
  function submitHandler(values){
    dispatch({
      type:'login/findPwd',
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
      <HeaderComponent showLogin={true}/>
      {
        status===1?(<FindPwdSuccessComponent/>):(<FindPwdComponent onOk={submitHandler} getCode={getCode} checkAccount={validAccount}  loading={loading} />)
      }
      <FooterComponent/>
    </div>

  );
}
function mapStateToProps(state) {
  const {status} =state.login;
  return {
    loading:state.loading.models.login,
    status,

  };
}
export default connect(mapStateToProps)(Register);
