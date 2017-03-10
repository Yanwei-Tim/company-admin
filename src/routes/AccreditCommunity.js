import React from 'react';
import { connect } from 'dva';
import BingdingComponent from '../components/Accredit/Bingding'
function AccreditCommunity({dispatch,roles,loading,communityId,accredit,location}) {
  function submitHandler(values=[]) {
    let roleList=[];
    values.map((key)=>{
      var obj={
        roleId:key
      };
      roleList.push(obj);
    });
    dispatch({
      type:'accredit/patchCommunity',
      payload:Object.assign({},{communityId},{roleList})
    })
  }
  let targetKeys=[];
  accredit.map((key)=>{
    targetKeys.push(key.id);
  });
  const {name,code} =location.state.record;
  return (
    <div>
      <h4>社区名称：{name}</h4>
      <h5>社区编号：{code}</h5>
      <br/>
      <BingdingComponent dataSource={roles}  onOk={submitHandler} loading={loading}  targetKeys={targetKeys}/>
    </div>
  );
}

function mapStateToProps(state) {
  const {data}=state.role;
  const {communityId,accredit}=state.accredit;
  return {
    loading:state.loading.models.accredit,
    roles:data,
    accredit,
    communityId
  };
}
export default connect(mapStateToProps)(AccreditCommunity);
