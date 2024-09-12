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
        <span class="validation"><i class="xi-error-o"></i>가입된 정보가 없는 이메일 주소입니다.</span>
      </div>
      <button type="button" :disabled="!email">임시 비밀번호 전송</button>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm';
import CsHeader from '@/components/common/CsHeader';
export default {
  components: {
    LoginForm, CsHeader
  },
  data() {
    return {
      email: '',
    }
  },
  computed: {
    // checkValidate() {

    // }
  }
}
</script>

<style lang='scss'>
  @import './css/forgotPassword.scss';
</style>