import * as Service from '../services/authorize'
export default {
  namespace: 'authorize',
  state: {
    data:{}
  },
  reducers: {
    save(state,{payload:{data}}){
      return {...state,data};
    },
    size(state,{payload:{size,page}}){
      return {...state,size,page};
    }
  },
  effects: {
    *fetch({payload:{name}},{call,put}){
      let data= yield call(Service.fetch,{name});
      yield put({ type: 'save', payload: {data} });
    },
    *remove({payload:id},{call,put}){
      yield call(Service.remove,id);
      yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
      yield call(Service.patch,values);
      yield put({type:'reload'});
    },
    *create({payload:values},{call,put}){
      yield call(Service.create,values);
      yield put({type:'reload'});
    },
    *reload(action,{put,select}){
      const name=yield select(state=>state.authorize.name)
      yield put({type:'fetch',payload:{name}});
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/authorize'){
          dispatch({type:'fetch',payload:query})
        }
      })
    }
  },
}
