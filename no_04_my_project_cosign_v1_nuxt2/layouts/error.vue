<template>
  <div class="error_wrap">
    <div class="inner_box">
      <div class="title">
        <div class="bi_img"><img :src="`${$static.imgUrl}index/main/web_login_cosign_bi.png`" alt="bi이미지"></div>
        <h1>시스템 점검 안내</h1>
      </div>
      <div class="info_content">
        <p>코싸인(COSIGN) 홈페이지 시스템 점검 및 업데이트로 인하여</p>
        <p>일시적으로 서비스 접속이 중단되었습니다.</p>
        <p>서비스 이용에 불편을 드려 죄송합니다.</p>
        <p>빠른 시간 내에 정상적인 서비스가 가능하도록 최선을 다하겠습니다.</p>
        <p>감사합니다.</p>
      </div>
      <!-- {{ error }} -->
    </div>
  </div>

</template>

<script>
export default {
  props: ['error'],
  layout: 'errorLayout'

}
</script>

<style lang="scss">
  @import '@/src/css/error.scss';
</style>