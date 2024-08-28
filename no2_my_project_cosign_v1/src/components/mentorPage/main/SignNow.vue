<template>
  <div class="sign_now_wrap">
    <div class="sign_now_head">
      <div class="sign_now_head_tit">
        <!-- <h1>Sign Now</h1> -->
        <div class="signOn_img"><img :src="`${imgURL}mentorPage/sign_on_title.png`" alt=""></div>
        <div class="head_tit_right" v-if="signNow.sign.coin !== undefined">
          <SignNowMenuSlide class="signNow_menu_slide"
            :buttons="signNow.buttons"
            :LoadAnotherContent="LoadAnotherContent" />
          <span class="clip" @click="copyClipboard"><i class="xi-share-alt-o"></i></span>
        </div>
      </div>  <!--sign_now_head_tit-->

    </div>  <!--sign_now_head-->
    <div class="sign_now_body" v-if="signNow.sign.coin !== undefined">
      <div class="sign_now_body_head">
        <div class="coin_title">
          <div class="coin_logo">
            <img :src="signNow.sign.coin.imageName" alt="코인로고">
          </div>
          <div class="coin_name">
            <h2>{{ signNow.sign.coin.koreanName }}</h2>
            <p>{{ signNow.sign.coin.market.substr(4) }}</p>
          </div>
        </div>  <!--coin_title-->
        <div class="predict_time">
          <div class="predictMin"><span>{{ signNow.sign.validateMinText }}</span> 예측</div>
          <div class="time_zone">
            <p><span>시작시간</span>{{ signNow.sign.startTimeText }}</p>
            <p><span>종료시간</span>{{ signNow.sign.endTimeText }}</p>
          </div>
        </div>
      </div>  <!--sign_now_body_head-->

      <div class="sign_now_body_main clearFix">
        <div class="sign_now_body_main_info">
          <div class="priceBox_outer">
            <div class="current_price_info_wrap">
              <div class="current_price_info">
                <h2>현재가</h2>
                <div class="current_price"
                    :class="{down: coin.changePrice < 0, zero: coin.changePrice === 0}">
                  <p v-if="coin.currentPrice !== null">
                    {{ coin.currentPrice }}<span>KRW</span>
                  </p>
                  <h4>
                    <i :class="coin.changePrice < 0 ? 'xi-caret-down' : 'xi-caret-up'"></i>
                    <p>{{ changePriceAbs }}</p>
                    <span>{{ (coin.changeRate*100).toFixed(2) }}%</span>
                  </h4>
                </div>
              </div>  <!--current_price_info-->
              <div class="current_price_tip">
                <div class="upbit_logo"><img :src="`${imgURL}mentorPage/upbit_logo.png`" alt="업비트로고"></div>
                <span>시세 기준</span>
              </div>
            </div>
            

            <div class="priceBox_area">
              <div class="entry_price price_box">
                <div class="price_head">
                  <div class="entry_price_img"><img :src="`${imgURL}mentorPage/buy_price_icon.svg`" alt="진입가아이콘"></div>
                  <h2>진입가</h2>
                </div>
                <p>{{ signNow.sign.startPriceText }}<span>원</span></p>
              </div>
              <div class="target_price price_box">
                <div class="price_head">
                  <div class="target_price_img"><img :src="`${imgURL}mentorPage/sell_price_icon.svg`" alt="목표가아이콘"></div>
                  <h2>목표가</h2>
                </div>
                <p>{{ signNow.sign.targetPriceText }}<span>원</span></p>
              </div>
              <div class="predict_price price_box">
                <div class="price_head">
                  <div class="predict_img" :class="{earning_minus: signNow.sign.targetEarningRate <= 0}">
                    <i class="xi-trending-up" :class="{earning_minus: signNow.sign.targetEarningRate <= 0}"
                    ></i>
                  </div>
                  <h2>목표수익률</h2>
                </div>
                <p :class="{earning_minus: signNow.sign.targetEarningRate <= 0}">
                  {{ signNow.sign.targetEarningRateText }}%</p>
              </div>
            </div>

          </div>
        </div>  <!--sign_now_body_main_info-->
        <div class="stop_price_area" v-if="signNow.sign.cutPrice !== null">
          <div>
            <span><i class="xi-cut"></i></span>
            <h3>손절가</h3>
          </div>
          <p>{{ signNow.sign.cutPriceText }}<span>원</span></p>
        </div>
      </div>  <!--sign_now_body_main-->
      <SignCoinCandleChart :coinCode="signNow.sign.coin.market.substr(4)" :id="`coin_candle_sign_now`"/>
      <div class="sign_now_body_sub">
        <span class="sub_line" v-if="signNow.images.length > 0 || signNow.texts.length > 0"></span>
        <p 
          v-for="(article, idx) in signNow.texts" :key="idx"
        >
          {{article}}
        </p>
        <div class="sub_img" v-if="signNow.images.length > 0">
          <img v-for="image in signNow.images"
          :key="image.id"
          :src="image.imagePath" />
        </div>
        <SignNowContentChart
          :signNow="signNow"
        />
        <!-- <div class="safari_banner" v-else>
          <h2>DTW AI 예측 차트는 크롬 브라우저 환경에서 보실 수 있습니다.</h2>
          <p>COSIGN은 크롬 브라우저 사용을 권장합니다.</p>
        </div> -->
      </div>
      <!-- 연관뉴스영역 -->
      <SignNowNews 
        v-if="signNow.newslinks.length > 0"
        :newsLinks="signNow.newslinks"
        class="sign_now_news" />
    </div>  <!--sign_now_body-->
    <div class="noSignNow" v-else>
      <p><i class="xi-error-o"></i>현재 진행 중인 SIGN이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import SignNowNews from '@/components/mentorPage/main/SignNowNews';
