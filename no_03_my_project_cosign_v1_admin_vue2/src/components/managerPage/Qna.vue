<template>
  <div class="qna_wrap">
    <div class="header">
      <h1>1:1 문의</h1>
    </div>
    <div class="content" v-if="qnaList.length > 0">
      <div class="qna_table">
        <div class="table_title">
          <div class="div">구분</div>
          <div class="email">이메일</div>
          <div class="tit">내용</div>
          <div class="date">등록일</div>
          <div class="answer">답변상태</div>
        </div>
        <div class="table_list">
          <ul>
            <li v-for="(list,idx) in qnaList" :key="idx"
              @click="$router.push({name: 'QnaRead', params: {pageId: list.id, page: page} })">
              <div class="list_isMember">{{list.member}}</div>
              <div class="list_email">{{list.email}}</div>
              <div class="list_tit">{{list.content}}</div>
              <div class="list_date">{{list.createdAtText}}</div>
              <div class="list_answer">
                <p class="true" v-if="list.answerCk">답변완료</p>
                <p class="false" v-else>답변대기</p>
              </div>
            </li>
          </ul>
        </div>  
      </div>

      <div class="pagination_wrap">
        <Paginate :containerClass="'pagination_qna'" :pageClass="'page_num'"
          v-model="page"
          :pageCount="totalPages"
          :pageRange='5'
          :marginPages='1'
          :clickHandler="onClickPage"
          :prevText="`<i class='xi-angle-left'></i>`"
          :nextText="`<i class='xi-angle-right'></i>`"
          :hidePrevNext='true'
          :prev-class="'nav prev'"
          :next-class="'nav next'"
        ></Paginate>
      </div>
    </div>
    <div class="nonContent" v-else>
      <div class="replace">
        <h2>1:1문의 리스트가 존재하지 않습니다</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { api_postQnaList_admin } from '@/api/manager'
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      totalPages: 0,
      page: 1,
      qnaList: []
    }
  },
  mounted() {
    this.setPage(this.$route.params.page);  // faq상세페이지에 접속 후 faq목록으로 돌아갈 때 page위치 기억하기 위해
    this.setQnaList(this.page);
  },
  methods: {
    setPage(page) {
      if(page !== undefined) this.page = page;
    },
    async setQnaList(page) {
      await api_postQnaList_admin(page - 1)
      .then(res=> {
        console.log('qna list',res)
        this.qnaList = res.data.content.map(d=> ({
          ...d,
          createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd'),
        }))
        this.totalPages = res.data.totalPages;
      })
      .catch(err=> { console.log(err) })
    },
    onClickPage(no) {
      this.page = no;
      this.setQnaList(this.page);
    },
  }
}
</script>

<style lang='scss'>
  @import './css/qna.scss';
</style>