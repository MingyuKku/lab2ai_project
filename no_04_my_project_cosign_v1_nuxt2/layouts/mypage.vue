<template>
  <div class="myPage_setting_wrap">
    <LoginForm/>
    <CsHeader/>
    <div class="myPage_body">
      <div class="myPage_left">
        <div class="title">마이페이지</div>
        <ul class="menus">
          <li v-for="(setting, idx) in settingList" :key="idx" :class="{active: pageIdx === idx}">
            <p @click="routePage(setting.name, idx)">{{ setting.list }}</p>
          </li>
        </ul>
      </div>
      <div class="myPage_right">
        <NuxtChild/>
      </div>
    </div>
    <footer>
      <ReferBottom/>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import LoginForm from '@/src/components/common/LoginForm';
import CsHeader from '@/src/components/common/CsHeader';
import ReferBottom from '@/src/components/common/ReferBottom';
import Footer from '@/src/components/common/Footer';
import { mapActions } from 'vuex';
export default {
  components: {CsHeader, LoginForm, ReferBottom, Footer},
  middleware({store, redirect}) {
    if(!store.state.loginStore.login_info) return redirect('/');
  },
  data() {
    return {
      settingList: [
        // {list: '구독 결제 내역', path: '/mypage', name: 'mypage'},
        {list: '개인 정보 수정', path: '/mypage/update', name: 'mypage-update'},
        {list: '비밀번호 변경', path: '/mypage/password_change', name: 'mypage-password_change'},
        // {list: '회원탈퇴', path: '/secession'},
      ],
      pageIdx: 0,
      interval: 0,
      time: 0
    }
  },
  fetch() {
    this.setSideMenuActive(this.$route.name)
  },
  watch: {
    // $route() {
    //   console.log('이거바뀌나')
    //   this.setSideMenuActive(this.$route.meta.index)
    // }
  },
  mounted() {
    if(this.$cookies.get('acc') !== undefined) {
      this.startTime();

      window.addEventListener('mousemove', this.initTime)
      window.addEventListener('keydown', this.initTime)
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions('loginStore', ['logout']),
    setSideMenuActive(name) {
      switch(name) {
        // case 'mypage' : this.pageIdx = 0; break;
        // case 'mypage-update' : this.pageIdx = 1; break;
        // case 'mypage-secession' : this.pageIdx = 1; break;
        // case 'mypage-password_change' : this.pageIdx = 2; break;
        case 'mypage-update' : this.pageIdx = 0; break;
        case 'mypage-secession' : this.pageIdx = 0; break;
        case 'mypage-password_change' : this.pageIdx = 1; break;
        default : this.pageIdx = 0;
      }
    },
    routePage(name, idx) {
      let current = this.$router.history.current;
      this.pageIdx = idx;
      if(current.name === name) {
        this.$router.go(0)
      } else this.$router.push({name: name})
    },
    startTime() {
      this.interval = setInterval(() => {
        this.time++;
        if(this.time >= 1440) {
          clearInterval(this.interval)
          this.time = 0;
          alert('장시간 이용이 없어 로그아웃되었습니다.')
          this.logout();
        }
      }, 60000)
    },
    initTime() {
      if(!this.time) return;
      else {
        clearInterval(this.interval)
        this.time = 0;
        this.startTime();
      }
    }
  }
}
</script>

<style lang='scss'>
  @import "@/src/css/mypage/myPage.scss";
</style>