<template>
  <div class="myPagePassword_wrap">
    <div class="title">비밀번호 변경</div>
    <div class="myPagePassword_body">
      <div class="originPw_area">
        <h2>기존 비밀번호</h2>
        <input type="password" id="originPw" placeholder="기존 비밀번호를 입력해 주세요." v-model="originPw">
        <!-- <span class="validation"><i class="xi-info-o"></i>한글/영문/숫자 포함 2~10자</span> -->
      </div>
      <div class="newPw_area">
        <h2>새 비밀번호</h2>
        <input type="password" id="newPw" placeholder="새 비밀번호를 입력해 주세요." v-model="newPw">
        <span class="validation"><i class="xi-info-o"></i>영문/숫자/특수문자 중 2개 이상 포함 8자 이상</span>
      </div>
      <div class="newPwCheck_area">
        <h2>새 비밀번호 확인</h2>
        <input type="password" id="newPwCheck" placeholder="비밀번호를 한 번 더 입력해 주세요." v-model="CnewPwCheck">
        <!-- <span class="validation"><i class="xi-info-o"></i>영문/숫자/특수문자 중 2개 이상 포함 8자 이상</span> -->
      </div>
      <!-- <div class="event_info_agreement">
        <input type="checkbox" id="eventAgree">
        <label for="eventAgree">
          <p>이벤트 정보 수신 동의</p>
          <div class="checkBox"><i class="xi-check"></i></div>
        </label>
      </div> -->
      <button type="button" :disabled="!originPw || !newPw || !CnewPwCheck">변경하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originPw: '',
      newPw: '',
      CnewPwCheck: '',
    }
  }
}
</script>

<style lang='scss'>
  @import './css/myPagePassword.scss';
</style>