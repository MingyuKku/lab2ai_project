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
import TopMentorItem from '@/src/components/mentorPage/side/TopMentorItem.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    TopMentorItem
  },
  computed: {
    ...mapGetters('signStore', ['mobileActiveTabIdx'])
  },
  data(){
    return {
      mentors: [],
    }
  },
  mounted() {
    this.LoadTopMentor();
  },
  methods: {
    async LoadTopMentor() {
      const res = await this.$axios.get(`/api/mentor_page/success_rate/top`);

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