import React from 'react';
import { connect } from 'dva';
import ConfComponent from '../components/Application/Conf'

function ApplicationAppend({dispatch}) {
  function createHandler(values) {
    dispatch({
      type: 'application/create',
      payload: values ,
    });
  }
  return (
    <div>
      <ConfComponent record={{}} onOk={createHandler}/>
    </div>
  );
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(ApplicationAppend);
