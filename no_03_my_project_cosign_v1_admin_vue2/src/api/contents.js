//메인 컨텐츠 프로모션과 관련된 API 함수
import { contents } from './index'

//프로모션
function api_promotion_list() {
  return contents.post('/promotion/promotion_list', {}, {withCredentials: true})
}

function api_addPromotion(formData) {
  return contents.post('/promotion/add_promotion', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}

function api_deletePromotion(no) {
  return contents.post('/promotion/dt_promotion', {id: no}.getParam(), {withCredentials: true})
}

//메인 팝업
export const api_popup_list = function () {
  return contents.get('/banner', {}, {withCredentials: true})
}

export const api_addPopup = function (formData) {
  return contents.post('/banner', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}

function api_deletePopup(bannerId) {
  return contents.post('/dt-banner', {bannerId}.getParam(), {withCredentials: true})
}

//최고수익싸인
function api_highProfit_list() {
  return contents.post('/highest_profit/list_highest_profit', {}, {withCredentials: true})
}

function api_highProfit_add(formData) {
  return contents.post('/highest_profit/add_highest_profit', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}

//연속적중싸인
function api_consecutiveHits_list() {
  return contents.post('/consecutive_hits/list_consecutive_hits', {}, {withCredentials: true})
}

function add_consecutiveHits_add(formData) {
  return contents.post('/consecutive_hits/add_consecutive_hits', formData, {withCredentials: true})
}

//카드뉴스(인스타그램)
function api_getInstagramUser() {
  return contents.post('/instagram/getAllUser', {}, {withCredentials: true})
}

function api_settingInstagram(param) {
  return contents.post('instagram/setting', param.getParam(), {withCredentials: true})
}

function api_instagramGetMedia() {
  return contents.post('instagram/getMedia', {}, {withCredentials: true})
}

function api_updateInstagramMedia(param) {
  return contents.post('instagram/update_instagram_media', param.getParam(), {withCredentials: true})
}

//코싸인소식(뉴스)
function api_cosignNews_list() {
  return contents.post('/cosign-news/list', {}, {withCredentials: true})
}
function api_cosignNews_add(formData) {
  return contents.post('/cosign-news/news', formData, {withCredentials: true})
}
// function api_cosignNews_delete(no) {
//   return contents.delete('/cosign-news/news', {id: no}.getParam(), {withCredentials: true})
// }
function api_cosignNews_delete(no) {
  return contents.post('/cosign-news/write-off/news', {id: no}.getParam(), {withCredentials: true})
}

// 에디터 피드
const api_feed_add = (formData) => {
  return contents.post('/feed', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}
function api_feedUpdate_admin(formData) {
  return contents.post('/updated/feed-admin', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}
function api_feedList_admin(page) {
  return contents.post('/feed-admin/list', { page }.getParam(), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
function api_feedDetail_admin(id) {
  return contents.post(`/feed-admin/${id}`, {}, {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
function api_feedDelete_admin(id) {
  return contents.post(`/deleted/feed-admin/${id}`, {}, {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
function api_feedStateCheck_admin(id) {
  return contents.get(`/feed/type-check/${id}`)
}

const api_addAlarm = function (formData) {
  return contents.post('/alarm', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}

export {
  api_promotion_list,
  api_addPromotion,
  api_deletePromotion,
  api_highProfit_list,
  api_highProfit_add,
  api_consecutiveHits_list,
  add_consecutiveHits_add,
  api_getInstagramUser,
  api_settingInstagram,
  api_instagramGetMedia,
  api_updateInstagramMedia,
  api_cosignNews_list,
  api_cosignNews_add,
  api_cosignNews_delete,
  api_deletePopup,
  api_addAlarm,

  api_feed_add,
  api_feedUpdate_admin,
  api_feedList_admin,
  api_feedDetail_admin,
  api_feedDelete_admin,
  api_feedStateCheck_admin,
}