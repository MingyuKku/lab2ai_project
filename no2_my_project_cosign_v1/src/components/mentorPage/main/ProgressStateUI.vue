<template>
  <div class="progressStateUI_wrap" v-if="!isEnd">
    <div class="inner">
      <div class="enter">
        <div class="icon_wrap">
           <div class="icon" :class="{on: isEnter}">
             <img :src="isEnter ? `${imgURL}mentorPage/progressIcon_on.svg`: `${imgURL}mentorPage/progressIcon.svg`" alt="아이콘">
            </div>
        </div>
        <div class="text_wrap">
          <div class="text enter_success" v-if="isEnter"><p>진입성공</p></div>
          <div class="text waiting" v-else>
            <p>진입대기</p>
            <span>{{ currentPrice.changePrice }}원 차이</span>
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
             <img :src="isEnter ? `${imgURL}mentorPage/progressIcon_on.svg`: `${imgURL}mentorPage/progressIcon.svg`" alt="아이콘">
            </div>
        </div>
        <div class="text_wrap" v-if="isEnter && currentPrice.currentPrice !== null">
          <div class="text revenue" v-if="realEarning >= 0">
            <p>수익 진행 중</p>
            <span>+{{ realEarning }}%</span>
          </div>
          <div class="text loss" v-else>
            <p>손실 중</p>
            <span>{{ realEarning }}%</span>
          </div>
        </div>
      </div><!--enter_startPrice-->

      <div class="progressBar afterEnter">
        <div class="dots" ref="dots" style="color: 'transparent';">
          <!-- <span class="progress_bg"></span> -->
          <!-- <i class="dot xi-full-moon" v-for="(dot,idx) in dots" :key="idx"></i> -->
          <i class="dot" v-for="(dot,idx) in dots" :key="idx"></i>
        </div>
      </div>

      <div class="end">
        <div class="icon_wrap">
           <div class="icon"><img :src="`${imgURL}mentorPage/progressIcon.svg`" alt="아이콘"></div>
        </div>
        <div class="text_wrap">
          <div class="text remainTime">
            <p>싸인 종료</p>
            <span>{{ now }} 남음</span>
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
    }
  },
  mounted() {
    this.now = new Date(this.currentSign.endTime).getRemainTime();
    this.nowValue = new Date(this.currentSign.endTime).valueOf() - new Date().valueOf();
    // let test = navigator.userAgent.match(/ iPhone | iPad | iPod /i)
    // console.log('유저에이전트',test)
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  watch: {
    currentSign: {
      handler() {
        this.progressStyle();
      },
      deep: true
    },
    nowValue(val) {
      if(val > 0) {
        this.timer = setTimeout(()=> {
          this.now = new Date(this.currentSign.endTime).getRemainTime();
          this.nowValue = new Date(this.currentSign.endTime).valueOf() - new Date().valueOf();

          this.progressStyle();
        }, 1000)
      } else {
        clearTimeout(this.timer);
        this.isEnd = true;
      }
    },
    // currentPrice: {
    //   handler() {
    //     // console.log('와치 - 현재싸인',this.currentSign)
    //     // console.log('현재코인가',val.currentPrice)
        
    //   },
    //   deep: true
    // }
  },
  computed: {
    isEnter() {
      let enterState = ['sell_wait','sell_success'];
      if(enterState.includes(this.currentSign.evaluateState)) return true;
      else return false;
    },
    realEarning() {
      let earning = ((this.currentPrice.currentPrice*100) / this.currentSign.startPrice) - 100;
      return earning.toFixed(2);
    },
  },
  methods: {
    progressStyle() {
      let endStart = new Date(this.currentSign.endTime).valueOf() - new Date(this.currentSign.startTime).valueOf();
      let endCurrent = new Date(this.currentSign.endTime).valueOf() - new Date().valueOf();
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