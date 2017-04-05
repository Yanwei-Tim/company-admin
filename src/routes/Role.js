import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,Row,Col,Button,Tag} from 'antd';
import RoleModel from '../components/Role/RoleModel';
import SearchComponent from '../components/Search/Search'
import { routerRedux } from 'dva/router';
import styles from './Company.less'
function Authorize({dispatch,data,loading,size,page}) {
  function editHandler(id,values) {
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
        return(text?<span style={{color:"#ff5a60"}}>禁用</span>:<span style={{color:"#00a510"}}>启用</span>)
      }
    },
    {
      title: '操作',
      key: 'operation',
      width:'20%',
      render:(record)=>{
        const linkProps={
          pathname:'accredit',
          query:{roleId:record.id},
          state:{record}
        };
        if(record.flag===9){
          return (<div className={styles['antd-operation-link']}>
            <span>禁用</span>
            <span>编辑</span>
            <Link to={linkProps} className={styles['text-green']}>绑定权限</Link>
          </div>)
        }

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
    pageSize:10,
    onChange:(page)=>{
      dispatch({
        type:"role/fetch",
        payload:{page}
      })
    }
  };
  return (
    <div>
      <Row className={styles.operation}>
        <Col span={12}>
        </Col>
        <Col span={12}>
          <div className={styles.btnGroup}>
            <RoleModel record={{}} onOk={createHandler} title="添加角色">
              <Button className={styles.add} >添加</Button>
            </RoleModel>
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
  const { data,size,page} = state.role;
  return {
    loading: state.loading.models.role,
    data,
    size,
    page
  };
}
export default connect(mapStateToProps)(Authorize);
