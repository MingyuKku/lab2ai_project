<template>
  <!-- <transition name="opacity" mode="out-in"> -->
    <!-- <div class="newPredictSignList_wrap" v-show="tabMenuIndex === 0"> -->
    <div class="newPredictSignList_wrap">
      <div class="newPredictSignList_inner" v-if="this.items.length>0">
        <div class="title">
          <ul>
            <!-- <img :src="`${imgURL}index/main/filterIcon.png`" alt="필터아이콘"> -->
            <li class="coin">코인이름</li>
            <li class="earning">목표수익률</li>
            <li class="validate">유효기간</li>
            <li class="mentor">멘토이름</li>
            <li class="time">개시일</li>
          </ul>
        </div>
        <div class="predictSign_wrap">
          <!-- <div class="hoverEffect" :style="{transform: `translate(-50%, ${hoverTranslateY}px)`}"></div> -->
            <!-- <transition-group name="list" tag="div"> -->
              <!-- @changeHoverTop="changeHoverTop" -->
              <NewPredictSign ref="newPredictSign"
                v-for="item in items" :key="item.subSeqId"
                :item="item"
                :earningWidth="earningWidth"
              />
            <!-- </transition-group> -->
        </div>
      </div>
      <div v-else class="noItems">
        <p><i class="xi-error-o"></i>최근 등록된 싸인이 없습니다</p>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import NewPredictSign from '@/components/index/main/NewPredictSign';
// import axios from 'axios';
// import {API_URL} from '@/core/apiUrl';

export default {
  components: {NewPredictSign},
  // props: ['tabMenuIndex', 'items'],
  props: ['items'],
  data() {
    return {
      earningWidth: 'auto',
      // items: [],
      // hoverTranslateY: 0,
      sortFlag: false,
    }
  },
  mounted() {
    // this.loadSign();
    // console.log('머야', this.$refs.newPredictSign)
  },
  watch: {
    items(val) {
      val.forEach((r)=> {
        if(r.targetEarningRateText.split('.')[0].length >= 3) {
          this.earningWidth = '92px';
        } else if(r.targetEarningRateText.split('.')[0].length >= 2) {
          this.earningWidth = '80px';
        }
      })
    }
  },
  methods: {
    // async loadSign() {
    //   const res = await axios.get(`${API_URL}/api/main/latest_forecast_sign`);

    //   this.items = res.data.map(item => {
    //     return {
    //       ...item,
    //       url: `/m/${item.mentorId}/${item.subSeqId}`,
    //       targetEarningRateText: ((item.targetPrice / item.startPrice - 1) * 100).toFixed(2),
    //       startTimeText: new Date(item.startTime).format("yyyy-MM-dd HH:mm"),
    //       minuteText: this.getMinuteText(item.validateMin)
    //     }
    //   })
    // },
    // getMinuteText(minute) {
    //   if(minute / 60 < 1) {
    //     return `${minute}분`;
    //   } else {
    //     return `${Math.ceil(minute/60)}시간`;
    //   }
    // },


    // sortValidate() {
    //   if(this.sortFlag) {
    //     this.sortFlag = false;
    //     this.items.sort((a,b)=> a.validateMin - b.validateMin)
    //   } else {
    //     this.sortFlag = true;
    //     this.items.sort((a,b)=> b.validateMin - a.validateMin)
    //   }
    // },
    // sortEarning() {
    //   if(this.sortFlag) {
    //     this.sortFlag = false;
    //     this.items.sort((a,b)=> a.targetEarningRateText*1 - b.targetEarningRateText*1)
    //   } else {
    //     this.sortFlag = true;
    //     this.items.sort((a,b)=> b.targetEarningRateText*1 - a.targetEarningRateText*1)
    //   }
    // },
    // changeHoverTop(val) {
    //   this.hoverTranslateY = val;
    // }
  }
}
</script>

<style lang='scss'>
  @import './css/newPredictSignList.scss';
</style>