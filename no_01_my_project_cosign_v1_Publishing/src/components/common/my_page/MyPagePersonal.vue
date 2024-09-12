<template>
  <div class="myPagePersonal_wrap">
    <div class="title">개인 정보 수정</div>
    <div class="myPagePersonal_body">
      <div class="nickname_area">
        <h2>닉네임</h2>
        <input type="text" id="nickname" v-model="nickname">
        <span class="validation"><i class="xi-info-o"></i>한글/영문/숫자 포함 2~10자</span>
      </div>
      <div class="email_area">
        <h2>이메일</h2>
        <input type="email" id="email" v-model="email">
        <!-- <span class="validation"><i class="xi-info-o"></i>한글/영문/숫자 포함 2~10자</span> -->
      </div>
      <div class="event_info_agreement">
        <input type="checkbox" id="eventAgree">
        <label for="eventAgree">
          <p>이벤트 정보 수신 동의</p>
          <div class="checkBox"><i class="xi-check"></i></div>
        </label>
      </div>
      <button type="button" :disabled="!nickname || !email">변경하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      email: '',
    }
  }
}
</script>

<style lang='scss'>
  @import './css/myPagePersonal.scss';
</style>