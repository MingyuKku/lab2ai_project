<template>
  <transition name='fade'>
    <div class="modal" v-show="loginPopup" @click="onClickClose">
      <transition name='bounce'>
        <div class="login_form_wrap" v-show="loginPopup">
          <div class="box">
            <div class="logo"><img :src="`${imgURL}mentorPage/login_logo.png`" alt="메인로고"></div>
            <div class="login-form">
              <input ref="userId" type="text" placeholder="아이디를 입력해 주세요" v-model="id" @keyup.enter="onClickLoginButton">
              <input type="password" placeholder="비밀번호를 입력해 주세요" v-model="password" @keyup.enter="onClickLoginButton">
              <button @click="onClickLoginButton">로그인</button>
            </div>
            <div class="login_help_area">
              <div class="login_id_save">
                <input type="checkbox" id="id_save">
                <label for="id_save">아이디저장</label>
              </div>
              <div class="login_help">
                <p>아이디 찾기</p>
                <span></span>
                <p><a href="/forgot_password">비밀번호 찾기</a></p>
              </div>
            </div>  <!--login_help_area-->
            <div class="join_member_area">
              <p>아직 회원이 아니신가요?</p>
              <span>회원가입<i class="xi-long-arrow-right"></i></span>
            </div>
          </div>  <!--box-->
          <div class="close" @click="onClickClose">
            <i class="xi-close-thin"></i>
          </div>
        </div>  <!--login_form_wrap-->
      </transition>
    </div><!--modal-->
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

export default {
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      id: '',
      password: ''
    }
  },
  mounted() {
    console.log('로그인여부 테스트', this.loginInfo)
    this.$refs.userId.focus()
  },
  watch: {
    loginPopup(val) {
      if(val) {
        this.focusUserId();
        // this.$refs.userId.focus();
        console.log('인풋태그', this.$refs.userId)
      } else {
        this.$refs.userId.blur();
      }
    }
  },
  computed: {
    ...mapGetters('signStore', ['loginPopup', 'pageId']),    
    ...mapGetters('loginStore', ['loginInfo']),  
  },
  methods: {
    ...mapActions('signStore', ['showLoginPopup']),
    ...mapActions('loginStore', ['login', 'checkSubscribe']),
    async onClickLoginButton() {
      axios.post(`${API_URL}/api/login`, 
      {'username': this.id, 'password': this.password}.getParam(),
      {withCredentials: true})
      .catch(err => {
        console.log(err);
        alert('아이디, 비밀번호가 잘못되었습니다.');
      })
      .then(res => {
        this.login(res.data);
        alert('성공적으로 로그인되었습니다.');
        this.showLoginPopup(false);
        if(this.pageId !== null) {  //멘토페이지 안에 있을 때, 구독여부를 확인한다!
          this.checkSubscribe(this.pageId);
        }
      });
    },
    onClickClose(e) {
      if(e.target.className === 'modal' || e.target.className === 'xi-close-thin') {
        this.showLoginPopup(false)
      }
    },
    focusUserId() {
      console.log('몸통클릭')
      this.$refs.userId.focus();
    }
  }
}
</script>

<style lang='scss'>
  @import './css/loginForm.scss';

</style>