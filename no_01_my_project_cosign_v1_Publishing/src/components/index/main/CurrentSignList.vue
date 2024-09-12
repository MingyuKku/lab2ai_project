<template>
  <div class="currentSignList_wrap">
    <div
      class="swiper-pagination currentSignList_pagination"
      slot="pagination"
      ref="currentSignList_pagination"
    ></div>
    <swiper class="swiper" :options='swiperOption'>
      <swiper-slide class="currectSignList swiper_currentSignList">
        <div class="inner">
          <transition-group name="showList" tag='div'>
            <!--반복되는 컴포넌트여서 v-for문으로 작성했습니다-->
            <CurrectSign ref="currectSign"
              v-for="currectSign in currectSignList"
              :key="currectSign.no"
              :currectSign="currectSign"
            />
          </transition-group>
        </div>
      </swiper-slide>
      <swiper-slide class="doingSignList swiper_currentSignList">
        <div class="inner">
          <transition-group name="showList" tag='div'>
            <!--반복되는 컴포넌트여서 v-for문으로 작성했습니다-->
            <DoingSign
              v-for="currectSign in currectSignList"
              :key="currectSign.no"
              :currectSign="currectSign"
            />
          </transition-group>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// 페이지네비게이션(탭메뉴) 생성
const $createImg1 = document.createElement('img');
const $createImg2 = document.createElement('img');
const $createP1 = document.createElement('p');
const $createP2 = document.createElement('p');
$createImg1.src = require('@/images/index/main/correctSign_icon.svg');
$createP1.textContent = '예측적중 Sign리스트';
$createImg2.src = require('@/images/index/main/currentSign_icon.svg');
$createP2.textContent = '진행중인 Sign리스트';

import CurrectSign from '@/components/index/main/CurrectSign';
import DoingSign from '@/components/index/main/DoingSign';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  components: {
    CurrectSign, DoingSign, swiper, swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        effect: "fade",
        speed: 0,
        touchRatio: 0,
        pagination: {
          el: '.currentSignList_pagination',
          clickable: true,
        },
      },

      //currectSignList는 예시(임시)로 사용하는 데이터입니다(v-for문 및 transition-group 사용테스트를 위해)
      currectSignList: [
        {no: 1, mentor: '다크호스쏘니', coinName: '비트코인캐시', earning: '56.21'},
        {no: 2, mentor: '멀리봐야얻는다', coinName: '비트코인에스브이', earning: '88.21'},
        {no: 3, mentor: '코린이들의천국', coinName: '이더리움', earning: '-10.21'},
        {no: 4, mentor: '다크호스쏘니', coinName: '비트코인', earning: '56.21'},
        {no: 5, mentor: '다크호스쏘니', coinName: '비트코인', earning: '90.21'},
        {no: 6, mentor: '다크호스쏘니', coinName: '비트코인', earning: '-30.21'},
        {no: 7, mentor: '다크호스쏘니', coinName: '비트코인캐시', earning: '5.51'},
        {no: 8, mentor: '다크호스쏘니', coinName: '비트코인캐시', earning: '25.21'},
        {no: 9, mentor: '다크호스쏘니', coinName: '비트코인캐시', earning: '-10.21'},
        {no: 10, mentor: '다크호스쏘니', coinName: '비트코인캐시', earning: '0.75'},
        {no: 11, mentor: '다크호스쏘니', coinName: '비트코인캐시', earning: '69.21'},
      ]
    }
  },
  mounted() {
    const $currectSignTapMenu = this.$refs.currentSignList_pagination;
    $currectSignTapMenu.children[0].append($createImg1);
    $currectSignTapMenu.children[0].append($createP1);
    $currectSignTapMenu.children[1].append($createImg2);
    $currectSignTapMenu.children[1].append($createP2);
  },
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/currentSignList.scss';
</style>