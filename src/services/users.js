import request from '../utils/request'
import constant from '../utils/constant'

export function fetch_by_company({eid}) {
  return request(constant.USERS_LIST_COMPANY+`?pageNo=1&pageNum=10000&eid=${eid}`)
}
export function fetch_by_organ({page=1,orgId}) {
    return request(constant.USERS_LIST_ORGAN+`?pageNo=1&pageNum=10000&organizationId=${orgId}`)
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
