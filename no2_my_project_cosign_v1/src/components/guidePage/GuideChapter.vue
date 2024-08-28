<template>
  <div class="guideChapter_wrap">
    <div class="chapter_inner">
      <div class="left_cont">
        <slot name="img"></slot>
      </div>
      <div class="right_cont">
        <div class="cont_inner">
          <slot name="contents"></slot>
          <div class="sub_img" v-show="index === 3">
            <p>*사이트 정보보기 > 알림 허용</p>
            <div class="img"><img :src="`${imgURL}index/main/guidePage/guideImg4.png`" alt="서브이미지"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
  },
  mounted() {
  }
}
</script>

<style lang='scss'>
  @import './css/guideChapter.scss';
</style>