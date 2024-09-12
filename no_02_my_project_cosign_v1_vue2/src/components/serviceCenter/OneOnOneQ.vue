<template>
  <div class="oneOnOneQ_wrap">
    <div class="direct_inquiry">
      <div class="title">1:1 문의 바로가기</div>
      <div class="content">
        <h2>1:1 문의</h2>
        <p>궁금한 내용을 남겨주시면, 자세히 답변 드립니다.</p>
        <p>주말, 공휴일 문의 가능</p>
      </div>
    </div>
    <div class="my_inquiry_list">
      <div class="title">
        <h1>최근 문의 내역</h1>
        <div class="more">
          <p>+ 전체보기</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <li v-for="(inquiry,idx) in userInquiry" :key="idx">
            <div class="content">
              <h2>[{{inquiry.category}}]</h2>
              <h3>{{inquiry.tit}}</h3>
            </div>
            <p class="time">{{inquiry.time}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInquiry: [
        {category: '계정', tit: '회원가입은 어떻게 하나요?', time: '2022-04-22'},
        {category: '계정', tit: '비밀번호는 어떻게 변경하나요?', time: '2022-04-21'},
        {category: '계정', tit: '비밀번호는 어떻게 변경하나요?', time: '2022-04-21'},
      ]
    }
  }
}
</script>

<style lang='scss'>
  @import './css/oneOnOneQ.scss';
</style>