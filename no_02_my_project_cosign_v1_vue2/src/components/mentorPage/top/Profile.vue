<template>
  <div class="profile_wrap clearFix">
    <div class="pro_left">
      <div class="pro_left_top">
        <div class="profile_img_wrap">
          <span class="type">{{ profileContents.type }}</span>
          <div class="profile_img">
            <img :src="profileContents.profileImg" alt="프로필이미지" @error="onProfileError">
          </div>
        </div>
        <div class="title">
          <h2>
            {{ profileContents.title }}
            <!-- <span @click="onDescModal" v-if="mentorId !== 'bitpapa'">더보기</span> -->
            <span @click="onDescModal" v-if="mentorPageId.includes(mentorId)">더보기</span>
          </h2>
        </div>
        <p>{{ profileContents.description }}</p>
      </div>
      <button
        @click="onClickSubscribe"
        :class="{subscribed: isSubscribe}"
      ><p>구독하기</p><span><i class="xi-bell-o"></i>구독중</span></button>
    </div>  <!--pro_left-->
    <div class="pro_right">
      <ul>
        <li>
          <div>
            <span><i class="xi-signal-4"></i></span>
            <h4>수익률 합계</h4>
          </div>
          <p>{{ profileContents.earningRateSum }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측 성공했던 코인 종목들의 수익률 총합
          </span> -->
        </li>
        <li>
          <div>
            <span><i class="xi-crown"></i></span>
            <h4>최고 수익률</h4>
          </div>
          <p>{{ profileContents.maxEarningRate }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측 성공했던 코인 종목들 중 가장 높았던 수익률
          </span> -->
        </li>
        <li>
          <div>
            <span><i class="xi-chart-bar-square"></i></span>
            <h4>평균 수익률</h4>
          </div>
          <p>{{ profileContents.earningRate }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측 성공했던 코인 종목들의 평균 수익률
          </span> -->
        </li>
        <li>
          <div>
            <span><i class="xi-focus-center"></i></span>
            <h4>수익 적중률</h4>
          </div>
          <p>{{ profileContents.successRate }}%</p>
          <!-- <span class="toolTip">
            멘토가 현재까지 예측했던 코인 종목들 중 예측을 성공한 비율
          </span> -->
        </li>
      </ul>
    </div>  <!--pro_right-->
  </div>  <!--profile-->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  metaInfo() {
    return {
      title: `${this.profileContents.title}의 코인 시세 예측 - COSIGN`,
      meta: [
        {name: 'description', content: this.profileContents.description},
        {name: 'keywords', content: this.keywords.join(',')},
      ]
    }
  },
  data(){
    return {
      keywords: [
        '가상화폐',
        '암호화폐',
        '비트코인',
        '이더리움',
        '도지코인',
        '알트코인',
        '코인전망',
        '코인시세',
        '비트코인시세',
        '비트코인예측',
        '투자정보',
      ]
    }
  },
  mounted() {
    if(this.profileContents.title !== null) {
      this.keywords.push(this.profileContents.title);
    }
  },
  computed: {
    ...mapGetters('signStore', ['profileContents','mentorPageId']),
    ...mapGetters('loginStore', ['isSubscribe', 'isLogin']),
    ...mapGetters('mentorRouteStore', ['mentorId']),
  },
  watch: {
    mentorId(newVal) {
      if(newVal !== null) {
        this.LoadProfile(newVal);
        this.keywords.push(newVal);
      }
    },
    'profileContents.title': {
      handler(val) {
        this.keywords.push(val);
      }
    },
  },
  methods: {
    ...mapActions('signStore', ['showSubscribePopup', 'showUnSubscribePopup', 'LoadProfile', 'toggleDescModal']),
    ...mapMutations('popupStore', ['showLoginAlert']),
    onClickSubscribe() {
      console.log(this.isLogin);
      if(this.isLogin) {
        if(this.isSubscribe) { // 구독 중 => 구독취소
          this.showUnSubscribePopup(true);
        } else { // 구독 전 => 구독 중
          this.showSubscribePopup(true);
        }
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
  @import '@/components/mentorPage/top/css/profile.scss';
</style>