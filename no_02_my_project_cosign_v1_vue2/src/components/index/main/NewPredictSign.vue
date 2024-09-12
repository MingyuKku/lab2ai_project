<template>
  <div class="newPredictSign_wrap">
    <a :href="item.url">
      <div class="inner">
        <div class="coin">
          <div class="coinImg"><img :src="item.marketImg" alt="코인 이미지"></div>
          <h1>{{ item.market }}</h1>
        </div>
        <div class="earning">
          <span :style="{width: earningWidth}">{{ item.targetEarningRateText }}%</span>
          
        </div>
        <div class="validation">
          <!-- {{ item.minuteText }} -->
          <i class="xi-time-o"></i>{{ item.validationTime }}
        </div>
        <div class="mentor">
          <div class="mentorImg"><img :src="item.mentorImg" alt="멘토 이미지"></div>
          <div class="marquee" ref="marquee_wrap" @mouseenter="marqueeIn({}, 2000)" @mouseleave="marqueeOut">
            <h1 ref="marquee">{{ item.mentorTitle }}</h1>
          </div>
        </div>
        <div class="postTime">
          {{ item.startTimeText }}
        </div>
        
      </div>
    </a>
  </div>
</template>

<script>
import { mixin_indexPageMixin } from '@/mixin/mixin_indexPage'
export default {
  props: ['item', 'earningWidth'],
  mixins: [mixin_indexPageMixin],
  data() {
    return {
      maxWidth: 0,
    }
  },
  mounted() {
    // this.marqueeMentorName(3000);
  },
  methods: {
    // enterHover(e) {
    //   this.$emit('changeHoverTop', e.target.offsetTop)
    // }
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/newPredictSign.scss';
</style>