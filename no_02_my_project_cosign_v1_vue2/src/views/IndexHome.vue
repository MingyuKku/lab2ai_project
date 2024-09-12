<template>
  <div class="index_wrap">
    <LoginForm />
    <CsHeader class="cs_header"/>
    <section id="section1">
      <!-- <div class="center"> -->
        <VisualSlide class="visualSlide"/>
        <!-- <div class="left">
          <VisualSlide class="visualSlide"/>
        </div>
        <div class="right">
          <InfomationArea class="informationArea"/>
        </div> -->
      <!-- </div> -->
    </section>
    <section id="section2">
      <div class="center">
        <MentorList class="mentorList" />
      </div>
    </section>
    <section id="section3">
      <div class="bestEarningSign_area">
        <div class="center">
          <BestEarningSign class="bestEarningSign"/>
        </div>
      </div>
      <div class="center">
        <ShortValidationSign class="shortValidationSign"/>
        <MajorCoinSign class="majorCoinSign"/>
      </div>
    </section>
    <section id="section4">
      <TodayMentor/>
        <!-- <PromotionArea/> -->
        <!-- <TableArea class="tableArea"/>
        <IntroduceMentor class="introduceMentor"/> -->
    </section>
    <section id="section5">
      <div class="center">
        <RecommendMentor/>
      </div>
    </section>
    <section id="section6">
      <div class="center">
        <TableList/>
      </div>
    </section>
    <footer>
      <ReferBottom/>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm';
import CsHeader from '@/components/common/CsHeader';
// import InfomationArea from '@/components/index/top/InfomationArea';
import VisualSlide from '@/components/index/top/VisualSlide';
import MentorList from '@/components/index/main/MentorList';
import BestEarningSign from '@/components/index/main/BestEarningSign';
import ShortValidationSign from '@/components/index/main/ShortValidationSign';
import MajorCoinSign from '@/components/index/main/MajorCoinSign';
import TodayMentor from '@/components/index/main/TodayMentor';
import RecommendMentor from '@/components/index/main/RecommendMentor';
// import PromotionArea from '@/components/index/main/PromotionArea';
// import TableArea from '@/components/index/main/TableArea';
// import IntroduceMentor from '@/components/index/main/introduceMentor/IntroduceMentor';
import TableList from '@/components/index/main/TableList';
import Footer from '@/components/common/Footer';
import ReferBottom from '@/components/common/ReferBottom';
export default {
  components: {
    // InfomationArea
    LoginForm, CsHeader, VisualSlide, MentorList,
    BestEarningSign, ShortValidationSign, MajorCoinSign,
    TodayMentor, RecommendMentor,
    // PromotionArea,
    // TableArea, IntroduceMentor, 
    TableList,
    Footer, ReferBottom,
  },
  methods: {
    
  },
  metaInfo() {
    return {
      meta: [
        {name: 'description', content: "AI와 투자 전문가가 찾아내는 가상화폐 예측 플랫폼"},
        {name: 'keywords', content: "가상화폐,암호화폐,비트코인,이더리움,도지코인,알트코인,코인전망,코인시세,비트코인시세,비트코인예측,투자정보"}
      ]
    }
  },
}
</script>

<style lang='scss'>
  @import '@/views/css/indexHome.scss';
</style>