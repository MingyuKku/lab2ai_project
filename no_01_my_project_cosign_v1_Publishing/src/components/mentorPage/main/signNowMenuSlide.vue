<template>
<div class="menuSlider_wrap">
  <swiper ref="swiper" class="swiper menuSlider" :options="swiperOption">
    <swiper-slide v-for="(button, idx) in buttons" :key="button.signId"
        :class="{active: idx === activeIndex}">
      <div class="inner"
        @click="onButtonClick(button.signId, idx)"
        >
        {{button.code.substr(0,4)}}
      </div> 
    </swiper-slide>
  </swiper>
  <div class="swiper-button-prev button menu_swiper-button-prev" slot="button-prev"></div>
  <div class="swiper-button-next button menu_swiper-button-next" slot="button-next"></div>
  <div class="swiper-button-prev button menu_swiper-button-prev gradient_prev" slot="button-prev"></div>
  <div class="swiper-button-next button menu_swiper-button-next gradient_next" slot="button-next"></div>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  components: {
    swiper, swiperSlide,
  },
  props: ['buttons', 'LoadAnotherContent'],
  data() {
    return {
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
  mounted() {
  },
  methods: {
    onButtonClick: function(signId, clickIdx) {
      this.activeIndex = clickIdx;

      this.LoadAnotherContent(signId);
    }
  }
}
</script>

<style lang='scss'>
  @import './css/signNowMenuSlide.scss';
</style>