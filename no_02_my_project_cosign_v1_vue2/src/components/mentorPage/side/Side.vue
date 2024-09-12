<template>
  <div class="side_wrap">
    <TalkList class="talk"/>
    <RecommendMentor class="recommendMentor" />
  </div>
</template>

<script>
import TalkList from '@/components/mentorPage/side/TalkList.vue';
import RecommendMentor from '@/components/mentorPage/side/TopMentor.vue';

export default {
  components: {
    TalkList, RecommendMentor
  }
}
</script>

<style scoped lang='scss'>
  .talk {
    margin-bottom: 16px;
  }
  @media screen and (max-width: 480px) {
    .talk {
      margin-bottom: 12px;
    }
  }
</style>