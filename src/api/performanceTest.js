import request from '@/utils/request'

export function getScriptList() {
  return request({
    url: '/ptApi/getScriptList',
    method: 'get'
  })
}
export function startTest(query) {
  return request({
    url: '/ptApi/startTest',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function stopTest(query) {
  return request({
    url: '/ptApi/stopTest',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getRecordList() {
  return request({
    url: '/api/getRecordList',
    method: 'get'
  })
}
export function getReportDatas(query) {
  return request({
    url: '/api/getReportDatas',
    method: 'post',
    data: query
  })
}

