import request from '../utils/request';
import constant from '../utils/constant';

export function validCode(phone) {
    return request(constant.VALID_CODE+`?phone=${phone}`);
}
export function validAccount(account) {
  return request(constant.VALIDATE_ACCOUNT+`?account=${account}`);
}
export function validToken() {
  return request(constant.VALID_TOKEN);
}
export function getOrganParents(organizationId) {
  return request(constant.ORGAN_GET_PARENTS+`?id=${organizationId}`);
}
export function getOSSToken() {
  return request(constant.OSS_TOKEN)
}