import SignNowContentChart from '@/components/mentorPage/main/SignNowContentChart';
import { mapGetters, mapActions } from 'vuex';
import SignNowMenuSlide from '@/components/mentorPage/main/SignNowMenuSlide';
import SignCoinCandleChart from '@/components/mentorPage/main/SignCoinCandleChart.vue';

export default {
  components: {
    SignNowMenuSlide,
    SignNowNews,
    SignNowContentChart,
    SignCoinCandleChart
},
  data(){
    return {
      // isSafari: false,
      show: true,
      // isSignNow: true,
      coin: {
        code: null,
        name: null,
        image: null,
        currentPrice: null,
        changePrice: null,
        changeRate: null,
        changePercent: null,
      },
      todate: new Date(),
      socket: null,
      remainTimer: null
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
    ...mapGetters('mentorRouteStore', ['mentorId', 'signNow']),
    changePriceAbs() {
      return Math.abs(this.coin.changePrice).toLocaleString();
    },
  },
  watch: {
    'signNow.sign': {
      handler() {
        this.initCoinSocket();
        // console.log('signNow',this.signNow.sign.coin)
      }
    }
  },
  methods: {
    ...mapActions('mentorRouteStore', ['loadAnotherSignNow']),
    async LoadAnotherContent(signId) {
      this.loadAnotherSignNow({sign_id: signId});
    },
    async copyClipboard() {
      await navigator.clipboard.writeText(`${window.location.host}/m/${this.mentorId}/${this.signNow.sign.subSeqId}`);

      alert('복사되었습니다.');
    },
    initCoinSocket() {
      const self = this;

      if(this.socket !== null) {
        this.socket.close();
      }

      this.socket = new WebSocket("wss://api.upbit.com/websocket/v1");
      this.socket.onopen = () => {
        if(self.coin.code !== self.signNow.sign.coin.market) {
            self.coin.currentPrice = null;
            self.coin.changePrice = null;
            self.coin.changeRate = null;
            self.coin.code = self.signNow.sign.coin.market;
        }

        this.socket.send(JSON.stringify([{"ticket":"test"},{"type":"ticker","codes":[this.signNow.sign.coin.market]}]));
        this.socket.onmessage = (event) => {
          const reader = new FileReader();
          reader.onload = function() {
            const data = JSON.parse(reader.result);
            self.coin.currentPrice = (data.trade_price !== null || data.trade_price >= 1)? data.trade_price.toLocaleString():data.trade_price;
            self.coin.changePrice = data.signed_change_price;
            self.coin.changeRate = data.signed_change_rate;
          }
          reader.readAsText(event.data);
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '@/components/mentorPage/main/css/signNow.scss';
</style>