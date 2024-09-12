<template>
  <div class="signOnContent_wrap">
    <div class="sign_now_body" v-if="signOnProps.sign.coin !== undefined">
      <div class="sign_now_body_head">
        <div class="coin_title">
          <div class="coin_logo">
            <img :src="signOnProps.sign.coin.imageName" :alt="signOnProps.sign.coin.koreanName">
          </div>
          <div class="coin_name">
            <h2>{{ signOnProps.sign.coin.koreanName }}</h2>
            <p>{{ signOnProps.sign.coin.market.substr(4) }}</p>
          </div>
        </div>  <!--coin_title-->
        <div class="predict_time">
          <div class="predictMin"><span>{{ signOnProps.sign.validateMinText }}</span> 예측</div>
          <div class="time_zone">
            <p><span>시작시간</span>{{ signOnProps.sign.startTimeText }}</p>
            <p><span>종료시간</span>{{ signOnProps.sign.endTimeText }}</p>
          </div>
        </div>
      </div>  <!--sign_now_body_head-->

      <div class="sign_now_body_main clearFix">
        <div class="sign_now_body_main_info">
          <div class="current_price_info_wrap">
            <!-- <div class="current_price_info">
              <h2>현재가</h2>
              <div class="current_price"
                  :class="{down: coin.changePrice < 0, zero: coin.changePrice === 0}">
                <p v-if="coin.currentPriceText !== null">
                  {{ coin.currentPriceText }}<span>KRW</span>
                </p>
                <h4>
                  <i :class="coin.changePrice < 0 ? 'xi-caret-down' : 'xi-caret-up'"></i>
                  <p>{{ changePriceAbs }}</p>
                  <span>{{ (coin.changeRate*100).toFixed(2) }}%</span>
                </h4>
              </div>
            </div>   -->
            <div class="current_price_tip">
              <div class="upbit_logo"><img :src="`${$static.imgUrl}mentorPage/upbit_logo.png`" alt="업비트로고"></div>
              <span>시세 기준</span>
            </div>
          </div>
          
          <div class="main_content_wrap">
            <div class="priceBox_area">
              <div class="entry_price price_box">
                <div class="price_head">
                  <div class="entry_price_img"><img :src="`${$static.imgUrl}mentorPage/buy_price_icon.svg`" alt="진입가아이콘"></div>
                  <h2>진입가</h2>
                </div>
                <!-- <p :class="{blur: !canBrowseSign}"> -->
                <p v-if="$isOpenSign(signOnProps.sign.pay)">
                  {{ signOnProps.sign.startPriceText }}
                </p>
                <p class="lock" v-else @click="showLoginPopup">
                  <img :src="`${$static.imgUrl}mentorPage/lock_icon-2.svg`" alt="잠금이미지">
                  로그인 후 이용
                </p>
              </div>
              <div class="target_price price_box">
                <div class="price_head">
                  <div class="target_price_img"><img :src="`${$static.imgUrl}mentorPage/sell_price_icon.svg`" alt="목표가아이콘"></div>
                  <h2>목표가</h2>
                </div>
                <!-- <p :class="{blur: !canBrowseSign}"> -->
                <p v-if="$isOpenSign(signOnProps.sign.pay)">
                  {{ signOnProps.sign.targetPriceText }}
                </p>
                <p class="lock" v-else @click="showLoginPopup">
                  <img :src="`${$static.imgUrl}mentorPage/lock_icon-2.svg`" alt="잠금이미지">
                  로그인 후 이용
                </p>
              </div>
              <div class="predict_price price_box">
                <div class="price_head">
                  <div class="predict_img" :class="{earning_minus: signOnProps.sign.targetEarningRate <= 0}">
                    <i class="xi-trending-up" :class="{earning_minus: signOnProps.sign.targetEarningRate <= 0}"
                    ></i>
                  </div>
                  <h2>목표수익률</h2>
                </div>
                <p :class="{earning_minus: signOnProps.sign.targetEarningRate <= 0, blur: !canBrowseSign}" v-if="$isOpenSign(signOnProps.sign.pay)">
                  {{ signOnProps.sign.targetEarningRateText }}
                  <span>%</span>
                </p>
                <p class="lock" v-else @click="showLoginPopup">
                  <img :src="`${$static.imgUrl}mentorPage/lock_icon-2.svg`" alt="잠금이미지">
                  로그인 후 이용
                </p>
              </div>

              <div class="stop_price_area" v-if="signOnProps.sign.cutPrice !== null">
                <div>
                  <span><i class="xi-cut"></i></span>
                  <h3>손절가</h3>
                </div>
                <p :class="{blur: !canBrowseSign}" v-if="$isOpenSign(signOnProps.sign.pay)">
                  {{ signOnProps.sign.cutPriceText }}
                </p>
                <p class="lock" v-else @click="showLoginPopup">
                  <img :src="`${$static.imgUrl}mentorPage/lock_icon-2.svg`" alt="잠금이미지">
                  로그인 후 이용
                </p>
              </div>
            </div>

            <SignNowRealCandleChart
              :signNow="signOnProps"
              :canBrowseSign="canBrowseSign"
              :progressStatePriceUpdate="progressStatePriceUpdate"
            />

          </div>
            
          <!-- <ProgressStateUI v-if="canBrowseSign && !isEndSign" -->
          <ProgressStateUI v-if="canBrowseSign"
            :currentPrice="currentPrice"
            :currentSign="signOnProps.sign"
          />
            
        </div>  <!--sign_now_body_main_info-->
      </div>  <!--sign_now_body_main-->

      <BlurOutBanner v-if="!canBrowseSign" />

      <!-- <SignCoinCandleChart :coinCode="signOnProps.sign.coin.market.substr(4)" :id="`coin_candle_sign_now`"/> -->

      <div class="ad_area">        
        <ins class="kakao_ad_area" style="display:none;"
          data-ad-unit    = "DAN-HgFU2iWlkiUB20hL"
          data-ad-width   = "728"
          data-ad-height  = "90">
        </ins>
      </div>

      <div class="sign_now_body_sub">
        <span class="sub_line" v-if="signOnProps.images.length > 0 || signOnProps.texts.length > 0"></span>
        <p v-for="(article, idx) in signOnProps.texts" :key="idx"
          :class="{blur: !canBrowseSign}"
        >
          {{article}}
        </p>
        <div class="sub_img" :class="{blur: !canBrowseSign}" v-if="signOnProps.images.length > 0">
          <img v-for="image in signOnProps.images"
          :key="image.id"
          :src="image.imagePath" />
        </div>    
            
        <SignNowContentChart
          :signNow="signOnProps"
        />
      </div>

      <!-- 연관뉴스영역 -->
      <SignNowNews 
        v-if="signOnProps.newslinks.length > 0"
        :newsLinks="signOnProps.newslinks"
        class="sign_now_news"
        :class="{blur: !canBrowseSign}" />
    </div>  <!--sign_now_body-->
    <div class="noSignNow" v-else>
      <p><i class="xi-error-o"></i>현재 진행 중인 SIGN이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import SignNowNews from '@/src/components/mentorPage/main/SignNowNews';
