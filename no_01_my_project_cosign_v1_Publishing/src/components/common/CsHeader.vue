<template>
  <div class="header_wrap" :class="{hide: isHideHeader}">
    <div class="header_container">
      <MentorAlarm :active='alarmActive' :alarmClose="alarmClose"/>
      <a href="/">
        <div class="main_logo">
          <img class="logo" src="@/images/mentorPage/main_logo.png" alt="메인로고">
        </div>
      </a>
      <ul class="gnb_menu">
        <li v-if="loginInfo === null" @click="onClickLogin">로그인</li> 
        <li v-else><a href="/my_page">{{ loginInfo.username }}</a></li> 
        <li v-if="loginInfo !== null" @click="Logout">로그아웃</li> 
        <li v-else class="memberJoin"><a href="/signup">회원가입</a></li>
        <li id="bell" @click="onClickBell" v-show="loginInfo !== null"
            :class="{active: alarmActive}">
          <img :src="`${imgURL}mentorPage/bell.svg`" alt="알림아이콘">
          <p class="newsCountBoard">
            <span v-if="loginInfo !== null">{{Math.min(loginInfo.totalAlarmCount, 99)}}</span>
            <span v-if="loginInfo !== null && loginInfo.totalAlarmCount > 99">+</span>
          </p>
        </li>
        <li><img :src="`${imgURL}mentorPage/hamburger_menu.svg`" alt="햄버거메뉴"></li>
      </ul>
    </div>
  </div>
</template>

<script>
const { body } = document;
import MentorAlarm from '@/components/common/MentorAlarm';
import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'CsHeader',
    components: {
      MentorAlarm,
    },
    data(){
      return {
        imgURL: process.env.VUE_APP_IMG_URL,
        moveScroll: '',
        lastScrollTop: 0,
        openMyPage: false,
        alarmActive: false
      }
    },
    mounted(){
      window.addEventListener('scroll', this.hasScroll);
    },
    computed: {
      ...mapGetters('loginStore', ['loginInfo']),
      ...mapGetters('signStore', ['isHideHeader']),
    },
    methods: {
      ...mapActions('signStore', ['showLoginPopup', 'hideHeader']),
      ...mapActions('loginStore', ['logout']),
      onClickLogin() {
        this.showLoginPopup(true);
      },
      hasScroll(){
        this.$nextTick(()=> {
          let headerHeight = document.querySelector('.header_wrap').offsetHeight;
          let window_scroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
          if(window_scroll > headerHeight) {
            if(window_scroll > this.lastScrollTop){
              this.hideHeader(true);
            } else {
              this.hideHeader(false);
            }
            this.lastScrollTop = window_scroll;
          }
        })
      },
      Logout() {
        if(window.confirm("로그아웃하시겠습니까?")) {
          this.logout();
        }
      },
      onClickBell() {
        if(window.matchMedia('screen and (max-width: 480px)').matches) {
          body.style.overflow = 'hidden';
        }

        // const target = e.currentTarget;
        // if(target.classList.contains('active')) {
        //   target.classList.remove('active')
        //   this.openMyPage = false;
        // } else {
        //   target.classList.add('active')
        //   this.openMyPage = true;
        // }

        if(this.alarmActive) {
          this.alarmActive = false;
        } else {
          this.alarmActive = true;
        }

        window.addEventListener('click', (w)=> {
          if(!w.target.closest('.myPage_wrap') && !w.target.closest('#bell')) {
            this.alarmActive = false;
          }
        })
      },
      alarmClose() {
        this.alarmActive = false;
      }
    }
  }
</script>

<style lang='scss'>
  @import '@/components/common/css/csHeader.scss';
</style>