import * as Service from '../services/company'
export default {
  namespace: 'company',
  state: {
    data:{},
    size:20,
    status:{},
    loading:false
  },
  reducers: {
    save(state,{payload:{data,page,size,eid,loading}}){
      return {...state,page,data,size,eid,loading};
    },
    exec(state,{payload:{status}}){
      return {...state,status};
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    hiddenLoading (state) {
      return { ...state, loading: false }
    }
  },
  effects: {
    *fetch({payload:{page=1,size=20,name}},{call,put}){
      yield put({ type: 'showLoading' });
      var data= yield call(Service.fetch,{page,size,name});
      yield put({ type: 'save', payload: {data,page:parseInt(page),size:parseInt(size)}});
      yield put({ type: 'hiddenLoading' });
    },
    *remove({payload:id},{call,put}){
       var data= yield call(Service.remove,id);
       yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
        var data=yield call(Service.patch,values);
        yield put({type:'reload',payload:{eid:values.eid}});
    },
    *execute({payload:values},{call,put}){
      var data=yield call(Service.execute,values);
    },
    *execResult({payload:id},{call,put}){
      var status=yield call(Service.execResult,id);
      yield put({type:'exec',payload:{status}})

    },
    *create({payload:values},{call,put}){
     var data=yield call(Service.create,values);
      yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.company.page);
      const size=yield select(state=>state.company.size);
      yield put({type:'fetch',payload:{page,size}})
    }

  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/company'){
          dispatch({type:'fetch',payload:query})
        }
      })

    }
  },
}
