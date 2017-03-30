import fetch from 'dva/fetch';
import {getToken,prompt,getEidToken} from './index'
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
      'eid':getEidToken(),
      'deviceTag': 4,
      'content-type': 'application/json;charset=UTF-8'
    }
  };
  const response = await fetch(url, {...options,...headers});
  checkStatus(response);
  const data = await response.json();
  prompt(url,data);
  return data;
}
