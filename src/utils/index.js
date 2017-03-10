import md5 from 'md5'
// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, "-$1").toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    'H+': this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  }
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
  return format
}
export function setSession(key,value) {
  sessionStorage.setItem(key,encodeURIComponent(JSON.stringify(value)));
}
export function getSession(key) {
  const result=sessionStorage.getItem(key);
  if(result){
    return JSON.parse(decodeURIComponent(result))
  }
  return {};

}
export function signature(appId,timestamp,nonce) {
    let sign=new Array(appId,timestamp,nonce);
    let sign_string='';
    sign=sign.sort();
    sign_string=sign.join('');
    return md5(sign_string);
}
export function getToken() {
  const info=sessionStorage.getItem('PROFILE');
  let profile={};
  if(info!=''&&info!='undefined'&&info!=null){
    profile=JSON.parse(decodeURIComponent(info))
  }
  return profile.token
}
export function organFlag(flag) {
  flag=parseInt(flag);
  switch (flag){
    case 0:
      return "总部/主节点";
      break;
    case 1:
      return "大区公司";
      break;
    case 2:
      return "省级公司";
      break;
    case 3:
      return "市级公司";
      break;
    case 4:
      return "县级公司";
      break;
    case 9:
      return "部门";
      break;
    case 10:
      return "岗位";
      break;

  }
}
