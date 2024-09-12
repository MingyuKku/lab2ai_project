<template>
  <!-- <transition name='fade'> -->
    <div class="modal" v-show="alarm.show">
      <transition name='bounce'>
        <div class="subscribePopup_wrap">
          <form class="box">
            <div class="body">
              <h1 v-for="(title, idx) in alarm.titles" :key="`title_${idx}`">
                {{title}}
              </h1>
              <p v-for="(content, idx) in alarm.contents" :key="`content_${idx}`">
                {{content}}
              </p>
            </div>
            <div class="buttons">
              <button @click="onOkClick" type="button">{{alarm.okButtonText}}</button>
              <button class="cancleBtn" @click="onClose" type="button" v-if="alarm.cancelButtonText !== null">{{alarm.cancelButtonText}}</button>
            </div>
          </form>
          <div class="close" @click="onClose">
            <i class="xi-close-thin"></i>
          </div>
        </div>
      </transition>
    </div>
  <!-- </transition> -->
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('popupStore', ['alarm']),
    alreadyCert() {
      return this.$route.query.already_cert;
    }
  },
  watch: {
    alreadyCert(val) {
      if(val === 'true') {
        this.showAlreadyCertPopup();
      }
    }
  },
  mounted() {
    if(this.alreadyCert === 'true') {
      this.showAlreadyCertPopup();
    }
  },
  methods: {
    ...mapMutations('popupStore', ['close']),
    ...mapActions('popupStore', ['showAlreadyCertPopup']),
    onOkClick() {
      this.alarm.onOkClick()
    },
    onClose(e) {
      if(e.target.className === 'modal' || e.target.className === 'xi-close-thin' || e.target.className === 'cancleBtn') {
        this.close();
      }
    }
  },

}
</script>

<style lang='scss'>
  @import './css/subscibePopup.scss';
</style>
