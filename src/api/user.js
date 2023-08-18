import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/getToken',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    data:data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/api/getUserInfo',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'post',
    data:data
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
