<template>
  <div class="bestExchangeSign_wrap">
    <div class="title">
      <div class="titIcon"><img :src="`${imgURL}index/main/exchangeVolumeIcon.svg`" alt="아이콘"></div>
      <h1>최근 거래량이 가장 많은 코인시그널</h1>
    </div>
    <div class="swiperSlide_wrap">
      <swiper class="swiper" ref="swiper" :options="swiperOption">
        <!--반복되는 태그들이라 임시 데이터를 이용해 v-for문을 사용하였습니다-->
        <swiper-slide v-for="(dummy, idx) in dummyData" :key="idx">
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
                <p>67.4</p>
                %
              </div>
            </div>  <!--predictEarning-->
            <div class="postingTime">
              <div class="timeIcon"><img :src="`${imgURL}index/top/timeIcon.svg`" alt="아이콘"></div>
              <p>23분 전</p>
            </div>  <!--postingTime-->
            <div class="moreIcon"><i class="xi-long-arrow-right"></i></div>
            <span class="effectCircle"></span>
          </div>  <!--slide_inner-->
          <div class="hoverEffect"></div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev button BestExchangeSign-button-prev" slot="button-prev"><i class="xi-angle-left"></i></div>
      <div class="swiper-button-next button BestExchangeSign-button-next" slot="button-next"><i class="xi-angle-right"></i></div>
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
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      swiperOption: {
        speed: 600,
        slidesPerView: 4,
        spaceBetween: 18,
        touchRatio: 0.7,
        navigation: {
          nextEl: '.BestExchangeSign-button-next',
          prevEl: '.BestExchangeSign-button-prev'
        },
        on: {
          init() {
            let wrapper = _this.$refs.swiper.$el.querySelector('.swiper-wrapper');
            wrapper.style.transitionTimingFunction = 'cubic-bezier(0.61, 1, 0.88, 1)';
          },
        }
      },
      //반복문 사용을 위해 만든 임시 데이터입니다
      dummyData: [
        {coinName: '비트코인', mentor: 'shasha', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_woman3_img.png`},
        {coinName: '비트코인', mentor: 'coinCOCO123', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_picture3_img.png`},
        {coinName: '비트코인', mentor: '코린이들의천국', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_man3_img.png`},
        {coinName: '비트코인', mentor: '기가후니', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_picture1_img.png`},
        {coinName: '비트코인', mentor: '나도잘나가', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_man2_img.png`},
        {coinName: '비트코인', mentor: '멀리봐야얻는다', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_picture2_img.png`},
        {coinName: '비트코인', mentor: '다크호스쏘니', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_woman3_img.png`},
        {coinName: '비트코인', mentor: '딴딴한돌다리', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_woman1_img.png`},
        {coinName: '비트코인', mentor: '미래소년알렉스', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_woman2_img.png`},
        {coinName: '비트코인', mentor: '내가젤잘벌어', img: `${process.env.VUE_APP_IMG_URL}index/main/profile_man1_img.png`},
      ],
    }
    
  },
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/bestExchangeSign.scss';
</style>