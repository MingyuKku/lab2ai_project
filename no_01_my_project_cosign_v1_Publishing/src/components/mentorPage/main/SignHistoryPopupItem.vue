<template>
  <div class="sign_list_wrap">
    <div class="sign_now_head">
      <div class="sign_now_head_tit">
        <h1>Sign History</h1>
        <div class="sign_now_head_info_state">
          <div class="state_alarms">
            <span
              :class="{on: content.sign_state.buy_success}">
              진입성공
            </span>
            <span
              :class="{on: content.sign_state.target_success}">
              목표가도달
            </span>
            <span
              :class="{on: content.sign_state.earning_success}">
              수익성공
            </span>
          </div>
          
          <div class="time">
            <p>시작시간<span>{{startTime}}</span></p>
            <p>종료시간<span>{{endTimeMinusOneMinite}}</span></p>
          </div>
          <span><i class="xi-share-alt-o"></i></span>
        </div>  <!--sign_now_head_info_state-->

        <!-- 모바일용 공유 아이콘 -->
        <span class="responsive_share"><i class="xi-share-alt-o"></i></span>
      </div>  <!--sign_now_head_tit-->

      <!-- 모바일용 시간표시 -->
      <div class="responsive_sign_now_head_info_state">
        <h3>
          <i class="xi-timer-off-o" v-if="['sell_fail', 'buy_fail'].includes(content.evaluateState)"></i>
          {{evaluateStateText}}
        </h3>
        <div class="time">
          <p>시작시간<span>{{startTime}}</span></p>
          <p>종료시간<span>{{endTimeMinusOneMinite}}</span></p>
        </div>
      </div>  <!-- 모바일용 시간표시 -->

    </div>  <!--sign_now_head-->

    <div class="sign_now_body">
      <div class="sign_now_body_head">
        <div class="sign_now_head_info_title">
          <img :src="coinImage" alt="btc이미지">
          <div>
            <p>{{coinName}}</p>
            <span>{{coinCode}}</span>
          </div>
        </div>
        <div class="sign_now_body_head_price" @click="downloadCsv">
          <div class="bottom_price">
            <div>
              <span><i class="xi-trending-down"></i></span>
              <h3>저가</h3>
            </div>
            <p>{{minPrice}}</p>
          </div>
          <div class="top_price">
            <div>
              <span><i class="xi-trending-up"></i></span>
              <h3>고가</h3>
            </div>
            <p>{{maxPrice}}</p>
          </div> 
          <div class="end_price">
            <div>
              <span><i class="xi-trending-flat"></i></span>
              <h3>종가</h3>
            </div>
            <p>{{ endPrice }}</p>
          </div> 
        </div>  <!--sign_now_body_head_price-->
      </div>  <!--sign_now_body_head-->

      <div class="sign_now_body_main clearFix">
        <div class="sign_now_body_main_info">
          <div class="entry_price price_box">
            <div class="price_head">
              <div class="entry_price_img">
                <img :src="`${imgURL}mentorPage/coin_icon_in.svg`" alt="진입가아이콘">
              </div>
              <h2>진입가</h2>
            </div>
            <p>{{startPrice}}<span>원</span></p>
          </div>
          <div class="target_price price_box">
            <div class="price_head">
              <div class="target_price_img">
                <img :src="`${imgURL}mentorPage/coin_icon_out.svg`" alt="목표가아이콘">
              </div>
              <h2>목표가</h2>
            </div>
            <p>{{targetPrice}}<span>원</span></p>
          </div>
          <div class="predict_price price_box">
            <div class="price_head">
              <div class="predict_img"
                :class="{earning_minus: content.earningRate <= 0}"
              >
                <i class="xi-equalizer" 
                  :class="{earning_minus: content.earningRate <= 0}"
                ></i>
              </div>
              <h2>수익률</h2>
            </div>
            <p 
              :class="{earning_minus: content.earningRate <= 0}"
              v-if="content.earningRate !== null"
            >
             {{earningRateText}}<span v-if="content.earningRate !== null">%</span>
            </p>
            <p v-else class="earning_fail">{{ evaluateStateText }}</p>
          </div>
        </div>  <!--sign_now_body_main_info-->
        <div class="stop_price_area" v-if="cutPrice !== null">
          <div>
            <span><i class="xi-cut"></i></span>
            <h3>손절가</h3>
          </div>
          <p>{{cutPrice}}<span>원</span></p>
        </div>
      </div>  <!--sign_now_body_main-->

      <div class="sign_now_body_sub" 
        v-if="content.detail !== undefined && content.selectedSignContentTexts.length > 0">
        <div class="sub_line"></div>
        {{content.id}}
        <p v-for="(content, idx) in content.selectedSignContentTexts"
          :key="idx">
          {{content}}
        </p>
        <span>
          <img v-for="image in content.detail.selectedSignContentImages"
          :key="image.id" 
          :src="image.imagePath" />
        </span>
        
      </div>
      <SignNowNews v-if="content.detail !== undefined && content.detail.newsLinks.length > 0"
        :newsLinks="content.detail.newsLinks" />
    </div>  <!--sign_now_body-->
  </div>
