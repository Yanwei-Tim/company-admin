import React from 'react';
import { connect } from 'dva';
import styles from './Register.css';
import RegisterComponent from '../components/Register/Register'
function Register({dispatch}) {
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
  return (
    <div className={styles.main}>
        <RegisterComponent onOk={submitHandler} getCode={getCode}/>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Register);
