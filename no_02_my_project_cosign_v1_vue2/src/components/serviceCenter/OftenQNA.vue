<template>
  <div class="oftenQNA_wrap">
    <div class="title">
      <h1>자주 묻는 질문</h1>
      <div class="more">
        <p>+ 전체보기</p>
      </div>
    </div>
    <div class="questions">
      <div class="question" v-for="(ques,idx) in default_questions" :key="idx">
        <h2>[{{ques.category}}]</h2>
        <p>{{ques.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default_questions: [
        {category: '계정', desc: '회원가입은 어떻게 하나요?', url: ''},
        {category: '계정', desc: '비밀번호는 어떻게 변경하나요?', url: ''},
        {category: '계정', desc: '닉네임은 어떻게 변경하나요?', url: ''},
        {category: '서비스 이용', desc: '알람 설정은 어떻게 하나요?', url: ''},
        {category: '서비스 이용', desc: '여러개의 아이드를 사용할 수 있나요?', url: ''},
        {category: '서비스 이용', desc: '비회원도 구독/결제를 할 수 있나요?', url: ''},
        {category: '결제', desc: '코싸인 결제 수단에는 어떤게 있나요?', url: ''},
        {category: '서비스 이용', desc: '회원 탈퇴 후에 재가입이 가능한가요?', url: ''},
      ]
    }
  }
}
</script>

<style lang='scss'>
  @import './css/oftenQNA.scss';
</style>