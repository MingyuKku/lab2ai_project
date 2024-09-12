<template>
  <div class="faq_wrap">
    <div class="header">
      <h1>자주 묻는 질문</h1>
    </div>
    <div class="content" v-if="faqList.length > 0">
      <div class="filter clearFix">
        <div class="select_wrap">
          <select v-model="selectFilter" @change="changeSelect">
            <option :value="data.code" v-for="data in filter" :key="data.code">
              {{ data.name }}
            </option>
          </select>
          <i class="xi-angle-down"></i>
        </div>
      </div>
      <div class="faq_table">
        <div class="table_title">
          <div class="category">카테고리</div>
          <div class="tit">제목</div>
          <div class="registDate">등록일시</div>
          <div class="views">조회수</div>
        </div>
        <div class="table_list">
          <ul>
            <li v-for="list in faqList" :key="list.id"
              @click="$router.push({name: 'FaqRead', params: {pageId: list.id, page: page} })">
              <!-- <a :href="`/manager/faq/${list.id}`"> -->
              <div class="list_category">{{list.category}}</div>
              <div class="list_tit">
                {{list.title}}
              </div>
              <div class="list_time">{{list.createdAtText}}</div>
              <div class="list_views">{{list.count}}</div>
              <!-- </a> -->
            </li>
          </ul>
        </div>  
      </div>
      <div class="registQuestion clearFix">
        <button type="button" @click="$router.push('/manager/faq_regist')">자주 묻는 질문 등록</button>
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
        <h2>자주 묻는 질문 리스트가 존재하지 않습니다</h2>
        <p>질문을 등록해 보세요</p>
        <div class="registQuestion">
          <button type="button" @click="$router.push('/manager/faq_regist')">자주 묻는 질문 등록</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { api_postLatestFaqList_admin, api_postViewsFaqList_admin } from '@/api/manager';
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      totalPages: 0,
      page: 1,
      faqList: [],
      selectFilter: null,
      filterIndex: 0,
      filter: [
        {
          code: 'latest', 
          name: '최신순', 
          api: api_postLatestFaqList_admin
        },
        {
          code: 'views', 
          name: '조회순', 
          api: api_postViewsFaqList_admin
        },
      ]
    }
  },
  mounted() {
    this.selectFilter = this.filter[this.filterIndex].code; // mounted시에 첫 페이지 필터셋팅
    this.setPage(this.$route.params.page);  // faq상세페이지에 접속 후 faq목록으로 돌아갈 때 page위치 기억하기 위해
    this.setFaqList(this.filter[this.filterIndex], this.page);
  },
  methods: {
    setPage(page) {
      if(page !== undefined) this.page = page;
    },
    changeSelect() {
      const findFilterIndex = this.filter.findIndex(data => data.code === this.selectFilter);
      this.filterIndex = findFilterIndex;
      this.setFaqList(this.filter[this.filterIndex], this.page);
    },
    async setFaqList(filter, page) {
      try {
        const res = await filter.api(page - 1);
        console.log('faq list', filter.name, res)
        if(res.data.content.length > 0) {
          this.faqList = res.data.content.map(d=> ({
            ...d,
            // createdAtText: new Date(d.createdAt).format('yyyy-MM-dd HH:mm:ss'),
            createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd HH:mm:ss'),
          }))
          this.totalPages = res.data.totalPages;  
        }

      } catch(err) { console.log(err) }
    },
    onClickPage(no) {
      this.page = no;
      this.setFaqList(this.filter[this.filterIndex], this.page);
    },
  }
}
</script>

<style lang='scss'>
  @import './css/faq.scss';
</style>