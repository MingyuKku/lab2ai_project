<template>
  <div class="sign_now_wrap">
    <div class="sign_now_head">
      <div class="sign_now_head_tit">
        <div class="sign_now_head_tit_info">
          <h1>Sign Now</h1>
          <signNowMenuSlide class="signNow_menu_slide"
            :buttons="sign.buttons"
            :LoadAnotherContent="LoadAnotherContent" />
        </div>  <!--sign_now_head_tit_info-->
        <span><i class="xi-share-alt-o"></i></span>
      </div>  <!--sign_now_head_tit-->

    </div>  <!--sign_now_head-->

    <div class="sign_now_body">

      <!--모바일용 남은시간 영역-->
      <div class="mobile_sign_now_head_info_state">
        <h3><i class="xi-timer-o"></i>{{evaluateStateText}}</h3>
        <p v-if="sign.remainTime !== null">남은시간<span>{{ sign.remainTime }}</span></p>
      </div>  <!--모바일용 남은시간 영역-->

      <div class="sign_now_body_head">
        <div class="coin_title">
          <div class="coin_logo">
            <img :src="coin.image" alt="코인로고">
          </div>
          <div class="coin_name">
            <h2>{{ coin.name }}</h2>
            <p>{{ coin.code }}</p>
          </div>
        </div>  <!--coin_title-->

        <div class="predict_time">
          <div class="predictMin"><span>{{ validateMin }}</span> 예측</div>
          <div class="time_zone">
            <p><span>시작시간</span>{{ sign.startTime }}</p>
            <p><span>종료시간</span>{{ endTimeMinusOneMinite }}</p>
          </div>
        </div>
        
      </div>  <!--sign_now_body_head-->

      <div class="sign_now_body_main clearFix">
        <div class="sign_now_body_main_info">
          <div class="priceBox_outer">
            <div class="current_price_info" v-if="coin.currentPrice !== null">
              <h2>현재가</h2>
              <div class="current_price"
                  :class="{down: coin.changePrice < 0, zero: coin.changePrice === 0}">
                <p>
                  {{ coin.currentPrice.toLocaleString() }}<span>KRW</span>
                </p>
                <h4>
                  <i :class="coin.changePrice < 0 ? 'xi-caret-down' : 'xi-caret-up'"></i>
                  <p>{{ changePriceAbs }}</p>
                  <span>{{ (coin.changeRate*100).toFixed(2) }}%</span>
                </h4>
              </div>
            </div>  <!--current_price_info-->

            <div class="priceBox_area">
              <div class="entry_price price_box">
                <div class="price_head">
                  <div class="entry_price_img"><img :src="`${imgURL}mentorPage/coin_icon_in.svg`" alt="진입가아이콘"></div>
                  <h2>진입가</h2>
                </div>
                <p :class="{blur: !isSubscribe}">{{ sign.startPrice }}<span>원</span></p>
              </div>
              <div class="target_price price_box">
                <div class="price_head">
                  <div class="target_price_img"><img :src="`${imgURL}mentorPage/coin_icon_out.svg`" alt="목표가아이콘"></div>
                  <h2>목표가</h2>
                </div>
                <p :class="{blur: !isSubscribe}">{{ sign.targetPrice }}<span>원</span></p>
              </div>
              <div class="predict_price price_box">
                <div class="price_head">
                  <div class="predict_img" :class="{earning_minus: sign.targetEarningRate <= 0}">
                    <i class="xi-equalizer" :class="{earning_minus: sign.targetEarningRate <= 0}"
                    ></i>
                  </div>
                  <h2>목표수익률</h2>
                </div>
                <p :class="{earning_minus: sign.targetEarningRate <= 0, blur: !isSubscribe}">
                  {{ sign.targetEarningRate.toFixed(2) }}%</p>
              </div>
            </div>

          </div>
        </div>  <!--sign_now_body_main_info-->
        <div class="stop_price_area" v-if="sign.cutPrice !== null">
          <div>
            <span><i class="xi-cut"></i></span>
            <h3>손절가</h3>
          </div>
          <p :class="{blur: !isSubscribe}">{{ sign.cutPrice }}</p>
        </div>
      </div>  <!--sign_now_body_main-->
      <div class="sign_now_body_sub">
        <BlurOutBanner v-if="!isSubscribe" />
        <span class="sub_line"></span>
        {{sign.id}}
        <p 
          v-for="(article, idx) in sign.articles" :key="idx"
          :class="{blur: !isSubscribe}"
        >
          {{article}}
        </p>
        <div class="sub_img" :class="{blur: !isSubscribe}" v-if="sign.images.length > 0">
          <img v-for="image in sign.images"
          :key="image.id"
          :src="image.imagePath" />
        </div>
      </div>
      <!-- 연관뉴스영역 -->
      <SignNowNews 
        v-if="sign.newsLinks.length > 0"
        :newsLinks="sign.newsLinks"
        class="sign_now_news"
        :class="{blur: !isSubscribe}" />
    </div>  <!--sign_now_body-->
  </div>
</template>

<script>
import coinData from '@/core/coinData';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

