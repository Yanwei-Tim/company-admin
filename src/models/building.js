import * as Service from '../services/building'
import {fetch} from '../services/community'
export default {
  namespace: 'building',
  state: {
    data:{},
    size:20,
    community:{
      data:[]
    }
  },
  reducers: {
    save(state,{payload:{data,id,page,size}}){
      return {...state,page,data,size,id};
    }
  },
  effects: {
    *fetch({payload:{id,page=1,size=20,name='',code=''}},{call,put}){
      let data= yield call(Service.fetch,{page,size,name,id,code});
      yield put({ type: 'save', payload: {data,id,page:parseInt(page),size:parseInt(size)} });
    },
    *fetchCommunity({payload:{pageNo=1,name,page,size,id}},{call,put,select}){
      let community=yield call(fetch,{page:pageNo,name});
      const data={
         data:yield select(state=>state.building.data)
      };
      yield put({ type: 'save', payload: {data,community,page,size,id}});
    },
    *remove({payload:id},{call,put,select}){
      let data= yield call(Service.remove,id);
      const bid=yield select(state=>state.building.id);
      yield put({type:'reload',payload:{id:bid}});
    },
    *patch({payload:values},{call,put}){
      let data=yield call(Service.patch,values);
      const id=values.communityId;
      yield put({type:'reload',payload:{id}});
    },
    *create({payload:values},{call,put}){
      let data=yield call(Service.create,values);
    },
    *reload({payload:{id}},{put,select}){
      const page=yield select(state=>state.building.page);
      const size=yield select(state=>state.building.size);
      yield put({type:'fetch',payload:{page,size,id}});
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/building'){
          dispatch({type:'fetch',payload:query});
        }
        if(pathname==='/building/append'){
          dispatch({type:'fetchCommunity',payload:query});
        }
      })
    }
  },
}
