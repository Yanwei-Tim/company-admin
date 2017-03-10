
export default {
  namespace: 'app',
  state: {
    darkTheme:localStorage.getItem("DarkTheme")==="false"?false:true
  },
  reducers: {
    handleTheme(state){
      localStorage.setItem("DarkTheme",!state.darkTheme);
      return {
        ...state,
        darkTheme:!state.darkTheme
      }
    }
  },
  effects: {
    *changeTheme({payload},{put}){
       yield put({type:'handleTheme'})
    }
  },
  subscriptions: {
    setup({ dispatch },done){
    }
  },
}
