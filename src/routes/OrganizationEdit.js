import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import OrganizationComponent from '../components/Organization/Organization';
import styles from './OrganizationEdit.css';

function OrganizationEdit({dispatch,location,nodes,loading,parents}) {
  function editHandle(values) {
    dispatch({
      type:'organization/patch',
      payload:values
    })
    dispatch(routerRedux.push({
      pathname:'organization',
    }))
  }
  return (
    <div className={styles.normal}>
      <OrganizationComponent record={location.state.record} onOk={editHandle} loading={loading} nodes={nodes} parents={parents}/>
    </div>
  );
}
function mapStateToProps(state) {
  const {nodes} =state.organization;
  const {parents} =state.utils;
  return {
    loading:state.loading.models.organization,
    nodes,
    parents
  };
}
export default connect(mapStateToProps)(OrganizationEdit);
