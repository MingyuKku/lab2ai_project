<template>
  <div class="indexLogin_wrap">
    <div class="partnerLoginForm">
      <div class="form_head">
        <div class="title">
          <div class="loginLogo"><img :src="`${imgURL}index/main/web_login_cosign_bi.png`" alt="로고"></div>
        </div>
      </div>
      
      <div class="form_body">
        <div class="input_wrap" :class="{focus: focusIndex === idx}" v-for="(input,idx) in loginInput" :key="input.id">
          <input autocomplete="off" :type="input.type" :id="input.id" :placeholder="input.placeholder"
            v-model="input.bind" @focus="focusIndex = idx" @blur="focusIndex = null"
            @keyup.enter="onClickLoginButton"
          >
          <label :for="input.id"><i :class="input.xIcon"></i></label>
        </div>
        <button @click="onClickLoginButton">로그인</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { api_postLogin } from '@/api/login'

export default {
  components: {
  },
  data() {
    return {
      loginInput: [
        {type: 'text', id: 'partner_id', placeholder: '이메일을 입력해주세요', bind: '', xIcon: 'xi-user'},
        {type: 'password', id: 'partner_pw', placeholder: '비밀번호를 입력해주세요', bind: '', xIcon: 'xi-key'},
      ],
      focusIndex: null,
    }
  },
  methods: {
    ...mapActions('loginStore', ['login', 'partnerLogin', 'logout']),
    async onClickLoginButton() {
      let user = {
        username: this.loginInput[0].bind,
        password: this.loginInput[1].bind,
      }
      
      await api_postLogin(user)
      .then(res=> {
        this.login(res.data);
        this.$router.push('/manager/faq').catch(()=>true);
      })
      .catch(err => {
        alert('아이디, 비밀번호가 잘못되었습니다.', err);
      })
    },
  }
}
</script>

<style lang='scss'>
  @import './css/indexLogin.scss';
</style>