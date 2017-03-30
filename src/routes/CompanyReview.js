import React from 'react';
import { connect } from 'dva';
import { routerRedux,Link } from 'dva/router';
import {Row,Col} from 'antd';
import styles from './RegisterCompanyPost.css';
import StepsComponent from '../components/Register/Steps';
import HeaderComponent from '../components/Layout/Header';
function RegisterCompanyPost({dispatch,location}) {
  const registerStatus=Object.assign({},location.state,{status:1,checkReply:''});
  const {status,checkReply} =registerStatus;
  function submitHandler(values){
    dispatch({
      type:'company/patchCompanyInfo',
      payload:{company}
    })
  }
  function goBack() {
    dispatch(routerRedux.push({
      pathname:'/company/info',
      state:{company,code}
    }))
  }

  return (
    <div className={styles.main}>
      <HeaderComponent current={1}/>
      <div className={styles.container}>
        <StepsComponent titles={["基本信息","信息登记","提交审核"]} current={2}/>
        <div className={styles.content}>
          <Row>
            <Col span={8} style={{"textAlign":"right","paddingRight":"15px"}}>
              {
                status===-1?(<img src={require("../assets/company-refuse.png")} alt=""/>):(<img src={require("../assets/company-pass.png")} alt=""/>)
              }
            </Col>
            <Col span={12}>
              {
                status===-1?(
                  <div className={styles.refuse}>
                    <h3>您的资料您的资料未通过审核，请查看原因并重新提交资料</h3>
                    <p>{checkReply}</p>
                    <p style={{"color":"#222"}}>返回并重新提交资料 <Link to="company/info">提交资料</Link></p>
                  </div>

                ):(
                  <div className={styles.pass}>
                    <h3>您的资料当前正在审核中，请耐心等待</h3>
                    <p>资料审核需要1-2日的工作时间，您可以先进行其他操作 <Link to="home">返回首页</Link></p>
                  </div>
                )
              }

            </Col>
          </Row>



        </div>
      </div>
    </div>
  );
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RegisterCompanyPost);
