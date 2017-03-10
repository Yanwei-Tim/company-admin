import * as Service from '../services/organization'
import {fetch} from '../services/company';
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
    *fetchOnly({payload:{eid,title,size}},{call,put,select}){
      var res= yield call(Service.fetch,{eid});
      var nodes=res.data||[];
      const company=yield select(state=>state.organization.company,size);
      yield put({ type: 'save', payload: {nodes,company,title,eid}});
    },
    *fetch({payload:{eid,title,size}},{call,put,select}){
      var res= yield call(Service.fetch,{eid});
      var nodes=res.data||[];
      var list_res=yield call(Service.fetch,{eid,...{tree:false}});
      var list=list_res.data||[];
      const company=yield select(state=>state.organization.company,size);
      yield put({ type: 'save', payload: {nodes,company,list,title,eid}});
    },
    *fetchAll({payload:{id,tree=false}},{call,put,select}){
      var res= yield call(Service.fetchChildren,{id,tree});
      var list=res.data||[];
      const company=yield select(state=>state.organization.company);
      const nodes=yield select(state=>state.organization.nodes);
      const eid=yield select(state=>state.organization.eid);
      const title=yield select(state=>state.organization.title);
      yield put({ type: 'save', payload: {nodes,company,list,eid,title}});
    },
    *fetchCompany({payload:{name,page,size,eid}},{call,put}){
      var company=yield call(fetch,{page,name});
      var list=[];
      var nodes=[];
      yield put({ type: 'save', payload: {company,page,size,eid,list,nodes}});
    },
    *remove({payload:{id,eid}},{call,put}){
      var data= yield call(Service.remove,id);
      yield put({type:'reload',payload:{eid}});
    },
    *patch({payload:values},{call,put}){
      var data=yield call(Service.patch,values);
      yield put({type:'reload',payload:{eid:values.eid}});
    },
    *create({payload:{values,eid}},{call,put}){
      var data=yield call(Service.create,values);
      yield put({type:'reload',payload: {eid}})
    },
    *detail({payload:{id}},{call,put}){
      var data= yield call(Service.detail,{id});
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
          dispatch({type:'fetchCompany',payload:query})
        }
      })
    }
  },
}
