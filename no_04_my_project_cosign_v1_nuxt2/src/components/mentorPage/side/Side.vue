<template>
  <div class="side_wrap">
    <!-- <TalkList class="talk" :mentorId="mentorId" /> -->
    <TopMentor class="recommendMentor" />
    <div class="kakaoAd_side">
      <ins class="kakao_ad_area" style="display:none;" 
        data-ad-unit    = "DAN-sPo0yFrRKSMPjUIp" 
        data-ad-width   = "300" 
        data-ad-height  = "250"
      ></ins> 
    </div>
  </div>
</template>

<script>
// import TalkList from '@/src/components/mentorPage/side/TalkList.vue';
import TopMentor from '@/src/components/mentorPage/side/TopMentor.vue';

export default {
  components: {
    // TalkList, 
    TopMentor
  },
  props: ['mentorId']
}
</script>

<style scoped lang='scss'>
  @import './css/side.scss'
</style>