import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import styles from '../components/Layout/main.less';
import Header from '../components/Layout/Header';
import Sider from '../components/Layout/Sider'
import Bread from '../components/Layout/Bread'
import Footer from '../components/OutSide/Footer'
function App({ children,location,routes,dispatch,token}) {
  const siderProps={
    location,
  };
  if(token&&token.status===0){
    dispatch(routerRedux.push({
      pathname:"login"
    }))
  }
  return (
    <div>
      <Header/>
      <div className={styles.layout}>
        <aside className={styles.sider}>
          <Sider {...siderProps}/>
        </aside>
        <div className={styles.main}>
          <Bread routes={routes} location={location}/>
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
function mapStateToProps(state) {
  let {app}=state;
  const {token}=state.utils;
  const {status}=state.login;
  return {
    app,
    status,
    token
  };
}
export default connect(mapStateToProps)(App);
