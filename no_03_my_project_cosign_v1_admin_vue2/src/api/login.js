//로그인과 관련된 API 함수 
import qs from 'qs';
import { login } from './index';

function api_postLogin(data) {
  return login.post('/login', qs.stringify(data), {withCredentials: true},
  {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
}
function api_getCoinList_admin() {
  return login.get('/coin/code-list');
}

export { 
  api_postLogin,
  api_getCoinList_admin
}