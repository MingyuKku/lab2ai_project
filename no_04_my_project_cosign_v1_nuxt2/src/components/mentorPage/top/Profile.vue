<template>
  <div class="profile_wrap clearFix">
      <div class="pro_left">
        <div class="pro_left_top">
          <div class="profile_img_wrap">
            <span class="type">{{ profile.type }}</span>
            <div class="profile_img">
              <img :src="profile.profileImage" :alt="profile.title" @error="onProfileError">
            </div>
          </div>
          <div class="title">
            <h2>
              {{ profile.title }}
              <span @click="onDescModal" v-if="detailMentorIds.includes(mentorId)">더보기</span>
            </h2>
          </div>
          <p>{{ profile.description }}</p>
        </div>
        <button
          @click="onClickSubscribe"
          :class="{subscribed: isSubscribe}"
        >
          <p>구독하기</p>
          <span><i class="xi-bell-o"></i>구독중</span>
        </button>
      </div>  <!--pro_left-->
    <div class="pro_right">
      <ul>
        <li>
          <div>
            <span><i class="xi-signal-4"></i></span>
            <h4>수익률 합계</h4>
          </div>
          <p>{{ profile.earningRateSum }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측 성공했던 코인 종목들의 수익률 총합
          </span> -->
        </li>
        <li>
          <div>
            <span><i class="xi-crown"></i></span>
            <h4>최고 수익률</h4>
          </div>
          <p>{{ profile.maxEarningRate }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측 성공했던 코인 종목들 중 가장 높았던 수익률
          </span> -->
        </li>
        <li>
          <div>
            <span><i class="xi-chart-bar-square"></i></span>
            <h4>평균 수익률</h4>
          </div>
          <p>{{ profile.earningRate }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측 성공했던 코인 종목들의 평균 수익률
          </span> -->
        </li>
        <li>
          <div>
            <span><i class="xi-focus-center"></i></span>
            <h4>수익 적중률</h4>
          </div>
          <p>{{ profile.successRate }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측했던 코인 종목들 중 예측을 성공한 비율
          </span> -->
        </li>
      </ul>
    </div>  <!--pro_right-->
  </div>  <!--profile-->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { detailMentorIds } from '@/src/core/profile';

export default {
  props: ['profile', 'mentorId', 'isSubscribed'],
  data(){
    return {
      detailMentorIds: detailMentorIds,
      isSubscribe: this.isSubscribed
    }
  },
  watch: {
    async isLogin(val) {
      if(val !== null) {
        try { 
          this.isSubscribe = (await this.$intApi.post(`/api/is_subscribed/${this.mentorId}`, {}, {withCredentials: true}))
                              .data.data.subscribed.status === "is_subscribed";
        } catch(err) {console.log(err)}
        
      } else {
        this.isSubscribe = false;
      }
    }
  },
  computed: {
    ...mapGetters('loginStore', ['isLogin', 'subscribeExpireTime']),
  },
  mounted() {
  },
  methods: {
    ...mapActions('signStore', ['toggleDescModal']),
    ...mapActions('popupStore', ['showLoginAlert', 'showSubscribePopup', 'showUnsubscribePopup', 'showPayMentorUnsubscribePopup']),
    onClickSubscribe() {
      if(this.isLogin) {
        if(this.isSubscribed) { // 구독 중 => 구독취소
          this.showUnsubscribePopup({mentorId: this.mentorId});
        } else { // 구독 전 => 구독 중
          this.showSubscribePopup({mentorId: this.mentorId});
        }
        console.log('머양')
      } else {
        this.showLoginAlert();
      }
    },
    onProfileError(e) {
      e.target.src = `https://kr.object.ncloudstorage.com/cosign/mentor-image/default.png`;
    },
    onDescModal() {
      // this.toggleDescModal({flag: true, mentorId: id});
      this.toggleDescModal(true);
    }
  }
}
</script>

<style lang='scss'>
  @import '@/src/components/mentorPage/top/css/profile.scss';
</style>