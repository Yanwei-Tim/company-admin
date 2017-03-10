import * as Service from '../services/room'
export default {
  namespace: 'room',
  state: {
    data:{}
  },
  reducers: {
    save(state,{payload:{data,page,size,number,buildingId,houseNumber,ownerName}}){
      return {...state,data,page,size,number,buildingId,houseNumber,ownerName};
    },
    size(state,{payload:{page,size}}){
      return {...state,page,size};
    }
  },
  effects: {
    *fetch({payload:{page=1,size=20,number,buildingId,houseNumber,ownerName}},{call,put}){
      var data= yield call(Service.fetch,{page,size,number,buildingId,houseNumber,ownerName});
      yield put({ type: 'save', payload: {data,page,size,number,buildingId,houseNumber,ownerName}});
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
      const number=yield select(state=>state.room.number);
      const buildingId=yield select(state=>state.room.buildingId);
      const houseNumber=yield select(state=>state.room.houseNumber);
      const ownerName=yield select(state=>state.room.ownerName);
      const page=yield select(state=>state.room.page);
      const size=yield select(state=>state.room.size);
      yield put({type:'fetch',payload:{number,buildingId,houseNumber,ownerName,page,size}})
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
