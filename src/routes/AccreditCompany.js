import React from 'react';
import { connect } from 'dva';
import BingdingComponent from '../components/Accredit/Bingding'
function AccreditCompany({dispatch,roles,loading,eid,accredit,location}) {
  function submitHandler(values=[]) {
    let roleList=[];
    values.map((key)=>{
      var obj={
        roleId:key
      };
      roleList.push(obj);
    });
    dispatch({
      type:'accredit/patchCompany',
      payload:Object.assign({},{eid},{roleList})
    })
  }
  let targetKeys=[];
  accredit.map((key)=>{
    targetKeys.push(key.id);
  });
  const {code,company}=location.state.record;
  return (
    <div>
      <h4>企业名称：{company}</h4>
      <h5>企业编号：{code}</h5>
      <br/>
      <BingdingComponent dataSource={roles}  onOk={submitHandler} loading={loading}  targetKeys={targetKeys}/>
    </div>
  );
}

function mapStateToProps(state) {
  const {data}=state.role;
  const {eid,accredit}=state.accredit;
  return {
    loading:state.loading.models.accredit,
    roles:data,
    accredit,
    eid
  };
}
export default connect(mapStateToProps)(AccreditCompany);
