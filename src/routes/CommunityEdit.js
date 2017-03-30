import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CommunityComponent from '../components/Community/Community'
function Community({dispatch,location,nodes,parents}) {
  function editHandler(values) {
    dispatch({
      type: 'community/patch',
      payload: values ,
    });
    dispatch(routerRedux.push({
      pathname:'/community'
    }))
  }
  return (
    <div>
      <CommunityComponent onOk={editHandler}  loading={false} nodes={nodes} record={location.state.record}  parents={parents}/>
    </div>
  );
}
function mapStateToProps(state) {
  const {orgId,organ}=state.community;
  const {data,page}=state.company;
  const {nodes} =state.organization;
  const {parents}=state.utils;
  return {
    loading: state.loading.models.community,
    company:data,
    page,
    nodes,
    orgId,
    organ,
    parents

  };
}
export default connect(mapStateToProps)(Community);
