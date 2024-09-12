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
      <Footer class="footer"/>
    </footer>
    <div class="scrollTopUp" @click="moveToTop">
      <i class="xi-angle-up"></i>
      <p>Top</p>
    </div>
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
import LoginForm from '@/components/common/LoginForm.vue'
import SubscribePopup from '@/components/common/SubscribePopup.vue'
import UnSubscribePopup from '@/components/common/UnSubscribePopup.vue'

import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    CsHeader, Profile, EarningChart, Main, Side, Footer,
    SignHistoryPopup, LoginForm, SubscribePopup, UnSubscribePopup
  },
  computed: {
    ...mapGetters('signStore', ['pageId'])
  }, 
  watch: {
    '$route.params.page_id': {
      handler: function(page_id) {
        this.init(page_id)
      }
    }
  },
  mounted() {
    this.init(this.$route.params.page_id);
    window.addEventListener('scroll', ()=> {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
      if(scrollTop > window.innerHeight) {
        this.$el.querySelector('.scrollTopUp').classList.add('show')
      } else {
        this.$el.querySelector('.scrollTopUp').classList.remove('show')
      }
    })
  },
  methods: {
    ...mapActions('loginStore', ['checkSubscribe']),  
    ...mapActions('signStore', ['setPageId']),
    init(page_id) {
        this.setPageId(page_id);
        this.checkSubscribe(page_id);
    },
    moveToTop() {
      const {body} = document;
      body.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

}
</script>

<style lang="scss">
  @import './css/mentorPage.scss';
</style>
