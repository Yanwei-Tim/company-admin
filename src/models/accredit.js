import * as Service from '../services/accredit'
export default {
  namespace: 'accredit',
  state: {
    accredit:[]
  },
  reducers: {
    save(state,{payload:{accredit,roleId,eid,communityId,memberId}}){
      return {...state,accredit,roleId,eid,communityId,memberId};
    }
  },
  effects: {
    *fetch({payload:{roleId,eid,memberId}},{call,put}){
      var res= yield call(Service.fetch,roleId);
      const accredit=res.data;
      yield put({ type: 'save', payload: {accredit,roleId,eid,memberId}});
    },
    *fetch_role_by_eid({payload:{eid}},{call,put}){
      var res= yield call(Service.fetch_role_by_eid,eid);
      const accredit=res.data;
      yield put({ type: 'save', payload: {accredit,eid}});
    },
    *fetch_role_by_communityId({payload:{communityId}},{call,put}){
      var res= yield call(Service.fetch_role_by_communityId,communityId);
      const accredit=res.data;
      yield put({ type: 'save', payload: {accredit,communityId}});
    },
      *fetch_role_by_memberId({payload:{memberId}},{call,put}){
          var res= yield call(Service.fetch_role_by_memberId,memberId);
          const accredit=res.data||[];
          yield put({ type: 'save', payload: {accredit,memberId}});
      },
    *patch({payload:values},{call,put,select}){
      var data=yield call(Service.binding,values);
      var roleId=yield select(state=>state.accredit.roleId);
      yield put({type:'reload',payload:{roleId}});
    },
    *patchCompany({payload:values},{call,put}){
      var data=yield call(Service.companyBinding,values);
      yield put({type:'fetch_role_by_eid',payload:{eid:values.eid}});
    },
    *patchCommunity({payload:values},{call,put}){
      var data=yield call(Service.communityBinding,values);
      yield put({type:'fetch_role_by_communityId',payload:{communityId:values.communityId}});
    },
      *patchUser({payload:values},{call,put}){
          var data=yield call(Service.userBinding,values);
          yield put({type:'fetch_role_by_memberId',payload:{memberId:values.memberId}});
      },
    *reload(action,{put,select}){
      yield put({type:'fetch',payload:action.payload});
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/accredit'){
          dispatch({type:'authorize/fetch',payload:query});
          dispatch({type:'fetch',payload:query});
        }
        if(pathname==='/accredit/company'){
          dispatch({type:'fetch_role_by_eid',payload:query});
          dispatch({type:'role/fetch',payload:query});
        }
        if(pathname==='/accredit/community'){
          dispatch({type:'fetch_role_by_communityId',payload:query});
          dispatch({type:'role/fetch',payload:query});
        }
          if(pathname==='/accredit/users'){
              dispatch({type:'role/fetch',payload:query});
              dispatch({type:'fetch_role_by_memberId',payload:query});

          }
      })
    }
  },
}
