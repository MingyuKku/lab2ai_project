<template>
  <div class="modal_wrap" :class="{close: !historyPopup}">
    <div class="outer">
      <div class="modal_box">
        <swiper ref="swiper" class="swiper" :options="swiperOption"
          @slideChange="onSlideChange">
          <swiper-slide v-for="(content, idx) in signHistories" :key='content.id'>
            <div class="inner">
              <SignHistoryPopupItem
                :content='content'
                :listIdx='idx'
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>  <!--modal_box--> 
      <div class="swiper-button-prev button modal_swiper-button-prev" slot="button-prev">
        <i class="xi-angle-left-thin"></i>
      </div>
      <div class="swiper-button-next button modal_swiper-button-next" slot="button-next">
        <i class="xi-angle-right-thin"></i>
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

export default {
  components: {
    swiper, swiperSlide, SignHistoryPopupItem
  },
  data() {
    let _this = this;
    let startX = null;
    let endX = null;
    return {
      swiperOption: {
        speed: 400,
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
          nextEl: '.modal_swiper-button-next',
          prevEl: '.modal_swiper-button-prev'
        },
        on: {
          touchStart(e) {
            startX = e.pageX;
          },
          touchEnd(e) {
            //특정 범위 이하로 드래그시에는 슬라이드 넘어가지 않도록
            endX = e.pageX;
            let diffX = endX - startX;
            if(diffX > 0 && diffX <= 250) {
              _this.$refs.swiper.swiper.slideTo(_this.$refs.swiper.swiper.activeIndex)
            } else if(diffX < 0 && diffX >= -250) {
              _this.$refs.swiper.swiper.slideTo(_this.$refs.swiper.swiper.activeIndex-1)
            }
          }
        }
      },
      isLoading: false,
    }
  },
  watch: {
    selectedHistoryId(val) {
      this.activeIndex = val;
      this.LoadSignHistoryDetail();
    }
  },
  computed: {
    ...mapGetters('signStore', ['pageId', 'pageNo', 'signHistoriesTotalPageCount', 'historyPopup', 'signHistories', 'selectedHistoryId']),
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
    ...mapActions('signStore', ['showHistoryPopup', 'loadHistoryDetail', 'loadNewsLinks', 'loadHistories', 'setPageNo']),
    async LoadSignHistoryDetail() {
      const sign = this.signHistories[this.activeIndex];

      if(sign !== undefined) {
        this.loadHistoryDetail({
          ...sign,
          idx: this.activeIndex
        });

        // this.loadNewsLinks({
        //   ...sign,
        //   idx: this.activeIndex
        // })
      }
    },
    onSlideChange() {
      this.LoadSignHistoryDetail();

      const newPageNo = this.pageNo + 1;
      if(this.activeIndex === this.signHistories.length - 1
        && newPageNo < this.signHistoriesTotalPageCount
        && this.isLoading == false) {
        this.loadNewHistories(newPageNo);
      }
    },
    async loadNewHistories(newPageNo) {
      this.isloading = true;     
      await this.loadHistories({
        pageNo: newPageNo,
        pageId: this.pageId
      });

      this.setPageNo(newPageNo); 
      this.isloading = false;
    },
    onClickModalClose() {
      this.showHistoryPopup(null);
    }
  }
}
</script>

<style lang='scss'>
  @import './css/signHistoryPopup.scss';
</style>