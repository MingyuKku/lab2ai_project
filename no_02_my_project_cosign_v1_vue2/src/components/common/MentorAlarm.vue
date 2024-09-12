<template>
  <transition name="openMyPage">
    <div class="myPage_wrap" v-show="active">
      <div class="myPage_inner">
        <div class="header">
          <div class="myProfile">
            <div class="myProfileIcon"><img :src="`${imgURL}index/top/followerMentorIcon.svg`" alt="구독멘토아이콘"></div>
            <h2>구독중인 멘토 <span>{{alarmSubscribedCount}}</span></h2>
          </div>

        </div> <!--header-->

        <div class="subscribedMentor_wrap">
          <MentorAlarmItem
            v-for="(mentor,idx) in alarmMentors" :key="idx"
            :idx='idx'
            :mentor="mentor"
            :active="idx === activeMentorIndex"
            :changeActive="changeActive"
            :changeViewSignCount="changeViewSignCount"
            @changeScrollTop="changeScrollTop"
          />
          <div class="noAlarmMentor" v-if="alarmMentors.length <= 0">
            <h2>구독중인 멘토가 없습니다!</h2>
            <p>알람을 받으시려면 멘토를 구독해 주세요</p>
          </div>
        </div>
      </div>  <!--.myPage_inner-->
    </div>
  </transition>
  
</template>

<script>
// import axios from 'axios';
// import {API_URL} from '@/core/apiUrl';
import { mapGetters, mapActions } from 'vuex';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import MentorAlarmItem from '@/components/common/MentorAlarmItem';
export default {
  components: {
    MentorAlarmItem,
  },
  props: {
    active: Boolean,
    // alarmClose: Function
  },
  data() {
    return {
      activeMentorIndex: 0,
      wrapScrollTop: 0,
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollToPlugin);
  },
  watch: {
    active(val) {
      if(val) {
        this.activeMentorIndex = 0;
        this.loadMentorAlarm();
      }
    },
    wrapScrollTop(val) {
      gsap.to('.subscribedMentor_wrap', {
        duration: 0.3,
        scrollTo: val,
        ease: "power4.out",
      })
    }
  },
  computed: {
    ...mapGetters('loginStore', ['alarmSubscribedCount', 'alarmMentors']),
  },
  methods: {
    ...mapActions('loginStore', ['loadMentorAlarm']),
    changeActive(idx) {
      this.activeMentorIndex = idx;
    },
    changeViewSignCount(cnt) {
      this.totalMentorCount -= cnt;
    },
    changeScrollTop(val) {
      this.wrapScrollTop = val
    }
  }
}
</script>

<style lang='scss'>
  @import '@/components/common/css/mentorAlarm.scss';
</style>