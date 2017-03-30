import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import UsersComponent from '../components/Users/Users'
function Users({dispatch,loading,nodes}) {

    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        });
        dispatch(routerRedux.push({
          pathname:"users"
        }))
    }
    return (
        <div>
          <UsersComponent onOk={createHandler} loading={loading} nodes={nodes} record={{}}/>
        </div>
    );
}
function  mapStateToProps(state) {
    const {nodes} =state.organization;
    return {
        loading: state.loading.models.users,
        nodes,
    };
}
export default connect(mapStateToProps)(Users);
