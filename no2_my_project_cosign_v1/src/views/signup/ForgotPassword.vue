<template>
  <div class="forgotPassword_wrap">
    <LoginForm/>
    <CsHeader/>
    <div class="forgotPassword_body">
      <div class="title">
        <h1>비밀번호 찾기</h1>
        <p>가입한 이메일 주소로 임시 비밀번호를 알려드립니다.<br/>
        로그인 후 비밀번호를 변경해 주세요.</p>
      </div>
      <div class="signupEmail_area">
        <h2>이메일</h2>
        <input type="email" id="signupEmail" placeholder="이메일을 입력해 주세요." v-model="email">
        <span class="validation" v-if="error.email"><i class="xi-error-o"></i>가입된 정보가 없는 이메일 주소입니다.</span>
      </div>
      <button type="button" :disabled="!email" @click="changePassword">임시 비밀번호 전송</button>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm';
import CsHeader from '@/components/common/CsHeader';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

export default {
  components: {
    LoginForm, CsHeader
  },
  data() {
    return {
      email: '',
      error: {
        email: false
      }
    }
  },
  methods: {
    async changePassword() {
      const params = {'username': this.email};
      const res = await axios.post(`${API_URL}/api/mail/find_password`, params.getParam(), {withCredentials: true});

      if(res.data.code === 1000) {
        alert(res.data.message);

        location.href = "/";
      } else if(res.data.code === 1001) {
        this.error.email = true;
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/forgotPassword.scss';
</style>