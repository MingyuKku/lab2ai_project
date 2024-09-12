<template>
  <div class="index_wrap">
    <LoginForm />
    <CsHeader class="cs_header"/>
    <section id="section1">
      <div class="center">
        <div class="left">
          <VisualSlide class="visualSlide"/>
        </div>
        <div class="right">
          <InfomationArea class="informationArea"/>
        </div>
      </div>
    </section>
    <section id="section2">
      <div class="center">
        <BestEarningSign class="bestEarningSign"/>
        <BestExchangeSign class="bestExchangeSign"/>
        <HighEarningSign class="highEarningSign"/>
      </div>
    </section>
    <section id="section3">
      <div class="center">
        <PromotionArea/>
        <span class="circleBg circle1"></span>
        <span class="circleBg circle2"></span>
        <span class="circleBg circle3"></span>
      </div>
    </section>
    <main id="section4_wrap">
      <div class="backgroundDecoration1"></div>
      <div class="backgroundDecoration2"></div>
      <div class="backgroundDecoration3"></div>
      <section id="section4">
        <div class="center">
          <CurrentSignList class="currentSignList"/>
          <IntroduceMentor class="introduceMentor"/>
        </div>
      </section>
      <footer>
        <Footer/>
      </footer>
    </main>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm';
import CsHeader from '@/components/common/CsHeader';
import InfomationArea from '@/components/index/top/InfomationArea';
import VisualSlide from '@/components/index/top/VisualSlide';
import BestEarningSign from '@/components/index/main/BestEarningSign';
import BestExchangeSign from '@/components/index/main/BestExchangeSign';
import HighEarningSign from '@/components/index/main/HighEarningSign';
import PromotionArea from '@/components/index/main/PromotionArea';
import CurrentSignList from '@/components/index/main/CurrentSignList';
import IntroduceMentor from '@/components/index/main/IntroduceMentor';
import Footer from '@/components/common/Footer';
export default {
  components: {
    LoginForm, CsHeader, InfomationArea, VisualSlide,
    BestEarningSign, BestExchangeSign, HighEarningSign, PromotionArea,
    CurrentSignList, IntroduceMentor,
    Footer,
  },
  methods: {
    
  }
}
</script>

<style lang='scss'>
  @import '@/views/css/indexHome.scss';
</style>