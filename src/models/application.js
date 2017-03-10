import * as Service from '../services/application'
export default {
  namespace: 'application',
  state: {
    data:{
      data:[]
    },
    conf:{},
    size:20
  },
  reducers: {
    save(state,{payload:{data,page,size,conf}}){
      conf=conf||{};
      return {...state,page,data,size,conf};
    },
    responseStatus(state,{payload:{data}}){
      return {...state,data};
    }
  },
  effects: {
    *fetch({payload:{page=1,size=20,name='',status}},{call,put}){
      var data= yield call(Service.fetch,{page,size,name})||{};
      yield put({ type: 'save', payload: {data,page:parseInt(page),size:parseInt(size)} });
    },
    *fetchConf({payload:{id}},{call,put}){
      var conf= yield call(Service.fetchConf,id);
      yield put({ type: 'save', payload: {conf}});
    },
    *remove({payload:id},{call,put}){
      var data= yield call(Service.remove,id);
      yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
      var data=yield call(Service.patch,values);
      yield put({type:'reload'});
    },
    *patchConf({payload:values},{call,put}){
      var data=yield call(Service.patchConf,values);
      yield put({type:'responseStatus',payload:{data}});
    },
    *create({payload:values},{call,put}){
      var data=yield call(Service.create,values);
      yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.application.page);
      const size=yield select(state=>state.application.size);
      yield put({type:'fetch',payload:{page,size}})
    }
  },
  subscriptions: {
    setup({dispatch,history,params}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/application'){
          dispatch({type:'fetch',payload:query});
        }
        if(pathname==='/application/conf'){
          dispatch({type:'fetchConf',payload:query});
        }
      });
    }
  },
}
