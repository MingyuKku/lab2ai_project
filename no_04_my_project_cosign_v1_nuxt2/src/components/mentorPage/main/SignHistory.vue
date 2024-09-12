<template>
  <div class="signHistory_wrap">
    <div class="list_head">
      <h1><img :src="`${$static.imgUrl}mentorPage/sign_off_title.png`" alt=""></h1>
    </div>

    <div class="list_body">
      <div class="history_list_area" ref="history_list_area">
        <SignHistoryItem
          class="sign_list_item"
          v-for='(history, idx) in signOff.signs' :key='history.id'
          :history='history'
          :idx='idx'
          :itemsFlag="itemsFlag"
        />
      </div>
    </div>
    <BtnEffect
      class="moreBtn"
      duration='0.6'
      color='#FE8295'
      v-if="isloading === false && signOff.isLastPage === false"
    >
      <button type="button" @click="onClickLoadNewHistories">
        <i class="xi-plus"></i><span>더보기</span>
      </button>
    </BtnEffect>
  </div>
</template>

<script>
import BtnEffect from '@/src/components/common/BtnEffect.vue'
import SignHistoryItem from '@/src/components/mentorPage/main/SignHistoryItem.vue'

export default {
  components: {
    SignHistoryItem, BtnEffect,
  },
  props: ['signOffProps', 'mentorId'],
  data(){
    return {
      signOff: this.signOffProps,
      isloading: false,
      itemsFlag: false
    }
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
  },
  mounted() {
    this.itemsLength = this.signOff.signs.length
    this.itemsFlag = true;
  },
  methods: {
    onClickLoadNewHistories() {
      this.loadNewHistories();
    },
    async loadNewHistories() {
      if(this.isloading === false) {
        this.isloading = true;
        this.itemsFlag = false;

        const lastSlideNo = this.signOff.signs[this.signOff.signs.length - 1].slideNo;
        const res = await this.$axios.get(`/api/sign/get/sign_history/page/${this.mentorId}/${lastSlideNo}`);
        this.addItemCount += res.data.signs.length;
        this.signOff.signs = this.signOff.signs.concat(res.data.signs.map(sign => {
          return {
              ...sign,
              sign_state: {
                  buy_success: ['sell_success', 'sell_fail', 'cut'].includes(sign.evaluateState),
                  target_success: ['sell_success'].includes(sign.evaluateState),
                  earning_success: sign.earningRate > 0
              }
          }
        }));

        this.itemsLength = this.signOff.signs.length

        this.signOff.isLastPage = res.data.isLastPage;

        this.isloading = false;
        this.itemsFlag = true;
      }
    }
  },
}
</script>

<style lang='scss'>
  @import './css/signHistory.scss';
</style>