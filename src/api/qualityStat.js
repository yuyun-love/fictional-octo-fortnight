import request from '@/utils/request'

export function getCaseProjects(query) {
  return request({
    url: '/api/getCaseProject',
    method: 'get',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function getCaseMoudles(query) {
  return request({
    url: '/api/getCaseMoudle',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function getCaseFunctions(query) {
  return request({
    url: '/api/getCaseFunction',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function getIterations(query) {
  return request({
    url: '/api/getCaseIteration',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function getUsers(query) {
  return request({
    url: '/api/getCaseUser',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function getCaseNum(query) {
  return request({
    url: '/api/getCaseNum',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getJiraPro(query) {
  return request({
    url: '/api/getJiraProject',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getJiraNum(query) {
  return request({
    url: '/api/getJiraNums',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getRepoters(query) {
  return request({
    url: '/api/getJiraReporters',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function getSprints(query) {
  return request({
    url: '/api/getJiraSprints',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getCaseNodes(query) {
  return request({
    url: '/api/getCaseFunctionNode',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
