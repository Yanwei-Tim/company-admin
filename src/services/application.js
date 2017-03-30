import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=10000,key}) {
  return request(constant.APP_LIST+`?pageNo=${page}&pageNum=${size}&groupFlag=${key}`);
}
export function companyCreate(id) {
  return request(constant.APP_COMPANY_CREATE+`?thirdId=${id}`);
}
export function communityCreate({thirdId,communityId}) {
  return request(constant.APP_COMMUNITY_CREATE+`?thirdId=${thirdId}&communityId=${communityId}`);
}
export function fetch_by_eid({id,eid,page=1,size=3}) {
  return request(constant.APP_BY_EID+`?thirdId=${id}&eid=${eid}&pageNo=${page}&pageNum=${size}`);
}
export function fetch_by_organ({id,organizationId,page,size}) {
  return request(constant.APP_BY_ORGANIZATION+`?thirdId=${id}&organizationId=${organizationId}&pageNo=${page}&pageNum=${size}`);
}
