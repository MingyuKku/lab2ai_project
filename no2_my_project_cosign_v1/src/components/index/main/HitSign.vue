<template>
  <div class="hitSign_wrap">
    <a :href="item.url">
      <div class="inner">
        <div class="coin">
          <div class="coinImg"><img :src="item.marketImg" alt="코인 이미지"></div>
          <h1>{{ item.market }}</h1>
        </div>
        <div class="earning">
          <span :style="{width: earningWidth}">{{ item.earningRateText }}%</span>
        </div>
        <div class="validation">
          {{ item.minuteText }}
          <!-- <i class="xi-time-o"></i>{{ item.validationTime }} -->
        </div>
        <div class="mentor">
          <div class="mentorImg"><img :src="item.mentorImg" alt="멘토 이미지"></div>
          <div class="marquee" ref="marquee_wrap" @mouseenter="marqueeIn({}, 2000)" @mouseleave="marqueeOut">
            <h1 ref="marquee">{{ item.mentorTitle }}</h1>
          </div>
        </div>
        
        <div class="postTime">
          <span>{{ item.startTimeText }} -</span> <span>{{ item.endTimeText }}</span>
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
  @import './css/hitSign.scss';
</style>