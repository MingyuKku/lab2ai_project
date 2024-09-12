<template>
  <transition name='fade'>
    <div class="modal" v-show="subscribePopup" @click="onClickCancle">
      <transition name='bounce'>
        <div class="subscribePopup_wrap" v-show="subscribePopup">
          <form class="box">
            <div class="body">
              <h1>구독을 하시면 선택하신 멘토의 최신 등록 예측 SIGN 알림을 <br/>받으실 수 있습니다.</h1>
              <p>이 멘토를 구독하시겠습니까?</p>
            </div>
            <div class="buttons">
              <button @click="onClickSubscribeButton" type="button">구독하기</button>
              <button class="cancleBtn" @click="onClickCancle" type="button">취소</button>
            </div>
          </form>
          <div class="close" @click="onClickCancle">
            <i class="xi-close-thin"></i>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data(){
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  },
  computed: {
    ...mapGetters('signStore', ['subscribePopup']),
    ...mapGetters('mentorRouteStore', ['mentorId']),
    ...mapGetters('loginStore', ['loginInfo']),
  },
  methods: {
    ...mapActions('signStore', ['showSubscribePopup']),
    ...mapActions('loginStore', ['subscribe']),
    onClickSubscribeButton() {      
      this.subscribe(this.mentorId);
      this.showSubscribePopup(false);

    },
    onClickCancle(e) {
      if(e.target.className === 'modal' || e.target.className === 'xi-close-thin' || e.target.className === 'cancleBtn') {
        this.showSubscribePopup(false)
      }
    }
  },
}
</script>

<style lang='scss'>
  @import './css/subscibePopup.scss';
</style>