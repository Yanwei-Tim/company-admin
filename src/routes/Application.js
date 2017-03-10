import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,message,Button,Tag} from 'antd';
import AppComponent from '../components/Application/AppModel';
import SearchComponent from '../components/Application/Search'
import { routerRedux } from 'dva/router';
import styles from './Company.less'
function App({dispatch,loading,page,size,status,data={}}) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/application',
      query: { page,size },
    }));
  }
  function search(value) {
    dispatch(routerRedux.push({
      pathname: '/application',
      query: value ,
    }));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'application/remove',
      payload: id ,
    });
  }
  function editHandler(id,values) {
    dispatch({
      type: 'application/patch',
      payload: { id, ...values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'application/create',
      payload: values ,
    });
  }
  function forbidden(record) {
    dispatch({
      type: 'application/patch',
      payload: {...record,status:0} ,
    });
  }
  function start(record) {
    dispatch({
      type: 'application/patch',
      payload: {...record,status:1}  ,
    });
  }
  const columns = [
    {
      title: '应用名称',
      dataIndex: 'thirdName',
      key: 'thirdName',
    },
    {
      title: '业主端页面URL',
      dataIndex: 'appUrl',
      key: 'appUrl',
    },
    {
      title: '图标URL',
      dataIndex: 'iconUrl',
      key: 'iconUrl',
    },
    {
      title: '物业端页面URL',
      dataIndex: 'manageUrl',
      key: 'manageUrl',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text)=>{
        return(text==0?<Tag color="orange">未启用</Tag>:<Tag color="green">已启用</Tag>)
      }
    },
    {
      title: '操作',
      key: 'operation',
      width:'15%',
      render:(record)=>{
        const linkProps={
          pathname:'/application/conf',
          query:{id:record.id},
          state:{record}
        };
        return (<div className={styles['antd-operation-link']}>
          {
            record.status==0? (<Popconfirm title="确定启用？" onConfirm={start.bind(null,record)}><a href="javascript:void(0)" className={styles['text-green']}>启用</a></Popconfirm>):
              (<Popconfirm title="确定禁用？" onConfirm={forbidden.bind(null,record)}><a href="javascript:void(0)" className={styles['text-orange']}>禁用</a></Popconfirm>)
          }
          <Link to={linkProps} style={{color:'#7265e6'}}>配置</Link>
          <AppComponent record={record} onOk={editHandler.bind(null, record.id)} title="编辑应用">
            <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
          </AppComponent>
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
        pathname: '/application',
        query: { page:current,size:pageSize },
      }));
    },
    onChange:pageChangeHandler
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
