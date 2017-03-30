import * as Service from '../services/room'
export default {
  namespace: 'room',
  state: {
    data:{}
  },
  reducers: {
    save(state,{payload:{data,page,size,buildingId}}){
      return {...state,data,page,size,buildingId};
    },
    size(state,{payload:{page,size}}){
      return {...state,page,size};
    }
  },
  effects: {
    *fetch({payload:{page=1,size=10,name,buildingId}},{call,put}){
      var data= yield call(Service.fetch,{page,size,buildingId,name});
      yield put({ type: 'save', payload: {data,page,size,buildingId}});
    },
    *remove({payload:id},{call,put}){
      var data= yield call(Service.remove,id);
      yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
      var data=yield call(Service.patch,values);
      yield put({type:'reload'});
    },
    *create({payload:values},{call,put}){
      var data=yield call(Service.create,values);
      yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      const buildingId=yield select(state=>state.room.buildingId);
      const page=yield select(state=>state.room.page);
      const size=yield select(state=>state.room.size);
      yield put({type:'fetch',payload:{buildingId,page,size}})
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/room'){
          dispatch({type:'fetch',payload:query})
        }
      })
    }
  },
}
