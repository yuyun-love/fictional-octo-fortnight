import request from '@/utils/request'

export function autoCreateAccounts(query) {
  return request({
    url: '/api/autoCreateAccounts',
    method: 'POST',
    timeout: 60 * 60 * 1000,
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function generateAccurateReports(query) {
  return request({
    url: '/api/generateAccurateReports',
    method: 'POST',
    timeout: 60 * 60 * 1000,
    data: query
  })
}
export function autoCreateOrders(query) {
  return request({
    url: '/api/autoCreateOrder',
    method: 'POST',
    timeout: 60 * 60 * 1000,
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getOrders(query) {
  return request({
    url: '/api/getOrders',
    method: 'get',
    timeout: 60 * 60 * 1000,
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function viewAccurateReports(query) {
  return request({
    url: '/api/viewAccurateReports',
    method: 'POST',
    timeout: 60 * 60 * 1000,
    data: query
  })
}
export function viewAddReports(query) {
  return request({
    url: '/api/viewAddReports',
    method: 'POST',
    timeout: 60 * 60 * 1000,
    data: query
  })
}

export function getAccounts(query) {
  return request({
    url: '/api/getAccounts',
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function checkChannelSet(query) {
  return request({
    url: '/api/checkChannelSet',
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function checkTranslate(query) {
  return request({
    url: '/api/checkTranslate',
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data: query,
    timeout: 60000 * 10
  })
}
export function getBranches(query) {
  return request({
    url: '/api/getBranches',
    method: 'GET',
    params: query
  })
}
export function autoEditName(query) {
  return request({
    url: '/api/autoEditName',
    method: 'POST',
    // timeout: 60 * 60 * 1000,
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function autoCreateHead(query) {
  return request({
    url: '/api/autoCreateHead',
    method: 'POST',
    data: query
  })
}
export function autosetchar(query) {
  return request({
    url: '/api/autosetchar',
    method: 'POST',
    data: query
  })
}
export function autosetprofile(query) {
  return request({
    url: '/api/autosetprofile',
    method: 'POST',
    data: query
  })
}
export function autosethead(query) {
  return request({
    url: '/api/autosethead',
    method: 'POST',
    data: query
  })
}
export function autosetHomeCover(query) {
  return request({
    url: '/api/autosetHomeCover',
    method: 'POST',
    data: query
  })
}
export function autoAddPosts(query) {
  return request({
    url: '/api/autoAddPosts',
    method: 'POST',
    data: query
  })
}
export function autoAddAccountCoverNewV2(query) {
  return request({
    url: '/api/autoAddAccountCoverNewV2',
    method: 'POST',
    data: query
  })
}
export function autoSetIntroduction(query) {
  return request({
    url: '/api/autoSetIntroduction',
    method: 'POST',
    data: query
  })
}
export function autoPeipeiSetName(query) {
  return request({
    url: '/api/autoPeipeiSetName',
    method: 'POST',
    data: query
  })
}export function autoPeipeiSetBag(query) {
  return request({
    url: '/api/autoPeipeiSetBag',
    method: 'POST',
    data: query
  })
}
export function SendMomentPictureMsg(query) {
  return request({
    url: '/api/sendMomentPictureMsg',
    method: 'POST',
    data: query
  })
}
export function peipeiSetIntroduction(query) {
  return request({
    url: '/api/peipeiSetIntroduction',
    method: 'POST',
    data: query
  })
}
export function filterLog(query) {
  return request({
    url: '/api/filterLog',
    method: 'POST',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    data: query
  })
}
export function setAccount(query) {
  return request({
    url: '/api/setAccount',
    method: 'POST',
    data: query
  })
}
export function sendPrivateMsg(query) {
  return request({
    url: '/api/sendPrivateMsg',
    method: 'POST',
    data: query
  })
}
export function sendGroupMsg(query) {
  return request({
    url: '/api/sendGroupMsg',
    method: 'POST',
    data: query
  })
}
export function sendGiftMsg(query) {
  return request({
    url: '/api/sendGiftMsg',
    method: 'POST',
    data: query
  })
}
export function hostSendGift(query) {
  return request({
    url: '/api/hostSendGift',
    method: 'POST',
    data: query
  })
}
export function chatSendGift(query) {
  return request({
    url: '/api/batchSendGift',
    method: 'POST',
    data: query
  })
}
export function teamSendGift(query) {
  return request({
    url: '/api/teamSendGift',
    method: 'POST',
    data: query
  })
}
export function getRankList(query) {
  return request({
    url: '/api/getRankList',
    method: 'GET',
    params: query
  })
}
export function updateRankTime(query) {
  return request({
    url: '/api/updateRankTime',
    method: 'POST',
    data: query
  })
}
export function autoRoomCover(query) {
  return request({
    url: '/api/autoTaquSetRoomCover',
    method: 'POST',
    data: query
  })
}

export function getScene(query) {
  return request({
    url: '/api/getScene',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function tqGetScene(query) {
  return request({
    url: '/api/tqGetScene',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function creatSceneData(query) {
  return request({
    url: '/api/createScene',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function debugSceneData(query) {
  return request({
    url: '/api/debugScene',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function getScenebyid(query) {
  return request({
    url: '/api/getSceneById',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function addScene(query) {
  return request({
    url: '/api/addSceneApi',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function autoPushPlan(query) {
  return request({
    url: '/api/createPushPlan',
    method: 'POST',
    data: query
  })
}
export function getProjectNamelist(query) {
  return request({
    url: '/api/getProjectNamelist',
    method: 'POST',
    data: query
  })
}
export function getCommitList(query) {
  return request({
    url: '/api/getCommitList',
    method: "POST",
    data: query
  })
}
export function getBranchList(query) {
  return request({
    url: '/api/getBranch',
    method: "POST",
    data: query
  })
}
export function compareCode(query) {
  return request({
    url: '/api/compareCode',
    method: 'POST',
    timeout: 60 * 60 * 1000,
    data: query
  })
}

export function getTgHeader(query) {
  return request({
    url: '/api/getTgHeader',
    method: 'post',
    data: query
  })
}
export function addHeaderApi(query) {
  return request({
    url: '/api/addHeaderApi',
    method: 'post',
    data: query
  })
}
export function tgCreateScene(query) {
  return request({
    url: '/api/tgCreateScene',
    method: 'post',
    data: query
  })
}
export function scriptExecution(query){
  return request({
    url: '/api/scriptExecution',
    method: 'POST',
    data: query
  })
}
export function trackCheck(query){
  return request({
    url: '/api/trackCheck',
    method: 'POST',
    data: query
  })
}
export function updatePropCard(query){
  return request({
    url: '/api/updatePropCard',
    method: 'POST',
    data: query
  })
}
export function accountGroupType(query) {
  return request({
    url: '/api/accountGroupType',
    method: 'POST',
    data: query
  })
}
export function hw_groupType_accounts(query) {
  return request({
    url: '/api/hw_groupType_accounts',
    method: 'POST',
    timeout: 60 * 60 * 1000,
    data: query
  })
}
export function filterTqAccount(query) {
  return request({
    url: '/api/filterTqAccount',
    method: 'POST',
    data: query
  })
}
export function giftTypeList(query) {
  return request({
    url: '/api/giftTypeList',
    method: 'GET',
    params: query
  })
}
export function createData(query) {
  return request({
    url: '/api/createData',
    method: 'POST',
    data: query,
    timeout: 60 * 60 * 1000
  })
}
export function ceremonyCreateData(query) {
  return request({
    url: '/api/ceremonyCreateData',
    method: 'POST',
    data: query,
    timeout: 60 * 60 * 1000
  })
}
export function giftList(query) {
  return request({
    url: '/api/giftList',
    method: 'GET',
    params: query
  })
}
export function getGiftList(query) {
  return request({
    url: '/api/getGiftList',
    method: 'GET',
    params: query
  })
}
export function getExecLists(query) {
  return request({
    url: '/api/getExecLists',
    method: 'GET',
    params: query
  })
}
export function getReportLists(query) {
  return request({
    url: '/api/getReportLists',
    method: 'GET',
    params: query
  })
}
export function openReport(query) {
  return request({
    url: '/api/openAccurateReport',
    method: 'GET',
    params: query
  })
}

export function hwsjCreateData(query) {
  return request({
    url: '/api/hwsjCreateData',
    method: 'POST',
    data: query,
    timeout: 60 * 60 * 1000
  })
}
export function hwsjGiftList(query) {
  return request({
    url: '/api/hwsjGiftList',
    method: 'GET',
    params: query
  })
}
export function getlistRewardId(query) {
  return request({
    url: '/api/getlistRewardId',
    method: 'POST',
    data: query
  })
}
export function revenueTypeList(query) {
  return request({
    url: '/api/revenueTypeList',
    method: 'GET',
    params: query
  })
}
export function runScene(query) {
  return request({
    url: '/api/runScene',
    method: 'POST',
    data: query,
    timeout: 60 * 60 * 1000
  })
}
export function commonCreatData(query) {
  return request({
    url: '/api/commonCreatData',
    method: 'POST',
    data: query
  })
}
export function getScenceData(query) {
  return request({
    url: '/api/getScenceData',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}
export function batchList(query) {
  return request({
    url: '/api/batchList',
    method: 'GET',
    params: query
  })
}
export function runBatch(query) {
  return request({
    url: '/api/runBatch',
    method: 'POST',
    data: query,
    timeout: 60 * 60 * 1000
  })
}
export function getCreatedCount(query) {
  return request({
    url: '/api/getCreatedCount',
    method: 'GET',
    params: query
  })
}
export function closeRoom(query) {
  return request({
    url: '/api/closeRoom',
    method: 'GET',
    params: query
  })
}
export function editSceneApi(query) {
  return request({
    url: '/api/editSceneApi',
    method: 'post',
    data: query
  })
}

export function simulaterPay(query) {
  return request({
    url: '/api/simulaterPay',
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data'},
    data: query
  })
}

export function lottery(query){
  return request({
    url: '/api/lottery',
    method: 'post',
    data:query
      }

  )
}
export function tgStartCreat(query) {
  return request({
    url: '/api/tgStartCreat',
    method: 'post',
    data: query
  })
}
export function tgChangeToken(query) {
  return request({
    url: '/api/tgChangeToken',
    method: 'post',
    data: query
  })
}
export function autoHwPushPlan(query) {
  return request({
    url: '/api/createHwPushPlan',
    method: 'POST',
    data: query
  })
}

export function tgDataDiff(query) {
  return request({
    url: '/api/dataDiff',
    method: 'POST',
    data: query
  })
}

export function androidRecharge(query) {
  return request({
    url: '/api/androidRecharge',
    method: 'post',
    data: query
  })
}


export function mic(query){
  return request({
    url: '/api/hwMic',
    method: 'POST',
    data:query
      })
}