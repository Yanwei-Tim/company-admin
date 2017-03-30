import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import styles from '../components/Layout/main.less';
import Header from '../components/Layout/Header';
import Sider from '../components/Layout/Sider'
import Bread from '../components/Layout/Bread'
import Footer from '../components/OutSide/Footer'
function App({ children,location,routes,dispatch,token,list={}}) {

  function setHeight(height) {
     document.getElementById("layout").style.height=height+50+"px"
  }
  const siderProps={
    location,
    list:list.data,
    setHeight
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
        <div className={styles.main} id="layout">
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
  const {list}=state.nav;
  return {
    app,
    status,
    token,
    list
  };
}
export default connect(mapStateToProps)(App);
