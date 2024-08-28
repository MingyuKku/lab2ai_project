<template>
  <div class="routeMyQuestion_wrap">
    <div class="list" v-for="(list,idx) in myQuestions" :key="idx">
      <div class="clickContent">
        <p class="tit">[{{list.cate}}] {{list.tit}}</p>
        <p class="time">{{list.time}}</p>
        <p class="ck" v-if="list.answer === true">답변완료</p>
        <p class="ck" v-else>답변대기</p>
        <p class="accordion_btn"><i class="xi-angle-down"></i></p>
      </div>
      <div class="accordionContent" v-html="list.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myQuestions: [
        {cate: '계정', tit: '회원가입은 어떻게 하나요?', time: '2022-04-22', answer: true, content: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p><p>도움이 필요하실 때 언제든 1:1 문의를 다시 이용해주세요.</p><p>즐거운 하루 보내세요.</p>'},
        {cate: '계정', tit: '회원가입은 어떻게 하나요?', time: '2022-04-22', answer: true, content: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p><p>도움이 필요하실 때 언제든 1:1 문의를 다시 이용해주세요.</p><p>즐거운 하루 보내세요.</p>'},
        {cate: '계정', tit: '회원가입은 어떻게 하나요?', time: '2022-04-22', answer: true, content: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p><p>도움이 필요하실 때 언제든 1:1 문의를 다시 이용해주세요.</p><p>즐거운 하루 보내세요.</p>'},
        {cate: '계정', tit: '회원가입은 어떻게 하나요?', time: '2022-04-22', answer: true, content: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p><p>도움이 필요하실 때 언제든 1:1 문의를 다시 이용해주세요.</p><p>즐거운 하루 보내세요.</p>'},
        {cate: '계정', tit: '회원가입은 어떻게 하나요?', time: '2022-04-22', answer: true, content: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p><p>도움이 필요하실 때 언제든 1:1 문의를 다시 이용해주세요.</p><p>즐거운 하루 보내세요.</p>'},
      ],
    }
  }
}
</script>

<style lang='scss'>
  @import './css/routeMyQuestion.scss';
</style>