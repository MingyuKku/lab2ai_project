<template>
  <div class="app">
    <CsHeader/>
    <Nuxt />
    <footer>
      <ReferBottom/>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import CsHeader from '@/src/components/common/CsHeader';
import ReferBottom from '@/src/components/common/ReferBottom';
import Footer from '@/src/components/common/Footer';
import { mapActions } from 'vuex';
export default {
  components: {CsHeader,ReferBottom,Footer},
  data() {
    return {
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
  footer {
    background: $backgroundColor;
    overflow: hidden;
  }
</style>


