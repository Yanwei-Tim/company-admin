import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,Row,Col,Button} from 'antd';
import {Link,routerRedux} from 'dva/router';
import SearchComponent from '../components/Search/Search';
import FilterComponent from '../components/Filter/Filter';
import styles from './Company.less'
function Users({dispatch,list,size,loading,id,nodes,orgId,name,page}) {
    function onSearch(value) {
      if(orgId){
        dispatch({
          type: 'users/fetchByOrgan',
          payload: {...value,orgId} ,
        });
      }else {
        dispatch({
          type: 'users/fetch',
          payload: value ,
        });
      }
    }

    function deleteHandler(id) {
        dispatch({
            type:'users/remove',
            payload:id
        })
    }
    function pageChangeHandler(page) {
      if(orgId){
        dispatch({
          type: 'users/fetchByOrgan',
          payload: {orgId,page,size,} ,
        });
      }else {
        dispatch({
          type: 'users/fetch',
          payload: {page,size,name}
        });
      }
    }

   function addLink() {
      dispatch(routerRedux.push({
      pathname:'users/append'
     }))
   }

    const columns = [
        {
            title: '工号',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '操作',
            key: 'operation',
            width:'20%',
            render:(record)=>{
                const linkProps={
                    pathname:'/accredit/users',
                    query:{memberId:record.id},
                    state:{record}
                }
              const editProps={
                pathname:'/users/edit',
                query:{organizationId:record.organizationId},
                state:{record}
              }
              if(record.code==="ADMIN"){
                return (<div className={styles['antd-operation-link']}>
                  <span>编辑</span>
                  <span>删除</span>
                  <span>绑定角色</span>
                </div>)
              }
                return (<div className={styles['antd-operation-link']}>
                    <Link to={editProps} className={styles['edit-text']}>编辑</Link>
                    <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
                     <a href="javascript:void(0)">删除</a>
                     </Popconfirm>
                    <Link to={linkProps} className={styles['text-green']}>绑定角色</Link>
                </div>)
            }
        }
    ];
    const pagination={
        total:list.count,
        showTotal:(total)=> `共 ${total} 条数据`,
        showSizeChanger:true,
        pageSize:size,
        onShowSizeChange:(current,size)=>{
            dispatch({
                type: 'users/fetch',
                payload: {size,page},
            });
        },
        onChange:pageChangeHandler
    };

  function optionChange(id) {
    if(id){
      dispatch({
        type: 'users/fetchByOrgan',
        payload: {orgId:id}
      });
    }else {
      dispatch({
        type: 'users/fetch',
        payload: {}
      });
    }
  }
  return (
      <div>
        <SearchComponent placeholder="员工姓名" onSearch={onSearch}/>
        <FilterComponent nodes={nodes} onChange={optionChange} defaultValue={orgId}  placeholder="组织机构" style={{width:250}}/>
        <Row className={styles.operation}>
          <Col span={12}>
            <h4>员工管理</h4>
          </Col>
          <Col span={12}>
            <div className={styles.btnGroup}>
              <Button className={styles.add} onClick={addLink}>添加</Button>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={list.data}
          rowKey={record => record.id}
          pagination={pagination}
          loading={loading}
        />
      </div>
  );
}
function  mapStateToProps(state) {
    const { list, total, page,size,orgId,name } = state.users;
    const {nodes} =state.organization;
    return {
        loading: state.loading.models.users,
        name,
        nodes,
        list,
        total,
        page,
        size,
        orgId,
    };
}
export default connect(mapStateToProps)(Users);
