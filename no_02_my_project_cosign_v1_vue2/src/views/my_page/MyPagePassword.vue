<template>
  <div class="myPagePassword_wrap">
    <div class="title">비밀번호 변경</div>
    <div class="myPagePassword_body">
      <div class="originPw_area">
        <h2>기존 비밀번호</h2>
        <input type="password" id="originPw" placeholder="기존 비밀번호를 입력해 주세요." v-model="originPw">
        <span class="validation" v-if="error.none_ogiginPw"><i class="xi-error-o"></i>기존 비밀번호를 입력해 주세요.</span>
      </div>
      <div class="newPw_area">
        <h2>새 비밀번호</h2>
        <input type="password" id="newPw" placeholder="새 비밀번호를 입력해 주세요."
          v-model="password"
          @focus="isSamePassword"
        >
        <span class="tips"><i class="xi-info-o"></i>영문/숫자/특수문자 중 2개 이상 포함 8자 이상</span>
        <span class="validation" v-if="error.none_password"><i class="xi-error-o"></i>새 비밀번호를 입력해 주세요.</span>
        <span class="validation" v-if="error.rule"><i class="xi-error-o"></i>영문/숫자/특수문자 중 2개 이상 포함 8자 이상을 입력해 주세요.</span>
      </div>
      <div class="newPwCheck_area">
        <h2>새 비밀번호 확인</h2>
        <input type="password" id="newPwCheck" placeholder="비밀번호를 한 번 더 입력해 주세요."
          v-model="passwordCheck"
          @keyup="isSamePassword"
        >
        <span class="validation" v-if="error.none_passwordCheck"><i class="xi-error-o"></i>비밀번호를 한 번 더 입력해 주세요.</span>
        <span class="validation" v-if="error.not_samePw && passwordCheck.length > 0"><i class="xi-error-o"></i>비밀번호가 일치하지 않습니다.</span>
      </div>
      <button type="button" @click="changePasswordAPI">변경하기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs';
import { API_URL } from '@/core/apiUrl';
import { mixin_myPage } from '@/mixin/mixin_myPage';
export default {
  mixins: [mixin_myPage],
  data() {
    return {
      originPw: '',
      password: '',
      passwordCheck: '',
      error: {
        none_ogiginPw: false,
        none_password: false,
        none_passwordCheck: false,
        not_samePw: false,
        rule: false,
        // rule_ogiginPw: false,
        // rule_password: false,
      }
    }
  },
  computed: {
    
  },
  methods: {
    isSamePassword() {
      if(this.password === this.passwordCheck) {
        this.error.password_same = true;
      } else {
        this.error.password_same = false;
      }
    },
    initError() {
      this.error.none_ogiginPw = false
      this.error.none_password = false
      this.error.none_passwordCheck = false
      this.error.not_samePw = false
      this.error.rule = false
    },
    validatePasswordChange() {
      this.initError();
      if(!this.originPw) {
        this.error.none_ogiginPw = true;
        return true;
      } else if(!this.password) {
        this.error.none_password = true;
        return true;
      } else if(!this.passwordCheck) {
        this.error.none_passwordCheck = true;
        return true;
      } else if(this.password !== this.passwordCheck) {
        this.error.not_samePw = true;
        return true;
      } else if(!this.passwordValid) {
        this.error.rule = true;
        return true;
      } else {
        return false;
      }
    },
    async changePasswordAPI() {
      if(!this.validatePasswordChange()) {
        const passwordData = {
          newPwd: this.password,
          oldPwd: this.originPw
        }
        await axios.post(`${API_URL}/api/user/password/change`, qs.stringify(passwordData), {withCredentials: true},
        {headers: {"Content-Type": `application/x-www-form-urlencoded`,}})
        .then(res=> {
          if(res.data.code === 1000) {
            alert(res.data.message)
            location.href = '/';
          } else {
            alert(res.data.message)
          }
        })
        .catch(err=> {
          alert(`${err} 관리자에게 문의해 주세요.`)
        })
      }
    }
  },
  
}
</script>

<style lang='scss'>
  @import './css/myPagePassword.scss';
</style>