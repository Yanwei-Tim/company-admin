import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import { Tabs,Button,Row,Col,Modal} from 'antd';
import styles from './Company.less';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
function App({dispatch,loading,location,data={}}) {
  const {name,id,status,readme}=location.state.record;
  const {key}=location.query;
  function changeHandle(key) {
    dispatch(routerRedux.push({
      pathname: '/application',
      query: {key} ,
    }));
  }
  function createHandler() {
    dispatch({
      type: 'application/create_by_company',
      payload: id ,
    });
    dispatch(routerRedux.push({
      pathname: '/application',
      query: {key} ,
    }));
  }
  function showConfirm() {
    confirm({
      title: '确认开通应用?',
      content: name,
      onOk() {
        createHandler()
      },
      onCancel() {
      },
    });
  }
  function appStatus(status){
    switch (parseInt(status)){
      case -255:
        return "未开通";
        break;
      case -1:
        return "审核驳回";
        break;
      case 0:
        return "待审核";
        break;
      case 1:
        return "已添加";
        break;
      case 2:
        return "已禁用";
        break;
      default:
        return "";
    }
  }
  function appBtn(status) {
      switch (parseInt(status)) {
        case -255:
          return (<Button type="danger" className={styles.app_used_btn} onClick={showConfirm}>开通</Button>);
          break;
        case -1:
          return (<Button type="danger" className={styles.appBtnDisabled}  disabled>开通</Button>);
          break;
        case 0:
          return (<Button type="primary" className={styles.appBtnDisabled} disabled>开通</Button>);
          break;
        case 1:
          return (<Button type="primary" className={styles.appBtnDisabled}  disabled>停用</Button>);
          break;
        case 2:
          return (<Button type="danger" className={styles.appBtnDisabled}  disabled>开通</Button>);
          break;
        default:
          return "";
      }
  }
  return (
    <div>
      <Tabs defaultActiveKey={key} onTabClick={changeHandle} >
        <TabPane tab="智能应用" key="0">
            <div className={styles.highlight_box}>
              <Row gutter={12}>
                <Col span={2}>
                  <img src={require('../assets/app-icon.png')} alt=""/>
                </Col>
                <Col span={16}>
                    <h4>{name}</h4>
                    <p>{appStatus(status)}</p>
                </Col>
                <Col span={6}>
                  {appBtn(status)}
                </Col>
              </Row>
            </div>
            <div className={styles.app_describe}  >
              <div dangerouslySetInnerHTML={{__html:readme}}>
              </div>
            </div>
        </TabPane>
        <TabPane tab="功能模块" key="1">
        </TabPane>
      </Tabs>
    </div>
  );
}
function mapStateToProps(state) {
  const { data,page,size,status} = state.application;
  return {
    loading: state.loading.models.application,
    data,
    page,
    size,
    status,
  };
}
export default connect(mapStateToProps)(App);
