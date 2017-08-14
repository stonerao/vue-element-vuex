import Cookies from 'js-cookie'

const TokenKey = 'admin-login'
export function getToken() {
  return Cookies.get(TokenKey)
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