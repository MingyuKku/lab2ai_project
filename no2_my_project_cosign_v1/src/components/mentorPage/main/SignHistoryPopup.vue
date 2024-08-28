<template>
  <div class="signHistory_modal_wrap" :class="{close: !isShow}">
    <!-- {{swipeItems.length}} -->
    <div class="outer">
      <div class="modal_box">
        <swiper ref="swiper" class="swiper" :options="swiperOption"
          @slideChange="onSlideChange"
          @slideChangeTransitionEnd="onSlideChangeEnd">
          <swiper-slide v-for="(item, idx) in swipeItems" :key='idx'>
            <div class="inner">
              <SignHistoryPopupItem :item="item" />
            </div>
          </swiper-slide>
        </swiper>
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
import SignHistoryPopupItem from '@/components/mentorPage/main/SignHistoryPopupItem.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

export default {
  components: {
    swiper, swiperSlide, SignHistoryPopupItem
  },
  data() {
    return {
      // swipeItems: [],
      swiperOption: this.getSlideOption(),
      isLoading: false,
      nextSlides: [],
      recentSignLoadTimer: null,
    }
  },
  watch: {
    signSeqId(val) {
      if(val !== null) {
        this.loadFirstSign(val);
      }
    },
  },
  computed: {
    ...mapGetters('signStore', ['historyPopup']),
    ...mapGetters('mentorRouteStore', ['mentorId']),
    ...mapGetters('signHistoryPopupStore', ['isShow', 'signSeqId', 'swipeItems']),
    ...mapGetters('signHistoryStore', ['signHistories']),
    activeIndex: {
      get() {
        return this.$refs.swiper.swiper.activeIndex;
      },
      set(value) {
        this.$refs.swiper.swiper.activeIndex = value;
      }
    }
  },
  methods: {
    ...mapActions('signHistoryPopupStore', ['closeHistoryPopup', 'setSwipeItems']),
    async loadFirstSign(seqId) {
      const res = await axios.get(`${API_URL}/api/sign/get/slide/current/${this.mentorId}/${seqId}`);  //1개에서 3개로 양옆에꺼 불러오기
      
      let activeIndex = 0;
      if(res.data.length === 3) { // 클릭한 싸인오프 양쪽에 데이터가 있을 때
        activeIndex = 1;
      } else if(res.data.length === 2) {  //클릭한 싸인오프가 맨처음 또는 맨끝일 때
        const idx = res.data.findIndex(item => item.sign.subSeqId === seqId);
        activeIndex = (idx !== -1)? idx: 0;
      } else {
        activeIndex = 0;
      }
      
      this.activeIndex = activeIndex;
      
      this.setSwipeItems(res.data);
      // this.setSwipeItems({items: res.data, way: null}); //추가한 내용

      if(this.activeIndex === 0) {
        this.recentSignLoadTimer = setTimeout(() => {
          this.onPrevSlide();
        }, 10000); // 10초에 한번씩 재 로드
      }
    },
    onSlideChange() {
      const activeSign = this.swipeItems[this.activeIndex];
      window.dataLayer.push({event: 'sign_off_route', sign_off_url: `/m/${this.mentorId}/${activeSign.sign.subSeqId}`});
    },
    async onPrevSlide() {
      const seqId = this.swipeItems[0].sign.subSeqId;
      const res = await axios.get(`${API_URL}/api/sign/get/slide/next/${this.mentorId}/${seqId}`);

      if(res.data.length > 0) {
        this.nextSlides = res.data; // onSlideChangEnd에서 처리

        //추가된 부분
        this.activeIndex = 1;
        // this.setSwipeItems({items: this.nextSlides.concat(this.swipeItems).slice(0,3), way: 'prev'}); 
        this.setSwipeItems(this.nextSlides.concat(this.swipeItems).slice(0,3)); 
        this.nextSlides = [];

      } else {
        this.recentSignLoadTimer = setTimeout(() => {
          this.onPrevSlide();
        }, 10000); // 10초에 한번씩 최신 데이터 확인 재 로드
      }
    },
    async onNextSlide() {
      const seqId = this.swipeItems[this.swipeItems.length - 1].sign.subSeqId;
      const res = await axios.get(`${API_URL}/api/sign/get/slide/prev/${this.mentorId}/${seqId}`);

      if(res.data.length > 0) {
        this.activeIndex = 1;

        this.setSwipeItems(this.swipeItems.concat(res.data).slice(-3));
        // this.setSwipeItems({items: this.swipeItems.concat(res.data).slice(-3), way: 'next'}); //추가한 내용
      } else {
        // 최초의 슬라이드
      }
    },
    async onSlideChangeEnd() {
      if(this.activeIndex === 0) { // 왼쪽 로드 필요
        this.onPrevSlide();
      }
      else if(this.activeIndex === 1) { // 맨 처음 싸인에서 오른쪽 로드시
        if(this.swipeItems.length < 3) {
          const seqId = this.swipeItems[this.swipeItems.length - 1].sign.subSeqId;
          const res = await axios.get(`${API_URL}/api/sign/get/slide/prev/${this.mentorId}/${seqId}`);
          this.setSwipeItems(this.swipeItems.concat(res.data));
        }
      }
      else if(this.activeIndex === 2) { // 오른쪽 로드 필요
        this.onNextSlide();
      }

      // 넥스트슬라이드(왼쪽)가 존재할 때
      // if(this.nextSlides.length > 0) {
      //   this.activeIndex = 1; // 순서에 맞는 슬라이드를 보여주기 위해
      //   // this.setSwipeItems(this.nextSlides.concat(this.swipeItems));
      //   this.setSwipeItems({items: this.nextSlides.concat(this.swipeItems), way: 'prev'});  //추가한 내용
      //   this.nextSlides = [];
      // }
    },
    onClickNav() {
      clearTimeout(this.recentSignLoadTimer);
    },
    onClickModalClose() {
      clearTimeout(this.recentSignLoadTimer);
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