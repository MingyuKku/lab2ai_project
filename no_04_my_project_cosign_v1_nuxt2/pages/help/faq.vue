<template>
  <div class="routeOftenQNA_wrap">
    <div class="header">
      <div class="title">
        <h1>자주 묻는 질문
          <span class="icon"><img :src="`${$static.imgUrl}serviceCenter/faqTitle_icon.svg`" alt="아이콘"></span>
        </h1>
        <div class="search_keyword clearFix">
          <input type="text" placeholder="검색어를 입력하세요." v-model="keyword" @keyup.enter="searchKeyword">
          <span class="search_icon" @click="searchKeyword"><i class="xi-search"></i></span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="category">
        <div class="list" v-for="(category,idx) in defaultCategory" :key="idx"
          :class="{active: activeCategory===category.params, nonClick: keyword !== ''}"
          @click="onClickCategory(category.params)"
        >
          <div class="iconImg">
            <img :class="{active: activeCategory===category.params}" :src="`${$static.imgUrl}serviceCenter/${category.icon}_color.svg`" alt="아이콘이미지">
            <img :src="`${$static.imgUrl}serviceCenter/${category.icon}.svg`" alt="아이콘이미지">
          </div>
          <h1>{{category.tit}}</h1>
        </div>
      </div>
      <div class="question_list" ref="question_list">
        <div class="filter clearFix">
          <div class="select_wrap">
            <select v-model="filter">
              <option value="latest">최신순</option>
              <option value="views">조회순</option>
            </select>
            <i class="xi-angle-down"></i>
          </div>
        </div>
        <!-- <div class="list_wrap" :style="{minHeight: `${question_list.length * 54}px`}"> -->
        <div class="list_wrap">
          <div class="list" v-for="(list,idx) in question_list" :key="idx">
            <div class="clickContent" :class="{show: activeIndex === idx}"
              @click="onClickContent(idx)">
              <div class="content">
                <h2><span>Q. </span>[{{list.category}}] {{list.title}}</h2>
              </div>
              <p class="accordion_btn"><i class="xi-angle-down"></i></p>
            </div>
            <!-- v-html="list.content" -->
            <div class="accordionContent" ref="accordionContent"
              :class="{show: activeIndex === idx}"
              :style="{height: (activeIndex === idx) ? `${contentHeight}px`:'0px'}"          
            >
              <div class="viewer">
                <div class="toastui-editor-contents" v-html="list.content"></div>
              </div>
              <!-- <client-only>
                <TuiViewer class="viewer" v-if="question_list[idx].content"
                  :initialValue="list.content"
                />
                <template #placeholder>
                  <div class="loading_ui">
                    <p>렌더링중입니다</p>
                  </div>
                </template>
              </client-only> -->
            </div>
          </div>
        </div>
        
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
</template>

