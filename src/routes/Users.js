import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,Row,Col} from 'antd';
import {Link} from 'dva/router'
import TreeComponent from '../components/Users/Tree';
import UserModel from '../components/Users/UserModel'
import styles from './Company.less'
function Users({dispatch,list,size,loading,id,company,nodes,orgId}) {
    function deleteHandler(id) {
        dispatch({
            type:'users/remove',
            payload:id
        })
    }
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }));
    }
    function editHandler(record,values) {
        console.log(record)
        dispatch({
            type: 'users/patch',
            payload:Object.assign({},values,{id:record.id,organizationId:record.organizationId})
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        });
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
                return (<div className={styles['antd-operation-link']}>
                    <UserModel record={record} onOk={editHandler.bind(null, record)} title="编辑用户信息">
                        <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
                    </UserModel>
                    <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
                     <a href="javascript:void(0)">删除</a>
                     </Popconfirm>
                    <Link to={linkProps} className={styles['text-green']}>授权</Link>
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
                type: 'users/size',
                query: {size},
            });
        },
    };
    function loadData(node){
        const {eventKey,isOrgan,title}=node.props;
        if(isOrgan){
            dispatch({
                type: 'users/fetchByOrgan',
                payload: {orgId:eventKey}
            });
            dispatch({
                type: 'community/fetchByOrgan',
                payload: {orgId:eventKey}
            });
        }else {
            dispatch({
                type:"users/fetchByCompany",
                payload:{eid:eventKey}
            });
            dispatch({
                type:"organization/fetchOnly",
                payload:{eid:eventKey}
            });
        }
    }
    function selectHandler({node}) {
        loadData(node)
    }
    function onPageChange(page) {
        dispatch({
            type:"company/fetch",
            payload:{page}
        });
    }
  return (
      <div>
          <Row>
              <Col span="6">
                  <TreeComponent rootData={company} nodesData={nodes} loadData={loadData} selectHandler={selectHandler} orgId={orgId} onPageChange={onPageChange}/>
              </Col>
              <Col span="18">
                  <Table
                      columns={columns}
                      dataSource={list.data}
                      rowKey={record => record.id}
                      pagination={pagination}
                      loading={loading}
                  />
              </Col>
          </Row>
      </div>
  );
}

function  mapStateToProps(state) {
    const { list, total, page,size,eid,orgId } = state.users;
    const {data}=state.company;
    const {nodes} =state.organization;
    return {
        loading: state.loading.models.users,
        company:data,
        nodes,
        list,
        total,
        page,
        size,
        orgId
    };
}
export default connect(mapStateToProps)(Users);