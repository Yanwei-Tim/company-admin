import React from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router'
import { Tabs,Spin,Row,Col} from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './Company.less';
import classnames from 'classnames'
const TabPane = Tabs.TabPane;
function App({dispatch,location,data={},loading,data_key_1={}}) {
  const {appUsed,appUnused,appIcon,appDescribe}=styles;
  const {key='0'}=location.query;
  const appStatus=(flag)=>{
      switch (parseInt(flag)){
        case 0:
          return "待审核";
          break;
        case 1:
          return "已添加";
          break;
        default:
          return ""
      }
  }
  return (
    <div>
      <Spin spinning={false}>
        <Tabs defaultActiveKey={key.toString()}>
          <TabPane tab="功能模块" key="0">
            <Row style={{"marginTop":"30px"}}>
              <QueueAnim>
                {
                  data.data&&data.data.map((record)=>{
                    return (<Col span={12} key={record.id} style={{paddingLeft:12,paddingRight:12}}>
                      <div className={styles.appItem} >
                        <Link to={{
                          pathname:'application/info',
                          state:{record},
                          query:{key:0}
                        }}>
                          <Row>
                            <Col span={6} className={classnames({
                              [appIcon]:true,
                              [appUsed]:record.status===1,
                              [appUnused]:record.status!==1
                            })
                            } >
                            </Col>
                            <Col span={18} className={appDescribe}>
                              <p className={styles.title}>{record.name}</p>
                              <p className={styles.subTitle}>
                                {record.readme}
                              </p>
                              <p className={styles.statusText}>{appStatus(record.status)}</p>
                            </Col>
                          </Row>
                        </Link>
                      </div>
                    </Col>)
                  })
                }
              </QueueAnim>
            </Row>
          </TabPane>
          <TabPane tab="智能应用" key="1">
            <Row gutter={24} style={{"marginTop":"30px"}}>
              <QueueAnim>
              {
                data_key_1.data&&data_key_1.data.map((record)=>{
                  return (<Col span={12} key={record.id} style={{paddingLeft:12,paddingRight:12}}>
                    <div className={styles.appItem}>
                      <Link to={{
                        pathname:'application/community',
                        state:{record},
                        query:{key:1,id:record.id}
                      }}>
                        <Row>
                          <Col span={6} className={classnames({
                            [appIcon]:true,
                            [appUsed]:record.status===1,
                            [appUnused]:record.status!==1
                          })
                          }>
                          </Col>
                          <Col span={18} className={appDescribe}>
                            <p className={styles.title}>{record.name}</p>
                            <p className={styles.subTitle}>
                              {record.readme}
                            </p>
                          </Col>
                        </Row>
                      </Link>
                    </div>
                  </Col>)
                })
              }
              </QueueAnim>
            </Row>
          </TabPane>
        </Tabs>
      </Spin>

    </div>
  );
}
function mapStateToProps(state) {
  const { data,page,size,status,data_key_1} = state.application;
  return {
    loading: state.loading.models.application,
    data,
    page,
    size,
    status,
    data_key_1
  };
}
export default connect(mapStateToProps)(App);
