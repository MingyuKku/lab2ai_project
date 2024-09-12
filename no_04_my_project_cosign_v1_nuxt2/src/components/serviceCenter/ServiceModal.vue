<template>
  <div class="serviceModal_wrap" @click="closeModal">
    <div class="innerBox">
      <div class="submit">
        <h1>[{{ popupData[modalContIdx].tit }}]</h1>
        <div class="desc">
          <h2 v-for="(warn, idx) in popupData[modalContIdx].warning" :key="`${idx}_warn`">{{ warn }}</h2>
          <p v-for="(description, idx) in popupData[modalContIdx].desc" :key="`${idx}_desc`">{{ description }}</p>
        </div>
        <div class="buttons">
          <button type="button" class="button button1" @click="onClickBtn1" v-if="popupData[modalContIdx].button1">
            {{ popupData[modalContIdx].button1 }}</button>
          <button type="button" class="button button2" @click="onClickBtn2" v-if="popupData[modalContIdx].button2">
            {{ popupData[modalContIdx].button2 }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    modalContIdx: Number,
    checkFiles: String,
  },
  data() {
    return {
      popupData: [
        {
          tit: '완료',
          desc: ['제출이 완료되었습니다'],
          button1: '확인'
        },
        {
          tit: '안내',
          desc: ['첨부파일 용량이 초과되어 업로드 하실 수 없습니다', '파일의 전체 용량을 확인해 주세요'],
          button1: '확인'
        },
        {
          tit: '안내',
          desc: ['첨부파일 개수가 초과되어 업로드 하실 수 없습니다', '파일의 전체 개수를 확인해 주세요'],
          button1: '확인'
        },
        {
          tit: '안내', 
          warning: ['로그인 하셔야 이용하실 수 있습니다'],
          desc: ['로그인하시겠습니까?'],
          button1: '로그인하기',
          button2: '취소'
        },
      ]
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo'])
  },
  methods: {
    ...mapMutations('popupStore', ['showLoginPopup']),
    onClickBtn1() {
      if(this.modalContIdx === 0) {

        this.$emit('closeModal', false, null);

        if(this.loginInfo !== null) this.$router.push('/help/qnalist')
        else this.$router.push('/help');  
      }

      if(this.modalContIdx === 1) {
        if(this.checkFiles) {
          this.$parent._data.modalContIdx = 2; return;
        }
        this.$emit('closeModal', false, null);
      }
      if(this.modalContIdx === 2) this.$emit('closeModal', false, null);

      if(this.modalContIdx === 3) {
        this.showLoginPopup(true);
      }
    },

    onClickBtn2() {
      this.$emit('closeModal', false, null)
      this.$router.push('/help')
    },

    closeModal(e) {
      let closeClassName = ['serviceModal_wrap'];
      let target = e.target.className;
      if(closeClassName.includes(target)) {

        this.$emit('closeModal', false, null);

        if(this.modalContIdx === 0) {
          if(this.loginInfo !== null) this.$router.push('/help/qnalist')
          else this.$router.push('/help'); 
        }

        if(this.modalContIdx === 3) {
          this.$router.push('/help')
        }
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/ServiceModal.scss';
</style>