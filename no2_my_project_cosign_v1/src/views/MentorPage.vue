<template>
  <div class="mantorPage_wrap">    
    <LoginForm />
    <SignHistoryPopup/>
    <CsHeader class="cs_header"/>
    <SubscribePopup />
    <UnSubscribePopup />
    <section id="section1">
      <div class="section_wrap">
        <Profile class="profile"/>
        <EarningChart class="earningChart"/>
      </div>
    </section>
    <section id="section2">
      <div class="section_wrap">
        <Main class="main"/>
        <Side class="side"/>
      </div>
    </section>
    <footer>
      <ReferBottom/>
      <Footer class="footer"/>
    </footer>
    <div class="scrollTopUp" @click="moveToTop" :class="{show: isShowTopButton}">
      <i class="xi-angle-up"></i>
      <p>Top</p>
    </div>
    <ModelDescription/>
  </div>  <!--channel-->
</template>

<script>
import CsHeader from '@/components/common/CsHeader.vue'
import Profile from '@/components/mentorPage/top/Profile.vue'
import EarningChart from '@/components/mentorPage/top/EarningChart.vue'
import Main from '@/components/mentorPage/main/Main.vue'
import SignHistoryPopup from '@/components/mentorPage/main/SignHistoryPopup.vue'
import Side from '@/components/mentorPage/side/Side.vue'
import Footer from '@/components/common/Footer.vue'
import ReferBottom from '@/components/common/ReferBottom.vue'
import LoginForm from '@/components/common/LoginForm.vue'
import SubscribePopup from '@/components/common/SubscribePopup.vue'
import UnSubscribePopup from '@/components/common/UnSubscribePopup.vue'
import ModelDescription from '@/components/mentorPage/top/ModelDescription/ModelDescription';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    CsHeader, Profile, EarningChart, Main, Side, Footer, ReferBottom,
    SignHistoryPopup, LoginForm, SubscribePopup, UnSubscribePopup, ModelDescription,
  },
  data() {
    return {
      isShowTopButton: false
    }
  },
  computed: {
    ...mapGetters('signStore', ['pageId']),
    ...mapGetters('loginStore', ['loginInfo']),  
  }, 
  watch: {
    loginInfo(newVal, oldVal) {
      //멘토페이지에서 로그인한 경우 블러처리된 sign on을 재로드
      if(oldVal === null && newVal !== null) {
        this.route({mentor_id: this.$route.params.page_id, sign_seq_id: this.$route.params.sign_seq_id});
        this.checkSubscribe(this.$route.params.page_id);
      }
    }
  },
  mounted() {
    this.route({mentor_id: this.$route.params.page_id, sign_seq_id: this.$route.params.sign_seq_id});
    
    if(this.loginInfo !== null) {
      this.checkSubscribe(this.$route.params.page_id);
    }
    
    window.addEventListener('scroll', this.scrollMoveTopBtn) // TOP 버튼
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollMoveTopBtn) // TOP 버튼
  },
  methods: {
    ...mapActions('loginStore', ['checkSubscribe']),  
    ...mapActions('signStore', ['setPageId']),
    ...mapActions('mentorRouteStore', ['route']),
    moveToTop() {
      const {body} = document;
      body.scrollIntoView({
        behavior: 'smooth',
      })
    },
    scrollMoveTopBtn() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
      if(scrollTop > window.innerHeight) {
        this.isShowTopButton = true;
      } else {
        this.isShowTopButton = false;
      }
    },
  }

}
</script>

<style lang="scss">
  @import './css/mentorPage.scss';
</style>
