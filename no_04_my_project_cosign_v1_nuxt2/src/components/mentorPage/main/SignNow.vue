<template>
  <div class="sign_now_wrap">
    <div class="sign_now_head">
      <div class="sign_now_head_tit">
        <!-- <h1>Sign Now</h1> -->
        <div class="signOn_img"><img :src="`${$static.imgUrl}mentorPage/sign_on_title.png`" alt=""></div>
        <div class="head_tit_right" v-if="signOn.sign.coin !== undefined">
          <SignNowMenuSlide class="signNow_menu_slide"
            :activeSignSeqId="signOn.activeSignSeqId"
            :mentorId="mentorId"
            :buttons="signOn.buttons"
            :LoadAnotherContent="LoadAnotherContent" />
          <span class="clip" @click="copyClipboard"><i class="xi-share-alt-o"></i></span>
        </div>
      </div>  
    </div>

    <NuxtChild
      :signOnProps="signOn"
     />
    
  </div>
</template>

<script>
import SignNowMenuSlide from '@/src/components/mentorPage/main/SignNowMenuSlide';

import getSignOn, {getSignOnTime} from '@/src/core/signOn.js';

// import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    SignNowMenuSlide,
  },
  props: ['signOnProps', 'mentorId', 'changeLink', 'signPropsChange'],
  data(){
    return {
      signOn: this.signOnProps
    }
  },
  mounted() {
    const sign = this.signOn.sign;
    this.signOn.sign = {
      ...sign,
      ...getSignOnTime({sign})
    }
  },
  methods: {
    async LoadAnotherContent(signId) {      
      const res = await this.$axios.post(`/api/sign/get/sign_now/selected/${signId}`, {}, {withCredentials: true});
      const signBlurDto = res.data.signBlurDto;
      const signNowDto = res.data.signNowDto;
      const sign = signBlurDto !== null? signBlurDto: signNowDto;

      if(sign.evaluateState === 'buy_wait' || sign.evaluateState === 'sell_wait') {
        this.signOn = getSignOn({
          buttons: this.signOn.buttons, 
          sign,
          activeSignSeqId: sign.subSeqId
        });

        this.signOn.sign = {
          ...this.signOn.sign,
          ...getSignOnTime({sign: this.signOn.sign})
        }

        this.signPropsChange( {signOn: this.signOn, signOff: null} )
        this.changeLink(`/${this.mentorId}/${sign.subSeqId}`);
        
      } else {
        console.log(sign.evaluateState);
          alert("이 싸인은 종료된 싸인입니다.");
      }
    },
    async copyClipboard() {
      if(navigator.clipboard !== undefined) {
        await navigator.clipboard.writeText(`${window.location.host}/${this.mentorId}/${this.signOn.sign.subSeqId}`);

        alert('복사되었습니다.');
      } else {
        alert('지원하지 않는 브라우저입니다.')
      }
    },
  }
}
</script>

<style scoped lang='scss'>
  @import '@/src/components/mentorPage/main/css/signNow.scss';
</style>