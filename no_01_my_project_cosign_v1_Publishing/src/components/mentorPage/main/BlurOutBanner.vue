<template>
  <div class="blurOut_popup_wrap">
    <div class="box">
      <div class="bell_img"><img :src="`${imgURL}mentorPage/blur_bell_icon.svg`" alt="알림아이콘"></div>
      <div class="body">
        <h2>해당 정보는 구독자에게만<br> 공개하고 있습니다</h2>
        <p>Sign을 확인하시려면 먼저 구독을 해주세요.</p> 
      </div>
    </div>  <!--box-->
    <button @click="showSubscribePopup(true)">구독하기</button>
  </div>  <!--blurOut_popup_wrap-->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
  },
  methods: {
    ...mapActions('signStore', ['showSubscribePopup']),
    // onSubscribeButtonClick() {
    //   this.subscribe(this.pageId);
    // }
  }
}
</script>

<style lang='scss'>
  @import './css/blurOutBanner.scss';

</style>