<template>
  <div class="todayMentor_wrap">
    <swiper class="swiper" :options="swiperOption" ref="swiper">
      <swiper-slide v-for="(list,idx) in todayMentorList" :key="idx" :style="{background: list.color}">
        <div class="inner">
          <a :href="list.path">
            <img :src="list.img" alt="투데이멘토이미지">
          </a>
        </div>
      </swiper-slide>
    </swiper>
    <div class="nav_wrap">
      <div class="swiper-button-prev button todayMentor-button-prev" slot="button-prev"><i class="xi-angle-left-thin"></i></div>
      <div class="swiper-button-next button todayMentor-button-next" slot="button-next"><i class="xi-angle-right-thin"></i></div>
    </div>
    <div class="swiper-pagination todayMentor_pagination" slot="pagination"></div>
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
    return {
      todayMentorList: [
        {color: '#F38683', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_1.png', path: 'm/rabbit'},
        {color: '#03204E', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_2.png', path: 'm/dtw'},
        {color: '#4AC2BE', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_3.png', path: 'm/homerun'},
        {color: '#00A152', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_4.png', path: 'm/bottom'},
        {color: '#7B41E6', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_5.png', path: 'm/news'},
        {color: '#E26440', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_6.png', path: 'm/hoonbotlight'},
        {color: '#BD253E', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_7.png', path: 'm/bitpapa'},
        {color: '#3178E2', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_8.png', path: 'm/rocket'},
        {color: '#2AA9E0', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_9.png', path: 'm/sns'},
        {color: '#2C1B72', img: 'https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/todayMentor/todayMentor_10.png', path: 'm/global'},
      ],
      activeIndex: 0,
      swiperOption: {
        speed: 1200,
        loop: true,
        touchRatio: 0.8,
        pagination: {
          el: '.todayMentor_pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.todayMentor-button-next',
          prevEl: '.todayMentor-button-prev'
        },
        on: {
        }
      },
    }
  },
  mounted() {
    this.randomContent();
  },
  watch: {
    activeIndex(idx) {
      this.swiper.slideTo(idx,0);
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  methods: {
    randomContent() {
      let randomIndex = Math.floor(Math.random()*this.todayMentorList.length+1);
      this.activeIndex = randomIndex;
    }
  }
}
</script>

<style lang='scss'>
  @import './css/todayMentor.scss';
</style>