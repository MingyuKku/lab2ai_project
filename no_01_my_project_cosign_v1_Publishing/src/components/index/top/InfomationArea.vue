<template>
  <div class="infomationArea_wrap">
    <div class="cumulateEarning_wrap">
      <div class="cumulateEarning">
        <div class="title">
          <div class="icon"><img :src="`${imgURL}index/top/wonIcon_no_fill.svg`" alt="아이콘"></div>
          <p>지금까지 고객들의<span>누적 수익률</span></p>
        </div>
        <div class="data">
          <span class="cumulateEarningAnimation" ref="accEarningRateData"></span>%
        </div>
      </div>
      <div class="cumulateHit">
        <div class="title">
          <div class="icon"><img :src="`${imgURL}index/top/wonIcon_fill.svg`" alt="아이콘"></div>
          <p>지금까지 멘토들의<span>수익 적중률</span></p>
        </div>
        <div class="data">
          <span class="cumulateHitAnimation" ref="earningSuccessRateData"></span>%
        </div>
      </div>
      <div class="cumulateNumber">
        <div class="title">
          <div class="icon"><img :src="`${imgURL}index/top/wonIcon_no_fill.svg`" alt="아이콘"></div>
          <p>지금까지 시그널의<span>누적 Sign 수</span></p>
        </div>
        <div class="data">
          <span class="cumulateNumberAnimation" ref="totalSignCountData"></span>건
        </div>
      </div>
    </div>  <!--cumulateEarning_wrap-->
    <p class="notice">*{{totalStat.loadedTimeFormatStr}} 기준</p>
    <img class="informaionArea_bg" :src="`${imgURL}index/top/informaionArea_bg.png`" alt="배경이미지">
  </div>
</template>

<script>
import gsap from 'gsap';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

export default {
  name: 'InformationArea',
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      totalStat: {
        accEarningRate: 0,
        earningSuccessRate: 58.1,
        totalSignCount: 1923,
        loadedTimeFormatStr: ''
      },
    }
  },
  async mounted() {
    await this.loadData();

    this.init();
  },
  methods: {
    async loadData() {
      const res = await axios.get(`${API_URL}/api/main/get`);

      this.totalStat.accEarningRate = res.data.mainTotalStat.earning_rate_sum;
      this.totalStat.earningSuccessRate = res.data.mainTotalStat.success_rate;
      this.totalStat.totalSignCount = res.data.mainTotalStat.sign_count;
      this.totalStat.loadedTimeFormatStr = new Date(res.data.mainTotalStat.loaded_time).format('yyyy년 M월 d일 HH시')
    },
    init() {
      const accEarningRateData = this.$refs.accEarningRateData;
      const earningSuccessRateData = this.$refs.earningSuccessRateData;
      const totalSignCountData = this.$refs.totalSignCountData;

      let initAccEarningRate = {
        countNum: 0,
        duration: 1,
      };
      this.calculateCipher(initAccEarningRate, this.totalStat.accEarningRate);
      
      let initEarningSuccessRate = {
        countNum: 0,
        duration: 1,
      };
      this.calculateCipher(initEarningSuccessRate, this.totalStat.earningSuccessRate);

      let initTotalSignCount = {
        countNum: 0,
        duration: 1,
      };
      this.calculateCipher(initTotalSignCount, this.totalStat.totalSignCount);

      gsap.to(initAccEarningRate, {
        countNum: this.totalStat.accEarningRate, duration: initAccEarningRate.duration, ease:"none",
        onUpdate: changeEarningNumber,
      })
      gsap.to(initEarningSuccessRate, {
        countNum: this.totalStat.earningSuccessRate, duration: initEarningSuccessRate.duration, ease:"none",
        onUpdate: changeHitNumber,
      })
      gsap.to(initTotalSignCount, {
        countNum: this.totalStat.totalSignCount, duration: initTotalSignCount.duration, ease:"none",
        onUpdate: changeNumber,
      })

      function changeEarningNumber() {
        let num = initAccEarningRate.countNum.toFixed(0)
        accEarningRateData.innerHTML = Number(num).toLocaleString()
      }
      function changeHitNumber() {
        let num = initEarningSuccessRate.countNum.toFixed(1)
        earningSuccessRateData.innerHTML = num
      }
      function changeNumber() {
        let num = initTotalSignCount.countNum.toFixed(0)
        totalSignCountData.innerHTML = Number(num).toLocaleString()
      }
    },
    calculateCipher(init, data) {
      if(data < 1000000 && data >= 100000) {
        init.duration = 1.8;
        let extractNum = data.toString().slice(1,6)
        if(extractNum < 200) {
          init.countNum = data - 1000;
        } else {
          init.countNum = data - extractNum;
        }
      } else if(data < 100000 && data >= 10000) {
        init.duration = 1.5;
        let extractNum = data.toString().slice(1,5)
        if(extractNum < 200) {
          init.countNum = data - 600;
        } else {
          init.countNum = data - extractNum;
        }
      } else if(data < 10000 && data >= 1000) {
        init.duration = 1.2;
        let extractNum = data.toString().slice(1,4)
        if(extractNum < 100) {
          init.countNum = data - 200;
        } else {
          init.countNum = data - extractNum;
        }
      } else if(data < 1000 && data >= 100) {
        let extractNum = data.toString().slice(1,3)
        if(extractNum < 20) {
          init.countNum = data - 40;
        } else {
          init.countNum = data - extractNum;
        }
      }
    }
  },
}
</script>

<style lang='scss'>
  @import '@/components/index/top/css/infomationArea.scss';
</style>