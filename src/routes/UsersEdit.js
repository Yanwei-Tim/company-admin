import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import UsersComponent from '../components/Users/Users'
function Users({dispatch,loading,nodes,parents,location}) {

  function createHandler(values) {
    dispatch({
      type: 'users/patch',
      payload: values,
    });
    dispatch(routerRedux.push({
      pathname:"users"
    }))
  }
  return (
    <div>
      <UsersComponent onOk={createHandler} loading={loading} nodes={nodes} parents={parents} record={location.state.record}/>
    </div>
  );
}
function  mapStateToProps(state) {
  const {nodes} =state.organization;
  const {parents} =state.utils;
  return {
    loading: state.loading.models.users,
    parents,
    nodes,
  };
}
export default connect(mapStateToProps)(Users);
