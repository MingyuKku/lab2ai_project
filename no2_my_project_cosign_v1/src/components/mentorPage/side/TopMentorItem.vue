<template>
  <div class="channel_list">
    <a :href="`/m/${mentor.mentorPageId}`">
      <div class="channel_info">
        <div class="ranking">{{ mentor.rankNo }}</div>
        <div class="mentor">
          <div class="mentorImg"><img :src="mentor.profileImage" alt="채널이미지" @error="onProfileError"></div>
          <div class="marquee" ref="marquee_wrap" @mouseenter="marqueeIn({}, 2000)" @mouseleave="marqueeOut">
            <h3 ref="marquee">{{mentor.mentorTitle}}</h3>
          </div>
        </div>
      </div>
      <div class="earning">
        <p>{{mentor.successRate}}%</p>
      </div> 
    </a>
  </div>
</template>

<script>
import { mixin_indexPageMixin } from '@/mixin/mixin_indexPage'
export default {
  props: ['mentor'],
  mixins: [mixin_indexPageMixin],
  data(){
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  },
  methods: {
    onProfileError(e) {
      e.target.src = `${process.env.VUE_APP_IMG_URL}mentorPage/profile_img.png`;
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './css/topMentorItem.scss';
 </style>