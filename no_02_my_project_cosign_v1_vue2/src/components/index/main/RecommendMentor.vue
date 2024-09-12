<template>
  <div class="recommendMentor_wrap">
    <div class="title">
      <div class="title_list_wrap">
        <div class="title_list" ref="title_list" v-for="(mentorListTit, idx) in mentorListData" :key="idx"
          :class="{active: activeListIndex === idx}" @click="activeListIndex = idx">
          {{ mentorListTit.listName }}
        </div>
        <span class="activeStick" ref="activeStick"></span>
      </div>
    </div>
    <div class="mentorList">
      <div class="swiper_wrap" v-for="(data, idx) in mentorListData" :key="idx">
        <swiper class="swiper" :options="swiperOption" ref="swiper" v-if="activeListIndex === idx">
          <swiper-slide v-for="(mentor,idx2) in data.list" :key="idx2">
            <div class="inner">
              <a :href="mentor.path" :target="mentor.target">
                <div class="mentorImg"><img :src="mentor.img" alt="멘토이미지" @error="onImageError"></div>
              </a>
            </div>
          </swiper-slide>
        </swiper>
        <!-- <div class="swiper-button-prev button recommendMentor-button-prev" slot="button-prev" v-if="activeListIndex === idx">
          <i class="xi-angle-left"></i></div>
        <div class="swiper-button-next button recommendMentor-button-next" slot="button-next" v-if="activeListIndex === idx">
          <i class="xi-angle-right"></i></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
// import axios from 'axios'
export default {
  components: {
    swiper, swiperSlide, 
  },
  data() {
    const version = '0.1.20';
    return {
      activeListIndex: 0,
      mentorListData: [
        {listName: '지난주 최고 수익 예측', list: [
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/bestEarningMentor_1.png?ver=${version}`, path: 'm/homerun/1990', target: '_self'},
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/bestEarningMentor_2.png?ver=${version}`, path: 'm/dtw/8233', target: '_self'},
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/bestEarningMentor_3.png?ver=${version}`, path: 'm/bitpapa/74', target: '_self'},
        ]},
        {listName: '연속 적중 TOP멘토', list: [
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/continuHit_1.png?ver=${version}`, path: 'm/bottom', target: '_self'},
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/continuHit_2.png?ver=${version}`, path: 'm/dtw', target: '_self'},
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/continuHit_3.png?ver=${version}`, path: 'm/hoonbotlight', target: '_self'},
        ]},
        {listName: '카드 뉴스', list: [
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/cardNews_1.png?ver=${version}`, path: 'https://www.instagram.com/p/CeTFYjqu1Bn/', target: '_blank'},
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/cardNews_2.png?ver=${version}`, path: 'https://www.instagram.com/p/CeLD6EWLMr7/', target: '_blank'},
          {img: `https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/introduceMentor/cardNews_3.png?ver=${version}`, path: 'https://www.instagram.com/p/Cd5Ffx5Li5A/', target: '_blank'},
        ]},
      ],
      swiperOption: {
        speed: 800,
        allowTouchMove: false,
        // parallax: true,
        spaceBetween: 20,
        slidesPerView: 3,
        slidesPerGroup : 3,
        touchRatio: 1,
        // navigation: {
        //   nextEl: '.recommendMentor-button-next',
        //   prevEl: '.recommendMentor-button-prev'
        // },
        on: {
          init() {
          },
        }
      },
    }
  },
  async mounted() {
    // this.setBestEarningMentor();
    this.moveStick();
    // let data = {
    //   fields: 
    // }
    // let res = axios.get('https://graph.instagram.com/17895695668004550', JSON.stringify(data), )
  },
  watch: {
    activeListIndex() {
      this.moveStick();
    }
  },
  methods: {
    moveStick() {
      this.$nextTick(()=> {
        let activeStick = this.$refs.activeStick;
        let title_list = this.$refs.title_list[this.activeListIndex];

        activeStick.style.width = `${title_list.offsetWidth}px`;
        activeStick.style.transform = `translate3d(${title_list.offsetLeft}px, 0, 0)`;
      })
    },
    onImageError(e) {
      e.target.src = `${process.env.VUE_APP_IMG_URL_Mentor}default.png`;
    },
  }
}
</script>

<style lang='scss'>
  @import './css/recommendMentor.scss';
</style>