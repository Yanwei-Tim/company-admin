import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,Row,Col,Button} from 'antd';
import { routerRedux } from 'dva/router';
import SearchComponent from '../components/Search/Search';
import BuildingModel from '../components/Building/BuildingModel';

import styles from './Company.less';


function App({dispatch,data,loading,page,size,id,location},nodes) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/building',
      query: { page,size,id },
    }));
  }
  function search(values) {
    dispatch({
      type: 'building/fetch',
      payload: {...values,id} ,
    });
  }
  function deleteHandler(id) {
    dispatch({
      type: 'building/remove',
      payload: id ,
    });
  }
  function editHandler(bid,values) {
    dispatch({
      type: 'building/patch',
      payload:Object.assign({},{communityId:id},{ id:bid, ...values })
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'building/create',
      payload:Object.assign({},{communityId:id},values)
    });
  }
  const columns = [
    {
      title:"编号",
      dataIndex:"code",
      key:"code"
    },
    {
      title: '楼宇名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'operation',
      width:'20%',
      render:(record)=>{
        const linkProps={
          pathname:'/room',
          query:{buildingId:record.id},
          state:{record}
        };
        return (<div className={styles['antd-operation-link']}>
          <Link to={linkProps} className={styles['text-green']}>查看房间</Link>
          <BuildingModel record={record} onOk={editHandler.bind(null, record.id)}>
            <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
          </BuildingModel>
          <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </div>)
      }
    },
  ];
  const pagination={
    total:data.count,
    showTotal:(total)=> `共 ${total} 条记录`,
    showSizeChanger:true,
    pageSize:size,
    onShowSizeChange:(current,pageSize)=>{
      dispatch(routerRedux.push({
        pathname: '/building',
        query: { page:current,size:pageSize,id },
      }));
    },
    onChange:pageChangeHandler
  };

  return (
    <div>
      <div style={{height:30}}>
        <SearchComponent onSearch={search} placeholder="编号/楼宇名称"/>
      </div>
      <Row className={styles.operation}>
        <Col span={12}>
            楼宇管理
        </Col>
        <Col span={12}>
          <div className={styles.btnGroup}>
            <BuildingModel record={{nodeFlag:0}} onOk={createHandler} title="新增楼宇"  nodes={nodes} >
              <Button className={styles.add}>添加</Button>
            </BuildingModel>
          </div>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data.data}
        rowKey={record => record.id}
        pagination={pagination}
        loading={loading}
      />
    </div>
  );
}
function mapStateToProps(state) {
  const { data,page,size,status,id} = state.building;
  const { nodes} = state.organization;
  return {
    loading: state.loading.models.building,
    data,
    page,
    size,
    status,
    id,
    nodes
  };
}
export default connect(mapStateToProps)(App);
