import * as Service from '../services/login';
export default {
  namespace: 'login',
  state: {
   data:{},
   status:0
  },
  reducers: {
    save(state, {payload:{data}}){
      return {
        ...state,
        ...data
      }
    },
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
    },
    *findPwd({payload:values},{call,put}){
      const data=yield call(Service.findPwd,values);
      yield put({type:'save',payload:{data}})

    }
  },
  subscriptions: {

  },
}
