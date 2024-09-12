// 거래소/멘토 관련된 API 함수
import { sign } from './index';

function api_signList(param) {
  const params = {
    exchange: param.exchange,
    mentor: param.mentor,
    page: param.page - 1,
    id: param.id,
  }
  return sign.post('/list', params.getParam(), {withCredentials: true})
}
function api_allMentorList() {
  return sign.post('/mentor-info', {}, {withCredentials: true})
}

export {
  api_signList,
  api_allMentorList,
}
  