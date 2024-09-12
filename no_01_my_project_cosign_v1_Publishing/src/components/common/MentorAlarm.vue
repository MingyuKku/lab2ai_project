<template>
  <transition name="openMyPage">
    <div class="myPage_wrap" v-show="active">
      <div class="myPage_inner">
        <div class="header">
          <div class="myProfile">
            <div class="myProfileIcon"><img src="@/images/index/top/followerMentorIcon.svg" alt="구독멘토아이콘"></div>
            <h2>구독 중인 멘토 <span>{{totalMentorCount}}</span></h2>
          </div>

          <div class="closeBtn" @click="closePage">
            <i class="xi-close"></i>
            <span>Close</span>
          </div>
        </div> <!--header-->

        <div class="subscribedMentor_wrap">
          <MentorAlarmItem
            v-for="(mentor,idx) in mentors" :key="idx"
            :followerListIdx='idx'
            :mentor="mentor"
            :active="activeMentorIndex === idx"
            :changeActive="changeActive"
          />
        </div>
      </div>  <!--.myPage_inner-->
    </div>
  </transition>
  
</template>

<script>
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

const { body } = document;
import MentorAlarmItem from '@/components/common/MentorAlarmItem';
export default {
  components: {
    MentorAlarmItem,
  },
  watch: {
    active(val) {
      if(val) {
        this.loadAlarm();
      }
    }
  },
  props: {
    active: Boolean,
    alarmClose: Function
  },
  data() {
    return {
      //v-for문 사용을 위한 임시데이터입니다
      // dummyData: [1,2,3,4,5,6,7,8,9,10,11,12],
      totalMentorCount: 0,
      mentors: [],
      activeMentorIndex: 0
    }
  },
  mounted() {
  },
  methods: {
    async loadAlarm() {
      const res = await axios.post(`${API_URL}/api/alarm/get`, {}, {withCredentials: true});

      this.totalMentorCount = res.data.length;
      this.mentors = res.data.map((mentor, idx) => {
        let items = null;

        if(mentor.items !== null) {
          items = mentor.items.map(item => {
            return {
              ...item,
              start_price: item.start_price > 1000? item.start_price.toLocaleString(): item.start_price,
              earning_rate: ((item.target_price / item.start_price - 1) * 100).toFixed(2),
              remain_time: new Date(item.start_time).diffNow()
            }
          })
        }

        return {
          ...mentor,
          alarmCount: idx !== 0? mentor.alarmCount: 0,
          items: items,
          size: mentor.items !== null? `${mentor.items.length * 68}px`: null
        }
      });
    },
    closePage() { // mobile only
      body.style.overflow = 'visible';
      this.alarmClose();
    },
    changeActive(idx) {
      this.activeMentorIndex = idx;
    }
  }
}
</script>

<style lang='scss'>
  @import '@/components/common/css/mentorAlarm.scss';
</style>