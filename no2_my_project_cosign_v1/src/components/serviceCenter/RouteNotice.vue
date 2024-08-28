<template>
  <div class="routeNotice_wrap">
    <div class="notice_table">
      <div class="table_title">
        <div class="no">번호</div>
        <div class="tit">제목</div>
        <div class="registDate">등록일</div>
      </div>
      <div class="table_list">
        <ul>
          <li v-for="(list,idx) in noticeList" :key="idx"><a href="">
            <div class="list_no">{{list.no}}</div>
            <div class="list_tit">
              [{{list.cate}}] {{list.tit}}
            </div>
            <div class="list_time">{{list.time}}</div>
          </a></li>
        </ul>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
        {no: '10', url: '', cate: '공지', tit: '코싸인 정식 OPEN 예정', time: '2022-04-22'},
      ]
    }
  }
}
</script>

<style lang='scss'>
  @import './css//routeNotice.scss';
</style>