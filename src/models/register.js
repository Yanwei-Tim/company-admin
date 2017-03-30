import * as Service from '../services/register'
export default {
  namespace: 'register',
  state: {
    status:null
  },
  reducers: {
    save(state, {payload:{data}}){
      return {
        ...state,
        ...data
      }
    }
  },
  effects: {
      *register({payload:values},{call,put}){
          let data= yield call(Service.register,values);
          yield put({type:'save',payload:{data}});
      }
  },
  subscriptions: {},
}
