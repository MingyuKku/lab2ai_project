<template>
  <div class="highEarningSign_wrap">
    <div class="title">
      <div class="titIcon"><img :src="`${imgURL}index/main/highEarningIcon.svg`" alt="아이콘"></div>
      <h1>수익률이 가장 높았던 코인시그널</h1>
    </div>
    <div class="swiperSlide_wrap">
      <swiper class="swiper" ref="swiper" :options="swiperOption">
        <!--반복되는 태그들이라 임시 데이터를 이용해 v-for문을 사용하였습니다-->
        <swiper-slide v-for="(dummy, idx) in dummyData" :key="idx">
          <div class="slide_inner">
            <div class="earning_area">
              <h2>수익률</h2>
              <div class="earning" ref="highEarningSign_earning">
                <span>{{ dummy.earning.toFixed(1) }}</span>%
              </div>
            </div>
            <div class="coinAndMentor">
              <div class="coin">
                <div class="coinImg"><img :src="dummy.img" alt="코인이미지"></div>
                <div class="coinName">
                  <h2>{{ dummy.coinName }}</h2>
                  <h3><span>ALGO</span>/KRW</h3>
                </div>
              </div>
              <div class="mentor">
                <div class="mentorImg"><img :src="`${imgURL}index/main/profile_woman1_img.png`" alt="멘토이미지"></div>
                <h2>2022년호랑이</h2>
              </div>
            </div>  <!--coinAndMentor-->
            <div class="effectCircle"></div>
          </div>  <!--slide_inner-->
          <div class="hoverEffect"></div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev button highEarningSign-button-prev" slot="button-prev"><i class="xi-angle-left"></i></div>
      <div class="swiper-button-next button highEarningSign-button-next" slot="button-next"><i class="xi-angle-right"></i></div>
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
          nextEl: '.highEarningSign-button-next',
          prevEl: '.highEarningSign-button-prev'
        },
        on: {
          init() {
            let wrapper = _this.$refs.swiper.$el.querySelector('.swiper-wrapper');
            wrapper.style.transitionTimingFunction = 'cubic-bezier(0.61, 1, 0.88, 1)';
          },
          touchMove(e) {
            const $swiperSlides = e.currentTarget.querySelectorAll('.swiper-slide');
            $swiperSlides.forEach(slide=> {
              slide.classList.add('prevent')
            })
          },
          touchEnd(e) {
            const $swiperSlides = e.currentTarget.querySelectorAll('.swiper-slide');
            $swiperSlides.forEach(slide=> {
              slide.classList.remove('prevent')
            })
          }
        }
      },
      //반복문 사용을 위해 만든 임시 데이터입니다
      dummyData: [
        {coinName: '알고랜드코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/ALGO.png`, earning: 15.2},
        {coinName: '오브스코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/ORBS.png`, earning: 11.8},
        {coinName: '메타디움코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/META.png`, earning: 9.7},
        {coinName: '엘프코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/ELF.png`, earning: 8.0},
        {coinName: '아더코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/ARDR.png`, earning: 11.8},
        {coinName: '비트코인캐시', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/BCH.png`, earning: 11.8},
        {coinName: '던프로토콜코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/DAWN.png`, earning: 11.8},
        {coinName: '카바코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/KAVA.png`, earning: 11.8},
        {coinName: '비트코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/BTC.png`, earning: 11.8},
        {coinName: '비트코인', img: `${process.env.VUE_APP_IMG_URL}mentorPage/coin_100px/BTC.png`, earning: 11.8},
      ],
    }
  },
  mounted() {
    const earningSpan = this.$refs.highEarningSign_earning;

    for(let i = 0; i < earningSpan.length; i++) {
      let splitSpan = earningSpan[i].children[0].textContent.split('.')
      let $integerSpan = document.createElement('span')
      let $pointSpan = document.createElement('span')
      $pointSpan.className = 'point'
      $integerSpan.textContent = splitSpan.shift() + '.';
      $pointSpan.textContent = splitSpan.pop();

      earningSpan[i].children[0].remove();
      earningSpan[i].prepend($pointSpan);
      earningSpan[i].prepend($integerSpan);
    }
    
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/highEarningSign.scss';
</style>