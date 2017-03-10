import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=20,name,code,id}) {
  return request(constant.BUILDING_LIST+`?pageNo=${page}&pageNum=${size}&name=${name}&code=${code}&communityId=${id}`)
}

export function remove(id) {
  return request(constant.BUILDING_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.BUILDING_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.BUILDING_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
