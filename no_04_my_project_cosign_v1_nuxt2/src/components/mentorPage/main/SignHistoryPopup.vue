<template>
  <div class="signHistory_modal_wrap" :class="{close: swipeItems === undefined || swipeItems.length === 0}">
    <!-- {{swipeItems.length}} -->
    <div class="outer">
      <div class="modal_box">
        <div class="swiper" ref="swiper"
        v-swiper:mySwiper="swiperOption"
          @slideChange="onSlideChange"
          @slideChangeTransitionEnd="onSlideChangeEnd">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in swipeItems" :key='item.sign.slideNo'>
              <div class="inner">
                <SignHistoryPopupItem :item="item" :mentorId="mentorId" />
              </div>
            </div>
          </div>
        </div>
      </div>  <!--modal_box--> 
      <div class="swiper-button-prev button modal_swiper-button-prev" slot="button-prev" @click="onClickNav">
        <i class="xi-angle-left-thin gtag_sign_off_item"></i>
      </div>
      <div class="swiper-button-next button modal_swiper-button-next" slot="button-next" @click="onClickNav">
        <i class="xi-angle-right-thin gtag_sign_off_item"></i>
      </div>
      <div class="modalClose" @click="onClickModalClose"><i class="xi-close-thin"></i></div>
    </div>  <!--outer-->
  </div>  <!--modal_wrap-->
</template>

<script>
import SignHistoryPopupItem from '@/src/components/mentorPage/main/SignHistoryPopupItem.vue';
import { mapActions, mapGetters } from 'vuex';
import getSignOffPopup, { newActiveIndex, getSignOffTime } from '~/src/core/signOffPopup.js';

