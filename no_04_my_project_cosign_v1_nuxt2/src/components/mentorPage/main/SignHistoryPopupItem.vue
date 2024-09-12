<template>
  <div class="signHistoryPopupItem_wrap">
    <div class="sign_list_wrap" v-if="item !== null">
      <div class="sign_now_head">
        <div class="sign_now_head_tit">
            <!-- <h1>Sign History</h1> -->
            <h1><img :src="`${$static.imgUrl}mentorPage/sign_off_title.png`" alt=""></h1>
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
              <div>시작시간<span>{{item.sign.startTimeText}}</span></div>
              <div>
                <i class="xi-error-o" v-if="item.sign.endEarningTime !== null && ['sell_success','cut','buy_fail'].includes(item.sign.evaluateState)"></i>
                종료시간
                <span>{{item.sign.endEarningTimeText}}</span>
                <div class="info_earlyEnd" v-if="item.sign.endEarningTime !== null && ['sell_success','cut','buy_fail'].includes(item.sign.evaluateState)">
                  <h2 v-if="item.sign.evaluateState === 'sell_success'">목표가 도달로 싸인 조기 종료</h2>
                  <h2 v-else-if="item.sign.evaluateState === 'cut'">손절가 도달로 싸인 조기 종료</h2>
                  <h2 v-else-if="item.sign.evaluateState === 'buy_fail'">진입가 도달 실패로 싸인 조기 종료</h2>
                  <p>*종료 예정시간 : <span>{{ item.sign.endTimeText }}</span></p>
                  <p>*실제 종료시간 : <span>{{ item.sign.endEarningTimeText }}</span></p>
                </div>
              </div>
            </div>
            <span @click="copyClipboard"><i class="xi-share-alt-o"></i></span>
            </div>  
        </div>  
      </div>  <!--sign_now_head-->

      <div class="sign_now_body">        
        <div class="sign_now_body_head" v-if="item !== null">
          <div class="sign_now_head_info_title" @click="downloadTrades" >
            <img :src="item.coin.imageName" :alt="item.coin.koreanName">
            <div>
              <p>{{item.coin.koreanName}}</p>
              <span>{{item.coin.market.substr(4)}}</span>
            </div>
          </div>
          <div class="sign_now_body_head_price" @click="downloadHistories" v-if="item.sign.minPriceText !== null">
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
          </div>
        </div>  <!--sign_now_body_head-->

        <div class="sign_now_body_main clearFix" v-if="item !== null">
          <div class="main_content_wrap">
            <div class="sign_now_body_main_info">
              <div class="entry_price price_box">
                <div class="price_head">
                  <div class="entry_price_img">
                    <img :src="`${$static.imgUrl}mentorPage/buy_price_icon.svg`" alt="진입가아이콘">
                  </div>
                  <h2>진입가</h2>
                </div>
                <p>{{item.sign.startPriceText}}</p>
              </div>
              <div class="target_price price_box">
                <div class="price_head">
                  <div class="target_price_img">
                    <img :src="`${$static.imgUrl}mentorPage/sell_price_icon.svg`" alt="목표가아이콘">
                  </div>
                  <h2>목표가</h2>
                </div>
                <p>{{item.sign.targetPriceText}}</p>
              </div>
              <div class="predict_price price_box">
                <div class="price_head">
                  <!-- <div class="predict_img" :style="{background: `rgba(${item.sign.valueBgColor},0.14)`}"> -->
                  <div class="predict_img">
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

              <div class="stop_price_area" v-if="item.sign.cutPrice !== null">
                <div>
                  <span><i class="xi-cut"></i></span>
                  <h3>손절가</h3>
                </div>
                <p>{{item.sign.cutPriceText}}</p>
              </div>

            </div>  <!--sign_now_body_main_info-->

            <SignOffRealCandleChart
              :sign="item.sign"
            />

          </div>

          <div class="infoEarlyEndTime" v-if="isEarlyEnd">
            <div class="inner">
              <i class="xi-error-o"></i>
              <div class="info_text" v-if="item.sign.endEarningTime !== null && ['cut','sell_success','buy_fail'].includes(item.sign.evaluateState)">
                <h2 v-if="item.sign.evaluateState === 'sell_success'">목표가 도달로 싸인 조기 종료</h2>
                <h2 v-else-if="item.sign.evaluateState === 'cut'">손절가 도달로 싸인 조기 종료</h2>
                <h2 v-else-if="item.sign.evaluateState === 'buy_fail'">진입가 도달 실패로 싸인 조기 종료</h2> 
                <p>(종료 예정시간 : <span>{{ item.sign.endTimeText }}</span></p> &rarr;
                <p>실제 종료시간 : <span>{{ item.sign.endEarningTimeText }}</span>)</p>
              </div>
            </div>
          </div>
        </div>  <!--sign_now_body_main-->

        <div class="google-adSense-wrap">
          <client-only>
            <Adsense
              ins-style="display:inline-block;width:774px;height:90px;"
              data-ad-client="ca-pub-8783218127052555"
              data-ad-slot="6138258041"
            ></Adsense>
          </client-only>
        </div>

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
        </div>

        <SignNews v-if="item !== null && item.newsLinks.length > 0"
          :newsLinks="item.newsLinks" />
      </div>
    </div>
  </div>
</template>

<script>
import SignNews from '@/src/components/mentorPage/main/SignNowNews';
import SignOffRealCandleChart from '@/src/components/mentorPage/main/SignOffRealCandleChart';
import SignHistoryContentChart from '@/src/components/mentorPage/main/SignHistoryContentChart';
import { mapGetters } from 'vuex';

export default {
    components: {SignNews, SignOffRealCandleChart, SignHistoryContentChart},
    props: ["item", "mentorId"],
    data(){
        return {
        }
    },
    mounted() {
    },
    computed: {
      ...mapGetters('loginStore', ['loginInfo']),
      isEarlyEnd() {
        if((this.item.sign.endEarningTime !== null && ['cut','sell_success'].includes(this.item.sign.evaluateState)) ||
        this.item.sign.evaluateState === 'buy_fail') {
          return true;
        } else return false;
      }
    },
    methods: {
      async copyClipboard() {
        if(navigator.clipboard !== undefined) {
          await navigator.clipboard.writeText(`${window.location.host}/${this.mentorId}/${this.item.sign.subSeqId}`);

          alert('복사되었습니다.');
        } else {
          alert('지원하지 않는 브라우저입니다.')
        }
      },
      async downloadTrades() {
        console.log("download_csv");
        if(this.loginInfo !== null && this.loginInfo.adminCk) {
          const res = await this.$axios.get(`/api/sign/get/trades/download_csv/${this.item.sign.id}.csv`);

          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute('download', `sign_trades_${this.item.sign.id}.csv`);
          link.click();
        }
      },
      async downloadHistories() {
        console.log("download_csv");
        if(this.loginInfo !== null && this.loginInfo.adminCk) {
          const res = await this.$axios.get(`/api/sign/get/histories/download_csv/${this.item.sign.id}.csv`);

          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute('download', `sign_evaluate_histories_${this.item.sign.id}.csv`);
          link.click();
        }
      }
    }
}
</script>

<style scoped lang='scss'>
  @import './css/signHistoryPopupItem.scss';
</style>