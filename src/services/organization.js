import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({eid,tree=true}) {
  return request(constant.ORGAN_LIST_COMPANY+`?eid=${eid}&treeModeReturn=${tree}`)
}
export function fetchChildren({id,tree=true}) {
  return request(constant.ORGAN_LIST_CHILDREN+`?id=${id}&treeModeReturn=${tree}`)
}
export function remove(id) {
  return request(constant.ORGAN_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.ORGAN_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.ORGAN_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function detail(id) {
  return request(constant.ORGAN_DETAILS+`?id=${id}`)
}
