<template>
  <div class="oneOnOneQ_wrap">
    <div class="direct_inquiry">
      <div class="title">1:1 문의 바로가기</div>
      <div class="content" @click="$router.push('/help/qna')">
        <!-- <a href="/help/qna"> -->
          <div class="inner">
            <div class="icon">
              <span><img :src="`${$static.imgUrl}serviceCenter/question_icon.svg`" alt="아이콘"></span>
              <h2>1:1 문의하기</h2>
            </div>
            <p>궁금한 내용을 남겨주시면, 자세히 답변 드립니다.<br>주말, 공휴일 문의 가능</p>
          </div>
        <!-- </a> -->
      </div>
    </div>
    <div class="my_inquiry_list">
      <div class="title">
        <h1>최근 문의 내역</h1>
        <div class="more" @click="$router.push('/help/qnalist')">+ 전체보기
        </div>
      </div>
      <div class="list" v-if="isLogin">
        <ul>
          <li v-for="(list,idx) in qnaList" :key="idx" @click="onClickQna(list)">
            <!-- <a href="/help/qnalist"> -->
              <div class="content">
                <h2>{{list.content}}</h2> 
              </div>
              <p class="time">{{list.createdAtText}}</p>
            <!-- </a> -->
          </li>
        </ul>
        <div class="nonQnalist" v-if="qnaList.length < 1">등록된 문의 내역이 없습니다.</div>
      </div>
      <div class="nonLogin" v-else>
        <p>로그인 후 확인이 가능합니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    qnaList: Array,
    isLogin: Boolean,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    onClickQna(list) {
      this.$router.push({name: 'help-qnalist', params: {qnaId: list.id}})
    }
  }
}
</script>

<style lang='scss'>
  @import './css/oneOnOneQ.scss';
</style>