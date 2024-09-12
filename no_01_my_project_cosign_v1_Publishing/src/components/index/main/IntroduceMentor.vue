<template>
  <div class="introduceMentor_wrap">
    <div class="header">
      <ul>
        <!--메뉴구성을 반복되는 태그로 인해 v-for문으로 구성했습니다-->
        <li class="introduceMentorMenu"
          :class="{active: activeTabMenuIdx == idx}"
          v-for="(tapMenu, idx) in introduceMentorMenus"
          :key="idx"
          @click="onClickMenu(idx)"
        >
          <BtnEffect 
            duration='0.7'
            color='#D2DAE2'
          >
            <div class="inner">
              <div class="MenuIcon">
                <img class="icon" src="@/images/index/main/introduceMentor_icon.svg" alt="아이콘">
                <img class="activeIcon" src="@/images/index/main/introduceMentor_iconActive.svg" alt="아이콘">
              </div>
              <h1>{{ tapMenu }}</h1>
            </div>
          </BtnEffect>
        </li>
      </ul>
    </div>  <!--header-->
    <div class="introduceMentorList">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
          <IntroduceMentorElement/>
          <IntroduceMentorElement/>
          <IntroduceMentorElement/>
        </swiper-slide>
        <swiper-slide>
          <IntroduceMentorElement/>
          <IntroduceMentorElement/>
          <IntroduceMentorElement/>
        </swiper-slide>
        <div class="swiper-pagination introduceMentor_pagination" slot="pagination"></div>
      </swiper>
    </div>  <!--introduceMentorList-->
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import IntroduceMentorElement from '@/components/index/main/IntroduceMentorElement';
import BtnEffect from '@/components/common/BtnEffect';
export default {
  components: {
     swiper, swiperSlide, IntroduceMentorElement,BtnEffect,
  },
  data() {
    return {
      swiperOption: {
        speed: 800,
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 25,
        touchRatio: 0.6,
        pagination: {
          el: '.introduceMentor_pagination',
          clickable: true,
        },
      },
      activeTabMenuIdx: 0,
      introduceMentorMenus: [
        '알트코인 전문 멘토', '메이저코인 전문 멘토', '코사인 AI멘토', '샤머니즘멘토',
      ],
    }
  },
  methods: {
    onClickMenu(i) {
      this.activeTabMenuIdx = i;
    },
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/introduceMentor.scss';
</style>