import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=20,number='',houseNumber='',ownerName='',buildingId}) {
  let url=`?pageNo=${page}&pageNum=${size}&buildingId=${buildingId}&number=${number}&houseNumber=${houseNumber}&ownerName=${ownerName}`;
  return request(constant.ROOM_LIST+url);
}
export function remove(id) {
  return request(constant.ROOM_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.ROOM_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.ROOM_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}

