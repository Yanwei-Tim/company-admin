import request from '../utils/request';
import constant from '../utils/constant'
export function login(value) {
 return request(constant.LOGIN_ACCOUNT,{
    method:"POST",
    body:JSON.stringify(value)
  })
}

