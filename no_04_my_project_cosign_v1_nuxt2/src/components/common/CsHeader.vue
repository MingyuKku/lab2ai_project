<template>
  <div class="header_wrap" ref="header_wrap" :class="{hide: isHideHeader}">
    <div class="header_container">
      <MentorAlarm :active='alarmActive' />
      <a href="/">
        <div class="main_logo">
          <!-- <img class="logo" :src="`${$static.imgUrl}index/main/web_header_cosign_bi.png`" alt="메인로고"> -->
          <img class="logo" :src="`${$static.imgUrl}index/main/web_header_cosign_bi_white.png`" alt="메인로고">
          <!-- <div class="img"></div> -->
        </div>
      </a>
      <ul class="gnb_menu">
        <!-- <li><a href="/test">테스트 </a></li> -->
        <!-- <li><a href="/service">고객센터</a></li> -->
        <li id="bell" @click="onClickBell" v-show="loginInfo !== null"
          :class="{active: alarmActive}">
          <img :src="`${$static.imgUrl}mentorPage/bell_white.svg`" alt="알림아이콘">
          <p class="newsCountBoard" v-if="loginInfo !== null && totalAlarmCount > 0">
            <span>{{Math.min(totalAlarmCount, 99)}}</span>
            <span v-if="totalAlarmCount > 99">+</span>
          </p>
          <span></span>
        </li>
        <li v-if="loginInfo === null" @click="onClickLogin">로그인<span></span></li> 
        <!-- <li v-else><a href="/mypage">마이페이지</a><span></span></li>  -->
        <li v-else><a href="/mypage/update">마이페이지</a><span></span></li> 
        <li v-show="loginInfo === null" class="memberJoin"><a href="/signup">회원가입</a><span></span></li>
        <li><a href="https://blog.cosign.cc/" target="_blank">블로그</a><span></span></li>
        <li><a href="/help" target="_self">고객센터</a><span v-show="loginInfo !== null"></span></li>
        <li v-show="loginInfo !== null" @click="Logout">로그아웃<span v-show="loginInfo === null"></span></li>
        <!-- <li @click="testRefresh"> 리프레시테스트</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import MentorAlarm from '@/src/components/common/MentorAlarm';
import { mapGetters, mapActions, mapMutations } from 'vuex';
  export default {
    name: 'CsHeader',
    components: {
      MentorAlarm,
    },
    data(){
      return {
        imgURL: process.env.VUE_APP_IMG_URL,
        lastScrollTop: 0,
        openMyPage: false,
        // alarmActive: false
      }
    },
    mounted(){
      this.$nextTick(()=> {
        window.addEventListener('scroll', this.hasScroll);
      })
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.hasScroll);
    },
    computed: {
      ...mapGetters('loginStore', ['loginInfo', 'totalAlarmCount']),
      ...mapGetters('signStore', ['isHideHeader']),
      ...mapGetters('popupStore', ['alarmActive'])
    },
    methods: {
      ...mapActions('signStore', ['hideHeader']),
      ...mapActions('loginStore', ['logout']),
      ...mapMutations('popupStore', ['showLoginPopup', 'showAlarm', 'hideAlarm']),
      onClickLogin() {
        this.showLoginPopup();
      },
      hasScroll(){
        const headerHeight = this.$refs.header_wrap.offsetHeight;
        let window_scroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
        if(window_scroll > headerHeight) {
          if(window_scroll > this.lastScrollTop){
            this.hideHeader(true);
          } else {
            this.hideHeader(false);
          }
          this.lastScrollTop = window_scroll;
        }
      },
      Logout() {
        this.logout();
      },
      onClickBell() {
        this.alarmActive ? this.hideAlarm():this.showAlarm();
        
        window.addEventListener('click', (w)=> {
          if(!w.target.closest('.myPage_wrap') && !w.target.closest('#bell')) {
            this.hideAlarm();
          }
        })
      },
      async testRefresh() {
        const res = await this.$local21000Api.post('/api/user/token/refresh', {}, {withCredentials: true})
      },
    }
  }
</script>

<style lang='scss'>
  @import '@/src/components/common/css/csHeader.scss';
</style>