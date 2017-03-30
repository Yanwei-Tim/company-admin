import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,Button,Row,Col} from 'antd';
import { Link,routerRedux } from 'dva/router';
import FilterComponent from '../components/Filter/Filter';
import OrganAppend from '../components/Organization/OrganAppend';
import {organFlag} from '../utils/index'
import styles from './Company.less';
function Organ({dispatch,loading,page,orgId,nodes,list,size,title}) {
  function deleteHandler(record) {
    dispatch({
      type: 'organization/remove',
      payload: {id:record.id,parentId:record.parentId}
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'organization/create',
      payload: {values} ,
    });
  }
  function optionChange(id) {
    if(id){
      dispatch({
        type: 'organization/fetchAll',
        payload: {id}
      });
    }else {
      dispatch({
        type: 'organization/fetch',
        payload: {}
      });
    }
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
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width:'15%',
      render:(text,record)=>{
        const linkProps={
           pathname:"/organization/edit",
           query:{organizationId:record.id},
           state:{record,nodes}
        }
        return (<div>
          {
            record.parentId==="-255"?(""):(<div className={styles['antd-operation-link']}>
              <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record)}>
                <a href="javascript:void(0)">删除</a>
              </Popconfirm>
              <Link to={linkProps} className={styles['edit-text']}>
                编辑
              </Link>
            </div>)
          }

        </div>)
      }
     }
  ];
  const pagination={
    total:list&&list.length,
    showTotal:(total)=> `共 ${total} 条记录`,
    pageSize:size,
  };
  return (
    <div>
      <FilterComponent nodes={nodes} onChange={optionChange} defaultValue={orgId}  placeholder="组织机构" style={{width:250}}/>
      <Row className={styles.operation}>
        <Col span={12}>
          <h4>社区管理</h4>
        </Col>
        <Col span={12}>
          <div className={styles.btnGroup}>
            <OrganAppend record={{nodeFlag:0}} onOk={createHandler} title="新增机构"  nodes={nodes} >
              <Button className={styles.add}>添加</Button>
            </OrganAppend>
          </div>
        </Col>
      </Row>
        <Table
          columns={columns}
          dataSource={list}
          pagination={pagination}
          loading={loading}
          rowKey={record => record.id}
        />
    </div>
  );
}
function mapStateToProps(state) {
  const { page,nodes,list,size,title} = state.organization;
  return {
    loading: state.loading.models.organization,
    page,
    list,
    nodes,
    size,
    title
  };
}
export default connect(mapStateToProps)(Organ);
