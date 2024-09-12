<template>
  <div class="IntroduceMentorElement_wrap">
    <div class="mentorInfomation">
      <div class="mentorProfile">
        <div class="profile_img"><img :src="`${imgURL}index/main/profile_picture4_img.png`" alt="프로필이미지"></div>
        <h1>동전한닢의가치</h1>
      </div> <!--mentorProfile-->
      <div class="mentor_earning">
        <div class="donut_graph" style="background: conic-gradient(#F53B57 87.56%, #ddd 0%)">
          <div class="donut_graph_bg"></div>
          <i class="xi-trending-up"></i>
        </div>
        <div class="earning_data">
          <h2>평균 수익률</h2>
          <p><span>87.56</span>%</p>
        </div>
      </div>  <!--mentor_earning-->
    </div>  <!--mentorInfomation-->
    
    <div class="handleCoins clearFix">
      <h2>취급코인</h2>
      <ul class="coinImg">
        <li><img :src="`${imgURL}mentorPage/coin_100px/AAVE.png`" alt="코인이미지"></li>
        <li><img :src="`${imgURL}mentorPage/coin_100px/ADA.png`" alt="코인이미지"></li>
        <li><img :src="`${imgURL}mentorPage/coin_100px/AERGO.png`" alt="코인이미지"></li>
        <li><img :src="`${imgURL}mentorPage/coin_100px/AHT.png`" alt="코인이미지"></li>
        <li><img :src="`${imgURL}mentorPage/coin_100px/ANKR.png`" alt="코인이미지"></li>
        <li><img :src="`${imgURL}mentorPage/coin_100px/BCH.png`" alt="코인이미지"></li>
        <li><img :src="`${imgURL}mentorPage/coin_100px/ATOM.png`" alt="코인이미지"></li>
        <li><img :src="`${imgURL}mentorPage/coin_100px/1INCH.png`" alt="코인이미지"></li>
      </ul>
      <ul class="coinName">
        <li>AAVE</li>
        <li>ADA</li>
        <li>AERGO</li>
        <li>AHT</li>
        <li>ANKR</li>
        <li>BCH</li>
        <li>ATOM</li>
        <li>1INCH</li>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/introduceMentorElement.scss';
</style>