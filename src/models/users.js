import * as Service from '../services/users'
export default {
  namespace: 'users',
  state: {
    list:{},
    size:10,
    record:{}
  },
  reducers: {
    save(state,{payload:{list,orgId,name,page,size}}){
      return {...state,list,orgId,name,page,size}
    },
     record(state,{payload:{record}}){
          return {...state,record};
     }
  },
  effects: {
    *fetch({payload:{page=1,size=10,name}},{call,put}){
      const list=yield call(Service.fetch,{name,page,size});
      yield put({ type: 'save', payload: { list,name,page,size} });
    },
     *fetchByOrgan({payload:{orgId,page=1,size=10,name}},{call,put,select}){
        const list=yield call(Service.fetch_by_organ,{orgId,page,size,name});
        yield put({ type: 'save', payload: { list,orgId,page,size,name}});
    },
    *fetchForEdit({payload:{organizationId}},{call,put,select}){
      yield put({ type: 'organization/fetchOnly',payload:{}});
      yield put({ type: 'utils/getOrganParents', payload: { organizationId}});
    },
    *remove({payload:id},{call,put,select}){
        yield call(Service.remove,id);
        yield put({type:'reload'});
     },
    *patch({payload:values},{call,put,select}){
        yield call(Service.patch,values);
        yield put({type:'reload'});
     },
    *create({payload:values},{call,put}){
        yield call(Service.create,values);
        yield put({type:'reload'});
    },
    *reload(action,{put,select}){
        const page=yield select(state=>state.users.page);
        const size=yield select(state=>state.users.size);
        yield put({type:'fetch',payload:{size,page}});
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/users'||pathname==='/users/append'){
           dispatch({type:'fetch',payload:query});
           dispatch({type:'organization/fetchOnly',payload:query});
        }
        if(pathname==='/users/edit'){
          dispatch({type:'fetchForEdit',payload:query});

        }
      })
    }
  },
}
