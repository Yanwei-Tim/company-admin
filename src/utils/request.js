import fetch from 'dva/fetch';
import {getToken} from './index'
import {message,notification } from 'antd'
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const headers = {
    headers: {
      'token': getToken(),
      'deviceTag': 4,
      'content-type': 'application/json;charset=UTF-8'
    }
  };
  const response = await fetch(url, {...options,...headers});
  checkStatus(response);
  const data = await response.json();
  if(!data.data){
    switch (data.status){
      case 1:
        message.success('操作成功');
        break;
      case 0:
        message.warning('操作失败');
        break;
      case -1:
        notification.warning({
          message: '未登录',
          description: '您未登录或登录已超时，请重新登录',
        });
        break;
      default:
        message.warning(data.message);
    }
  }

  return data;
}
