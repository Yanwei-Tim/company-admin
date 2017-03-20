import * as Service from '../services/organization'
import _ from 'underscore';
export default {
  namespace: 'organization',
  state: {
    data:[],
    nodes:{},
    list:[],
    company:{
      data:[]
    }
  },
  reducers: {
    save(state,{payload:{nodes,company,eid,list,title}}){
      if(nodes){
        return {...state,eid,nodes,...{company,list,title}};
      }
      return {...state,eid,...{company,list,title}};
    }
  },
  effects: {
    *fetchOnly({payload:{eid,title}},{call,put}){
      let res= yield call(Service.fetch,{eid});
      let nodes=res.data||[];
      yield put({ type: 'save', payload: {nodes,title,eid}});
    },
    *fetch({payload:{eid,title,name}},{call,put,select}){
      let res= yield call(Service.fetch,{eid});
      let nodes=res.data||[];
      let list_res=yield call(Service.fetch,{eid,...{tree:false}});
      let list=list_res.data||[];
      yield put({ type: 'save', payload: {nodes,list,title,eid}});
    },
    *fetchAll({payload:{id,tree=false}},{call,put,select}){
      let res= yield call(Service.fetchChildren,{id,tree});
      let list=res.data||[];
      const company=yield select(state=>state.organization.company);
      const nodes=yield select(state=>state.organization.nodes);
      const eid=yield select(state=>state.organization.eid);
      const title=yield select(state=>state.organization.title);
      yield put({ type: 'save', payload: {nodes,company,list,eid,title}});
    },
    *remove({payload:{id,eid,parentId}},{call,put}){
      let data= yield call(Service.remove,id);
      yield put({type:'reload',payload:{eid}});
      yield put({type:'fetchAll',payload:{id:parentId}})
    },
    *patch({payload:values},{call,put}){
      let data=yield call(Service.patch,values);
        yield put({type:'reload',payload:{eid:values.eid}});
      yield put({type:'fetchAll',payload:{id:values.id}})
    },
    *create({payload:{values}},{call,put}){
      let data=yield call(Service.create,values);
      yield put({type:'fetchAll',payload:{id:values.parentId}})
    },
    *detail({payload:{id}},{call,put}){
      let data= yield call(Service.detail,{id});
      yield put({ type: 'save', payload: {data,id} });
    },
    *reload({payload:{eid}},{put,select}){
      const page=yield select(state=>state.organization.page);
      const size=yield select(state=>state.organization.size);
      yield put({type:'fetch',payload:{page,size,eid}});
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/organization'){
          if(query.eid){
            dispatch({type:'fetch',payload:query});
          }
          dispatch({type:'company/fetch',payload:query})
        }
      })
    }
  },
}
