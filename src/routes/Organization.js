import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,message,Button,Tag,Tree,Row,Col} from 'antd';
import { routerRedux } from 'dva/router';
import TreeComponent from '../components/Organization/Tree';
import OrganModel from '../components/Organization/OrganModel';
import OrganAppend from '../components/Organization/OrganAppend';
import {organFlag} from '../utils/index'
import styles from './Company.less';
function Organ({dispatch,data,loading,page,company,eid,location,nodes,list,size,title}) {
  function search(values) {
    dispatch(routerRedux.push({
      pathname: '/organization',
      query: {...values,eid} ,
    }));
  }
  function deleteHandler(record) {
    dispatch({
      type: 'organization/remove',
      payload: {id:record.id,eid:record.eid} ,
    });
  }
  function editHandler(id,parentId,values) {
    dispatch({
      type: 'organization/patch',
      payload: {...values,id,parentId,eid},
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'organization/create',
      payload: {values} ,
    });
  }
  function onPageChange(page) {
    dispatch({
      type:'organization/fetchCompany',
      payload:{page,id}
    })
  }
  function onSearch(name) {
    dispatch({
      type:'organization/fetchCompany',
      payload:{name,page,eid}
    })
  }
  function loadData(node){
    const {eventKey,isOrgan,title}=node.props;
    if(!isOrgan){
      dispatch(routerRedux.push({
        pathname: '/organization',
        query: {eid:eventKey} ,
      }));
    }else {
      dispatch({
        type: 'organization/fetchAll',
        payload: {id:eventKey,isOrgan,tree:false}
      });
    }
  }
  function selectHandler({node}) {
    loadData(node)
  }
  const columns = [
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '机构名称',
      dataIndex: 'nodeName',
      key: 'nodeName',
    },
    {
      title: '机构标识',
      dataIndex: 'nodeFlag',
      key: 'nodeFlag',
      render:(text)=>{
        return organFlag(text)
      }
    },
    {
      title: '层级',
      dataIndex: 'level',
      key: 'level',
    },
    /*{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width:'15%',
      render:(text,record)=>{
        return (<div className={styles['antd-operation-link']}>
          <OrganAppend record={record} onOk={createHandler} title="新增机构" company={title}>
            <a href="javascript:void(0)" style={{color:'#7265e6'}}>新增</a>
          </OrganAppend>
          <OrganModel record={record} onOk={editHandler.bind(null,record.id,record.parentId)} title="编辑机构" >
            <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
          </OrganModel>
          <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record)}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </div>)
      }
     }*/
  ];
  const pagination={
    total:list&&list.length,
    showTotal:(total)=> `共 ${total} 条记录`,
    showSizeChanger:true,
    pageSize:size,
    onShowSizeChange:(current,size)=>{
      routerRedux.push({
        pathname: '/organization',
        query: {eid,size} ,
      })
    },
    //onChange:pageChangeHandler
  };
  return (
    <div>
      <Row>
        <Col span="6">
         <TreeComponent rootData={company} nodesData={nodes} onPageChange={onPageChange} onSearch={onSearch} eid={eid} loadData={loadData} selectHandler={selectHandler}/>
        </Col>
        <Col span="18">
         <Table
            columns={columns}
            dataSource={list}
            rowKey={record => record.id}
            pagination={pagination}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  const { data,page,company,eid,nodes,list,size,title} = state.organization;
  return {
    loading: state.loading.models.organization,
    data,
    page,
    company,
    eid,
    list,
    nodes,
    size,
    title
  };
}
export default connect(mapStateToProps)(Organ);
