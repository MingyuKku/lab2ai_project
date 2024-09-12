//관리자와 관련된 API 함수 
import qs from 'qs';
import { empty, help } from './index';



//faq(자주 묻는 질문 관련)====================
function api_postLatestFaqList_admin(no) {
  return help.post('/faq/latest_question_list', qs.stringify({page: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
function api_postViewsFaqList_admin(no) {
  return help.post('/faq/views_question_list', qs.stringify({page: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postFaqRead_admin(no) {
  return help.post('/faq/detail_question', qs.stringify({id: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postDeleteFaq_admin(no) {
  return help.post('/faq/delete_question', qs.stringify({id: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postAddFaq_admin(data) {
  return help.post('/faq/add_question', qs.stringify(data), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postUpdateFaq_admin(data) {
  return help.post('/faq/updated_question', qs.stringify(data), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postAddEditFile_faq(formData) {
  return help.post('/faq/add_editor_file', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}},)
}



//notice(공지사항 관련)====================
function api_postNoticeList_admin(no) {
  return help.post('/notice/contraction_notice', qs.stringify({page: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postNoticeRead_admin(no) {
  return help.post('/notice/get_notice', qs.stringify({id: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postDeleteNotice_admin(no) {
  return help.post('/notice/delete_notice', qs.stringify({id: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postAddNotice_admin(formData) {
  console.log('api쪽 공지사항추가', formData)
  return help.post('/notice/add_notice', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}},)
}

function api_postUpdateNotice_admin(formData) {
  return help.post('/notice/update_notice', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}},)
}

function api_postAddEditFile_notice(formData) {
  return help.post('/notice/add_editor_file', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}},)
}



//qna(1:1문의 관련)====================
function api_postQnaList_admin(no) {
  return help.post('/qna/inquiry_list', qs.stringify({page: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postQnaRead_admin(no) {
  return help.post('/qna/detail_inquiry', qs.stringify({id: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postAnswerQna_admin(params) {
  return help.post('/qna/add_answer_inquiry', qs.stringify(params), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postDeleteQna_admin(no) {
  return help.post('/qna/delete_inquiry', qs.stringify({id: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_postAddEditFile_qna(formData) {
  return help.post('/qna/add_editor_file', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}},)
}


//테스트
function api_memberManangement_list_admin(no) {
  return help.post('/member/getList', qs.stringify({page: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
//테스트
function api_memberManangementRead_list_admin(email) {
  return help.post('/member/detail_user', qs.stringify({email: email}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_memberResetPassword_admin(email) {
  return help.post('/member/reset_password', qs.stringify({email: email}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_memberResetCellphone_admin(email) {
  return help.post('/member/reset_cellphone', qs.stringify({email: email}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_memberUpdated_admin(data) {
  return help.post('/member/update_user', qs.stringify(data), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_memberEmailSearch_admin(email) {
  return help.post('/member/search_email', qs.stringify({email: email}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_memberNickNameSearch_admin(nickName, page) {
  return help.post('/member/search_nickname', qs.stringify({keyword: nickName, page: page}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_memberNameSearch_admin(name, page) {
  return help.post('/member/search_name', qs.stringify({keyword: name, page: page}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_memberPhoneSearch_admin(phone, page) {
  return help.post('/member/search_phone', qs.stringify({keyword: phone, page: page}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_productList_admin(no) {
  return help.post('/product/all_lists', qs.stringify({page: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_productDetail_admin(no) {
  return help.post('/product/detail_product', qs.stringify({id: no}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_productSearchMentor_admin(name) {
  return help.post('/product/get_mentor', qs.stringify({mentorName: name}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_productAdd_admin(data) {
  return help.post('/product/add_product', qs.stringify(data), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_productUpdate_admin(data) {
  return help.post('/product/update_product', qs.stringify(data), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

function api_productSearch_admin(mentorId, page) {
  return help.post('/product/search_lists', qs.stringify({mentorId: mentorId, page: page}), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

// 유료 이용자 총 인원
function api_totalPaidUser_admin() {
  return empty.post('/api/purchase-ticket/user/info', {}, {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
// 유료 이용자 리스팅
function api_paidUserList_admin(page) {
  return empty.post('/api/purchase-ticket/user/list', qs.stringify({ page }), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
// 유료 이용자 리스팅 엑셀 파일 다운로드
function api_downloadUserList_admin() {
  return empty.post(`/api/purchase-ticket/get/order-user-list/csv`, {}, {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}});
}


//헬스체크 api
function api_health_feed() {
  return empty.get(`/health-check/feed`);
}
function api_health_discover() {
  return empty.get(`/health-check/discover`);
}
function api_health_sign() {
  return empty.get(`/health-check/ai-sign`);
}
function api_health_bookmark() {
  return empty.get(`/health-check/bookmark`);
}
function api_health_menu() {
  return empty.get(`/health-check/menu`);
}
function api_health_search() {
  return empty.get(`/health-check/search`);
}
function api_health_faq() {
  return empty.get(`/health-check/faq`);
}

export { 
  api_postLatestFaqList_admin, 
  api_postViewsFaqList_admin, 
  api_postFaqRead_admin, 
  api_postDeleteFaq_admin,
  api_postAddFaq_admin, 
  api_postUpdateFaq_admin, 
  api_postAddEditFile_faq,

  api_postNoticeList_admin, 
  api_postNoticeRead_admin, 
  api_postDeleteNotice_admin,
  api_postAddNotice_admin,
  api_postUpdateNotice_admin, 
  api_postAddEditFile_notice,

  api_postQnaList_admin, 
  api_postQnaRead_admin, 
  api_postAnswerQna_admin, 
  api_postDeleteQna_admin,
  api_memberManangement_list_admin, 
  api_postAddEditFile_qna,

  api_memberManangementRead_list_admin, 
  api_memberResetPassword_admin, 
  api_memberResetCellphone_admin,
  api_memberUpdated_admin,

  api_memberEmailSearch_admin, 
  api_memberNickNameSearch_admin, 
  api_memberNameSearch_admin,
  api_memberPhoneSearch_admin,
  
  api_productList_admin, 
  api_productDetail_admin, 
  api_productSearchMentor_admin,
  api_productAdd_admin,

  api_productUpdate_admin, 
  api_productSearch_admin,
  api_totalPaidUser_admin,
  api_paidUserList_admin,
  api_downloadUserList_admin,

  api_health_feed,
  api_health_discover,
  api_health_sign,
  api_health_bookmark,
  api_health_menu,
  api_health_search,
  api_health_faq,
}
