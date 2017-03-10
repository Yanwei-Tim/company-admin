import React from 'react';
import { connect } from 'dva';
import ConfComponent from '../components/Application/Conf'

function ApplicationAppend({dispatch,location,loading,conf}) {
  function createHandler(values) {
    dispatch({
      type: 'application/patchConf',
      payload: values ,
    });
  }
  const record=Object.assign({},location.state&&location.state.record,conf.data);
  return (
    <div>
      <ConfComponent record={record} onOk={createHandler} loading={loading}/>
    </div>
  );
}
function mapStateToProps(state) {
  const {conf}=state.application;
  return {
    loading:state.loading.models.application,
    conf
  };
}
export default connect(mapStateToProps)(ApplicationAppend);
