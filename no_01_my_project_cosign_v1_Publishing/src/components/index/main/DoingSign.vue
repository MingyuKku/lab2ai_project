<template>
  <div class="doingSign_wrap">
    <div class="coin">
      <div class="coin_img"><img :src="`${imgURL}mentorPage/coin_100px/BSV.png`" alt="코인이미지"></div>
      <div class="coin_name">
        <h2>{{ currectSign.coinName }}</h2>
        <p>BSV</p>
      </div>
    </div>  <!--coin-->
    <div class="mentor">
      <div class="profile_img"><img :src="`${imgURL}index/main/profile_picture3_img.png`" alt="멘토프로필 이미지"></div>
      <h2>{{ currectSign.mentor }}</h2>
    </div>  <!--mentor-->
    <div class="buy_price">
      <h2>진입가</h2>
      <p>62,110,000</p>
    </div>  <!--buy_price-->
    <div class="predict_earning">
      <h2>예상 수익률</h2>
      <p :class="{deficit: currectSign.earning<0}">
        <i class="xi-trending-up"></i><span>{{ currectSign.earning }}</span>%
      </p>
    </div>  <!--earning-->
    <div class="remaing_time">
      <h2>남은시간</h2>
      <p><span>12분 35초</span></p>
    </div>  <!--remaing_time-->
  </div>
</template>

<script>
export default {
  props: {
    currectSign: Object,
  },
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/doingSign.scss';
</style>