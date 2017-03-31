import React from 'react';
import { connect } from 'dva';
import {routerRedux,Link} from 'dva/router'
import { Tabs,Button,Row,Col,Modal,Icon,Table } from 'antd';
import classnames from 'classnames';
import FilterComponent from '../components/Filter/Filter'
import styles from './Company.less';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
function App({dispatch,loading,location,community_list={},nodes,organizationId,list={}}) {
  const {name,id,readme,status,iconUrl}=location.state.record;
  const {key}=location.query;
  const {status_done,status_wait,status_hold}=styles;
  function changeHandle(key) {
    dispatch(routerRedux.push({
      pathname: '/application',
      query: {key} ,
    }));
  }
  function createHandler(communityId) {
    dispatch({
      type: 'application/create_by_community',
      payload: {thirdId:id,communityId} ,
    });
    dispatch({
      type:'application/fetchAll',
      payload:{id,organizationId}
    })
  }
  function showConfirm(communityId) {
    confirm({
      title: '确认开通应用?',
      content: name,
      onOk() {
        createHandler(communityId)
      },
      onCancel() {
      },
    });
  }
  function onOptionChange(organizationId) {
    if(organizationId){
      dispatch({
        type: 'application/fetch_by_organ',
        payload: {organizationId,id:location.query.id} ,
      });
    }

  }
  function pageHandle(page){
    dispatch({
      type: 'application/fetch_by_organ',
      payload: {organizationId,id:location.query.id,page} ,
    })
  }
  const columns = [
    {
      title: '社区名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text)=>{
        switch (parseInt(text)) {
          case -255:
            return (<span style={{color:"#ff5a60"}}>未开通</span>);
            break;
          case -1:
            return (<span style={{color:"#ff5a60"}}>驳回</span>);
            break;
          case 0:
            return (<span style={{color:"#00a5e0"}}>待审核</span>);
            break;
          case 1:
            return (<span style={{color:"#00a5e0"}}>启用</span>);
            break;
          case 2:
            return (<span style={{color:"#ff5a60"}}>停用</span>);
            break;
          default:
            return "";
        }
      }
    },
    {
      title: '操作',
      key: 'operation',
      width:120,
      render:(record)=>{
        switch (parseInt(record.status)) {
          case -255:
            return (<Button type="primary" className={styles.app_used_btn} onClick={showConfirm.bind(null,record.id)}>开通</Button>);
            break;
          default:
            return "";
        }
      }
    }
  ];
  const pagination={
    total:community_list.count,
    showTotal:(total)=> `共 ${total} 条数据`,
    pageSize:10,
    onChange:pageHandle,
  }
  return (
    <div>
      <Tabs defaultActiveKey={key} onTabClick={changeHandle} >
        <TabPane tab="功能模块" key="0">
          &nbsp;
        </TabPane>
        <TabPane tab="智能应用" key="1">
          <div className={styles.highlight_box}>
            <Row gutter={12}>
              <Col span={2}>
                <img src={iconUrl} alt="" style={{width:48,height:48}}/>
              </Col>
              <Col span={16}>
                <h4>{name}</h4>
              </Col>
              <Col span={6}>
              </Col>
            </Row>
          </div>
          <div className={styles.app_describe}  >
            <div dangerouslySetInnerHTML={{__html:readme}}>

            </div>
          </div>
          <div className={styles.community_list_content}>
            <h4>应用功能状态</h4>
            <br/>
            <Row gutter={48}>
              {
                list.data&&list.data.slice(0,3).map((item)=>{
                  return (
                    <Col span={6} key={item.id} >
                      <div className={classnames({
                        [status_done]:item.status===1,
                        [status_wait]:item.status===0,
                        [status_hold]:item.status===2||item.status===-1
                      })}>
                        {item.name}
                      </div>
                    </Col>
                  )
                })
              }
              {
                list.count>3?( <Col span={6}>
                  <div className={styles.status_more}>
                    <Link>
                      <Icon type="plus" /> 更多
                    </Link>
                  </div>
                </Col>):""
              }
            </Row>
          </div>
          <div className={styles.community_list_content}>
            <h4>未开通该应用社区列表</h4>
            <br/>
            <FilterComponent nodes={nodes} onChange={onOptionChange} styles={{width:250}} allowClear={false}/>
            <Table
              columns={columns}
              dataSource={community_list.data}
              rowKey={record => record.id}
              pagination={pagination}
              loading={loading}
              style={{marginTop:20}}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
function mapStateToProps(state) {
  const { community_list,page,size,status,organizationId,list} = state.application;
  const { nodes} = state.organization;
  return {
    loading: state.loading.models.application,
    community_list,
    page,
    size,
    status,
    nodes,
    organizationId,
    list
  };
}
export default connect(mapStateToProps)(App);
