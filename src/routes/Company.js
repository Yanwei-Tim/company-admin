import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,message,Button,Spin} from 'antd';
import { routerRedux,Link } from 'dva/router';
import SearchComponent from '../components/Company/Search';
import CompanyModel from '../components/Company/CompanyModel';
import UploadModel from '../components/Company/UploadModel';
import styles from './Company.less'
function Company({dispatch,data,loading,page,size,status}) {


  function editHandler(id,values) {
    dispatch({
      type: 'company/patch',
      payload: { id, ...values },
    });
  }

  return (
    <Spin spinning={loading}>
        wer

    </Spin>
  );
}
function mapStateToProps(state) {
  const { data} = state.company;
  return {
    loading:state.loading.models.company,
    data,
  };
}
export default connect(mapStateToProps)(Company);

