<template>
  <div class="serviceCenter_wrap">
    <main>
      <CsHeader/>
      <LoginForm />
      <ServiceModal v-if="modalFlag"
        :modalContIdx="modalContIdx"
        :checkFiles="checkFiles"
        @closeModal="controlModal"
      />
      <div class="center">
        <div class="side">
          <ServiceSide
            :sideMenu="servicePage"
          />
        </div>
        <main class="service_main">
          <NuxtChild @openModal="controlModal"></NuxtChild>
        </main>
      </div>
    </main>
    <footer class="footer_wrap">
      <Footer/>
    </footer>
  </div>
</template>

<script>
import CsHeader from '@/src/components/common/CsHeader.vue';
import LoginForm from '@/src/components/common/LoginForm.vue';
import ServiceSide from '@/src/components/serviceCenter/ServiceSide';
import ServiceModal from '@/src/components/serviceCenter/ServiceModal.vue'
import Footer from '@/src/components/common/Footer';
import { mapActions } from 'vuex';
export default {
  components: {CsHeader,LoginForm,ServiceSide,ServiceModal,Footer},
  data() {
    return {
      modalFlag: false,
      modalContIdx: null,
      checkFiles: null,
      servicePage: [
        {tit:'자주 묻는 질문', path: '/help/faq', name: 'help-faq'},
        {tit:'공지사항', path: '/help/notice', name: 'help-notice'},
        {tit:'1:1 문의', path: '/help/qna', name: 'help-qna'},
        {tit:'문의 내역', path: '/help/qnalist', name: 'help-qnalist'},
      ],
      interval: 0,
      time: 0
    }
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
    controlModal(val, idx, both) {
      this.modalContIdx = idx
      this.modalFlag = val;
      this.checkFiles = both;
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
  @import '@/src/css/serviceCenter/serviceCenter.scss';
</style>