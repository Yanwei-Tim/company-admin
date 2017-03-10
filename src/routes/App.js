import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import {getSession,setSession} from '../utils/index'
import styles from '../components/Layout/main.less';
import Header from '../components/Layout/Header';
import Sider from '../components/Layout/Sider'
import Bread from '../components/Layout/Bread'
import Footer from '../components/Layout/Footer'
function App({ children,location,routes,dispatch,app,status}) {
  let {darkTheme}=app;
  const siderProps={
    location,
    darkTheme:darkTheme?'dark':'',
    changeTheme(){
      dispatch({type:"app/changeTheme"})
    }
  };
  function logout() {
    dispatch({
      type:"login/logout",
      payload:{}
    })
  }
  function logoutSuccess() {
    dispatch(routerRedux.push({
       pathname:'login'
    }));
  }
  let user=getSession('PROFILE');
  if(!user||!user.nickName){
    dispatch(routerRedux.push({
      pathname:"login"
    }))
  }
  let name=user&&user.nickName||'';
  return (
      <div className={styles.layout}>
          <aside className={darkTheme?styles.sider:styles.sider+" "+styles.light}>
              <Sider {...siderProps}/>
          </aside>
          <div className={styles.main}>
              <Header user={name} logout={logout} isLogout={status} logoutSuccess={logoutSuccess}/>
              <Bread routes={routes}/>
              <div className={styles.container}>
                  <div className={styles.content}>
                      {children}
                  </div>
              </div>
            <Footer/>
          </div>
      </div>
  );
}
function mapStateToProps(state) {
  let {app}=state;
  const {status}=state.login;
  return {
    app,
    status
  };
}

export default connect(mapStateToProps)(App);
