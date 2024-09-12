<template>
  <div class="profile_wrap clearFix">
    <div class="pro_left">
      <div class="pro_left_top">
        <div class="profile_img">
          <img :src="profileContents.profileImg" alt="프로필이미지" @error="onProfileError">
          <h2 class="responsive_title">{{ title }}</h2> <!--모바일용 타이틀-->
        </div>
        <h2>{{ profileContents.title }}</h2>
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
            <span><i class="xi-chart-bar-square"></i></span>
            <h4>평균 수익률</h4>
          </div>
          <p>{{ earningRate }}%</p>
        </li>
        <li>
          <div>
            <span><i class="xi-signal-4"></i></span>
            <h4>누적 수익률</h4>
          </div>
          <p>752.6%</p>
        </li>
        <li>
          <div>
            <span><i class="xi-crown"></i></span>
            <h4>최고 수익률</h4>
          </div>
          <p>10.5%</p>
        </li>
        <li>
          <div>
            <span><i class="xi-focus-center"></i></span>
            <h4>수익 적중률</h4>
          </div>
          <p>33.7%</p>
        </li>
      </ul>
    </div>  <!--pro_right-->
  </div>  <!--profile-->
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

  export default {
    data(){
      return {
      }
    },
    computed: {
      ...mapState('signStore', ['profileContents']),
      ...mapGetters('signStore', ['pageId']),
      ...mapGetters('loginStore', ['isSubscribe']),
      pageId() {
        const pageId = this.$route.params.page_id;

        if(pageId === undefined) {
          return "bb3977d2-92d7-4423-a833-7e13aabcad98";
        } else {
          return pageId;
        }
      },
      title: function() {
        switch(this.pageId) {
          case "bb3977d2-92d7-4423-a833-7e13aabcad98":
            return '그래프 유사도';
          case "3ad24119-0935-4c79-99a8-21e2dbbfe560":
            return '뉴스 토픽 SNS FLAG';
          case "9c342a17-7822-41c5-9606-31b93c3a4439":
            return '뉴스 토픽 미포함 SNS FLAG';
        }

        return null;
      },
      earningRate() {
        if(this.profileContents.earningRate !== null) {
          return this.profileContents.earningRate.toFixed(4);
        } else {
          return 0;
        }
      }
    },
    watch: {
      pageId(newVal) {
        if(newVal !== null) {
          this.LoadProfile(newVal);
        }
      }
    },
    methods: {
      ...mapActions('signStore', ['showSubscribePopup', 'showUnSubscribePopup', 'LoadProfile']),
      onClickSubscribe() {
        if(this.isSubscribe) { // 구독 중 => 구독취소
          this.showUnSubscribePopup(true);
        } else { // 구독 전 => 구독 중
          this.showSubscribePopup(true);
        }
      },
      onProfileError(e) {
        e.target.src = require('@/images/mentorPage/profile_img.png');
      }
    }
  }
</script>

<style lang='scss'>
  @import '@/components/mentorPage/top/css/profile.scss';
</style>