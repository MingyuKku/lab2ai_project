<template>
  <div class="modal" v-show="isShowLoginPopup" @click="onClickClose">
    <transition name='bounce'>
      <div class="login_form_wrap" v-show="isShowLoginPopup">
        <div class="box">
          <div class="logo"><img :src="`${$static.imgUrl}index/main/web_login_cosign_bi.png`" alt="메인로고"></div>
          <div class="login-form">
            <input ref="userId" type="text" placeholder="이메일을 입력해 주세요" v-model="id" @keyup.enter="onClickLoginButton">
            <input type="password" placeholder="비밀번호를 입력해 주세요" v-model="password" @keyup.enter="onClickLoginButton">
            <button @click="onClickLoginButton">로그인</button>
          </div>
          <div class="login_help_area">
            <div class="login_id_save">
              <input type="checkbox" id="id_save" v-model="saveId">
              <label for="id_save">아이디저장</label>
            </div>
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import firebase from 'firebase/app';

export default {
  data() {
    return {
      id: '',
      password: '',
      token: '',
      saveId: false
    }
  },
  mounted() {
    const messaging = firebase.messaging()
    messaging.getToken().then(param => {
      console.log("is it token?", param);
      this.token = param;
    })

    this.getUserIdCookie()
  },
  watch: {
    isShowLoginPopup(val) {
      if(val) {
        this.$nextTick(() => {
          this.$refs.userId.focus();
        })
      } 
    }
  },
  computed: {
    ...mapGetters('popupStore', ['isShowLoginPopup']),    
    ...mapGetters('loginStore', ['loginInfo']),  
  },
  methods: {
    ...mapMutations('popupStore', ['hideLoginPopup']),
    ...mapActions('loginStore', ['login', 'checkSubscribe']),
    routerToSignup() {
      this.hideLoginPopup();
      this.$router.push('/signup');
    },
    async onClickLoginButton() {
      const userInfo = {
        'username': this.id,
        'password': this.password,
      }

      this.$userIntApi.post(`/api/user/login`, userInfo.getParam(), {withCredentials: true})
      .catch(err => {
        console.log(err);
        alert('아이디, 비밀번호가 잘못되었습니다.');
      })
      .then(res => {
        if(this.$res_inspect(res, 'inspect')) {
          if(this.saveId) {
            this.$cookies.set('userId', this.id, {  // 유저 아이디를 쿠키로 저장
              path: '/',
              maxAge: 60 * 60 * 24 * 7
            })

          } else this.$cookies.remove('userId');

          location.reload();

        } else {
          alert(this.$res_inspect(res, 'message'))
        }
      })
    },
    getUserIdCookie() {
      const userId = this.$cookies.get('userId');

      if(userId !== undefined || userId !== '') {
        this.saveId = true;
        this.id = userId;
        
      } else this.saveId = false;
    },
    onClickClose(e) {
      if(e.target.className === 'modal' || e.target.className === 'xi-close-thin') {
        this.hideLoginPopup();
      }
    },
  }
}
</script>

<style lang='scss'>
  @import './css/loginForm.scss';

</style>