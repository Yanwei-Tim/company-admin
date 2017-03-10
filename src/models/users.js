import * as Service from '../services/users'
export default {
  namespace: 'users',
  state: {
    list:{},
    size:20,
    record:{}
  },
  reducers: {
    save(state,{payload:{list,eid,orgId}}){
      return {...state,list,eid,orgId}
    },
    size(state,{payload:size}){
      return {...state,size};
    },
     record(state,{payload:{record}}){
          return {...state,record};
     },
  },
  effects: {
    *fetchByCompany({payload:{eid}},{call,put}){
        const list=yield call(Service.fetch_by_company,{eid});
        yield put({ type: 'save', payload: { list,eid} });
    },
      *fetchByOrgan({payload:{orgId}},{call,put,select}){
        const list=yield call(Service.fetch_by_organ,{orgId});
        const eid=yield select(state=>state.users.eid);
        yield put({ type: 'save', payload: { list,orgId,eid}});
    },
    *remove({payload:id},{call,put,select}){
        yield call(Service.remove,id);
        yield put({type:'reload'});
     },
    *patch({payload:values},{call,put,select}){
        yield call(Service.patch,values);
        yield put({type:'reload'})
     },
    *create({payload:values},{call,put}){
        yield call(Service.create,values);
    },
    *reload(action,{put,select}){
        const orgId=yield select(state=>state.users.orgId);
        const eid=yield select(state=>state.users.eid);
        if(orgId){
            yield put({type:'fetchByOrgan',payload:{orgId}});
        }else {
            yield put({type:'fetchByCompany',payload:{eid}});
        }

    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/users'||pathname==='/users/append'){
            dispatch({type:'company/fetch',payload:query})
        }
      })
    }
  },
}
