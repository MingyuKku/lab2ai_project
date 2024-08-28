<template>
  <div class="IntroduceMentorBestEarning_wrap clearFix" v-show="active">
    <div v-for="(img,idx) in mentorData" :key="idx">
      <img :src="img.img" alt="추천멘토이미지" :usemap="`#${img.name}`">
      <map :name="img.name" :key="img.path">
        <!-- <area shape="rect" coords="0,0,130,230" :href="img.path" alt="주소"> -->
        <area shape="rect" coords="0,0,130,230" :href="img.path" alt="주소">
      </map>
    </div>
    <div class="noItems" v-if="mentorData.length <= 0">
      <p><i class="xi-error-o"></i>최근 등록된 멘토가 없습니다</p>
    </div>
    <p>*2022년 05월 16일 09시 기준</p>
  </div>
</template>


<script>
export default {
  props: ['mentorData', 'active'],
  data() {
    return {
      // today: new Date().format('yyyy년 MM월 dd일')
    }
  },
}
</script>

<style lang='scss'>
  @import './css/introduceMentorBestEarning.scss';
</style>