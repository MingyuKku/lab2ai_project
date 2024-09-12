<template>
  <div class="image-modal-wrap">
    <div class="image-wrap">
      <div class="image-real-width">
        <span class="close-modal" @click="onCloseModal"><i class="xi-close-thin"></i></span>
        <img :src="prevImageSrc" alt="미리보기 이미지" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prevImageSrc'],
  methods: {
    onCloseModal() {
      this.$emit('closePrevModal');
    }
  }
}
</script>

<style lang="scss">
@import './css/imageModal.scss';
</style>