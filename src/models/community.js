import * as Service from '../services/community';
import {getEidToken} from '../utils/index'
export default {
  namespace: 'community',
  state: {
    list:{},
    organ:{}
  },
  reducers: {
    save(state,{payload:{list={},page,size,eid,orgId,title,name}}){
      return {...state,page,list,size,eid,orgId,title,name};
    },
    size(state,{payload:size}){
      return {...state,size};
    },
      organ(state,{payload:{organ}}){
        return {...state,organ};
    }
  },
  effects: {
    *fetch({payload:{page=1,size=10,name=''}},{call,put}){
      let list= yield call(Service.fetch,{page,size,name});
      yield put({ type: 'save', payload: {list,page:parseInt(page),size:parseInt(size),name} });
    },
    *fetchChildrenByOrgan({payload:{page=1,size=10,name='',orgId,title}},{call,put,select}){
      let list= yield call(Service.fetchChildren,{page,size,name,orgId});
      yield put({ type: 'save', payload: {list,page:parseInt(page),size:parseInt(size),orgId,title} });
    },
    *fetchByOrgan({payload:{page=1,size=10,name='',orgId,title}},{call,put,select}){
      let list= yield call(Service.fetchAll,{page,size,name,orgId});
      yield put({ type: 'save', payload: {list,page:parseInt(page),size:parseInt(size),orgId,title} });
    },
    *fetchByCompany({payload:{page=1,size=10,name}},{call,put,select}){
      let list= yield call(Service.fetch_by_eid,{page,size,name,eid:getEidToken()});
      yield put({ type: 'save', payload: {list,page:parseInt(page),size:parseInt(size)}});
    },
    *fetchForEdit({payload:{organizationId}},{call,put,select}){
      yield put({ type: 'organization/fetchOnly', payload: {}});
      yield put({ type: 'utils/getOrganParents', payload: { organizationId}});
    },
    *remove({payload:{id}},{call,put,select}){
      let data= yield call(Service.remove,id);
      yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
      yield call(Service.patch,values);
    },
    *create({payload:values},{call,put}){
      yield call(Service.create,values);
      yield put({type:'reload'});
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.community.page);
      const size=yield select(state=>state.community.size);
      yield put({type:'fetchByCompany',payload:{page,size}})
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/community'){
          dispatch({type:'fetchByCompany',payload:query});
          dispatch({type:'organization/fetchOnly',payload:query});
        }
        if(pathname==='/community/append'){
          dispatch({type:'organization/fetchOnly',payload:query});
        }
        if(pathname==='/community/edit'){
          dispatch({type:'fetchForEdit',payload:query});
        }
      });
    }
  }
}
