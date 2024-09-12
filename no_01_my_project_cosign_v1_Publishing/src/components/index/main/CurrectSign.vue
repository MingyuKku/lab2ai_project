<template>
  <div class="currectSign_wrap">
    <div class="mentor">
      <div class="profile_img"><img :src="`${imgURL}index/main/profile_picture3_img.png`" alt="멘토프로필 이미지"></div>
      <h2>{{ currectSign.mentor }}</h2>
    </div>  <!--mentor-->
    <div class="coin">
      <div class="coin_img"><img :src="`${imgURL}mentorPage/coin_100px/BTC.png`" alt="코인이미지"></div>
      <div class="coin_name">
        <h2>{{ currectSign.coinName }}</h2>
        <p>BCH</p>
      </div>
    </div>  <!--coin-->
    <div class="earning" :class="{deficit: currectSign.earning<0}">
      <div class="data">
        <h2>수익률</h2>
        <p><span>{{currectSign.earning}}</span>%</p>
      </div>
      <div class="bar_graph">
        <span :style="{width: `${Math.abs(currectSign.earning)}%`}"></span>
      </div>
    </div>  <!--earning-->
    <div class="post_time">
      <div class="timeIcon"><img :src="`${imgURL}index/top/timeIcon.svg`" alt="시간아이콘"></div>
      <span>15</span>분전
    </div>  <!--update_time-->
  </div>
</template>

<script>
export default {
  props: ['currectSign'],
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  },
  
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/currentSign.scss';
</style>