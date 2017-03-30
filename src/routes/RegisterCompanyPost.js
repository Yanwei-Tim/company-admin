import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Row,Col,Button} from 'antd';
import styles from './RegisterCompanyPost.css';
import StepsComponent from '../components/Register/Steps';
import HeaderComponent from '../components/OutSide/Header';
import FooterComponent from '../components/OutSide/Footer';
function RegisterCompanyPost({dispatch,location,status}) {
  const {company,code}=location.state.record;
  if(status===1){
    dispatch(routerRedux.push({
      pathname:'/company/review'
    }))
  }
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
          <h3 className={styles.title}>企业信息登记</h3>
          <article className={styles.description}>
            <h5 className={styles["description-title"]}>请认真核对以下登记信息</h5>
          </article>
          <div style={{"marginTop":"50px","fontSize":"16px"}}>
              <Row type="flex" gutter={8}>
                <Col span={8}>
                  <label>企业名称：</label> {company}
                </Col>
                <Col span={12}>
                  <label>营业执照代码/统一信用代码</label>：{code}
                </Col>
              </Row>
            <div style={{"textAlign":"center","marginTop":"30px"}}>
              <Button className={styles.button} onClick={goBack}>上一步</Button>
              <Button type="primary" className={styles.button} onClick={submitHandler}>提交审核</Button>
            </div>

          </div>
        </div>
      </div>
      <FooterComponent/>
    </div>
  );
}
function mapStateToProps(state) {
  const {status}=state.company;
  return {
    status
  };
}

export default connect(mapStateToProps)(RegisterCompanyPost);