import SignNowNews from '@/components/mentorPage/main/SignNowNews';
import signNowMenuSlide from '@/components/mentorPage/main/signNowMenuSlide';
import BlurOutBanner from '@/components/mentorPage/main/BlurOutBanner';
import { mapGetters } from 'vuex';

  export default {
    components: {
      signNowMenuSlide, SignNowNews, BlurOutBanner
    },
    data(){
      return {
        imgURL: process.env.VUE_APP_IMG_URL,
        show: true,
        sign: {
          id: null,
          market: '',
          startPrice: 0,
          targetPrice: 0,
          targetEarningRate: 0,
          cutPrice: 0,
          articles: [],
          images: [],
          createdAt: null,
          state: null,
          startTime: null,
          endTime: null,
          remainTime: null,
          validateMin: 0,
          endDate: null,
          evaluateState: null,
          buttons: [],
          newsLinks: [],
        },
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
    async mounted() {
      // console.log(process.env);
    },
    computed: {
      ...mapGetters('loginStore', ['isSubscribe']),
      ...mapGetters('signStore', ['pageId']),
      signTime() {
        return new Date(this.sign.createdAt).diffNow();
      },
      changePriceAbs() {
        return Math.abs(this.coin.changePrice).toLocaleString();
      },
      evaluateStateText() {
        switch(this.sign.evaluateState) {
          case 'cut':
            return '실패';
          case 'buy_fail':
            return '진입 실패';
          case 'sell_fail':
          case 'sell_success':
            return '종료';
        }

        if(['buy_wait', 'sell_wait'].includes(this.sign.evaluateState)
          && new Date() < this.sign.endDate) 
        {
          return '진행중';
        } else {
          return '평가 대기'
        }
      },
      validateMin() {
        if(this.sign.validateMin / 60 < 1) {
          return `${this.sign.validateMin}분`;
        } else {
          return `${this.sign.validateMin / 60}시간`;
        }
      },
      endTimeMinusOneMinite() {
        const endTime = new Date(this.sign.endTime);
        const date = new Date(endTime.setMinutes(endTime.getMinutes()-1));
        return date.format('yyyy-MM-dd HH:mm');
      }
    },
    watch: {
      async pageId() {
        await this.LoadContent();
        this.initCoinSocket();
      }
    },
    methods: {
      async LoadContent() {
        if(this.pageId !== null) {
          const res = await axios.get(`${API_URL}/api/sign/get/sign_now/current/${this.pageId}`);
          this.sign.buttons = res.data.signButtons.map(button => {
            return {
              ...button,
              'code': coinData.get(button.market, "code")
            }
          });
          this.setResourceToData(res.data);
        }
      },
      async LoadAnotherContent(signId) {
        const res = await axios.get(`${API_URL}/api/sign/get/sign_now/selected/${signId}`);
        
        if(res.data.sign.evaluateState === 'buy_wait') {
          this.setResourceToData(res.data);          

          this.initCoinSocket();
        } else {
          alert("이 싸인은 종료된 싸인입니다.")
          this.LoadContent();
        }
      },
      setResourceToData(data) {
        this.coin.code = data.coin.market.substr(4);
        this.coin.name = data.coin.koreanName;
        this.coin.image = data.coin.imageName;

        this.sign.id = data.sign.id;

        data.sign.startPrice >= 1 ? 
        this.sign.startPrice = this.getLocaleString(data.sign.startPrice) : 
        this.sign.startPrice = data.sign.startPrice;

        data.sign.targetPrice >= 1 ?
        this.sign.targetPrice = this.getLocaleString(data.sign.targetPrice) :
        this.sign.targetPrice = data.sign.targetPrice;

        data.sign.cutPrice >= 1 ? 
        this.sign.cutPrice = this.getLocaleString(data.sign.cutPrice) :
        this.sign.cutPrice = data.sign.cutPrice;
        
        this.sign.market = data.sign.coin;
        this.sign.targetEarningRate = (data.sign.targetPrice / data.sign.startPrice - 1) * 100;

        if(data.sign.contentText !== null) {
          this.sign.articles = data.sign.contentText.split('\n');
        }
        this.sign.images = data.selectedSignContentImages;

        this.sign.createdAt = data.sign.createdAt;
        this.sign.startTime = new Date(data.sign.startTime).format('yyyy-MM-dd HH:mm'),
        this.sign.endTime = new Date(data.sign.endTime).format('yyyy-MM-dd HH:mm'),
        this.sign.evaluateState = data.sign.evaluateState;
        this.sign.newsLinks = data.newsLinks;

        this.sign.endDate = new Date(data.sign.endTime);
        this.sign.remainTime = this.sign.endDate.getRemainTime();
        this.sign.validateMin = data.sign.validateMin;

        if(this.remainTimer !== null) {
          clearInterval(this.remainTimer);
        }
        
        this.remainTimer = setInterval(() => {
          this.sign.remainTime = this.sign.endDate.getRemainTime();
        }, 300);
      },
      getLocaleString(value) {
        if(value !== null) {
          return value.toLocaleString();
        } else {
          return null;
        }
      },
      initCoinSocket() {
        const self = this;

        if(this.socket !== null) {
          this.socket.close();
        }

        this.socket = new WebSocket("wss://api.upbit.com/websocket/v1");
        this.socket.onopen = () => {
          if(self.coin.code !== this.sign.market) {
              self.coin.currentPrice = null;
              self.coin.changePrice = null;
              self.coin.changeRate = null;
          }

          this.socket.send(JSON.stringify([{"ticket":"test"},{"type":"ticker","codes":[this.sign.market]}]));
          this.socket.onmessage = (event) => {
            const reader = new FileReader();
            reader.onload = function() {
              const data = JSON.parse(reader.result);
              self.coin.currentPrice = (data.trade_price !== null)? data.trade_price.toLocaleString():null;
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