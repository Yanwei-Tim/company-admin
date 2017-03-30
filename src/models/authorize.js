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
    size(state,{payload:{page}}){
      return {...state,page};
    }
  },
  effects: {
    *fetch({payload:{}},{call,put}){
      let data= yield call(Service.fetch);
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
      yield put({type:'fetch'});
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
