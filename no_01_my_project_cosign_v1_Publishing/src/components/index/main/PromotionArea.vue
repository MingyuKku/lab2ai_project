<template>
  <div class="promotionArea_wrap">
    <div class="title">
      <div class="top">
        <h2>잠깐!!</h2>
        <p>코인 구매하시기 전에 꼭 체크해봅시다!</p>
      </div>
      <div class="middle">
        당신이 놓쳤던 코인 매매 기법들<br>
        이곳에서 확인해 보세요
      </div>
      <div class="bottom">
        만약 이곳에 소개한 기법을 참고해 코인을 구매했다면<br>
        수익률이 몇배나 더 오를 수 있지 않았을까?
      </div>
    </div>  <!--title-->
    <div class="swiperSlideWrap">
      <swiper class="swiper" ref="swiper" :options="swiperOption">
        <!--반복되는 태그들이라 임시 데이터를 이용해 v-for문을 사용하였습니다-->
        <swiper-slide v-for="(promotion, idx) in promotions" :key="idx">
          <div class="slideInner">
            <div class="title">
              <h2>{{ promotion.title }}</h2>
            </div>
            <div class="content">
              <div class="buySuccessRate">
                <div class="inner">
                  <h3>진입성공률</h3>
                  <!-- <p><span :style="{width: `${promotion.successRate}%`}"></span></p> -->
                  <p><span ref="buySuccessRateGraph"></span></p>
                </div>
                <p><span>{{ promotion.successRate }}</span>%</p>
              </div>
              <div class="averageEarningRate">
                <div class="inner">
                  <h3>평균수익률</h3>
                  <!-- <p><span :style="{width: `${promotion.averageEarning}%`}"></span></p> -->
                  <p><span ref="averageEarningRateGraph"></span></p>
                </div>
                <p><span>{{ promotion.averageEarning }}</span>%</p>
              </div>
              <h2 class="applyCoins">
                적용가능한 코인
                <p><span>89</span>개</p>
              </h2>
              <span class="promotionsBg"></span>
            </div>
          </div>  <!--slideInner-->
          <!-- <div class="hoverEffect">
            <h2>{{ promotion.title }}</h2>
          </div> -->
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev button promotionArea-button-prev" slot="button-prev"><i class="xi-angle-left"></i></div>
      <div class="swiper-button-next button promotionArea-button-next" slot="button-next"><i class="xi-angle-right"></i></div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  components: {
    swiper, swiperSlide,
  },
  data() {
    const _this = this;
    return {
      swiperOption: {
        speed: 600,
        slidesPerView: 2,
        spaceBetween: 15,
        touchRatio: 0.7,
        navigation: {
          nextEl: '.promotionArea-button-next',
          prevEl: '.promotionArea-button-prev'
        },
        on: {
          init() {
            let wrapper = _this.$el.querySelector('.swiper-wrapper');
            wrapper.style.transitionTimingFunction = 'cubic-bezier(0.61, 1, 0.88, 1)';

          },
        }
      },
      //반복문사용을 위해 임시로 만든 데이터입니다
      promotions: [
        {title: '5분 3틱 매매기법', successRate: 78.21, averageEarning: 52.39 },
        {title: '썬더볼트 매매기법', successRate: 65.21, averageEarning: 93.39},
        {title: 'SNS FLAG 분석', successRate: 64.21, averageEarning: 45.39},
        {title: 'DTW 차트유사도 분석', successRate: 78.21, averageEarning: 77.39},
      ],
    }
    
  },
  mounted() {
    const buySuccessRateGraph = this.$refs.buySuccessRateGraph;
    const averageEarningRateGraph = this.$refs.averageEarningRateGraph;
    let i = this.promotions.length;

    gsap.registerPlugin(ScrollTrigger);
    while(i > 0) {
      i--;
      gsap.to(buySuccessRateGraph[i], {
        scrollTrigger: buySuccessRateGraph[i],
        width: `${this.promotions[i].successRate}%`,
        duration: 2, 
      })
      gsap.to(averageEarningRateGraph[i], {
        scrollTrigger: averageEarningRateGraph[i],
        width: `${this.promotions[i].averageEarning}%`,
        duration: 2,
      })
    }
    
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/promotionArea.scss';
</style>