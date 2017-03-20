import request from '../utils/request';
import constant from '../utils/constant';

export function validCode(phone) {
    return request(constant.VALID_CODE+`?phone=${phone}`);
}


