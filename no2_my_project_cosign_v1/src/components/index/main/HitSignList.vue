<template>
  <!-- <transition name="opacity"> -->
    <!-- <div class="hitSignList_wrap" v-show="tabMenuIndex === 1"> -->
    <div class="hitSignList_wrap">
      <div class="hitSignList_inner" v-if="this.items.length>0">
        <div class="title">
          <ul>
            <!-- <img :src="`${imgURL}index/main/filterIcon.png`" alt="필터아이콘"> -->
            <li class="coin">코인이름</li>
            <li class="earning">수익률</li>
            <li class="validate">유효기간</li>
            <li class="mentor">멘토이름</li>
            <li class="time">개시일/종료일</li>
          </ul>
        </div>
        <div class="predictSign_wrap">
          <!-- <div class="hoverEffect" :style="{transform: `translate(-50%, ${hoverTranslateY}px)`}"></div>
          @changeHoverTop="changeHoverTop" -->
          <HitSign
            v-for="(item,idx) in items" :key="idx"
            :item="item"
            :earningWidth="earningWidth"
          />
        </div>
      </div>
      <div v-else class="noItems">
        <p><i class="xi-error-o"></i>최근 등록된 싸인이 없습니다</p>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import HitSign from '@/components/index/main/HitSign'
// import axios from 'axios';
// import {API_URL} from '@/core/apiUrl';

export default {
  // props: ['dummyData', 'tabMenuIndex'],
  props: ['items'],
  components: {HitSign},
  data() {
    return {
      earningWidth: 'auto',
      // items: [],
      // hoverTranslateY: 0,
    }
  },
  mounted() {
    // this.loadSign();
  },
  watch: {
    items(val) {
      val.forEach((r)=> {
        if(r.earningRateText.split('.')[0].length >= 3) {
          this.earningWidth = '92px';
        } else if(r.earningRateText.split('.')[0].length >= 2) {
          this.earningWidth = '80px';
        }
      })
    }
  },
  methods: {
    // async loadSign() {
    //   const res = await axios.get(`${API_URL}/api/main/recent_earnings_hit_sign`);
    //   // console.log(res.data);

    //   this.items = res.data.map(item => {
    //     return {
    //       ...item,
    //       url: `/m/${item.mentorId}/${item.subSeqId}`,
    //       earningRateText: (item.earningRate).toFixed(2),
    //       startTimeText: new Date(item.startTime).format("MM-dd HH:mm"),
    //       endTimeText: new Date(item.endTime).format("MM-dd HH:mm"),
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
    // changeHoverTop(val) {
    //   this.hoverTranslateY = val;
    // }
  }
}
</script>

<style lang='scss'>
  @import './css/hitSignList.scss';
</style>