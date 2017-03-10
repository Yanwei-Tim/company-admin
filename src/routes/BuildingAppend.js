import React from 'react';
import { connect } from 'dva';
import { Row,Col,Spin} from 'antd';
import {routerRedux} from 'dva/router';
import TreeComponent from '../components/Building/Tree';
import BuildingComponent from '../components/Building/Building';

function BuildingAppend({dispatch,loading,community,location,id,status}) {
  console.log(status,'append')
  function createHandler(values) {
      dispatch({
        type:'building/create',
        payload:values
      })
  }
  function onPageChange(pageNo) {
    dispatch({
      type:'building/fetchCommunity',
      payload:{pageNo,id}
    })
  }
  function onSearch(name) {
    dispatch({
      type:'building/fetchCommunity',
      payload:{name,id}
    })
  }
  const treeProps={
    defaultExpandAll:true,
    showLine:true,
    defaultSelectedKeys:[id],
    onSelect:(key,node)=>{
      dispatch(routerRedux.push({
        pathname:'building/append',
        query:{id:key[0],name:node.selectedNodes[0].props.title}
      }))
    }
  }
  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span="6">
            <TreeComponent treeProps={treeProps} treeData={community} onPageChange={onPageChange} onSearch={onSearch}/>
          </Col>
          <Col span="14">
            <BuildingComponent record={location.query} onOk={createHandler}/>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}
function mapStateToProps(state) {
  const {community,id,name,status} = state.building;
  return {
    loading: state.loading.models.building,
    community,
    id,
    name,
    status
  };
}

export default connect(mapStateToProps)(BuildingAppend);
