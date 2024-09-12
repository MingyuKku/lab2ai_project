<template>
  <transition name="openMyPage">
    <div class="chartDataBoard_wrap">
      <!-- <div class="title">
        <div class="name">구분</div>
        <div class="date">날짜</div>
        <div class="price">가격</div>
      </div> -->
      <div class="mainData">
        <div class="name">
          <span></span>
          <!-- <p>메인</p> -->
        </div>
        <div class="date">{{ mainData.date }}</div>
        <!-- <div class="price">{{ mainData.value }}<span>원</span></div> -->
        <div class="price">{{ commaMainPrice }}<span>원</span></div>
      </div>
      <ul class="patternData">
        <li v-for="(data,idx) in patternData" :key="idx">
          <span :style="{background: chartColor[idx]}"></span>
          <!-- <div class="name">패턴{{ idx+1 }}</div> -->
          <div class="date">{{ data[activeIdx].realTime.substr(0,16) }}</div>
          <div class="price">{{ commaPatternPrice(idx) }}<span>원</span></div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['chartHoverData','chartData'],
  data() {
    return {
      activeIdx: 0,
      chartColor : [],
      mainData: {
        date: null,
        value: null,
      },
      patternData: [],
    }
  },
  watch: {
    chartData: {
      handler() {
        // console.log('변경감지', this.chartData.patternData)
        this.setChartData();
      },
      deep: true
    },
    chartHoverData: {
      handler(val) {
        this.setDate(val.data, val.index);
      },
      deep: true
    }
  },
  computed: {
    commaMainPrice() {
      if(this.mainData.value >= 1) {
        return this.mainData.value?.toLocaleString();
      } else {
        return this.mainData.value
      }
    },
    commaPatternPrice() {
      return idx => this.patternData[idx][this.activeIdx].realValue >= 1 ?
      this.patternData[idx][this.activeIdx].realValue?.toLocaleString() : this.patternData[idx][this.activeIdx].realValue;
    },
  },
  methods: {
    setChartData() {
      // this.activeIdx = 0;
      this.mainData.date = this.chartData.mainData[this.activeIdx]?.realTime.substr(0,16);
      this.mainData.value = this.chartData.mainData[this.activeIdx]?.value;
      this.patternData = this.chartData.patternData;
      this.chartColor = this.chartData.chartLineColors;
    },
    setDate(value, idx) {
      this.activeIdx = idx ?? 0;
      this.patternData = this.chartData.patternData;
      this.mainData.value = this.chartHoverData.mainData || this.chartData.mainData[0]?.value
      if(value.time) {
        let time = new Date((value.time-32400)*1000);
        let year = time.getFullYear();
        let month = time.getMonth()+1 < 10 ? `0${time.getMonth()+1}` : time.getMonth()+1;
        let date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
        let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
        let minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        this.mainData.date = `${year}-${month}-${date} ${hour}:${minute}`;
      } else {
        this.mainData.date = this.chartData.mainData[0].realTime.substr(0,16);
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/chartDataBoard.scss';
</style>