<script>
import { mapActions } from 'vuex';
export default {
  layout: 'serviceCenter',
  async fetch() {
    if(this.$route.params.faqId !== undefined) { //고객센터메인에서 접근할 때
      await this.openAccordion(this.$route.params);
    } else if(this.$route.params.keyword !== undefined) {//검색기능으로 접근시
      this.keyword = this.$route.params.keyword;
      await this.keywordFaqList(this.$route.params.keyword);
    } else {
      await this.setFaqList();
    }
  },
  data() {
    return {
      isFetch: false,
      keyword: '',
      activeIndex: null,
      contentHeight: 0,
      page: 1,
      totalPages: 0,
      filter: 'latest',
      activeCategory: null,
      defaultCategory: [
        {icon: 'faqIcon_category_service', tit: '서비스 이용', params: '서비스이용'},
        {icon: 'faqIcon_category_account', tit: '계정', params: '계정'},
        {icon: 'faqIcon_category_payment', tit: '결제', params: '결제'},
        {icon: 'faqIcon_category_alliance', tit: '제휴', params: '제휴'},
      ],
      question_list: [],
    }
  },
  mounted() {
    this.hideHeader(false);
    window.addEventListener('click', this.clickOtherArea)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.clickOtherArea)
  },
  watch: {
    async filter(val) {
      if(this.keyword !== '') {

        let tmpList = await this.resetQuestionList();

        if(val === 'views') this.question_list = tmpList.sort((a,b) => b.count - a.count)
        else if(val === 'latest') this.question_list = tmpList.sort((a,b) => Date.parseUtcText(b.createdAt).valueOf() - Date.parseUtcText(a.createdAt).valueOf())
        return;
      }

      if(this.activeCategory === null) {
        this.setFaqList();
      } else this.setCategoryFaqList(this.activeCategory);
    },
  },
  methods: {
    ...mapActions('signStore', ['hideHeader']),
    resetQuestionList() {
      let tmpList = [...this.question_list];
      this.question_list = [];
      return tmpList;
    },

    async onClickContent(idx) {
      if(this.activeIndex === idx) return this.activeIndex = null;
      this.activeIndex = idx;
      let accordionContent = this.$refs.accordionContent;
      this.contentHeight = accordionContent[idx].scrollHeight

      const params = {id: this.question_list[idx].id}
      await this.$axios.post('/help/faq/increase_question', params.getParam(), {withCredentials: true})
    },
    async setFaqList() {
      this.question_list = [];

      if(this.filter === 'latest') {
        const res = await this.$axios.get('/help/faq/latest_question_list', {params: {page: this.page - 1}})
        this.totalPages = res.data.totalPages;
        this.question_list = res.data.content;

      } else if(this.filter === 'views') {
        const res = await this.$axios.get('/help/faq/views_question_list', {params: {page: this.page - 1}})
        this.totalPages = res.data.totalPages;
        this.question_list = res.data.content;
      }
    },
    onClickPage(no) {
      this.hideHeader(false);
      this.activeIndex = null,
      this.page = no;
      if(this.keyword) {
        this.keywordFaqList(this.keyword)
      } else if(this.activeCategory === null) {
        this.setFaqList();
      } else {
        this.setCategoryFaqList(this.activeCategory);
      }
    },
    onClickCategory(category) {
      if(this.activeCategory === category) return;
      this.activeIndex = null;
      this.activeCategory = category;
      this.page = 1;
      this.setCategoryFaqList(this.activeCategory);
    },
    async setCategoryFaqList(category) {
      this.question_list = [];
      if(this.filter === 'latest') {
        const res = await this.$axios.get('help/faq/category_latest_question_list', {params: {category : category, page: this.page - 1}})
        this.totalPages = res.data.totalPages;
        this.question_list = res.data.content;

      } else if(this.filter === 'views') {
        const res = await this.$axios.get('help/faq/category_views_question_list', {params: {category : category, page: this.page - 1}})
        this.totalPages = res.data.totalPages;
        this.question_list = res.data.content;
      }
    },
    clickOtherArea(e) {
      if(this.activeIndex !== null) {
        let flag = e.target.closest('.list')
        if(!flag) this.activeIndex = null;
      }
    },
    async openAccordion(params) {
      this.filter = 'views';
      this.activeCategory = params.category;
      await this.setCategoryFaqList(this.activeCategory)
      this.activeIndex = this.question_list.findIndex(cont=> cont.id === params.faqId*1);
      let accordionContent = this.$refs.accordionContent;
      this.contentHeight = accordionContent[this.activeIndex].scrollHeight
    },
    async keywordFaqList(keyword) {
      this.question_list = [];
      this.activeCategory = null;
      const params = {keyword: keyword, page: this.page - 1}
      const res = await this.$axios.post('/help/faq/search_keyword_question', params.getParam(), {withCredentials: true})
      this.totalPages = res.data.totalPages;
      this.question_list = res.data.content;
    },
    searchKeyword() {
      if(this.keyword !== '') {
        this.page = 1;
        this.keywordFaqList(this.keyword)
      } else alert('검색어를 입력하세요'); return;
    }
  }
}
</script>

<style lang='scss'>
  @import '@/src/css/serviceCenter/routeOftenQNA.scss';
</style>