<template>
  <div class="visualSlide_wrap">
    <div class="swiper-container swiper" ref="swiper"
      v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(data,idx) in slideData" :key="idx" :style="{backgroundColor: data.backColor}">
          <div class="inner">
            <a :href="data.link" :target="getTarget(idx)" @click="onClickVisual(data.link)" 
            :style="{background: `url(${data.pcImage}?ver=${version}) no-repeat center`, backgroundSize: 'cover'}">
              <div class="textContent">
                <h2>{{ data.tag }}</h2>
                <h1 class="title">{{ data.title }}</h1>
                <h1 class="subTitle">{{ data.subTitle }}</h1>
                <p>{{ data.content }}</p>
                <p v-if="data.subContent">{{ data.subContent }}</p>
                <button type="button">{{ data.linkName }} <i class="xi-angle-right"></i></button>
              </div>
            </a> 
          </div>
        </div>
      </div>
      <div class="swiper-pagination index_visualSlide_pagination" slot="pagination"></div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'getVisualContent',
    'onClickVisual'
  ],
  data() {
    const that = this;
    return {
      version: '0.2.13',
      slideData: [
        {tag: 'COSIGN', title: '코인 리딩방에 속지 말고', subTitle: '진짜 전문가 AI를 믿어라', content: '전문가인 척 투자자들을 속이는 코인 리딩방에서 벗어나세요', subContent: '진짜 코인 전문가인 AI가 시세를 예측합니다',
        linkName: '진짜 AI가 예측하는 코인 시세 보러 가기', pcImage: `${this.$static.imgUrl}index/top/visualSlide_1.png`, backColor: '#0D1C80', link: '/news', newWindow: false},
        {tag: 'COSIGN', title: '이름만 AI?', subTitle: '코싸인은 진짜 AI', content: '코싸인이 직접 개발한 AI로 예측하는 코인 예측', subContent: '어떻게 만든 AI 모델인지 다 공개해드립니다!',
        linkName: '어떻게 만들었는지 궁금하다면?', pcImage: `${this.$static.imgUrl}index/top/visualSlide_2.png`, backColor: '#916EFF', link: '/global?popup=true', newWindow: false},
        {tag: 'BETA 이벤트', title: 'AI가 예측하는 코인추천', subTitle: '모든 SIGN 무료 공개', content: 'BETA 기간동안 제공되는 특별한 기회', subContent: 'COSIGN 서비스에서 모든 코인 예측 SIGN을 무료로 공개합니다',
        linkName: '수익률 합계 1위 멘토 예측 보기', pcImage: `${this.$static.imgUrl}index/top/visualSlide_3.png`, backColor: '#676DF7', link: '/rabbit', newWindow: false},
        {tag: '멘토 상시 모집', title: 'SIGN보고', subTitle: 'SIGN낼래?', content: '시세 예측 오픈 플랫폼 COSIGN에서', subContent: '함께 코인 시세를 예측 할 멘토를 모집합니다',
        linkName: '멘토 등록하러 가기', pcImage: `${this.$static.imgUrl}index/top/visualSlide_4.png`, backColor: '#F7B300', link: 'https://docs.google.com/forms/d/e/1FAIpQLSdpDxnBRhfH6QoAcQc86Jqwqa7f0xXXsTQULQxGjoKyu7J6GA/viewform', newWindow: true},
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
  created() {
    if(this.getVisualContent.length > 0) this.slideData = this.getVisualContent
  },
  mounted() {
    console.log('메인슬라이드', this.getVisualContent)
  },
  beforeDestroy() {
    this.$refs.swiper.swiper.el.remove('removeEventListener', this.onMouseSwiper);
    this.$refs.swiper.swiper.el.addEventListener('removeEventListener', this.offMouseSwiper);
  },
  methods: {
    getTarget(idx) {
      if(this.slideData[idx].newWindow) return '_blank';
      else return '_self';
    },
    onMouseSwiper() {
      this.$refs.swiper.swiper.autoplay.stop();
    },
    offMouseSwiper() {
      this.$refs.swiper.swiper.autoplay.start();
    },
  }
}
</script>

<style lang='scss'>
  @import '@/src/components/index/top/css/visualSlide.scss';
</style>