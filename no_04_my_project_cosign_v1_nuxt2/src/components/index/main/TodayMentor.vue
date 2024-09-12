<template>
  <div class="todayMentor_wrap">
    <div class="swiper" ref="swiper"
      v-swiper:myDirectiveSwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(list,idx) in todayMentorList" :key="idx" :style="{background: list.color}">
            <div class="inner">
              <a :href="list.path">
                <img :src="list.img" alt="투데이멘토이미지">
              </a>
            </div>
          </div>
        </div>
      </div>
    <div class="nav_wrap">
      <div class="swiper-button-prev button todayMentor-button-prev" slot="button-prev"><i class="xi-angle-left-thin"></i></div>
      <div class="swiper-button-next button todayMentor-button-next" slot="button-next"><i class="xi-angle-right-thin"></i></div>
    </div>
    <div class="swiper-pagination todayMentor_pagination" slot="pagination"></div>
  </div>
</template>

<script>
export default {
  data() {
    const version = '0.2.15'
    return {
      todayMentorList: [
        {color: '#F38683', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_1.png?ver=${version}`, path: 'rabbit'},
        {color: '#03204E', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_2.png?ver=${version}`, path: 'dtw'},
        {color: '#4AC2BE', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_3.png?ver=${version}`, path: 'homerun'},
        {color: '#00A152', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_4.png?ver=${version}`, path: 'bottom'},
        {color: '#7B41E6', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_5.png?ver=${version}`, path: 'news'},
        // {color: '#E26440', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_6.png?ver=${version}`, path: 'hoonbotlight'},
        // {color: '#BD253E', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_7.png?ver=${version}`, path: 'bitpapa'},
        {color: '#3178E2', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_8.png?ver=${version}`, path: 'rocket'},
        {color: '#2AA9E0', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_9.png?ver=${version}`, path: 'sns'},
        {color: '#2C1B72', img: `${this.$static.imgUrl}index/main/todayMentor/todayMentor_10.png?ver=${version}`, path: 'global'},
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