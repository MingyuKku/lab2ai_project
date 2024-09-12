<template>
  <div class="signupPage_wrap">
    <LoginForm />
    <CsHeader/>
    <div class="signup_body">
      <h1 class="title">
        회원가입
      </h1>
      <form class="signupForm" autocomplete="off">
        <div class="nickname_area">
          <h2>닉네임</h2>
          <input
            type="text" id="nickname" placeholder="닉네임을 입력해 주세요."
            v-model="nickname"
            ref="nickname"
          >
          <p class="input_tips"><i class="xi-info-o"></i>한글/영문/숫자 포함 2~10자</p>
          <span class="validation isNull"><i class="xi-error-o"></i>닉네임을 입력해 주세요.</span>
          <span class="validation isNickCombination"><i class="xi-error-o"></i>한글/영문/숫자 포함 2~10자리 입력해 주세요.</span>
          <span class="validation isSameNicname"><i class="xi-error-o"></i>이미 사용 중인 닉네임입니다.</span>
        </div>
        <div class="email_area">
          <h2>이메일</h2>
          <input
            type="email" id="email" placeholder="이메일을 입력해 주세요."
            v-model="email"
            ref="email"
          >
          <span class="validation isNull"><i class="xi-error-o"></i>이메일을 입력해 주세요.</span>
          <span class="validation isSameEmail"><i class="xi-error-o"></i>이미 가입된 이메일입니다.</span>
        </div>
        <div class="password_area">
          <h2>비밀번호</h2>
          <div class="password_input_wrap">
            <input
              type="password" id="password" placeholder="비밀번호를 입력해 주세요."
              v-model="password"
              ref="password"
            >
            <p class="input_tips"><i class="xi-info-o"></i>영문/숫자/특수문자 중 2개 이상 포함 8자 이상</p>
            <span class="validation isNull"><i class="xi-error-o"></i>비밀번호를 입력해 주세요.</span>
            <span class="validation isPwCombination"><i class="xi-error-o"></i>영문/숫자/특수문자 중 2가지 이상 포함 8자리 이상 입력해 주세요.</span>
          </div>
          <div class="password_input_wrap">
            <input type="password" placeholder="비밀번호를 한 번 더 입력해 주세요."
              v-model="passwordCheck"
            >
            <span class="validation isNull"><i class="xi-error-o"></i>비밀번호를 한 번 더 입력해 주세요.</span>
            <span class="validation isSamePassword"><i class="xi-error-o"></i>비밀번호가 일치하지 않습니다.</span>
          </div>
        </div>
        <div class="agreementCheck_area">
          <div class="allCheck_area">
            <input type="checkbox" id="allCheck" v-model="allAgreement"
              @change="onClickAllAgree" 
            >
            <label for="allCheck">
              <div class="allCheckBox"><i class="xi-check"></i></div>
              <p>전체동의</p>
            </label>
            <p>필수동의 항목 및 이벤트 정보 수신(선택)에 전체 동의합니다.</p>
          </div><!--allCheck_area-->
          <ul class="checkList">
            <li>
              <input type="checkbox" id="list_1" v-model="firstAgree"
                @change="isAllChecking"
              >
              <label for="list_1">
                <div class="list_1_checkBox"><i class="xi-check"></i></div>
                <p>만 19세 이상입니다.</p>
                <span class="required">(필수)</span>
              </label>
            </li>
            <li>
              <input type="checkbox" id="list_2" v-model="secondAgree"
                @change="isAllChecking"
              >
              <label for="list_2">
                <div class="list_2_checkBox"><i class="xi-check"></i></div>
                <p>서비스 이용약관에 동의합니다.</p>
                <span class="required">(필수)</span>
              </label>
              <p class="more"><a href="/signup/info_terms"><i class="xi-angle-right"></i></a></p>
            </li>
            <li>
              <input type="checkbox" id="list_3" v-model="thirdAgree"
                @change="isAllChecking"
              >
              <label for="list_3">
                <div class="list_3_checkBox"><i class="xi-check"></i></div>
                <p>개인정보 수집/이용에 동의합니다.</p>
                <span class="required">(필수)</span>
              </label>
              <p class="more"><a href="/signup/info_customer"><i class="xi-angle-right"></i></a></p>
            </li>
            <li>
              <input type="checkbox" id="list_4" v-model="fourthAgree"
                @change="isAllChecking"
              >
              <label for="list_4">
                <div class="list_4_checkBox"><i class="xi-check"></i></div>
                <p>이벤트 할인 혜택 알림 수신에 동의합니다.</p>
                <span class="choose">(선택)</span>
              </label>
            </li>
          </ul><!--checkList-->
        </div><!--agreementCheck_area-->
        <span class="validation checkRequired"
          v-if="!firstAgree || !secondAgree || !thirdAgree"
        >
          <i class="xi-error-o"></i>필수 항목에 동의해 주세요.
        </span>
        <div class="signupBtn"><button :disabled="validateSignup">회원가입</button></div>
      </form>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm.vue';
import CsHeader from '@/components/common/CsHeader.vue';
export default {
  name: 'SignupPage',
  components: {
    LoginForm, CsHeader,
  },
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      passwordCheck: '',
      allAgreement: false,
      firstAgree: false,
      secondAgree: false,
      thirdAgree: false,
      fourthAgree: false,
    }
  },
  computed: {
    validateSignup() {
      if(!this.nickname || !this.email || !this.password || !this.passwordCheck
      || !this.firstAgree || !this.secondAgree || !this.thirdAgree) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    isAllChecking() {
      (this.firstAgree && this.secondAgree && this.thirdAgree && this.fourthAgree) ?
      this.allAgreement = true : this.allAgreement = false;
    },
    onClickAllAgree() {
      if(this.allAgreement) {
        this.firstAgree = true;
        this.secondAgree = true;
        this.thirdAgree = true;
        this.fourthAgree = true;
      } else {
        this.firstAgree = false;
        this.secondAgree = false;
        this.thirdAgree = false;
        this.fourthAgree = false;
      }
    },
  }
}
</script>

<style lang='scss'>
  @import './css/signupPage.scss';
</style>