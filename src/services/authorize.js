import request from '../utils/request';
import constant from '../utils/constant'
export function fetch() {;
  return request(constant.AUTHORIZE_LIST);
}
export function remove(id) {
  return request(constant.AUTHORIZE_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.AUTHORIZE_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.AUTHORIZE_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
