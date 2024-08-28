<template>
  <div class="guidePage_wrap">
    <LoginForm />
    <CsHeader class="cs_header"/>
    <section id="section1">
      <VisualBanner ref="visualBanner" />
    </section>
    <section id="section2" ref="section2">
      <div class="center">
        <GuideLine/>
      </div>
    </section>
    <footer>
      <ReferBottom/>
      <Footer class="footer"/>
    </footer>
  </div>
</template>

<script>
import CsHeader from '@/components/common/CsHeader.vue'
import LoginForm from '@/components/common/LoginForm.vue'
import Footer from '@/components/common/Footer.vue'
import ReferBottom from '@/components/common/ReferBottom.vue'
import VisualBanner from '@/components/guidePage/VisualBanner.vue'
import GuideLine from '@/components/guidePage/GuideLine.vue'
export default {
  components: {CsHeader,LoginForm,Footer,ReferBottom,VisualBanner,GuideLine},
  mounted() {
    window.addEventListener('scroll', this.moveBgPos)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.moveBgPos)
  },
  methods: {
    moveBgPos() {
      let scrollVol = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
      let section2 = this.$refs.section2;
      let title = this.$refs.visualBanner.$refs.title;

      if(section2.getBoundingClientRect().top + window.pageYOffset < scrollVol) return;
      
      section2.style.boxShadow = `0 -60px ${48 + scrollVol/2}px rgba(0, 0, 0, ${0 + scrollVol/400})`;
      title.style.transform = `translate3d(0,${0 - scrollVol/3}px,0)`;
    }
  }
}
</script>

<style lang='scss'>
  @import './css/guidePage.scss';
</style>