import BlurOutBanner from '@/src/components/mentorPage/main/BlurOutBanner';
import SignNowRealCandleChart from '@/src/components/mentorPage/main/SignNowRealCandleChart';
import SignNowContentChart from '@/src/components/mentorPage/main/SignNowContentChart';
// import SignCoinCandleChart from '@/src/components/mentorPage/main/SignCoinCandleChart.vue';
import ProgressStateUI from '@/src/components/mentorPage/main/ProgressStateUI.vue';

import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    SignNowNews,
    BlurOutBanner,
    SignNowRealCandleChart,
    SignNowContentChart,
    // SignCoinCandleChart,
    ProgressStateUI,
  },
  props: ['signOnProps'],
  data(){
    return {
      isSignNow: true,
      coin: {
        code: null,
        name: null,
        image: null,
        currentPrice: null,
        currentPriceText: null,
        changePrice: null,
        changeRate: null,
        changePercent: null,
      },
      todate: new Date(),
      socket: null,
      remainTimer: null,
      currentPrice: {
        close: null,
        code: null
      },
      // signOn: {
      //   startTimeText: null,
      //   endTimeText: null,
      //   createdAtText: null,
      // }
    }
  },
  mounted() {
    this.initCoinSocket();
  },
  computed: {
    ...mapGetters('loginStore', ['canBrowseSign']),
    changePriceAbs() {
      return Math.abs(this.coin.changePrice).toLocaleString();
    },
  },
  watch: {
    'signOnProps.sign': {
      handler() {
        this.initCoinSocket();
      }
    },
  },
  methods: {
    ...mapMutations('popupStore', ['showLoginPopup']),
    progressStatePriceUpdate(price,market) {
      this.currentPrice.close = price;
      if(market) this.currentPrice.code = market;
    },
    initCoinSocket() {
      if(this.signOnProps.sign.coin !== undefined) {
        const self = this;

        if(this.socket !== null) {
          this.socket.close();
        }

        this.socket = new WebSocket("wss://api.upbit.com/websocket/v1");
        this.socket.onopen = () => {
          if(self.coin.code !== self.signOnProps.sign.coin.market) {
              self.coin.currentPrice = null;
              self.coin.currentPriceText = null;
              self.coin.changePrice = null;
              self.coin.changeRate = null;
              self.coin.code = self.signOnProps.sign.coin.market;
          }

          this.socket.send(JSON.stringify([{"ticket":"test"},{"type":"ticker","codes":[this.signOnProps.sign.coin.market]}]));
          this.socket.onmessage = (event) => {
            const reader = new FileReader();
            reader.onload = function() {
              const data = JSON.parse(reader.result);
              self.coin.currentPrice = data.trade_price;
              self.coin.currentPriceText = (data.trade_price !== null || data.trade_price >= 1)? data.trade_price.toLocaleString():data.trade_price;
              self.coin.changePrice = data.signed_change_price;
              self.coin.changeRate = data.signed_change_rate;

            }
            reader.readAsText(event.data);
          }
        }
      }
    }
  }
}
</script>

<style lang='scss'>
  @import '@/src/components/mentorPage/main/css/signOnContent.scss';
</style>