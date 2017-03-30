import request from '../utils/request';
import constant from '../utils/constant'
export function login(values) {
 return request(constant.LOGIN_ACCOUNT,{
    method:"POST",
    body:JSON.stringify(values)
  })
}

export  function findPwd(values) {
  return request(constant.FIND_PWD,{
    method:"POST",
    body:JSON.stringify(values)
  })
}
