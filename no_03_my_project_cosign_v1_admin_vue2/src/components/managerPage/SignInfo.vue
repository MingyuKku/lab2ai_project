<template>
  <div class="signInfo_wrap">
    <ul>
      <li class="subSeqId"><div class="inner">{{ sign.signDTO.subSeqId }}</div></li>
      <li class="mentor"><div class="inner">{{ sign.mentorPageReturnDTO.title }}</div></li>
      <li class="exchange"><div class="inner">{{ KoExchange(sign.signDTO.exchange) }}</div></li>
      <li class="coin"><div class="inner">{{ sign.coin.koreanName }}</div>
      </li>
      <li class="buyPrice"><div class="inner">{{ LocaleString(sign.signDTO.startPrice) }}</div></li>
      <li class="targetPrice"><div class="inner">{{ LocaleString(sign.signDTO.targetPrice) }}</div></li>
      <li class="cutPrice"><div class="inner">{{ LocaleString(sign.signDTO.cutPrice) }}</div></li>
      <li class="startTime">
        <div class="inner">{{ sign.startTimeText }}</div>
      </li>
      <li class="endTime">
        <div class="inner">{{ sign.endEarningTimeText || sign.endTimeText }}</div>
      </li>
      <li class="expiration"><div class="inner">{{ validateMinTime(sign.signDTO.validateMin) }}</div></li>
      <li class="state"><div class="inner">{{ signStateText(sign.signDTO.evaluateState, sign.endEarningTimeText || sign.endTimeText) }}</div></li>
      <li class="earning">
        <div class="inner">
          <span v-if="sign.signDTO.earningRate !== null">{{ sign.signDTO.earningRate.toFixed(4) }}%</span>
        </div>
      </li>
      <li class="notEarning">
        
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['sign', 'columns'],
  data() {
    return {

    }
  },
  computed: {
    KoExchange() {
      return (exc) => {
        switch(exc) {
          case 'upbit': return '업비트';
          case 'binance': return '바이낸스';
        }
      }
    },
    LocaleString() {
      return (price) => {
        if(price > 0) return price.toLocaleString();
        else return price;
      }
    },
    signStateText() {
      return (evaluateState, endDate) => String.signStateText(evaluateState, new Date(endDate));
    },
    validateMinTime() {
      return (min) => Number.validTime(min);
    }
  },
  created() {
    
  },
  mounted() {
  }
}
</script>

<style lang="scss">
  @import './css/signInfo.scss';
</style>