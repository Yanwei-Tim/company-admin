import React from 'react';
import { connect } from 'dva';
import BingdingComponent from '../components/Accredit/Bingding'

function Accredit({dispatch,authorize,location,loading,roleId,accredit}) {
  let targetKeys=[];
  accredit.map((key)=>{
    targetKeys.push(key.permissionId);
  });
  function submitHandler(values) {
    let permissionList=[];
    values.map((key)=>{
      var obj={
        permissionId:key
      };
      permissionList.push(obj);
    });
    dispatch({
      type:'accredit/patch',
      payload:Object.assign({},{roleId},{permissionList})
    })
  }
  const {code,name}=location.state.record;
  return (
    <div>
      <p style={{color:"#8d8d8d"}}>角色编号：{code}</p>
      <p style={{color:"#8d8d8d"}}>角色名称：{name}</p>
      <br/>
      <BingdingComponent dataSource={authorize} targetKeys={targetKeys}  onOk={submitHandler} loading={loading} />
    </div>
  );
}
function mapStateToProps(state) {
  const {data,page} =state.authorize;
  const {accredit,roleId} =state.accredit;
  return {
    loading:state.loading.models.accredit,
    authorize:data,
    accredit,
    roleId
  };
}
export default connect(mapStateToProps)(Accredit);
