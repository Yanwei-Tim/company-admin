import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=20,name=''}) {
  return request(constant.COMPANY_LIST+`?pageNo=${page}&pageNum=${size}&name=${name}`)
}
export function remove(id) {
  return request(constant.COMPANY_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.COMPANY_EDIT,{
     method:'POST',
     body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.COMPANY_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function execute(id) {
  return request(constant.COMPANY_READ+`?eid=${id}`)
}
export function execResult(id) {
  return request(constant.COMPANY_READ_STATUS+`?eid=${id}`)
}
