import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,Row,Col,Button} from 'antd';
import { routerRedux } from 'dva/router';
import SearchComponent from '../components/Search/Search';
import RoomModel from '../components/Room/RoomModel';
import styles from './Company.less';
function Room({dispatch,data,loading,page,size,buildingId,nodes}) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/room',
      query: { page,size,buildingId },
    }));
  }
  function search(values) {
    dispatch({
      type: 'room/fetch',
      payload: {...values,buildingId} ,
    });
  }
  function deleteHandler(id) {
    dispatch({
      type: 'room/remove',
      payload: id ,
    });
  }
  function editHandler(values) {
    dispatch({
      type: 'room/patch',
      payload: { buildingId, ...values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'room/create',
      payload: { buildingId, ...values },
    });
  }
  const columns = [
    {
      title:"编号",
      dataIndex:"code",
      key:"code"
    },
    {
      title: '房间号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '业主',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: '业主手机号',
      dataIndex: 'ownerPhone',
      key: 'ownerPhone',
    },
    {
      title: '操作',
      key: 'operation',
      width:'15%',
      render:(record)=>{
        return (<div className={styles['antd-operation-link']}>
          <RoomModel record={record} onOk={editHandler.bind(null)}>
            <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
          </RoomModel>
          <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </div>)
      }
    }
  ];
  const pagination={
    total:data.count,
    showTotal:(total)=> `共 ${total} 条记录`,
    showSizeChanger:true,
    pageSize:size,
    onShowSizeChange:(current,pageSize)=>{
      dispatch(routerRedux.push({
        pathname: '/room',
        query: { page:1,size:pageSize,buildingId },
      }));
    },
    onChange:pageChangeHandler
  };
  return (
    <div>
      <div style={{height:30}}>
        <SearchComponent onSearch={search} placeholder="编号/房间号/业主"/>
      </div>
      <Row className={styles.operation}>
        <Col span={18}>
         房间管理
        </Col>
        <Col span={6}>
          <div className={styles.btnGroup}>
            <RoomModel record={{nodeFlag:0}} onOk={createHandler} title="新增房间"  nodes={nodes} >
              <Button className={styles.add}>添加</Button>
            </RoomModel>
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
  )
}
function mapStateToProps(state) {
  const { data,page,size,buildingId} = state.room;
  const { nodes} = state.organization;
  return {
    loading: state.loading.models.room,
    data,
    page,
    size,
    buildingId,
    nodes
  };
}
export default connect(mapStateToProps)(Room);
