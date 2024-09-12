<template>
  <div class="blurOut_popup_wrap">
    <div class="box">
      <div class="bell_img"><img :src="`${$static.imgUrl}mentorPage/blur_bell_icon.svg`" alt="알림아이콘"></div>
      <div class="body">
        <h2>[임시] 해당 정보는 구독자에게만<br> 공개하고 있습니다.</h2>
        <p>SIGN을 확인하시려면 구독 해주세요.</p> 
      </div>
    </div>  <!--box-->
    <button @click="onSubscribeButtonClick">구독</button>
  </div>  <!--blurOut_popup_wrap-->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
    ...mapGetters('signStore', ['profileContents']),
  },
  methods: {
    ...mapActions('loginStore', ['subscribe']),
    ...mapMutations('popupStore', ['showLoginPopup']),
    onSubscribeButtonClick() {
      const product = this.profileContents.products[0];
      const productId = product.id;
      const productPrice = product.price;

      if(this.loginInfo === null) {
        this.showLoginPopup();
      } else {
        this.subscribe({productId, productPrice});
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/blurOutBanner.scss';

</style>