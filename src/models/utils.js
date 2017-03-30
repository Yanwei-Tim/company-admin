import * as Service from '../services/utils';
export default {
  namespace: 'utils',
  state: {},
  reducers: {
    save(state,{payload:{status,token,parents,OSS}}){
      return {...state,status,token,parents,OSS};
    },
  },
  effects: {
      *validCode({payload:phone},{call,put}){
           yield call(Service.validCode,phone);
      },
      *validAccount({payload:account},{call,put}){
       const data=yield call(Service.validAccount,account);
        yield put({ type: 'save', payload: {status:data.status}});
      },
     *validToken({payload:{}},{call,put}){
       const token=yield call(Service.validToken);
       yield put({ type: 'save', payload: {token}});
     },
     *getOrganParents({payload:{organizationId}},{call,put}){
      const data=yield call(Service.getOrganParents,organizationId);
      yield put({ type: 'save', payload: {parents:data.data}});
     },
      *getOSSToken({payload:{}},{call,put}){
        const OSS=yield call(Service.getOSSToken);
        yield put({ type: 'save', payload: {OSS}});
      }
  },
  subscriptions: {

  },
}
