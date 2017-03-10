import React from 'react';
import { connect } from 'dva';
import {message,Row,Col} from 'antd'
import CommunityComponent from '../components/Community/Community'
import TreeComponent from '../components/Community/Tree'
function Community({dispatch,location,company,nodes,orgId,organ,loading}) {
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
              payload: {orgId:eventKey}
          });
      }else {
          dispatch({
              type:"organization/fetchOnly",
              payload:{eid:eventKey}
          });
      }
  }
  function selectHandler({node}) {
      const {eventKey,eid,title,isOrgan}=node.props;
      if(isOrgan){
          dispatch({
              type:"community/organ",
              payload:{
                  organ:{
                    id:eventKey,
                    eid,
                    title
                  }
              }
          });
      }
  }
  return (
      <Row>
        <Col span={6}>
          <TreeComponent rootData={company} nodesData={nodes} loadData={loadData} selectHandler={selectHandler} orgId={orgId}/>
        </Col>
        <Col span={18}>
          <CommunityComponent onOk={createHandler} record={{}} organ={organ} loading={false}/>
        </Col>
      </Row>

  );
}

function mapStateToProps(state) {
    const {orgId,organ}=state.community;
    const {data,page}=state.company;
    const {nodes} =state.organization;
    return {
        loading: state.loading.models.community,
        company:data,
        page,
        nodes,
        orgId,
        organ

    };
}

export default connect(mapStateToProps)(Community);
