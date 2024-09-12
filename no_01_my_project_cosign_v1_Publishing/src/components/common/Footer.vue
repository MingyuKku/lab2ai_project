<template>
  <div class="foot_wrap">
    <ul class="foot_gnb">
      <li>로그인</li>
      <li><a href="/signup">회원가입</a></li>
      <li>사이트 문의<span>070-7618-5053</span></li>
    </ul>
    <ul class="responsive_foot_info">
      <li>(주)랩투아이</li>
      <li>사이트 문의<span>070-7618-5053</span></li>
    </ul>
    <ul class="foot_info">
      <li>(주)랩투아이</li>
      <!-- <li>대표이사: <span>안웅</span></li> -->
      <li>주소: <span>경기도 성남시 분당구 벌말로 50번길 41 투아이센터</span></li>
    </ul>
    <ul class="foot_bottom">
      <li>Copyright © 2019 - Lab2AI All Rights Reserved</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    // goToSignup() {
    //   if(this.$router.history.current.name !== 'SignupPage') {
    //     location.href = '/signup';
    //   }
    // },
  }
}
</script>

<style lang='scss'>
  @import './css/footer.scss';
</style>