import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,message,Button,Tag} from 'antd';
import AuthorizeModel from '../components/Authorize/AuthorizeModel';
import SearchComponent from '../components/Authorize/Search'
import { routerRedux } from 'dva/router';
import styles from './Company.less'
function Authorize({dispatch,data,loading,size}) {
  function search(value) {
    dispatch(routerRedux.push({
      pathname: '/authorize',
      query: value ,
    }));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'authorize/remove',
      payload: id ,
    });
  }
  function editHandler(id,values) {
    dispatch({
      type: 'authorize/patch',
      payload: { id, ...values },
    });
  }
  function createHandler(values) {

    dispatch({
      type: 'authorize/create',
      payload: values ,
    });
  }
  function forbidden(id) {
    dispatch({
      type: 'authorize/remove',
      payload: id ,
    });
  }
  function start(id) {
    dispatch({
      type: 'authorize/remove',
      payload: id ,
    });
  }
  const columns = [
    {
      title: '权限编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标记',
      dataIndex: 'flag',
      key: 'flag ',
      render:(text)=>{
        switch (text){
          case 1:
            return '企业权限';
            break;
          case 2:
            return '社区权限';
            break;
          case 3:
            return '运营后台';
            break;
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'disable',
      key: 'disable',
      render:(text)=>{
        return(text?<Tag color="orange">禁用</Tag>:<Tag color="green">启用</Tag>)
      }
    }
  ];
  const pagination={
    total:data.count,
    showTotal:(total)=> `共 ${total} 条记录`,
    showSizeChanger:true,
    pageSize:size,
    onShowSizeChange:(current,pageSize)=>{
      dispatch({
        type: '/size',
        payload: { page:current,size:pageSize }
      });
    }
  };
  return (
    <div>
      <SearchComponent search={search} createHandler={createHandler}/>
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
  const { data,page,size} = state.authorize;
  return {
    loading: state.loading.models.authorize,
    data,
    size
  }
}
export default connect(mapStateToProps)(Authorize);
