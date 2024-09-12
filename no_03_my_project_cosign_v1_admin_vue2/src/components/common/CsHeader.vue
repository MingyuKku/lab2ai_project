<template>
  <div class="header_wrap" ref="header_wrap">
    <div class="header_container">
      <router-link to="/manager/faq">
        <div class="main_logo">
          <!-- <img class="logo" :src="`${imgURL}index/main/web_header_cosign_bi.png`" alt="메인로고"> -->
          <!-- <img class="logo" :src="`${imgURL}index/main/header_beta_BI.png`" alt="메인로고"> -->
          <img class="logo" :src="`${imgURL}index/main/web_header_cosign_bi_white.png`" alt="메인로고">
        </div>
      </router-link>
      <ul class="gnb_menu">
        <li v-if="loginInfo === null" @click="onClickLogin">로그인<span></span></li> 
        <!-- <li v-if="$route.meta.islogin === false" @click="onClickLogin">로그인<span></span></li>  -->
        <li v-show="loginInfo !== null" @click="Logout">로그아웃<span v-show="loginInfo === null"></span></li>
        <!-- <li v-show="$route.meta.islogin === true" @click="Logout">로그아웃<span v-show="$route.meta.islogin === false"></span></li> -->
        <li><a href="https://www.cosign.cc/help">고객센터</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, } from 'vuex';
  export default {
    name: 'CsHeader',
    components: {
    },
    data(){
      return {
        lastScrollTop: 0,
        openMyPage: false,
        // alarmActive: false
      }
    },
    computed: {
      ...mapGetters('loginStore', ['loginInfo',]),
    },
    methods: {
      ...mapActions('loginStore', ['logout']),
      onClickLogin() {

      },
      Logout() {
        this.logout();
      },
    }
  }
</script>

<style lang='scss'>
  @import '@/components/common/css/csHeader.scss';
</style>