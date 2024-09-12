<template>
  <div class="RecommendChannel_wrap" :class="{active: mobileActiveTabIdx === 2}">
    <div class="RecommendChannel_head">
      <h2>최근 적중률 Top 멘토</h2>
    </div>

    <div class="RecommendChannel_body">
      <RecommendMentorItem v-for="(channel, idx) in channels"
      :key="idx"
      :channel="channel" />
    </div>

    <!-- <div class="swiper_wrap"> -->
        <!-- <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
            <div class="inner">
            <RecommendMentorItem v-for="(channel, idx) in channels"
                    :key="idx"
                    :channel="channel" />
            </div>
        </swiper-slide> -->
        
        <!-- <swiper-slide>
            <div class="inner">
              <RecommendMentorItem v-for="(channel, idx) in channels3"
                    :key="idx"
                    :channel="channel" />
            </div>
        </swiper-slide> -->
        <!-- </swiper> -->
        <!-- <div class="slider_nav">
          <div class="swiper-pagination mentor_pagination" slot="pagination"></div>
          <div class="swiper-button-prev button mentor_swiper-button-prev" slot="button-prev">
            <i class="xi-angle-left"></i>
          </div>
          <div class="swiper-button-next button mentor_swiper-button-next" slot="button-next">
            <i class="xi-angle-right"></i>
          </div>
        </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import RecommendMentorItem from '@/components/mentorPage/side/RecommendMentorItem.vue'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapGetters } from 'vuex';

export default {
  components: {
    RecommendMentorItem
  },
  computed: {
    ...mapGetters('signStore', ['mobileActiveTabIdx'])
  },
  data(){
      return {
        swiperOption: {
          speed: 600,
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: '.mentor_pagination',
            clickable: true,
            type: "fraction",
          },
          navigation: {
            nextEl: '.mentor_swiper-button-next',
            prevEl: '.mentor_swiper-button-prev'
          },
          touchRatio: 0.7
        },
        channels: [
          {
            no: 1,
            id: 'bb3977d2-92d7-4423-a833-7e13aabcad98',
            title: '차트 유사도 분석',
            description: '랩투아이',
            img: require('@/images/mentorPage/channel_list_img.png'),
            earningRate: 30.3
          },
          {
            no: 2,
            id: '3ad24119-0935-4c79-99a8-21e2dbbfe560',
            title: '뉴스 기반 예측',
            description: '랩투아이',
            img: require('@/images/mentorPage/channel_list_img2.png'),
            earningRate: 20.1
          },
          {
            no: 3,
            id: '9c342a17-7822-41c5-9606-31b93c3a4439',
            title: 'SNS 기반 예측',
            description: '랩투아이',
            img: require('@/images/mentorPage/channel_list_img3.png'),
            earningRate: 14.2
          },
          {
            no: 4,
            id: '23066936-b95b-41c3-ab3a-42bc800fa29c',
            title: '5분3틱',
            description: '랩투아이',
            img: require('@/images/mentorPage/channel_list_img.png'),
            earningRate: 13.4
          },
          {
            no: 5,
            id: '937984ea-2339-4e70-ad74-7886a39bb568',
            title: '썬더볼트',
            description: '랩투아이',
            img: require('@/images/mentorPage/channel_list_img2.png'),
            earningRate: 11.2
          },
          {
            no: 6,
            id: '887f6d04-8f6d-4b67-b336-01f02edc57a7',
            title: '영민님예측',
            description: '최영민님의 코인예측',
            img: require('@/images/index/main/profile_man1_img.png'),
            earningRate: 9.2
          },
          {
            no: 7,
            id: 'f2690d84-0a1f-48cf-877e-7f81d36d9e62',
            title: '후니님',
            description: '후니님의 AI 코인 예측',
            img: require('@/images/index/main/profile_man2_img.png'),
            earningRate: 9.2
          },
          {
            no: 8,
            id: '0941cdae-1716-43a8-9f37-e52a80a907c3',
            title: '테스트',
            description: '테스트입니다',
            img: require('@/images/index/main/lab2ai_logo_kr.png'),
            earningRate: 8.2
          },
          {
            no: 9,
            id: '96e55c93-859e-43a2-8bdf-54e9bbf6e3fa',
            title: '등락폭 기반 예측 모델',
            description: '등락등락폭',
            img: require('@/images/index/main/profile_chart_img.png'),
            earningRate: 7.2
          },
          {
            no: 10,
            id: '7148e6ab-2c19-44bc-ab3f-4bf69f428730',
            title: '거래량 기반 예측 모델',
            description: '거래거래량',
            img: require('@/images/index/main/profile_chart_img.png'),
            earningRate: 5.2
          },
        ],
      }
  }
}
</script>

<style lang='scss'>
  @import './css/recommendMentor.scss';
</style>