<template>
  <div class="list_item_wrap">
    <div class="list_item_time">
      <p>{{signDiffNow}}</p>
      <div :class="{earning_minus: history.earningRate <= 0}">
        <img :src="`${imgURL}mentorPage/time_icon.svg`" alt="시간이미지">
        <span :class="{line: isLine, /*current_line: current()*/}"></span>
      </div>
    </div>  <!--list_item_time-->

    <div class="list_item" @click="onClickListItem">
      <div class="list_item_info_wrap">
        <div class="list_item_info">
          <div class="list_item_info_coin_wrap">
            <img :src="history.coinImageUrl" alt="코인 이미지">
            <div class="list_item_info_coin">
              <h2>{{history.coinName}}<span>{{history.coin.substr(4)}}</span></h2>
              <div>
                <p>진입가<span>{{ startPrice }}</span></p>
                <p>목표가<span>{{ targetPrice }}</span></p>
              </div>
            </div>

            <!-- 모바일용 수익률 -->
            <div class="responsive_list_item_earning" v-if="history.evaluateState in ['buy_fail']">
              <h2>수익률</h2> 
              <p :class="{earning_minus: earningRate <= 0}">
                {{earningRate.toFixed(2)}}%
              </p>
            </div>  <!-- 모바일용 수익률 -->
            <!-- <div class="responsive_list_item_earning_fail" v-else>
              진입실패
            </div> -->
          </div>  <!--list_item_info_coin_wrap-->
          

          <!-- 모바일용 가격표 -->
          <div class="responsive_price">
            <p>진입가<span>{{ startPrice }}</span></p>
            <p>목표가<span>{{ targetPrice }}</span></p>
          </div>  <!-- 모바일용 가격표 -->

        </div>  <!--list_item_info-->
        <div class="list_item_earning" v-if="!['buy_wait', 'buy_fail'].includes(history.evaluateState)">
          <h2>수익률</h2>
          <p :class="{earning_minus: history.earningRate <= 0}">
            {{history.earningRate.toFixed(2)}}%
          </p>
        </div>  <!--list_item_earning-->
        <div class="list_item_earning_fail" v-else-if="history.evaluateState === 'buy_fail'">
          진입 실패
        </div>  <!--list_item_earning-->
        <div class="list_item_earning_fail" v-else-if="history.evaluateState === 'buy_wait'">
          평가 대기중
        </div>  <!--list_item_earning-->
      </div>  <!--list_item_info_wrap-->      
    </div>  <!--list_item-->
  </div>
</template>

<script>
import coinData from '@/core/coinData';
import { mapActions } from 'vuex';

export default {
  props: ['history', 'idx'],
  data(){
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      isLine: true,
      // current : false,
    }
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
    coinImage() {
      return coinData.get(this.history.coin, "image");
    },
    coinName() {
      return coinData.get(this.history.coin, "name");
    },
    coinCode() {
      return coinData.get(this.history.coin, "code");
    },
    signDiffNow() {
      return new Date(this.history.endTime).diffNow();
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
    ...mapActions('signStore', ['showHistoryPopup']),
    onClickListItem() {
      this.showHistoryPopup(this.idx);
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './css/signHistoryItem.scss';
</style>