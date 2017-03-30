import * as Service from '../services/company';
import {getSession} from '../utils/index'
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
      return {...state,page,...data,size,eid,loading};
    },
    exec(state,{payload:{status}}){
      return {...state,status};
    }
  },
  effects: {
    *fetch({payload:{id}},{call,put}){
      let data= yield call(Service.fetch);
      yield put({ type: 'save', payload: {data}});
    },
    *remove({payload:id},{call,put}){
       var data= yield call(Service.remove,id);
       yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
        var data=yield call(Service.patch,values);
        yield put({type:'reload',payload:{eid:values.eid}});
    },
    *patchCompanyInfo({payload:values},{call,put}){
      var data=yield call(Service.patchCompanyInfo,values);
      yield put({type:'save',payload:{data}});
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
          dispatch({type:'fetch',payload:query});
        }
      })

    }
  },
}
