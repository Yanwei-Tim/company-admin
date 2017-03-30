import request from '../utils/request'
import constant from '../utils/constant';
export function fetch({name='',page='',size=''}) {
  return request(constant.USERS_LIST_COMPANY+`?pageNo=${page}&pageNum=${size}&name=${name}`)
}
export function fetch_by_company({eid}) {
  return request(constant.USERS_LIST_COMPANY+`?pageNo=1&pageNum=10000&eid=${eid}`)
}
export function fetch_by_organ({page=1,orgId,size=10}) {
    return request(constant.USERS_LIST_ORGAN+`?pageNo=1&pageNum=${size}&organizationId=${orgId}`)
}
export function remove(id) {
  return request(constant.USERS_DELETE+`?id=${id}`)
}
export function  patch(values) {
  return request(constant.USERS_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.USERS_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
