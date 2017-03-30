import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CommunityComponent from '../components/Community/Community'
function Community({dispatch,nodes,loading}) {
  function createHandler(values) {
    dispatch({
      type: 'community/create',
      payload: values ,
    });
    dispatch(routerRedux.push({
      pathname:"/community"
    }))
  }
  return (
      <div>
        <CommunityComponent onOk={createHandler} record={{}}  loading={false} nodes={nodes}/>
      </div>

  );
}
function mapStateToProps(state) {
    const {nodes} =state.organization;
    return {
        loading: state.loading.models.community,
        nodes,


    };
}

export default connect(mapStateToProps)(Community);
