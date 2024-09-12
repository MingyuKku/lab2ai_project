<template>
  <div class="notice_wrap">
    <div class="title">
      <h1>자주 묻는 질문</h1>
      <div class="more">
        <p>+ 전체보기</p>
      </div>
    </div>
    <div class="lately_notice_list">
      <ul>
        <li v-for="(notice,idx) in notices" :key="idx">
          <h2>{{notice.tit}}</h2>
          <p>{{notice.time}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices: [
        {tit: '코싸인 이용약관 계정 안내', time: '2022-04-20'},
        {tit: '코싸인 개인정보처리방침 개정 안내', time: '2022-04-20'},
        {tit: '코싸인 베타 서비스 오픈', time: '2022-04-18'},
      ]
    }
  }
}
</script>

<style lang='scss'>
  @import './css/notice.scss';
</style>