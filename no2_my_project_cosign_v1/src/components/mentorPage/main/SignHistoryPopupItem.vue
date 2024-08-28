<template>
<div class="sign_list_wrap">
  <div class="sign_now_head">
    <div class="sign_now_head_tit">
        <!-- <h1>Sign History</h1> -->
        <h1><img :src="`${imgURL}mentorPage/sign_off_title.png`" alt=""></h1>
        <div class="sign_now_head_info_state">
        <div class="state_alarms" v-if="item !== null && item.sign.state !== undefined">
          <span :class="{on: item.sign.state.buy_success}">
            진입성공
          </span>
          <span :class="{on: item.sign.state.target_success}">
            목표가도달
          </span>
          <span :class="{on: item.sign.state.earning_success}">
            수익성공
          </span>
        </div>
        
        <div class="time" v-if="item !== null">
          <p>시작시간<span>{{item.sign.startTimeText}}</span></p>
          <p>종료시간<span>{{item.sign.endTimeText}}</span></p>
        </div>
        <span @click="copyClipboard"><i class="xi-share-alt-o"></i></span>
        </div>  <!--sign_now_head_info_state-->
    </div>  <!--sign_now_head_tit-->
  </div>  <!--sign_now_head-->
  <div class="sign_now_body">        
    <div class="sign_now_body_head" v-if="item !== null">
      <div class="sign_now_head_info_title">
        <img :src="item.coin.imageName" alt="btc이미지">
        <div>
          <p>{{item.coin.koreanName}}</p>
          <span>{{item.coin.market.substr(4)}}</span>
        </div>
      </div>
      <div class="sign_now_body_head_price" @click="downloadCsv" v-if="item.sign.minPriceText !== null">
        <div class="bottom_price">
          <div>
            <span><i class="xi-trending-down"></i></span>
            <h3>저가</h3>
          </div>
          <p>{{item.sign.minPriceText}}</p>
        </div>
        <div class="top_price">
          <div>
            <span><i class="xi-trending-up"></i></span>
            <h3>고가</h3>
          </div>
          <p>{{item.sign.maxPriceText}}</p>
        </div> 
        <div class="end_price">
          <div>
            <span><i class="xi-trending-flat"></i></span>
            <h3>종가</h3>
          </div>
          <p>{{item.sign.endPriceText}}</p>
        </div> 
      </div>  <!--sign_now_body_head_price-->
    </div>  <!--sign_now_body_head-->
    <div class="sign_now_body_main clearFix" v-if="item !== null">
      <div class="sign_now_body_main_info">
        <div class="entry_price price_box">
          <div class="price_head">
            <div class="entry_price_img">
              <img :src="`${imgURL}mentorPage/buy_price_icon.svg`" alt="진입가아이콘">
            </div>
            <h2>진입가</h2>
          </div>
          <p>{{item.sign.startPriceText}}<span>원</span></p>
        </div>
        <div class="target_price price_box">
          <div class="price_head">
            <div class="target_price_img">
              <img :src="`${imgURL}mentorPage/sell_price_icon.svg`" alt="목표가아이콘">
            </div>
            <h2>목표가</h2>
          </div>
          <p>{{item.sign.targetPriceText}}<span>원</span></p>
        </div>
        <div class="predict_price price_box">
          <div class="price_head">
            <div class="predict_img" :style="{background: `rgba(${item.sign.valueBgColor},0.14)`}">
              <i :class="item.sign.earningRate <= 0 ? 'xi-trending-down':'xi-trending-up'" :style="{color: `rgb(${item.sign.valueBgColor})`}"></i>
            </div>
            <h2>수익률</h2>
          </div>
          <p :style="{background: `rgb(${item.sign.valueBgColor})`}" v-if="item.sign.earningRate !== null">
            {{item.sign.earningRateText}}
            <span v-if="item.sign.earningRate !== null">%</span>
          </p>
          <p v-else class="earning_fail">{{ item.sign.evaluateStateText }}</p>
        </div>
      </div>  <!--sign_now_body_main_info-->
      <div class="stop_price_area" v-if="item.sign.cutPrice !== null">
          <div>
              <span><i class="xi-cut"></i></span>
              <h3>손절가</h3>
          </div>
        <p>{{item.sign.cutPriceText}}<span>원</span></p>
      </div>
    </div>  <!--sign_now_body_main-->
    <!-- <SignCoinCandleChart :coinCode="item.coin.market.substr(4)" :id="`coin_candle_sign_now_${item.coin.market.substr(4)}`" /> -->
    <div class="sign_now_body_sub"
      v-if="item !== null && item.sign.contentText !== null && item.sign.contentText.length > 0">
      <div class="sub_line"></div>
      <p v-for="(text, idx) in item.sign.contentText.split('\n')" :key="idx">
        {{text}}
      </p>
      <span v-if="item.selectedSignContentImages.length > 0">
        <img v-for="image in item.selectedSignContentImages"
        :key="image.id" 
        :src="image.imagePath" />
      </span>
      <SignHistoryContentChart
        :signItem="item"
      />
      <!-- <div class="safari_banner" v-else>
        <h2>DTW AI 예측 차트는 크롬 브라우저 환경에서 보실 수 있습니다.</h2>
        <p>COSIGN은 크롬 브라우저 사용을 권장합니다.</p>
      </div>    -->
    </div>
    <SignNews v-if="item !== null && item.newsLinks.length > 0"
      :newsLinks="item.newsLinks" />
  </div>
</div>  
</template>

<script>
import SignNews from '@/components/mentorPage/main/SignNowNews';
import SignHistoryContentChart from '@/components/mentorPage/main/SignHistoryContentChart';
// import SignCoinCandleChart from '@/components/mentorPage/main/SignCoinCandleChart.vue';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';
import { mapGetters } from 'vuex';

export default {
    components: {SignNews, SignHistoryContentChart},
    props: ["item"],
    data(){
        return {
          // isSafari: false,
          imgURL: process.env.VUE_APP_IMG_URL,
        }
    },
    mounted() {
    },
    computed: {
      ...mapGetters('mentorRouteStore', ['mentorId']),
    },
    methods: {
      async copyClipboard() {
        await navigator.clipboard.writeText(`${window.location.host}/m/${this.mentorId}/${this.item.sign.subSeqId}`);

        alert('복사되었습니다.');
      },
      async downloadCsv() {
        console.log("download_csv");
        const res = await axios.get(`${API_URL}/api/sign/get/trades/download_csv/${this.item.sign.id}.csv`);

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute('download', `socket_trades_${this.item.sign.id}.csv`);
        link.click();
      }
    }
}
</script>

<style scoped lang='scss'>
  @import './css/signHistoryPopupItem.scss';
</style>