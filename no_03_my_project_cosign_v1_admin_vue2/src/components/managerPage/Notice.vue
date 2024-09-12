<template>
  <div class="notice_wrap">
    <div class="header">
      <h1>공지사항</h1>
    </div>
    <div class="content" v-if="noticeList.length > 0">
      <div class="notice_table">
        <div class="table_title">
          <div class="no">번호</div>
          <div class="tit">제목</div>
          <div class="registDate">등록일</div>
        </div>
        <div class="table_list">
          <ul>
            <li v-for="(list,idx) in noticeList" :key="idx"
              @click="$router.push({name: 'NoticeRead', params: {pageId: list.id, page: page} })">
              <!-- <a :href="`/manager/notice/${list.id}`"> -->
              <div class="list_no">{{list.no}}</div>
              <div class="list_tit">
                {{list.title}}
              </div>
              <div class="list_time">{{list.createdAtText}}</div>
              <!-- </a> -->
            </li>
          </ul>
        </div>  
      </div>
      <div class="registNotice clearFix">
        <button type="button" @click="$router.push('/manager/notice_regist')">공지사항 등록</button>
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
        <h2>공지사항 리스트가 존재하지 않습니다</h2>
        <p>공지사항을 등록해 보세요</p>
        <div class="registNotice">
          <button type="button" @click="$router.push('/manager/notice_regist')">공지사항 등록</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { api_postNoticeList_admin } from '@/api/manager'
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      totalPages: 0,
      page: 1,
      noticeList: [],
    }
  },
  mounted() {
    this.setPage(this.$route.params.page) // notice상세페이지에 접속 후 notice목록으로 돌아갈 때 page위치 기억하기 위해
    this.setNoticeList(this.page)
  },
  methods: {
    setPage(page) {
      if(page !== undefined) this.page = page;
    },
    async setNoticeList(page) {
      await api_postNoticeList_admin(page - 1)
      .then(res=> {
        console.log('notice list',res)
        this.noticeList = res.data.content.map((d,idx)=> ({
          ...d,
          no: (res.data.totalElements - res.data.number*res.data.size) - idx,
          // createdAtText: new Date(d.createdAt).format('yyyy-MM-dd'),
          createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd'),
        }))
        this.totalPages = res.data.totalPages;
      })
      .catch(err=> { console.log(err) })
    },
    onClickPage(no) {
      this.page = no;
      this.setNoticeList(this.page);
    },
  }
}
</script>

<style lang='scss'>
  @import './css/notice.scss';
</style>