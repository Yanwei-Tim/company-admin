import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=20,name,status}) {
  let url=`?pageNo=${page}&pageNum=${size}`;
  if(name!==''&&name!=undefined){
      url+=`&name=${name}`
  }
  if(status!=''&&status!=undefined){
     url+=`&status=${status}`
  }
  return request(constant.APP_LIST+url);
}
export function fetchConf(id) {
  return request(constant.APP_GET_CONF+`?id=${id}`)
}
export function setConf(values) {
  return request(constant.APP_CONF,{
    method:"POST",
    body:JSON.stringify(values)
  })
}
export function remove(id) {
  return request(constant.APP_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.APP_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function patchConf(values) {
  return request(constant.APP_CONF,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.APP_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
