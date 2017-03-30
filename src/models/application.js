import * as Service from '../services/application';
import {getEidToken} from '../utils/index'
export default {
  namespace: 'application',
  state: {
    data:{
      data:[]
    },
    size:10000
  },
  reducers: {
    save(state,{payload:{data,page,size,organizationId,list,data_key_1,community_list,nav_list}}){
      return {...state,page,data,size,organizationId,list,data_key_1,community_list,nav_list};
    },
  },
  effects: {
    *fetch({payload:{page=1,size=10000,name='',key=0}},{call,put}){
      var data= yield call(Service.fetch,{page,size,key:0})||{};
      var data_key_1= yield call(Service.fetch,{page,size,key:1})||{};
      yield put({ type: 'save', payload: {data,page:parseInt(page),size:parseInt(size),data_key_1} });
    },
    *fetch_by_eid({payload:{id}},{call,put}){
      var list= yield call(Service.fetch_by_eid,{id,eid:getEidToken()});
      yield put({ type: 'save', payload: {list} });
    },
    *fetch_by_organ({payload:{organizationId,id,page=1,size=10}},{call,put,select}){
      var community_list= yield call(Service.fetch_by_organ,{id,organizationId,page,size});
      const list=yield select(state=>state.application.list);
      yield put({ type: 'save', payload: {community_list,organizationId,list} });
    },
    *fetchAll({payload:{organizationId,id,page=1,size=10}},{call,put,select}){
      var community_list= yield call(Service.fetch_by_organ,{id,organizationId,page,size});
      var list= yield call(Service.fetch_by_eid,{id,eid:getEidToken()});
      yield put({ type: 'save', payload: {community_list,organizationId,list} });
    },

    *create_by_company({payload:id},{call,put}){
      var data=yield call(Service.companyCreate,id);
    },
    *create_by_community({payload:values},{call,put}){
      var data=yield call(Service.communityCreate,values);
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
          dispatch({type:'fetch',payload:{key:0,...query}});
        }
        if(pathname==='/application/community'){
          dispatch({type:'organization/fetchOnly',payload:query});
          dispatch({type:'fetch_by_eid',payload:query});
        }
      });
    }
  }
}
