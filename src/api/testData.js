import request from '@/utils/request'

export function getProjectList() {
  return request({
    url: '/api/getProjectList',
    method: 'GET'
  })
}
export function getReviewList(query) {
  return request({
    url: '/api/getReviewList',
    method: 'GET',
    params: query
  })
}
export function getReviewResult(query) {
  return request({
    url: '/api/getReviewResult',
    method: 'GET',
    params: query
  })
}
export function getReviewData(query) {
  return request({
    url: '/api/getReviewData',
    method: 'GET',
    params: query
  })
}
export function batchSendMessage(query) {
  return request({
    url: '/api/batchSendMessage',
    method: 'POST',
    data: query
  })
}
export function getFirstNode(query) {
  return request({
    url: '/api/getFirstNode',
    method: 'GET',
    params: query
  })
}
export function getChildrenNode(query) {
  return request({
    url: '/api/getChildrenNode',
    method: 'POST',
    data: query
  })
}
export function getCaseNums(query) {
  return request({
    url: '/api/getCaseNums',
    method: 'POST',
    data: query
  })
}