import request from '@/utils/request'

export function getAllUserList(query) {
  return request({
    url: '/api/getAllUserList',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getToolList(query) {
  return request({
    url: '/api/getToolList',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getToolConfig(query) {
  return request({
    url: '/api/getToolConfig',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function getToolUseData(query) {
  return request({
    url: '/api/getToolUseData',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function updateToolConfig(query) {
  return request({
    url: '/api/updateToolConfig',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function createToolConfig(query) {
  return request({
    url: '/api/createToolConfig',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function deleteToolConfig(query) {
  return request({
    url: '/api/deleteToolConfig',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
