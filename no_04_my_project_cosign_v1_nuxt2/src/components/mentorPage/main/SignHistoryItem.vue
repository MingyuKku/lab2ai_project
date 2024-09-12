<template>
  <div class="list_item_wrap">
    <div class="signItem_inner">
      <div class="list_item_time">
        <p>{{signDiffNow}}</p>
        <div class="timeLine">
          <div class="timeImg"
            :class="{earning_minus: history.earningRate < 0, earning_gray: history.earningRate === 0 || history.evaluateState === 'buy_fail'}">
            <img :src="`${$static.imgUrl}mentorPage/time_icon.svg`" alt="시간이미지">
          </div>
          <span :class="{line: isLine}"></span>
        </div>
      </div>  <!--list_item_time-->
      <div class="list_item"> 
        <div class="list_item_info_wrap gtag_sign_off_item" @click="onClickListItem">
          <NuxtLink :to="`/${$route.params.mentorId}/${history.subSeqId}`">
            <div class="list_item_info">
              <div class="list_item_info_coin_wrap">
                <div class="coinImg"><img :src="history.coinImageUrl" :alt="history.coinName"></div>
                <div class="list_item_info_coin">
                  <h2>{{history.coinName}}<span>{{history.coin.substr(4)}}</span></h2>
                  <div>
                    <p>진입가<span>{{ startPrice }}</span></p>
                    <p>목표가<span>{{ targetPrice }}</span></p>
                  </div>
                </div>
              </div>  <!--list_item_info_coin_wrap-->
              
            </div>  <!--list_item_info-->
            <div class="list_item_earning" v-if="!['buy_wait', 'sell_wait', 'buy_fail'].includes(history.evaluateState)">
              <h2>수익률</h2>
              <p :class="{earning_minus: history.earningRate < 0, earning_gray: history.earningRate === 0}">
                {{history.earningRate.toFixed(2)}}%
              </p>
            </div>  <!--list_item_earning-->
            <div class="list_item_earning_fail" v-else-if="history.evaluateState === 'buy_fail'">
              진입 실패
            </div>  <!--list_item_earning-->
            <div class="list_item_earning_fail" v-else-if="['buy_wait', 'sell_wait'].includes(history.evaluateState)">
              평가 대기중
            </div>  <!--list_item_earning-->
          </NuxtLink>
          
        </div>  <!--list_item_info_wrap-->    
      </div>  <!--list_item-->
    </div>
    
    <div class="ad_area" v-if="(idx+1) % 8 === 0">
      <div class="list_item_time">
        <p></p>
        <div class="timeLine">
          <div class="timeImg">AD</div>
          <span :class="{line: isLine}"></span>
        </div>
      </div>
      <div class="list_item">
        <div class="list_item_info_wrap">
          <!-- <ins class="kakao_ad_area" style="display:none;" 
            data-ad-unit    = "DAN-Ej0z8K7a6E5ELefe" 
            data-ad-width   = "320" 
            data-ad-height  = "100"
          ></ins> -->
          <client-only>
            <Adsense
              ins-style="display:block;width:582px;height:123px;"
              data-ad-format="fluid"
              data-ad-client="ca-pub-8783218127052555"
              data-ad-layout-key="-gw-1s+1p-54+gu"
              data-ad-slot="3070699787"
            ></Adsense>
          </client-only>
        </div>
      </div>  <!--list_item-->
    </div> 
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['history', 'idx', 'itemsFlag'],
  data(){
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      isLine: true,
      // current : false,
    }
  },
  // watch: {
  //   itemsFlag(val) {
  //     console.log('플래그와치', val)
  //   }
  // },
  mounted() {
  },
  computed: {
    startPrice() {
      if(this.history.startPrice >= 1) {
        return this.history.startPrice.toLocaleString();
      } else {
        return this.history.startPrice;
      }
    },
    targetPrice() {
      if(this.history.targetPrice >= 1) {
        return this.history.targetPrice.toLocaleString();
      } else {
        return this.history.targetPrice;
      }
    },
    signDiffNow() {
      return Date.parseUtcText(this.history.endEarningTime).diffNow();
    },
    earningRate() {
      switch(this.history.evaluateState) {
        case 'sell_success':
          return (this.history.targetPrice/this.history.startPrice - 1) * 100;
        case 'cut':
          return (this.history.cutPrice/this.history.startPrice - 1) * 100;
        default:
          return (this.history.endMarketPrice/this.history.startPrice - 1) * 100;
      }
    },
  },
  methods: {
    ...mapActions('mentorPage/signHistoryPopupStore', ['showHistoryPopup']),
    onClickListItem() {
      this.showHistoryPopup({idx: this.idx, subSeqId: this.history.subSeqId, slideNo: this.history.slideNo});
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './css/signHistoryItem.scss';
</style>