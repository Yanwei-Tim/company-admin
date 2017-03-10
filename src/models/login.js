import * as Service from '../services/login';
export default {
  namespace: 'login',
  state: {
   data:{}
  },
  reducers: {
    loginSuccess(state, {payload:{data}}){
      return {
        ...state,
        ...data
      }
    },
    logoutSuccess(state, action){
      return {
        ...state,
        data: {},
        status: -1
      }
    },
  },
  effects: {
    *enter({payload},{call,put}){
      let data= yield call(Service.login,payload);
      yield put({type:'loginSuccess',payload:{data}})
    },
    *logout({payload},{call,put}){
      yield put({type:'logoutSuccess'})
    }
  },
  subscriptions: {

  },
}
