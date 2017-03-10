import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,name='',disable='',code=''}) {
  let url=`?pageNo=${page}&pageNum=10000&name=${name}&disable=${disable}&code=${code}&flag=`;
  return request(constant.AUTHORIZE_LIST+url);
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
