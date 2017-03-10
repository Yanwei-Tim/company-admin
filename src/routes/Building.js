import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,Row,Col} from 'antd';
import { routerRedux } from 'dva/router';
import SearchComponent from '../components/Building/Search';
import BuildingModel from '../components/Building/BuildingModel';

import styles from './Company.less';


function App({dispatch,data,loading,page,size,id,location}) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/building',
      query: { page,size,id },
    }));
  }
  function search(values) {
    dispatch(routerRedux.push({
      pathname: '/building',
      query: {...values,id} ,
    }));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'building/remove',
      payload: id ,
    });
  }
  function editHandler(bid,values) {
    dispatch({
      type: 'building/patch',
      payload:Object.assign({},{communityId:id},{ bid, ...values })
    });
  }
  const columns = [
    {
      title:"编号",
      dataIndex:"code",
      key:"code"
    },
    {
      title: '楼宇名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'operation',
      width:'16%',
      render:(record)=>{
        const linkProps={
          pathname:'/room',
          query:{buildingId:record.id},
          state:{record}
        };
        return (<div className={styles['antd-operation-link']}>
          <Link to={linkProps} className={styles['text-green']}>查看房间</Link>
          <BuildingModel record={record} onOk={editHandler.bind(null, record.id)}>
            <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
          </BuildingModel>
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
        pathname: '/building',
        query: { page:current,size:pageSize,id },
      }));
    },
    onChange:pageChangeHandler
  };
  function onPageChange(pageNo) {
    dispatch({
      type:'building/fetchCommunity',
      payload:{pageNo,page,size,id}
    })
  }
  function onSearch(name) {
    dispatch({
      type:'building/fetchCommunity',
      payload:{name,page,size,id}
    })
  }
  const treeProps={
    defaultExpandAll:true,
    showLine:true,
    defaultSelectedKeys:[id],
    onSelect:(id,node)=>{
      dispatch(routerRedux.push({
        pathname: '/building',
        query: { page,size,id},
      }));
    }
  }
  return (
    <div>
      <Row>
        <Col span="0">
{/*          <TreeComponent treeProps={treeProps} treeData={community} onPageChange={onPageChange} onSearch={onSearch}/>*/}
        </Col>
        <Col span="24">
          <SearchComponent onSearch={search}/>
          <Table
            columns={columns}
            dataSource={data.data}
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
  const { data,page,size,status,id} = state.building;
  return {
    loading: state.loading.models.building,
    data,
    page,
    size,
    status,
    id
  };
}
export default connect(mapStateToProps)(App);
