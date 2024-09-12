<template>
  <!-- <div class="progressStateUI_wrap" v-if="!isEnd"> -->
  <div class="progressStateUI_wrap">
    <div class="inner">
      <div class="enter">
        <div class="icon_wrap">
           <div class="icon" :class="{on: isEnter}">
             <img :src="isEnter ? `${$static.imgUrl}mentorPage/progressIcon_on.svg`: `${$static.imgUrl}mentorPage/progressIcon.svg`" alt="아이콘">
            </div>
        </div>
        <div class="text_wrap" v-if="!isEnd">
          <div class="text enter_success" v-if="isEnter"><p>진입 성공</p></div>
          <div class="text waiting" v-else>
            <p>진입 대기</p>
            <!-- <span>{{ currentPrice.changePrice }}원 차이</span> -->
          </div>
        </div>
      </div><!--enter-->
      
      <div class="progressBar beforeEnter">
        <div class="dots" :class="{on: isEnter}">
          <!-- <i class="dot xi-full-moon" v-for="(dot,idx) in dots" :key="idx"></i> -->
          <i class="dot" v-for="(dot,idx) in dots" :key="idx"></i>
        </div>
      </div>

      <div class="enter_startPrice">
        <div class="icon_wrap">
           <div class="icon" :class="{on: isEnter}">
             <img :src="isEnter ? `${$static.imgUrl}mentorPage/progressIcon_on.svg`: `${$static.imgUrl}mentorPage/progressIcon.svg`" alt="아이콘">
            </div>
        </div>
        <!-- <div class="text_wrap" v-if="isEnter && currentPrice.currentPrice !== null && currentCoin !== null"> -->
        <!-- <div class="text_wrap" v-if="isEnter && currentPrice.currentPrice !== null"> -->
        <div class="text_wrap" v-if="isEnter && realEarning !== null && !currentSign.pay">
          <div class="text revenue" v-if="realEarning > 0">
            <p>수익</p>
            <span>+{{ realEarning }}%</span>
          </div>
          <div class="text ready" v-else-if="realEarning === 0">
            <p>수익</p>
            <span>{{ realEarning }}%</span>
          </div>
          <div class="text loss" v-else>
            <p>손실</p>
            <span>{{ realEarning }}%</span>
          </div>
        </div>
        <div class="text_wrap" v-else>
          <div class="text"><p>진행중</p></div>
        </div>
      </div><!--enter_startPrice-->

      <div class="progressBar afterEnter">
        <div class="dots" ref="dots" style="color: 'transparent';">
          <i class="dot" v-for="(dot,idx) in dots" :key="idx"></i>
        </div>
      </div>

      <div class="end">
        <div class="icon_wrap">
           <div class="icon"><img :src="`${$static.imgUrl}mentorPage/progressIcon.svg`" alt="아이콘"></div>
        </div>
        <div class="text_wrap">
          <div class="text remainTime">
            <p>싸인 종료</p>
            <span v-if="now !== null && !isEnd">{{ now }} 남음</span>
          </div>
        </div>
        
      </div><!--end-->
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    currentPrice: Object,
    currentSign: Object,
  },
  data() {
    return {
      dots: 24,
      now: null,
      nowValue: 0,
      isEnd: false,
      timer: null,
      remainTime: null,
      // isEarningFlag: false,
    }
  },
  mounted() {
    this.initTime()
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  watch: {
    // currentPrice: {
    //   handler(val) {
    //     console.log('프롭스 현재가 바뀜',val)
    //   },
    //   deep: true
    // },
    currentSign: {
      handler() {
        // console.log('이거바뀌나', this.currentPrice, this.currentSign.coin)
        this.now = null;
        this.progressStyle();
      },
      deep: true
    },
    nowValue(val) {
      if(val > 0) {
        this.timer = setTimeout(()=> {
          this.isEnd = false;
          this.now = Date.parseUtcText(this.currentSign.endTime).addDate('minute', -1).getRemainTime();
          this.nowValue = Date.parseUtcText(this.currentSign.endTime).addDate('minute', -1).valueOf() - new Date().valueOf();
          this.progressStyle();
        }, 1000)
      } else {
        this.isEnd = true;
        clearTimeout(this.timer);
      }
    },
  },
  computed: {
    isEnter() {
      let enterState = ['sell_wait','sell_success'];
      if(enterState.includes(this.currentSign.evaluateState)) return true;
      else return false;
    },
    realEarning() {
      let earning = null;
      if(this.currentPrice.close !== null && this.currentPrice.code === this.currentSign.coin.market) {
        earning = ((this.currentPrice.close*100) / this.currentSign.startPrice) - 100;
        return earning.toFixed(2) * 1;
      } else return null;
    },
  },
  methods: {
    initTime() {
      this.now = Date.parseUtcText(this.currentSign.endTime).getRemainTime();
      this.nowValue = Date.parseUtcText(this.currentSign.endTime).addDate('minute', -1).valueOf() - new Date().valueOf();
    },
    progressStyle() {
      let endStart = Date.parseUtcText(this.currentSign.endTime).valueOf() - Date.parseUtcText(this.currentSign.startTime).valueOf();
      let endCurrent = Date.parseUtcText(this.currentSign.endTime).addDate('minute', -1).valueOf() - new Date().valueOf();
      let progress = 100 - ((endCurrent*100) / endStart);
      let dots = this.$refs.dots;
      this.$nextTick(()=> {
        if(this.isEnter) {
          dots.style.background = `linear-gradient(90deg, #F53B57 0%, #F53B57 ${progress}%, #ddd ${progress}%, #ddd 100%)`;
        } else {
          dots.style.background = `#ddd`;
        }
      })
      
    }
  }
}
</script>

<style lang='scss'>
  @import './css/progressStateUI.scss';
</style>