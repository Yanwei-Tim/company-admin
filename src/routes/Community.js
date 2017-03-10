import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,message,Button,Row,Col} from 'antd';
import TreeComponent from '../components/Community/Tree'
import { routerRedux,Link } from 'dva/router';
import styles from './Company.less'
function Community({dispatch,list,loading,size,company,nodes,orgId,title}) {
  function onSearch(value) {
    dispatch(routerRedux.push({
      pathname: '/community',
      query: value ,
    }));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'community/remove',
      payload: {id} ,
    });
  }
  function editHandler(id,values) {
    dispatch({
      type: 'community/patch',
      payload: { id, ...values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'community/create',
      payload: values ,
    });
  }
  function loadData(node){
    const {eventKey,isOrgan,title}=node.props;
    if(isOrgan){
      dispatch({
        type: 'community/fetchByOrgan',
        payload: {orgId:eventKey,title}
      });
    }else {
      dispatch({
        type:"organization/fetchOnly",
        payload:{eid:eventKey,title}
      });
    }
  }
  function selectHandler({node}) {
    loadData(node)
  }
  const columns = [
    {
       title:"编号",
       dataIndex:"code",
       key:"code"
    },
    {
      title: '社区名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '操作',
      key: 'operation',
      width:'20%',
      render:(record)=>{
        const link={
          pathname:'/building',
          query:{id:record.id},
          state:{community:record}
        };
        const linkProps={
          pathname:'accredit/community',
          query:{communityId:record.id},
          state:{record}
        };
        const editProps={
            pathname:'/community/edit',
            query:{id:record.id},
            state:{community:{...record,orgTitle:title}}
        };
        return (<div className={styles['antd-operation-link']}>
          <Link to={linkProps} className={styles['text-green']}>授权</Link>
          <Link to={link} className={styles['text-green']}>查看楼宇</Link>
          <Link to={editProps} className={styles['edit-text']}>编辑</Link>
         <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
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
        type: 'community/size',
        query: {size },
      });
    },
  }
  return (
    <div>
      <Row>
        <Col span="6">
           <TreeComponent rootData={company} nodesData={nodes} loadData={loadData} selectHandler={selectHandler} orgId={orgId}/>
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
function mapStateToProps(state) {
  const { list,size,eid,orgId,title} = state.community;
  const {data,page}=state.company;
  const {nodes} =state.organization;
  return {
    loading: state.loading.models.community,
    company:data,
    list,
    page,
    size,
    nodes,
    eid,
    orgId,
    title
  };
}
export default connect(mapStateToProps)(Community);