</template>

<script>
import SignNowNews from '@/components/mentorPage/main/SignNowNews';
import coinData from '@/core/coinData';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';


export default {
  components: {
    SignNowNews
  },
  props: ['content'],
  data(){
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  },
  computed: {    
    evaluateStateText() {
      switch(this.content.evaluateState) {
        case 'cut':
          return '실패';
        case 'buy_fail':
          return '진입 실패';
        case 'sell_fail':
        case 'sell_success':
          return '종료';
        case 'buy_wait':
        case 'sell_wait':
          return '평가 대기중';
      }

      return null;
    },
    coinName() {
      return coinData.get(this.content.coin, "name");
    },
    coinImage() {
      return coinData.get(this.content.coin, "image");
    },
    coinCode() {
      return coinData.get(this.content.coin, "code");
    },
    earningRateText() {
      if(this.content.earningRate !== null) {
        return this.content.earningRate.toFixed(2);
      } else {
        return '';
      }
    },
    startTime() {
      return new Date(this.content.startTime).format("yyyy-MM-dd HH:mm");
    },
    endTime() {
      return new Date(this.content.endTime).format("yyyy-MM-dd HH:mm");
    },
    endTimeMinusOneMinite() {
      const endTime = new Date(this.content.endTime);
      const date = new Date(endTime.setMinutes(endTime.getMinutes()-1));
      return date.format('yyyy-MM-dd HH:mm');
    },
    minPrice() {
      return this.getLocaleString(this.content.minPrice);
    },
    maxPrice() {
      return this.getLocaleString(this.content.maxPrice);
    },
    endPrice() {
      return this.getLocaleString(this.content.endPrice);
    },
    startPrice(){
      if(this.content.startPrice >= 1) {
        return this.getLocaleString(this.content.startPrice);
      } else {
        return this.content.startPrice;
      }
    },
    targetPrice() {
      if(this.content.targetPrice >= 1) {
        return this.getLocaleString(this.content.targetPrice);
      } else {
        return this.content.targetPrice;
      }
    },
    cutPrice() {
      if(this.content.cutPrice >= 1) {
        return this.getLocaleString(this.content.cutPrice);
      } else {
        return this.content.cutPrice;
      }
    }
  },
  methods: {
    getLocaleString(value) {
      if(value !== undefined && value !== null) {
        return value.toLocaleString();
      } else {
        return value;
      }
    },
    async downloadCsv() {
      console.log("download_csv");
      const res = await axios.get(`${API_URL}/api/sign/get/trades/download_csv/${this.content.id}.csv`);

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute('download', `socket_trades_${this.content.id}.csv`);
      link.click();
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './css/signHistoryPopupItem.scss';
</style>