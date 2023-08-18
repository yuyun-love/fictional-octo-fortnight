import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserKey = 'Admin-User'
const UserNameKey='Admin-UserName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(UserKey)
}
export function getUserName() {
  return Cookies.get(UserNameKey)
}

export function setUserName(userName) {
  return Cookies.set(UserNameKey, userName)
}
export function setUserInfo(userInfo) {
  return Cookies.set(UserKey, userInfo)
}

export function removeUserInfo() {
  return Cookies.remove(UserKey)
}
