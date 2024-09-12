<template>
  <div class="menuSlider_wrap">
    <div ref="swiper" class="swiper menuSlider"
      v-swiper:myDirectiveSwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(button,idx) in buttons" :key="button.signId"
          :class="{active: activeIndex === idx}">
          <div class="inner" @click="onButtonClick(button.signId, idx)">
            <NuxtLink :to="{
              name: 'mentorId-subSeqId', 
              params: { 
                mentorId: mentorId, 
                subSeqId: button.subSeqId,
              } 
            }">
              {{ button.code.substr(0,4) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev button menu_swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next button menu_swiper-button-next" slot="button-next"></div>
    <div class="swiper-button-prev button menu_swiper-button-prev gradient_prev" slot="button-prev"></div>
    <div class="swiper-button-next button menu_swiper-button-next gradient_next" slot="button-next"></div>
  </div>
</template>

<script>
export default {
  props: ['buttons', 'mentorId', 'LoadAnotherContent', 'activeSignSeqId'],
  data() {
    return {
      subSeqId: null,
      swiperOption: {
        freeMode: true,
        speed: 400,
        slidesPerView: 7,
        slidesPerGroup: 6,
        spaceBetween: 10,
        navigation: {
          nextEl: '.menu_swiper-button-next',
          prevEl: '.menu_swiper-button-prev'
        },
        breakpoints: {
          320: {
            slidesPerView: 4,
            slidesPerGroup: 3,
          },
          350: {
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
          480: {
            slidesPerView: 6,
            slidesPerGroup: 5,
          }
        },
      },
      activeIndex: 0
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  mounted() {
    this.slideToActiveSign(this.activeSignSeqId)
  },
  methods: {
    onButtonClick: function(signId, clickIdx) {
      this.activeIndex = clickIdx;
      this.LoadAnotherContent(signId);
    },
    slideToActiveSign(id) {
      this.activeIndex = this.buttons.findIndex(button => button.subSeqId === id);
      this.$nextTick(() => {
        this.swiper.slideTo(this.activeIndex, 300); 
      });
    }
  }
}
</script>

<style lang='scss'>
  @import './css/signNowMenuSlide.scss';
</style>