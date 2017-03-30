import React from 'react';
import { connect } from 'dva';
import BingdingComponent from '../components/Accredit/Bingding'
function AccreditCommunity({dispatch,roles,loading,memberId,accredit,location}) {
    function submitHandler(values=[]) {
        let roleList=[];
        values.map((key)=>{
            var obj={
                roleId:key
            };
          roleList.push(obj);
        });
        dispatch({
            type:'accredit/patchUser',
            payload:Object.assign({},{memberId},{roleList})
        })
    }
    let targetKeys=[];
    accredit.map((key)=>{
        targetKeys.push(key.roleId);
    });
    const {name,code} =location.state.record;
    return (
        <div>
            <h4>名称：{name}</h4>
            <h5>工号：{code}</h5>
            <br/>
            <BingdingComponent dataSource={roles}  onOk={submitHandler} loading={loading}  targetKeys={targetKeys}/>
        </div>
    );
}
function mapStateToProps(state) {
    const {data}=state.role;
    const {memberId,accredit}=state.accredit;
    return {
        loading:state.loading.models.accredit,
        roles:data,
        accredit,
        memberId
    };
}
export default connect(mapStateToProps)(AccreditCommunity);
