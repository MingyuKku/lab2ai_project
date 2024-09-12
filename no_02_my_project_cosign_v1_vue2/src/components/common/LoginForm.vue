<template>
  <div class="modal" v-show="loginPopup" @click="onClickClose">
    <transition name='bounce'>
      <div class="login_form_wrap" v-show="loginPopup">
        <div class="box">
          <div class="logo"><img :src="`${imgURL}index/main/web_login_cosign_bi.png`" alt="메인로고"></div>
          <div class="login-form">
            <input ref="userId" type="text" placeholder="이메일을 입력해 주세요" v-model="id" @keyup.enter="onClickLoginButton">
            <input type="password" placeholder="비밀번호를 입력해 주세요" v-model="password" @keyup.enter="onClickLoginButton">
            <button @click="onClickLoginButton">로그인</button>
          </div>
          <div class="login_help_area">
            <!-- <div class="login_id_save">
              <input type="checkbox" id="id_save">
              <label for="id_save">아이디저장</label>
            </div> -->
            <div class="login_help">
              <!-- <p>아이디 찾기</p> 아이디를 찾을 방법이 없어요..
              <span></span> -->
              <p><a href="/forgot_password">비밀번호 찾기</a></p>
            </div>
          </div>  <!--login_help_area-->
          <div class="join_member_area">
            <p>아직 회원이 아니신가요?</p>
            <span @click="routerToSignup">회원가입<i class="xi-long-arrow-right"></i></span>
          </div>
        </div>  <!--box-->
        <div class="close" @click="onClickClose">
          <i class="xi-close-thin"></i>
        </div>
      </div>  <!--login_form_wrap-->
    </transition>
  </div><!--modal-->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';
import firebase from 'firebase/app';

export default {
  data() {
    return {
      id: '',
      password: '',
      token: ''
    }
  },
  mounted() {
    const messaging = firebase.messaging()
    messaging.getToken().then(param => {
      console.log("is it token?", param);
      this.token = param;
    })
  },
  watch: {
    loginPopup(val) {
      if(val) {
        this.$nextTick(() => {
          this.$refs.userId.focus();
        })
      } 
    }
  },
  computed: {
    ...mapGetters('signStore', ['loginPopup']),    
    ...mapGetters('loginStore', ['loginInfo']),  
  },
  methods: {
    ...mapActions('signStore', ['showLoginPopup']),
    ...mapActions('loginStore', ['login', 'checkSubscribe']),
    routerToSignup() {
      this.showLoginPopup(false)
      this.$router.push('/signup');
    },
    async onClickLoginButton() {
      axios.post(`${API_URL}/api/login`, 
      {'username': this.id, 'password': this.password, 'fcmToken': this.token}.getParam(),
      {withCredentials: true})
      .catch(err => {
        console.log(err);
        alert('아이디, 비밀번호가 잘못되었습니다.');
      })
      .then(res => {
        this.login(res.data);
        this.showLoginPopup(false);
      });
    },
    onClickClose(e) {
      if(e.target.className === 'modal' || e.target.className === 'xi-close-thin') {
        this.showLoginPopup(false)
      }
    },
  }
}
</script>

<style lang='scss'>
  @import './css/loginForm.scss';

</style>