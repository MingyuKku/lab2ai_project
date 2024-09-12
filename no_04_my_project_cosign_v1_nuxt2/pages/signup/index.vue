<template>
  <div class="signupPage_wrap">
    <LoginForm />
    <!-- <CsHeader/> -->
    <div class="signup_body">
      <h1 class="title">
        회원가입
      </h1>
      <div class="signupForm">
        <div class="nickname_area">
          <h2>닉네임</h2>
          <input
            type="text" id="nickname" placeholder="닉네임을 입력해 주세요." autocomplete="off"
            v-model="nickname"
            ref="nickname"
          >
          <p class="input_tips"><i class="xi-info-o"></i>한글/영문/숫자 포함 2~10자</p>
          <span class="validation isNull" v-if="error.nickname.no_input"><i class="xi-error-o"></i>닉네임을 입력해 주세요.</span>
          <span class="validation isNickCombination" v-if="error.nickname.rule"><i class="xi-error-o"></i>한글/영문/숫자 포함 2~10자리 입력해 주세요.</span>
          <span class="validation isSameNicname" v-if="error.nickname.used"><i class="xi-error-o"></i>이미 사용 중인 닉네임입니다.</span>
        </div>
        <div class="email_area">
          <h2>이메일</h2>
          <input
            type="email" id="email" placeholder="이메일을 입력해 주세요." autocomplete="off"
            v-model="email"
            ref="email"
          >
          <span class="validation isNull" v-if="error.email.no_input"><i class="xi-error-o"></i>이메일을 입력해 주세요.</span>
          <span class="validation isNull" v-if="error.email.rule"><i class="xi-error-o"></i>이메일 형식이 유효하지 않습니다.</span>
          <span class="validation isSameEmail" v-if="error.email.used"><i class="xi-error-o"></i>이미 가입된 이메일입니다.</span>
        </div>
        <div class="password_area">
          <h2>비밀번호</h2>
          <div class="password_input_wrap">
            <input
              type="password" id="password" placeholder="비밀번호를 입력해 주세요." autocomplete="off"
              v-model="password"
              ref="password"
            >
            <p class="input_tips"><i class="xi-info-o"></i>영문/숫자/특수문자 중 2개 이상 포함 8자 이상</p>
            <span class="validation isNull" v-if="error.password.no_input"><i class="xi-error-o"></i>비밀번호를 입력해 주세요.</span>
            <span class="validation isPwCombination" v-if="error.password.rule"><i class="xi-error-o"></i>영문/숫자/특수문자 중 2가지 이상 포함 8자리 이상 입력해 주세요.</span>
          </div>
          <div class="password_input_wrap">
            <input type="password" placeholder="비밀번호를 한 번 더 입력해 주세요." autocomplete="off"
              v-model="passwordCheck"
            >
            <span class="validation isNull" v-if="error.password.check_no_input"><i class="xi-error-o"></i>비밀번호를 한 번 더 입력해 주세요.</span>
            <span class="validation isSamePassword" v-if="error.password.not_same"><i class="xi-error-o"></i>비밀번호가 일치하지 않습니다.</span>
          </div>
        </div>
        <div class="agreementCheck_area">
          <div class="allCheck_area">
            <input type="checkbox" id="allCheck" v-model="agree.all" @click="onClickAllAgree">
            <label for="allCheck">
              <div class="allCheckBox"><i class="xi-check"></i></div>
              <p>전체동의</p>
            </label>
            <p>필수동의 항목 및 이벤트 정보 수신(선택)에 전체 동의합니다.</p>
          </div><!--allCheck_area-->
          <ul class="checkList">
            <li>
              <input type="checkbox" id="list_1" v-model="agree.age">
              <label for="list_1">
                <div class="list_1_checkBox"><i class="xi-check"></i></div>
                <p>만 19세 이상입니다.</p>
                <span class="required">(필수)</span>
              </label>
            </li>
            <li>
              <input type="checkbox" id="list_2" v-model="agree.service">
              <label for="list_2">
                <div class="list_2_checkBox"><i class="xi-check"></i></div>
                <p>서비스 이용약관에 동의합니다.</p>
                <span class="required">(필수)</span>
              </label>
              <p class="more"><a href="/signup/info_terms"><i class="xi-angle-right"></i></a></p>
            </li>
            <li>
              <input type="checkbox" id="list_3" v-model="agree.private">
              <label for="list_3">
                <div class="list_3_checkBox"><i class="xi-check"></i></div>
                <p>개인정보 수집/이용에 동의합니다.</p>
                <span class="required">(필수)</span>
              </label>
              <p class="more"><a href="/signup/info_customer"><i class="xi-angle-right"></i></a></p>
            </li>
            <li>
              <input type="checkbox" id="list_4" v-model="agree.event">
              <label for="list_4">
                <div class="list_4_checkBox"><i class="xi-check"></i></div>
                <p>이벤트 할인 혜택 알림 수신에 동의합니다.</p>
                <span class="choose">(선택)</span>
              </label>
            </li>
          </ul><!--checkList-->
        </div><!--agreementCheck_area-->
        <span class="validation checkRequired"
          v-if="error.terms_check"
        >
          <i class="xi-error-o"></i>필수 항목에 동의해 주세요.
        </span>
        <div class="signupBtn"><button @click="signUp">회원가입</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/src/components/common/LoginForm.vue';
// import CsHeader from '@/src/components/common/CsHeader.vue';
import { mypage } from '@/src/mixin/mypage.js'

