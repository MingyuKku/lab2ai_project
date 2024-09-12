<template>
  <div class="modal" v-show="isShowLoginAlert">
    <transition name='bounce'>
      <div class="subscribePopup_wrap">
        <form class="box">
          <div class="body">
            <h1>로그인 하셔야 이용하실 수 있습니다.</h1>
            <p>로그인하시겠습니까?</p>
          </div>
          <div class="buttons">
            <button @click="onClickLogin" type="button">로그인하기</button>
            <button class="cancleBtn" @click="hideLoginAlert" type="button">취소</button>
          </div>
        </form>
        <div class="close" @click="hideLoginAlert">
          <i class="xi-close-thin"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('popupStore', ['isShowLoginAlert']),
  },
  methods: {
    ...mapMutations('popupStore', ['showLoginAlert', 'hideLoginAlert']),
    ...mapMutations('signStore', ['showLoginPopup']),
    onClickLogin() {
        this.hideLoginAlert();

        this.$nextTick(() => {
            this.showLoginPopup(true);
        });
    }
  },
}
</script>

<style lang='scss'>
  @import './css/subscibePopup.scss';
</style>