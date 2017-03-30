import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,Button,Row,Col} from 'antd';
import SearchComponent from '../components/Search/Search';
import FilterComponent from '../components/Filter/Filter';
import { routerRedux,Link } from 'dva/router';
import styles from './Company.less'
function Community({dispatch,list,loading,size,page,name,nodes,orgId,title}) {
  function onSearch(value) {
    if(orgId){
      dispatch({
        type: 'community/fetchByOrgan',
        payload: {...value,orgId} ,
      });
    }else {
      dispatch({
        type: 'community/fetchByCompany',
        payload: value ,
      });
    }

  }
  function deleteHandler(id) {
    dispatch({
      type: 'community/remove',
      payload: {id} ,
    });
  }
  function addLink() {
    dispatch(routerRedux.push({
      pathname:'community/append'
    }))
  }
  function  pageHandle(page) {
    if(orgId){
      dispatch({
        type: 'community/fetchByOrgan',
        payload: {orgId,page,size,} ,
      });
    }else {
      dispatch({
        type: 'community/fetchByCompany',
        payload: {page,size,name}
      });
    }
  }

  function optionChange(id) {
    if(id){
      dispatch({
        type: 'community/fetchByOrgan',
        payload: {orgId:id}
      });
    }else {
      dispatch({
        type: 'community/fetchByCompany',
        payload: {}
      });
    }

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
      width:180,
      render:(record)=>{
        const link={
          pathname:'/community/building',
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
            query:{id:record.id,organizationId:record.organizationId},
            state:{record:record}
        };
        return (<div className={styles['antd-operation-link']}>
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
    onChange:pageHandle,
    onShowSizeChange:(current,size)=>{
      if(orgId){
        dispatch({
          type: 'community/fetchByOrgan',
          payload: {orgId,page,size,} ,
        });
      }else {
        dispatch({
          type: 'community/fetch',
          payload: {page,size,name}
        });
      }
    },
  }
  return (
    <div>
      <SearchComponent placeholder="社区名称" onSearch={onSearch}/>
      <FilterComponent nodes={nodes} onChange={optionChange} defaultValue={orgId}  placeholder="组织机构" style={{width:250}}/>
      <Row className={styles.operation}>
        <Col span={12}>
          <h4>社区管理</h4>
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
function mapStateToProps(state) {
  const { list,size,eid,orgId,title,name} = state.community;
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
    title,
    name,
  };
}
export default connect(mapStateToProps)(Community);
