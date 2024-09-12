<template>
  <div class="tableList_wrap">
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
      <div class="swiper_wrap">
        <swiper class="swiper" :options="swiperOption" ref="swiper">
          <swiper-slide>
            <div class="inner">
              <!-- :tabMenuIndex="activeListIndex" -->
              <NewPredictSignList class="newPredictSignList"
                :items="mentorListData[0].list"
              />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="inner">
              <HitSignList class="hitSignList"
                :items="mentorListData[1].list"
              />
            </div>
          </swiper-slide>
        </swiper>
        <!-- <div class="swiper-button-prev button tableList-button-prev" slot="button-prev">
          <i class="xi-angle-left"></i></div>
        <div class="swiper-button-next button tableList-button-next" slot="button-next">
          <i class="xi-angle-right"></i></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

import NewPredictSignList from '@/components/index/main/NewPredictSignList';
import HitSignList from '@/components/index/main/HitSignList'

export default {
  components: {
    swiper, swiperSlide, NewPredictSignList, HitSignList,
  },
  data() {
    return {
      activeListIndex: 0,
      hoverTranslateY: 0,
      mentorListData: [
        {listName: '최근등록 SIGN', list: []},
        {listName: '최근 수익 적중 SIGN', list: []},
      ],
      swiperOption: {
        speed: 600,
        spaceBetween: 20,
        // slidesPerView: 10,
        allowTouchMove: false,
        // touchRatio: 1,
        navigation: {
          nextEl: '.tableList-button-next',
          prevEl: '.tableList-button-prev'
        },
        on: {
          init() {
          },
        }
      },
    };
  },

  mounted() {
    this.setLatestSign();
    this.setHitSign();
    this.moveStick();
  },
  watch: {
    activeListIndex(val) {
      this.moveStick();
      this.swiper.slideTo(val, 600);
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  methods: {
    async setLatestSign() {
      const res = await axios.get(`${API_URL}/api/main/latest_forecast_sign`);

      this.mentorListData[0].list = res.data.map(item => {

        function validateTime(start,end) {
          return `${new Date(start).format('HH:mm')} - ${new Date(end).format('HH:mm')}`;
        }

        return {
          ...item,
          url: `/m/${item.mentorId}/${item.subSeqId}`,
          targetEarningRateText: ((item.targetPrice / item.startPrice - 1) * 100).toFixed(2),
          startTimeText: new Date(item.startTime).format("yyyy-MM-dd HH:mm"),
          endTime: new Date(item.startTime).addDate('minute', item.validateMin).format('yyyy-MM-ddTHH:mm'),
          minuteText: this.getMinuteText(item.validateMin),
          validationTime: validateTime(item.startTime, new Date(item.startTime).addDate('minute', item.validateMin).format('yyyy-MM-ddTHH:mm'))
        }
      })
    },
    async setHitSign() {
      const res = await axios.get(`${API_URL}/api/main/recent_earnings_hit_sign`);

      this.mentorListData[1].list = res.data.map(item => {
        function validateTime(start,end) {
          return `${new Date(start).format('HH:mm')} - ${new Date(end).format('HH:mm')}`;
        }

        return {
          ...item,
          url: `/m/${item.mentorId}/${item.subSeqId}`,
          earningRateText: (item.earningRate).toFixed(2),
          startTimeText: new Date(item.startTime).format("MM-dd HH:mm"),
          endTimeText: new Date(item.endTime).format("MM-dd HH:mm"),
          minuteText: this.getMinuteText(item.validateMin),
          validationTime: validateTime(item.startTime, new Date(item.startTime).addDate('minute', item.validateMin).format('yyyy-MM-ddTHH:mm'))
        }
      })
    },
    getMinuteText(minute) {
      if(minute / 60 < 1) {
        return `${minute}분`;
      } else {
        return `${Math.ceil(minute/60)}시간`;
      }
    },

    moveStick() {
      this.$nextTick(()=> {
        let activeStick = this.$refs.activeStick;
        let title_list = this.$refs.title_list[this.activeListIndex];

        activeStick.style.width = `${title_list.offsetWidth}px`;
        activeStick.style.transform = `translate3d(${title_list.offsetLeft}px, 0, 0)`;
      })
    },
    changeHoverTop(val) {
      this.hoverTranslateY = val;
    },
    onImageError(e) {
      e.target.src = `${process.env.VUE_APP_IMG_URL_Mentor}default.png`;
    },
  },
}
</script>

<style lang='scss'>
  @import './css/tableList.scss';
</style>