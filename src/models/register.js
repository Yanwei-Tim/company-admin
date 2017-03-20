import * as Service from '../services/register'
export default {
  namespace: 'register',
  state: {},
  reducers: {},
  effects: {
      *register({payload:values},{call,put}){
          let data= yield call(Service.register,values);
      }
  },
  subscriptions: {},
}
