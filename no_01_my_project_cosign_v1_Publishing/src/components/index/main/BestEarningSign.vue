<template>
  <div class="bestEarningSign_wrap">
    <div class="title">
      <div class="titIcon"><img :src="`${imgURL}index/main/bestSign_icon.svg`" alt="아이콘"></div>
      <h1>지금 예측중인 최고수익 코인시그널</h1>
    </div>
    <div class="swiperSlide_wrap">
      <swiper class="swiper" ref="swiper" :options="swiperOption">
        <!--반복되는 태그들이라 임시 데이터를 이용해 v-for문을 사용하였습니다-->
        <swiper-slide v-for="(dummy, idx) in dummyData" :key="idx">
          <a :href="dummy.pageId !== null ? `/page/${dummy.pageId}` : 'javascript:void(0);'">
            <!-- <div class="slide_inner" @mouseover="onMouseoverSlide(idx)"> -->
            <div class="slide_inner">
              <div class="coinAndMentor">
                <div class="coin">
                  <h2>{{ dummy.coinName }}</h2>
                  <h3><span>BTC</span>/KRW</h3>
                </div>
                <div class="mentor">
                  <div class="mentorImg"><img :src="dummy.img" alt="멘토이미지"></div>
                  <h2>{{ dummy.mentor }}</h2>
                </div>
              </div>  <!--coinAndMentor-->
              <div class="predictEarning">
                <h1>예상수익률</h1>
                <div class="data">
                  <i class="xi-trending-up"></i>
                  <p>{{dummy.earning}}</p>
                  %
                </div>
              </div>  <!--predictEarning-->
              <div class="postingTime">
                <div class="timeIcon"><img :src="`${imgURL}index/top/timeIcon.svg`" alt="아이콘"></div>
                <p>23분 전</p>
              </div>  <!--postingTime-->
              <div class="ranking">{{ dummy.rank }}</div>
              <div class="moreIcon"><i class="xi-long-arrow-right"></i></div>
              <span class="effectCircle in"></span>
            </div>  <!--slide_inner-->
          </a>
          <div class="hoverEffect"></div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev button BestEarningSign-button-prev" slot="button-prev"><i class="xi-angle-left"></i></div>
      <div class="swiper-button-next button BestEarningSign-button-next" slot="button-next"><i class="xi-angle-right"></i></div>
    </div>  <!--swiperSlide_wrap-->
  </div>  <!--BestEarningSign_wrap-->
  
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  components: {
    swiper, swiperSlide,
  },
  data() {
    let _this = this;
    // let startX = null;
    // let endX = null;
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      swiperOption: {
        speed: 600,
        slidesPerView: 4,
        spaceBetween: 18,
        touchRatio: 0.7,
        navigation: {
          nextEl: '.BestEarningSign-button-next',
          prevEl: '.BestEarningSign-button-prev'
        },
        on: {
          init() {
            const wrapper = _this.$el.querySelector('.swiper-wrapper');
            wrapper.style.transitionTimingFunction = 'cubic-bezier(0.61, 1, 0.88, 1)';
          },
          // touchStart(e) {
          //   startX = e.pageX;
          // },
          // touchEnd(e) {
          //   endX = e.pageX;
          //   let diffX = Math.abs(startX - endX);
          //   if(diffX <= 50) {
          //     console.log('클릭으로친다')
          //   }
          // }
        }
      },
      mouseoverSlideIdx: 0,
      //반복문 사용을 위해 만든 임시 데이터입니다
      dummyData: [
        {rank: 1, coinName: '비트코인', img: require('@/images/index/main/lab2ai_logo_en.png'), mentor: 'DTW차트유사도', earning: 11.2, pageId: 'bb3977d2-92d7-4423-a833-7e13aabcad98'},
        {rank: 2, coinName: '도지코인', img: require('@/images/index/main/53.png'), mentor: '썬더볼트', earning: 2.8, pageId: '937984ea-2339-4e70-ad74-7886a39bb568'},
        {rank: 3, coinName: '코박토큰', img: require('@/images/index/main/lab2ai_logo_kr.png'), mentor: 'SNS_FLAG트위터', earning: 6.8, pageId: '9c342a17-7822-41c5-9606-31b93c3a4439'},
        {rank: 4, coinName: '디센트럴랜드', img: require('@/images/index/main/53.png'), mentor: '5분3틱', earning: 1.7, pageId: '23066936-b95b-41c3-ab3a-42bc800fa29c'},
        {rank: 5, coinName: '비트코인', img: require('@/images/index/main/profile_picture3_img.png'), mentor: '미래소년알렉스', earning: 2.5, pageId: null},
        {rank: 6, coinName: '비트코인', img: require('@/images/index/main/profile_picture2_img.png'), mentor: '미래소년알렉스', earning: 9.5, pageId: null},
        {rank: 7, coinName: '비트코인', img: require('@/images/index/main/profile_woman3_img.png'), mentor: '미래소년알렉스', earning: 10.1, pageId: null},
        {rank: 8, coinName: '비트코인', img: require('@/images/index/main/profile_woman1_img.png'), mentor: '너만먹냐', earning: 22.9, pageId: null},
        {rank: 9, coinName: '비트코인', img: require('@/images/index/main/profile_woman2_img.png'), mentor: '좀나눠먹자', earning: 34.3, pageId: null},
        {rank: 10, coinName: '비트코인', img: require('@/images/index/main/profile_man1_img.png'), mentor: '코시국에코인', earning: 65.7, pageId: null},
      ],
    }
  },
  methods: {
    // onMouseoverSlide(i) {
    //   this.mouseoverSlideIdx = i
    // },
  }
  
}

</script>

<style lang='scss'>
  @import '@/components/index/main/css/bestEarningSign.scss';
</style>