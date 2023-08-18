import request from '@/utils/request'

export function Bigdata_kafka_event_assert(query) {
  return request({
    url: '/bigdata/Bigdata_kafka_event_assert',
    method: 'POST',
    data: query,
    timeout: 60 * 60 * 1000
    })
}

export function run_BDtest(query){
  return request({
    url:'/bigdata/run_BDtest',
    method:'POST',
    data:query,
  })
}


export function get_report_list(query){
  return request({
    url:'/bigdata/get_report_list',
    method:'GET',
    data:query,
  })
}

export function get_event_list(query){
  return request({
    url:'/bigdata/get_event_list',
    method:'POST',
    data:query,
  })
}
