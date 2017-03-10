import * as Service from '../services/community'
export default {
  namespace: 'community',
  state: {
    list:{},
    organ:{}
  },
  reducers: {
    save(state,{payload:{list={},page,size,eid,orgId,title}}){
      return {...state,page,list,size,eid,orgId,title};
    },
    size(state,{payload:size}){
      return {...state,size};
    },
      organ(state,{payload:{organ}}){
        return {...state,organ};
    }
  },
  effects: {
    *fetch({payload:{page=1,size=20,name=''}},{call,put}){
      let list= yield call(Service.fetch,{page,size,name});
      yield put({ type: 'save', payload: {list,page:parseInt(page),size:parseInt(size)} });
    },
    *fetchByOrgan({payload:{page=1,size=20,name='',orgId,title}},{call,put,select}){
      let list= yield call(Service.fetchAll,{page,size,name,orgId});
      const eid=yield select(state=>state.community.eid);
      yield put({ type: 'save', payload: {list,page:parseInt(page),size:parseInt(size),orgId,eid,title} });
    },
    *fetchByCompany({payload:{page=1,size=20,eid,title}},{call,put,select}){
      let list= yield call(Service.fetch_by_eid,{page,size,eid});
      const orgId=yield select(state=>state.community.orgId);
      yield put({ type: 'save', payload: {list,page:parseInt(page),size:parseInt(size),eid,orgId,title}});
    },
    *remove({payload:{id}},{call,put,select}){
      let data= yield call(Service.remove,id);
      yield put({type:'removeReload'});
    },
    *patch({payload:values},{call,put}){
      let data=yield call(Service.patch,values);
      yield put({type:'reload'});
    },
    *create({payload:values},{call,put}){
      let data=yield call(Service.create,values);
      yield put({type:'reload'})
    },
    *removeReload(action,{put,select}){
      const page=yield select(state=>state.community.page);
      const size=yield select(state=>state.community.size);
      const orgId=yield select(state=>state.community.orgId);
      const eid=yield select(state=>state.community.eid);
      const list=yield select(state=>state.community.list);
      if(orgId){
        yield put({type:'fetchByOrgan',payload:{page,size,orgId}})
      }
      yield put({type:'save',payload:{eid,orgId,list}})
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.community.page);
      const size=yield select(state=>state.community.size);
      yield put({type:'save',payload:{page,size}})
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/community'||pathname==='/community/append'||pathname==='/community/edit'){
          //dispatch({type:'fetch',payload:query});
          dispatch({type:'company/fetch',payload:query})
        }
        if(query.orgId){
            dispatch({type:'fetchByOrgan',payload:query});
        }
      });
    }
  }
}