export default {
  name: 'SignupPage',
  components: {
    LoginForm,
  },
  mixins: [mypage],
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      passwordCheck: '',
      agree: {
        age: false,
        service: false,
        private: false,
        event: false,
        all: false
      },
      error: {
        nickname: {
          used: false,
          rule: false,
          no_input: false
        },
        email: {
          used: false,
          rule: false,
          no_input: false,
        },
        password: {
          not_same: false,
          rule: false,
          no_input: false,
          check_no_input: false
        },
        terms_check: false
      }
    }
  },
  computed: {
    validateSignup() {
      if(this.nickname.length > 0 && this.email.length > 0 && this.password.length > 0 && this.password === this.passwordCheck
        && this.agree.age && this.agree.service && this.agree.private) {
        
        if(this.nickNameValid && this.passwordValid) {
          return true;
        }
      }

      return false;
    },
  },
  mounted() {
    // alert("점검중에는 회원가입이 불가능합니다.");//feature_fix
  },
  watch: {
    'agree.age': {
      handler: function () {
        this.updateAllAgree();  
      },
      deep: true
    },
    'agree.service': {
      handler: function () {
        this.updateAllAgree(); 
      },
      deep: true
    },
    'agree.private': {
      handler: function () {
        this.updateAllAgree();  
      },
      deep: true
    },
    'agree.event': {
      handler: function () {
        this.updateAllAgree();  
      },
      deep: true
    },
  },
  methods: {
    updateAllAgree() {
      if(this.agree.age && this.agree.service && this.agree.private && this.agree.event) {
        this.agree.all = true;
      }

      if(this.agree.all === true && (!this.agree.age || !this.agree.service || !this.agree.private || !this.agree.event)) {
        this.agree.all = false;
      }
    },
    onClickAllAgree() {
      if(!this.agree.all) { // before state
        this.agree.age = true;
        this.agree.service = true;
        this.agree.private = true;
        this.agree.event = true;
      } else {
        this.agree.age = false;
        this.agree.service = false;
        this.agree.private = false;
        this.agree.event = false;
      }
    },
    // 문제가 있다 true, 문제가 없다 false
    validateEmail() {
      const emailSplitList = this.email.split('@');
      const dotSplitList = emailSplitList.length > 1? emailSplitList[1].split('.'): [];
      
      if(emailSplitList.length < 2) {
        this.error.email.rule = true;
        return true;
      } else if(emailSplitList[0].length < 2) {  
        this.error.email.rule = true;
        return true;
      } else if(dotSplitList.length < 2 || dotSplitList[0].length === 0 || dotSplitList[1].length === 0) {
        this.error.email.rule = true;
        return true;
      } else {
        this.error.email.rule = false;
        return false;
      }
    },
    uncheckAnotherError() {
      this.error = {
        nickname: {
          used: false,
          rule: false,
          no_input: false
        },
        email: {
          used: false,
          no_input: false
        },
        password: {
          not_same: false,
          rule: false,
          no_input: false,
          check_no_input: false
        },
        terms_check: false
      }
    },
    checkSignUp() {
      this.uncheckAnotherError();
      if(this.nickname.length === 0) {
        this.error.nickname.no_input = true;  // 닉네임error = 닉네임을 입력해 주세요.
        return false;
      } else if(!this.nickNameValid) {
        this.error.nickname.rule = true;  // 닉네임error = 한글/영문/숫자 포함 2~10자리 입력해 주세요.
        return false;
      } else if(this.email.length === 0) {
        this.error.email.no_input = true; // 이메일error = 이메일을 입력해 주세요.
        return false;
      } else if(this.validateEmail()) {
        this.error.email.rule = true; // 이메일error = 이메일 형식이 유효하지 않습니다.
        return false;
      } else if (this.password.length === 0) {
        this.error.password.no_input = true;  // 패스워드error = 비밀번호를 입력해 주세요.
        return false;
      } else if (this.passwordCheck.length === 0) {
        this.error.password.check_no_input = true;  // 패스워드error = 비밀번호를 한 번 더 입력해 주세요.
        return false;
      } else if(!this.passwordValid) {
        this.error.password.rule = true;  // 패스워드error = 영문/숫자/특수문자 중 2가지 이상 포함 8자리 이상 입력해 주세요.
        return false;
      } else if(this.password !== this.passwordCheck) {
        this.error.password.not_same = true;  // 패스워드error = 비밀번호가 일치하지 않습니다.
        return false;
      } else if(!this.agree.age || !this.agree.service || !this.agree.private) {
        this.error.terms_check = true;  // 필수동의error
        return false;
      } else {
        return true;
      }
    },
    async signUp() {
      window.gtag('event', '회원가입', {'event_category': '클릭', 'event_label': '회원가입'});
      if(this.checkSignUp()) {
        const params = {'username': this.email, 'nick_name': this.nickname, 'password': this.password, 'event_ck': this.agree.event};
        const res = await this.$axios.post(`/api/user/sign_up/join`, params.getParam(), {withCredentials: true});

        switch(res.data.error?.errorCode) {
          case undefined:
            alert("회원가입이 완료되었습니다.");
            location.href = "/";
            break;
          case '8':
            this.error.nickname.used = true;
            break;
          case '12':
            this.error.email.used = true;
            break;
          default:
            alert(this.$res_inspect(res, 'message'));
            break;
        }
      }
    }
  }
}
</script>

<style lang='scss'>
  @import '@/src/css/signup/signupPage.scss';
</style>