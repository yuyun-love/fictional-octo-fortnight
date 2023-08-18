import request from '@/utils/request'

export function testApi(query) {
  return request({
    url: '/api/test/',
    method: 'GET',
    params: query
  })
}
