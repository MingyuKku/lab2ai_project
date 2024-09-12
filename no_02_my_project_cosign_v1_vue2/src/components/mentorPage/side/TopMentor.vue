<template>
  <div class="RecommendChannel_wrap" :class="{active: mobileActiveTabIdx === 2}">
    <div class="RecommendChannel_head">
      <h2>주간 수익 적중률 Top 멘토</h2>
    </div>

    <div class="RecommendChannel_body">
      <TopMentorItem v-for="mentor in mentors"
      :key="mentor.mentorPageId"
      :mentor="mentor" />
    </div>
  </div>
</template>

<script>
import TopMentorItem from '@/components/mentorPage/side/TopMentorItem.vue'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapGetters } from 'vuex';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

export default {
  components: {
    TopMentorItem
  },
  computed: {
    ...mapGetters('signStore', ['mobileActiveTabIdx'])
  },
  data(){
      return {
        imgURL: process.env.VUE_APP_IMG_URL,
        mentors: [],
      }
  },
  mounted() {
    this.LoadTopMentor();
  },
  methods: {
    async LoadTopMentor() {
      const res = await axios.get(`${API_URL}/api/mentor_page/success_rate/top`);

      this.mentors = res.data.map(mentor => {
        return {
          ...mentor,
          successRate: mentor.successRate.toFixed(1)
        }
      });
    }
  }
}
</script>

<style lang='scss'>
  @import './css/topMentor.scss';
</style>