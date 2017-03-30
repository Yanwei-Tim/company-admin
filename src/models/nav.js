import * as Service from '../services/application';
export default {
  namespace: 'nav',
  state: {
    list:{}
  },
  reducers: {
    save(state,{payload:{list}}){
      return {...state,list};
    },
  },
  effects: {
    *fetchEnabled({payload:{}},{call,put,select}){
      var list= yield call(Service.fetch_enabled);
      yield put({ type: 'save', payload: {list} });
    },
  },
  subscriptions: {

  },
}
