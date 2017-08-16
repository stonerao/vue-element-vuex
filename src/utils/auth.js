import Cookies from 'js-cookie'

const TokenKey = 'admin-login'
export function getToken() {
  // return Cookies.get(TokenKey)
  // return "37e0e061fa6e7e7676e6dce82de1356c"//老师
  return "00c9f07b1f0782613ee5d3133d28cc01"//学校中心
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function encodeUnicode(str) {
  //转为unicode 编码
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}
const classLogin = 'isClassLogin'
export function isClassLogin(state) {
  if (state == 1) {
    Cookies.set(classLogin, 1)
  } else if (state == 2) {
    Cookies.set(classLogin, 2)
  } else if (state == 3) {
    Cookies.set(classLogin, 3)
  }else{
    return Cookies.get(classLogin)
  }
}
export function getClass() {
  return Cookies.get(classLogin)
}
