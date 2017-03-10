import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,message,Button,Tag} from 'antd';
import RoleModel from '../components/Role/RoleModel';
import SearchComponent from '../components/Role/Search'
import { routerRedux } from 'dva/router';
import styles from './Company.less'
function Authorize({dispatch,data,loading,size,page}) {

  function search(value) {
    dispatch(routerRedux.push({
      pathname: '/role',
      query: value ,
    }));
  }
  function editHandler(id,values) {
    console.log(values)
    dispatch({
      type: 'role/patch',
      payload: { id, ...values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'role/create',
      payload: values ,
    });
  }
  function forbidden(id) {
    dispatch({
      type: 'role/remove',
      payload: id ,
    });
  }
  function start(id) {
    dispatch({
      type: 'role/remove',
      payload: id ,
    });
  }
  const columns = [
    {
      title: '角色编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'disable',
      key: 'disable',
      render:(text)=>{
        return(text?<Tag color="orange">禁用</Tag>:<Tag color="green">启用</Tag>)
      }
    },
    {
      title: '操作',
      key: 'operation',
      width:'15%',
      render:(record)=>{
        const linkProps={
          pathname:'accredit',
          query:{roleId:record.id},
          state:{record}
        };
        return (<div className={styles['antd-operation-link']}>
          {
            record.status==0? (''):
              (<Popconfirm title="确定禁用？" onConfirm={forbidden.bind(null,record.id)}><a href="javascript:void(0)" className={styles['text-orange']}>禁用</a></Popconfirm>)
          }
          <RoleModel record={record} onOk={editHandler.bind(null, record.id)} title="编辑角色">
            <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
          </RoleModel>
          <Link to={linkProps} className={styles['text-green']}>绑定权限</Link>
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
      dispatch({
        type: '/size',
        query: { page:current,size:pageSize },
      });
    },
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
  const { data,size,page} = state.role;
  return {
    loading: state.loading.models.role,
    data,
    size,
    page
  };
}
export default connect(mapStateToProps)(Authorize);
