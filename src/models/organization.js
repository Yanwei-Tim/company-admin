import * as Service from '../services/organization'
import _ from 'underscore';
export default {
  namespace: 'organization',
  state: {
    data:[],
    nodes:{},
    list:[]
  },
  reducers: {
    save(state,{payload:{nodes,company,list}}){
      if(nodes){
        return {...state,nodes,...{company,list}};
      }
      return {...state,...{company,list}};
    }
  },
  effects: {
    *fetchOnly({payload:{}},{call,put}){
      let res= yield call(Service.fetch,{});
      let nodes=res.data||[];
      yield put({ type: 'save', payload: {nodes}});
    },
    *fetch({payload:{name}},{call,put,select}){
      let res= yield call(Service.fetch,{name});
      let nodes=res.data||[];
      let list_res=yield call(Service.fetch,{name,...{tree:false}});
      let list=list_res.data||[];
      yield put({ type: 'save', payload: {nodes,list}});
    },
    *fetchAll({payload:{id,tree=false}},{call,put,select}){
      let res= yield call(Service.fetchChildren,{id,tree});
      let list=res.data||[];
      yield put({ type: 'save', payload: {list}});
    },
    *fetchForEdit({payload:{organizationId}},{call,put}){
      yield put({ type: 'fetchOnly', payload: {}});
      yield put({ type: 'utils/getOrganParents', payload: { organizationId}});
    },
    *remove({payload:{id,parentId}},{call,put}){
      let data= yield call(Service.remove,id);
      yield put({type:'reload',payload:{id:parentId}})
    },
    *patch({payload:values},{call,put}){
      let data=yield call(Service.patch,values);
      yield put({type:'reload',payload:{id:values.id}})
    },
    *create({payload:{values}},{call,put}){
      let data=yield call(Service.create,values);
      yield put({type:'reload',payload:{id:values.parentId}})
    },
    *detail({payload:{id}},{call,put}){
      let data= yield call(Service.detail,{id});
      yield put({ type: 'save', payload: {data,id} });
    },
    *reload({payload:{}},{put,select}){
      const page=yield select(state=>state.organization.page);
      const size=yield select(state=>state.organization.size);
      yield put({type:'fetch',payload:{page,size}});
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/organization'){
            dispatch({type:'fetch',payload:query});
        }
        if(pathname==='/organization/edit'){
          dispatch({type:'fetchForEdit',payload:query});
        }
      })
    }
  },
}
