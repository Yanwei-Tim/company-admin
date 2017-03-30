import request from '../utils/request';
import constant from '../utils/constant'
export function fetch(id) {
  return request(constant.ROLE_AUTHOR_LIST+`?roleId=${id}`);
}
export function fetch_role_by_eid(eid) {
  return request(constant.ROLE_COMPANY_LIST+`?eid=${eid}`);
}
export function fetch_role_by_communityId(communityId) {
  return request(constant.ROLE_COMMUNITY_LIST+`?communityId=${communityId}`);
}
export function fetch_role_by_memberId(memberId) {
  return request(constant.ROLE_USER_LIST+`?memberId=${memberId}`);
}
export function binding(values) {
  return request(constant.ROLE_BINDING,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function companyBinding(values) {
  return request(constant.ROLE_COMPANY_BINDING,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function communityBinding(values) {
  return request(constant.ROLE_COMMUNITY_BINDING,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function userBinding(values) {
    return request(constant.ROLE_USER_BINDING,{
        method:'POST',
        body:JSON.stringify(values)
    })
}
