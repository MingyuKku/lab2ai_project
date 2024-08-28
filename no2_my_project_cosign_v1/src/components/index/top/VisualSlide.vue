<template>
  <div class="visualSlide_wrap">
    <swiper class="swiper" :options="swiperOption" ref="swiper">
      <swiper-slide v-for="(data,idx) in slideData" :key="idx" :style="{backgroundColor: data.backColor}">
        <a :href="data.path" :target="data.target">
          <div class="inner" :style="{background: `url(${imgURL}${data.imgUrl}) no-repeat center`, backgroundSize: 'cover'}">
            <div class="textContent">
              <h2>{{ data.sub }}</h2>
              <h1 v-html="data.title"></h1>
              <p>{{ data.dec1 }}</p>
              <p v-if="data.dec2">{{ data.dec2 }}</p>
              <p v-if="data.dec3">{{ data.dec3 }}</p>
              <button type="button">{{ data.att }} <i class="xi-angle-right"></i></button>
            </div>
            <!-- <div class="slider_img">
              <img :src="`${imgURL}${data.imgUrl}`" alt="비주얼이미지">
            </div> -->
          </div> 
        </a>
      </swiper-slide>
      <div class="swiper-pagination index_visualSlide_pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  components: {
    swiper, swiperSlide, 
  },
  data() {
    const that = this;
    return {
      slideData: [
        {sub: '멘토 추천', title: '루나 사태에도 하루만에, <br>약 30% 수익을 낸 SIGN', dec1: '루나 사태로 시장이 폭락한 당일,', dec2: '플레이댑 코인 예측으로 29.5% 수익에 성공한 AI 멘토',
        att: '걸리면 홈런 멘토 바로가기', imgUrl: 'index/top/qa_visualSlide_1.png', backColor: '#007E57',path: '/m/homerun', target: '_self'},
        {sub: 'BETA 이벤트', title: 'AI가 예측하는 코인시세<br>모든 SIGN 무료 공개', dec1: 'BETA 기간동안 제공되는 특별한 기회', dec2: 'COSIGN 서비스에서 모든 코인 예측 SIGN을 무료로 공개합니다',
        att: '수익률 합계 1위 멘토 예측 보기', imgUrl: 'index/top/qa_visualSlide_2.png', backColor: '#676DF7',path: '/m/rabbit', target: '_self'},
        {sub: '멘토 상시 모집', title: 'SIGN보고<br>SIGN낼래?', dec1: '시세 예측 오픈 플랫폼 COSIGN에서', dec2: '함께 코인 시세를 예측 할 멘토를 모집합니다',
        att: '멘토 등록하러 가기', imgUrl: 'index/top/qa_visualSlide_3.png', backColor: '#F7B300', path: 'https://docs.google.com/forms/d/e/1FAIpQLSdpDxnBRhfH6QoAcQc86Jqwqa7f0xXXsTQULQxGjoKyu7J6GA/viewform', target: '_blank'},
        // {sub: 'BETA 이벤트', title: '회원가입만 하면, 모든 예측 <span>무료</span>', dec1: 'BETA 기간 동안 COSIGN 회원에게만 모든 예측 무료 공개', dec2: '지금 바로 회원가입하세요!',
        // att: '가입하러 가기', imgUrl: 'index/top/visualSlide0_img.png', path: '/signup', target: '_self'},
        // {sub: 'BETA 테스트 오픈', title: '<span>CO</span>IN + <span>SIGN</span> = <span>COSIGN</span>', dec1: '인간 멘토와 AI 멘토가 분석하는 코인 시세', dec2: '실시간으로 확인이 가능한 예측',
        // dec3: '지금 바로 확인하세요!', att: 'COSIGN 더 알아보기', imgUrl: 'index/top/visualSlide_img.png',path: '/guidePage', target: '_self'},
        // {sub: '멘토 상시 모집', title: '<span>SIGN</span>하고 <span>SIGN</span>낼래?', dec1: '시세 예측 오픈 플랫폼 COSIGN에서', dec2: '코인 시세를 예측 할 멘토를 모집합니다',
        // att: '멘토 등록하러 가기', imgUrl: 'index/top/visualSlide2_img.png',path: 'https://docs.google.com/forms/d/e/1FAIpQLSdpDxnBRhfH6QoAcQc86Jqwqa7f0xXXsTQULQxGjoKyu7J6GA/viewform', target: '_blank'},
        // {sub: '문의/오류 신고', title: '여러분의 <span>SIGN</span>을 보내주세요', dec1: 'COSIGN 개선을 위해 여러분의 의견이 필요합니다', dec2: '이용 문의 사항이나, 오류가 발생했다면 알려주세요',
        // att: '문의하러 가기', imgUrl: 'index/top/visualSlide3_img.png',path: 'https://docs.google.com/forms/d/e/1FAIpQLSdrNAUa_KRhyIZ67SUPJOJ7X2oFhxfu7nErUuKr48e-lPREmw/viewform', target: '_blank'},
      ],
      swiperOption: {
        speed: 1200,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        parallax: true,
        slidesPerView: 1,
        touchRatio: 0.8,
        pagination: {
          el: '.index_visualSlide_pagination',
          clickable: true,
          // type: "fraction",
        },
        on: {
          init() {
            // this.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.61, 1, 0.88, 1)';
            this.el.addEventListener('mouseenter', that.onMouseSwiper);
            this.el.addEventListener('mouseleave', that.offMouseSwiper);
          },
          touchEnd() {
            this.params.speed = 900;
          },
          transitionEnd() {
            this.params.speed = 1200;
          },
        }
      },
    }
  },
  beforeDestroy() {
    this.$refs.swiper.swiper.el.remove('removeEventListener', this.onMouseSwiper);
    this.$refs.swiper.swiper.el.addEventListener('removeEventListener', this.offMouseSwiper);
  },
  methods: {
    onMouseSwiper() {
      this.$refs.swiper.swiper.autoplay.stop();
    },
    offMouseSwiper() {
      this.$refs.swiper.swiper.autoplay.start();
    }
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/top/css/visualSlide.scss';
</style>