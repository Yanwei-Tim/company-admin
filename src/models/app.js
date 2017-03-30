
export default {
  namespace: 'app',
  state: {

  },
  reducers: {
    save(state,{payload:{status,token}}){
      return {...state,status,token};
    },
  },
  effects: {

  },
  subscriptions: {
    setup({dispatch,history},done){
      return history.listen(({pathname,query})=>{
        const exclude=["/","/login","login","/register","register","/find/password","find/password"];
        if(exclude.indexOf(pathname)===-1){
         // dispatch({type:'utils/validToken',payload:query});
          dispatch({type:'nav/fetchEnabled',payload:query});
        }
      });
    }
  }
}
