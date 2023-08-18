import request from '@/utils/request'

export function getAPiProjectList() {
  return request({
    url: '/api/getProject',
    method: 'post',
  })
}
export function getProjectBuilds(params) {
  return request({
    url: '/api/getProjectBuildId',
    method: 'get',
    params: params
  })
}
export function getbuildJob(params) {
  return request({
    url: '/api/getApitestData',
    method: 'get',
    params: params
  })
}
export function viewReport(params) {
  return request({
    url: '/api/getReport',
    method: 'get',
    params: params
  })
}
export function getBuildSummaryData(params) {
  return request({
    url: '/api/getBuildSummaryData',
    method: 'get',
    params: params
  })
}