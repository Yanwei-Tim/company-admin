import * as Service from '../services/utils';
export default {
  namespace: 'utils',
  state: {},
  reducers: {},
  effects: {
      *validCode({payload:phone},{call,put}){
           yield call(Service.validCode,phone);
      }
  },
  subscriptions: {},
}
