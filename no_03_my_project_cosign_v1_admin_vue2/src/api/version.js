//메인 컨텐츠 프로모션과 관련된 API 함수
import { version } from './index'


// 버전 등록
function api_version_add(formData) {
  return version.post('/version', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}
function api_versionHistory_admin({ platformType, page, size }) {
  return version.post(`/list/${platformType}`, { page, size }.getParam(), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
function api_versionDetail_admin(id) {
  return version.post(`/version/${id}`, {}, {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
function api_versionUpdate_admin(formData) {
  return version.post('/version/updated', formData, {withCredentials: true},
  {headers: { "Content-Type": 'multipart/form-data',}})
}
function api_versionDelete_admin(id) {
  return version.post(`/version/${id}/deleted`, {}, {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}

export {
  api_version_add,
  api_versionHistory_admin,
  api_versionDetail_admin,
  api_versionUpdate_admin,
  api_versionDelete_admin,
}