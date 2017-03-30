import request from '../utils/request';
import constant from '../utils/constant';

export function register(values) {
  return request(constant.REGISTER_POST,{
    method:"POST",
    body:JSON.stringify(values)
  })
}

