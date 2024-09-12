<template>
  <transition name='fade'>
    <div class="modal" v-show="unsubscribePopup" @click="onClickCancle">
      <transition name='bounce'>
        <div class="subscribePopup_wrap" v-show="unsubscribePopup">
          <form class="box">
            <div class="title">
              <h1><img :src="`${imgURL}mentorPage/profile_img.png`" alt="프로필이미지"></h1>
              <h2>차트 유사도 분석</h2>
            </div>
            <div class="body">
              <p>이 멘토를 구독취소하시겠습니까?</p>
            </div>
            <div class="buttons">
              <button @click="onClickSubscribeButton" type="button">구독취소</button>
              <button @click="onClickCancle" type="button">취소</button>
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
    ...mapGetters('signStore', ['unsubscribePopup', 'pageId']),
    ...mapGetters('loginStore', ['loginInfo']),
  },
  methods: {
    ...mapActions('signStore', ['showUnSubscribePopup']),
    ...mapActions('loginStore', ['unsubscribe']),
    onClickSubscribeButton() {      
      this.unsubscribe(this.pageId);
      this.showUnSubscribePopup(false);

    },
    onClickCancle(e) {
      if(e.target.className === 'modal' || e.target.className === 'xi-close-thin') {
        this.showUnSubscribePopup(false)
      }
    }
  },
}
</script>

<style lang='scss'>
  @import './css/subscibePopup.scss';

</style>