export default {
  components: {
    SignHistoryPopupItem
  },
  props: ["signOffPopupProps", "mentorId", "subSeqId",'signPropsChange'],
  data() {
    let activeSlides = [];
    if(this.signOffPopupProps !== undefined) {
      const activeIndex = newActiveIndex(this.signOffPopupProps, this.subSeqId);
      activeSlides = [this.signOffPopupProps[activeIndex]];
    }
    return {
      swipeItems: activeSlides,
      swiperOption: this.getSlideOption(),
      isLoading: false,
      nextSlides: [],
      recentSignLoadTimer: null,
    }
  },
  watch: {
    slideNo(val) {
      if(val !== null) {
        this.loadFirstSign(val);
      }
    },
  },
  created() {
  },
  mounted() {
    if(this.swipeItems !== undefined && this.swipeItems.length > 0) {
      this.swipeItems = this.signOffPopupProps;
      this.swipeItems = this.swipeItems.map(data => {
        const sign = data.sign
        return {
          ...data,
          sign: {
            ...sign,
            ...getSignOffTime(sign)
          }
        }
      })

      this.$refs.swiper.swiper.activeIndex = newActiveIndex(this.swipeItems, this.subSeqId);
    }
  },
  computed: {
    ...mapGetters("mentorPage/signHistoryPopupStore", ["slideNo"]),
  },
  methods: {
    ...mapActions("mentorPage/signHistoryPopupStore", ["closeHistoryPopup"]),
    async loadFirstSign(slideNo) {
      const res = await this.$axios.get(`/api/sign/get/slide/current/${this.mentorId}/${slideNo}`);  //1개에서 3개로 양옆에꺼 불러오기
      
      this.swipeItems = getSignOffPopup(res.data);
      this.swipeItems = this.swipeItems.map(data => {
        const sign = data.sign
        return {
          ...data,
          sign: {
            ...sign,
            ...getSignOffTime(sign)
          }
        }
      })
      this.$refs.swiper.swiper.activeIndex = newActiveIndex(res.data, null, slideNo);

      const signOff = this.swipeItems[this.$refs.swiper.swiper.activeIndex]
      this.signPropsChange( {signOn: null, signOff: signOff} )

      if(this.$refs.swiper.swiper.activeIndex === 0) {
        this.recentSignLoadTimer = setTimeout(() => {
          this.onLeftSlide();
        }, 10000); // 10초에 한번씩 재 로드
      }
    },
    onSlideChange() {
      if(this.swipeItems.length > 0) {
        const activeSign = this.swipeItems[this.$refs.swiper.swiper.activeIndex];

        this.signPropsChange( {signOn: null, signOff: activeSign} )
        
        if(window.dataLayer === undefined) {
          window.dataLayer = [];
        }

        window.dataLayer.push({event: 'sign_off_route', sign_off_url: `/${this.mentorId}/${activeSign.sign.subSeqId}`});
      }
    },
    async onLeftSlide() {
      const slideNo = this.swipeItems[0].sign.slideNo;
      const res = await this.$axios.get(`/api/sign/get/slide/left/${this.mentorId}/${slideNo}`);

      if(res.data.length > 0) {
        let prevSlide = getSignOffPopup(res.data);
        prevSlide = prevSlide.map(data => {
          const sign = data.sign
          return {
            ...data,
            sign: {
              ...sign,
              ...getSignOffTime(sign)
            }
          }
        })
        
        this.swipeItems = prevSlide.concat(this.swipeItems);

        this.$refs.swiper.swiper.activeIndex = 1;
      } else {
        this.recentSignLoadTimer = setTimeout(() => {
          this.onLeftSlide();
        }, 10000); // 10초에 한번씩 최신 데이터 확인 재 로드
      }
      // console.log('left', this.swipeItems)
    },
    async onRightSlide() {
      const slideNo = this.swipeItems[this.swipeItems.length - 1].sign.slideNo;
      const res = await this.$axios.get(`/api/sign/get/slide/right/${this.mentorId}/${slideNo}`);

      if(res.data.length > 0) {
        let nextSlide = getSignOffPopup(res.data);
        nextSlide = nextSlide.map(data => {
          const sign = data.sign
          return {
            ...data,
            sign: {
              ...sign,
              ...getSignOffTime(sign)
            }
          }
        })
        this.swipeItems = this.swipeItems.concat(nextSlide);
      } else {
        // 최초의 슬라이드
      }
      // console.log('right', this.swipeItems)
    },
    async onSlideChangeEnd() {
      if(this.$refs.swiper.swiper.activeIndex === 0) { // 왼쪽 로드 필요
        this.onLeftSlide();
      }
      else if(this.$refs.swiper.swiper.activeIndex === 1) { // 맨 처음 싸인에서 오른쪽 로드시      
        if(this.swipeItems.length < 3) {
          const slideNo = this.swipeItems[this.swipeItems.length - 1].sign.slideNo;
          const res = await this.$axios.get(`/api/sign/get/slide/right/${this.mentorId}/${slideNo}`);
          let nextSlide = getSignOffPopup(res.data);
          nextSlide = nextSlide.map(data => {
            const sign = data.sign
            return {
              ...data,
              sign: {
                ...sign,
                ...getSignOffTime(sign)
              }
            }
          })
          this.swipeItems = this.swipeItems.concat(nextSlide);

        }
      }
      else if(this.$refs.swiper.swiper.activeIndex === this.swipeItems.length - 1) { // 오른쪽 로드 필요
        this.onRightSlide();
      }
    },
    onClickNav() {
      clearTimeout(this.recentSignLoadTimer);
    },
    onClickModalClose() {
      clearTimeout(this.recentSignLoadTimer);
      this.swipeItems = [];
      this.closeHistoryPopup();
    },
    getSlideOption() {      
      return {
        speed: 400,
        slidesPerView: 1,
        spaceBetween: 24,
        allowTouchMove: false,
        navigation: {
          nextEl: '.modal_swiper-button-next',
          prevEl: '.modal_swiper-button-prev'
        },
        on: {
        }
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/signHistoryPopup.scss';
</style>