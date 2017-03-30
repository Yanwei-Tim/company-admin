import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import styles from './RegisterCompanyInfo.css';
import CompanyComponent from '../components/Register/Company';
import HeaderComponent from '../components/Layout/Header';
import FooterComponent from '../components/OutSide/Footer';
function RegisterCompany({dispatch,location}) {
  let company="";
  let code="";
  if(location.state){
    company=location.state.company;
    code=location.state.code;
  }

  function submitHandler(values){
    dispatch(routerRedux.push({
      pathname:'/company/post',
      state:{record:values}
    }))
  }
  return (
    <div className={styles.main}>
      <HeaderComponent current={1}/>
      <CompanyComponent onOk={submitHandler} company={company} code={code}/>
      <FooterComponent/>
    </div>
  );
}
function mapStateToProps(state) {
  const {data}=state.company;
  return {
    data
  };
}
export default connect(mapStateToProps)(RegisterCompany);
