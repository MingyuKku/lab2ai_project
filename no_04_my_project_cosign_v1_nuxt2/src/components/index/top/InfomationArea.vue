<template>
  <div class="infomationArea_wrap">
    <div class="cumulateEarning_wrap">
      <div class="valueInner" v-for="(info,idx) in informData" :key="idx">
        <div class="title">
          <div class="icon"><img :src="info.icon" alt="아이콘"></div>
          <p v-html="info.title"></p>
        </div>
        <div class="data">
          <span ref="dataset"></span>{{ info.type }}
        </div>
      </div>
    </div>  <!--cumulateEarning_wrap-->
    <p class="notice">*{{loadedTimeFormatStr}} 기준</p>
    <img class="informaionArea_bg" :src="`${$static.imgUrl}index/top/informaionArea_bg.png`" alt="배경이미지">
  </div>
</template>

<script>


export default {
  name: 'InformationArea',
  data() {
    return {
      informData: [
        {totalStat: 0, option: {countNum: 0, duration: 1}, fixPos: 0, icon: `${$static.imgUrl}index/top/wonIcon_no_fill.svg`, title: '모든 예측에 투자했다면<span>수익률 합계</span>', type: '%'},
        {totalStat: 0, option: {countNum: 0, duration: 1}, fixPos: 1, icon: `${$static.imgUrl}index/top/wonIcon_fill.svg`, title: '멘토들의 예측 정확도<span>수익 적중률</span>', type: '%'},
        {totalStat: 0, option: {countNum: 0, duration: 1}, fixPos: 0, icon: `${$static.imgUrl}index/top/wonIcon_no_fill.svg`, title: '지금까지 COSIGN의<span>누적 SIGN 수</span>', type: '건'},
      ],
      loadedTimeFormatStr: '',
    }
  },
  async mounted() {
    await this.loadData();
    this.init();
  },
  methods: {
    async loadData() {
      const res = await this.$axios.get(`/api/main/total_stats`);

      this.informData[0].totalStat = res.data.earningRateSum;
      this.informData[1].totalStat = res.data.successRate;
      this.informData[2].totalStat = res.data.signCount;
      this.loadedTimeFormatStr = Date.parseUtcText(res.data.loadedTime).format('yyyy년 M월 d일 HH시');
    },
    init() {
      let that = this;

      for(let i = 0; i < this.informData.length; i++) {
        this.calculateNumber(this.informData[i].option, this.informData[i].totalStat);

        this.$gsap.to(this.informData[i].option, {
          countNum: this.informData[i].totalStat, duration: this.informData[i].option.duration, ease:"none",
          onUpdate: updateNumber(this.informData[i].option,this.informData[i].fixPos,i),
        })
      }

      function updateNumber(opt,f,idx) {
        return function() {
          let num = opt.countNum.toFixed(f);
          if(f === 0) that.$refs.dataset[idx].innerHTML = Number(num).toLocaleString();
          else that.$refs.dataset[idx].innerHTML = num;  //★이렇게 해야 숫자 애니메이팅이 자연스러워짐!  
        }
      }

    },
    calculateNumber(init, data) {
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
  @import '@/src/components/index/top/css/infomationArea.scss';
</style>