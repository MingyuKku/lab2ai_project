<template>
<!-- <transition name="fade2"> -->
  <div class="routeNotice_wrap">
    <div class="header">
      <h1>공지사항</h1>
    </div>
    <div class="content">
      <div class="notice_table">
        <div class="table_title">
          <div class="no">번호</div>
          <div class="tit">제목</div>
          <div class="registDate">등록일</div>
        </div>
        <div class="table_list">
          <!-- <CustomLoading :apiLoading="apiLoading" @load="loading = true" /> -->
          <ul :class="{itList: noticeList.length > 5, show: !loading}">
            <li v-for="(list,idx) in noticeList" :key="idx"
              @click="$router.push({name: 'help-notice-pageId', params: {pageId: list.id, page: page} })">
              <div class="inner" v-if="!list.desc">
                <div class="list_no">{{list.no}}</div>
                <div class="list_tit">
                  {{list.title}}
                </div>
                <div class="list_time">{{list.createAtText}}</div>
              </div>
              <div class="nonNotice" v-else>{{ list.desc }}</div>
            </li>
          </ul>
        </div>  
      </div>

      <div class="pagination_wrap">
        <client-only placeholder="Loading...">
          <VuePaginate :containerClass="'pagination_qna'" :pageClass="'page_num'"
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
          ></VuePaginate>
        </client-only>
      </div>
    </div>
    
  </div>
  <!-- </transition> -->
</template>

<script>
// import CustomLoading from '@/src/components/common/CustomLoading'
import { mapActions } from 'vuex';
export default {
  layout: 'serviceCenter',
  // components: {
  //   CustomLoading
  // },
  data() {
    return {
      loading: false,
      totalPages: 0,
      page: 1,
      noticeList: []
    }
  },
  async fetch() {
    await this.setPage(this.$route.params.page)
    await this.setNoticeList();
  },
  mounted() {
    this.hideHeader(false);
  },
  methods: {
    ...mapActions('signStore', ['hideHeader']),
    setPage(page) {
      if(page !== undefined) this.page = page;
    },
    async setNoticeList() {
      this.loading = true;
      const res = await this.$axios.get('/help/notice/contraction_notice', {params: {page: this.page - 1}})

      this.totalPages = res.data.totalPages;
      this.noticeList = (res.data.content.length > 0) ? res.data.content.map((cont,idx)=> ({
        ...cont,
        no: (res.data.totalElements - res.data.number*res.data.size) - idx,
        createAtText: Date.parseUtcText(cont.createdAt).format('yyyy-MM-dd')
      })) : [{desc: '등록된 공지사항이 없습니다'}];
      
      this.loading = false;
    },
    onClickPage(no) {
      this.hideHeader(false);
      this.page = no;
      this.setNoticeList();
    },
  }
}
</script>

<style lang='scss'>
  @import '@/src/css/serviceCenter/routeNotice.scss';
</style>