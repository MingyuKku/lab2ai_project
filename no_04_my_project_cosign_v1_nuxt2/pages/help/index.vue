<template>
  <div class="routeServiceIndex_wrap">
    <div class="header">
      <div class="title">
        <h1>궁금한 내용을 검색해보세요
          <span class="icon"><img :src="`${$static.imgUrl}serviceCenter/faqTitle_icon.svg`" alt="아이콘"></span>
        </h1>
        <div class="search_keyword clearFix">
          <input type="text" placeholder="검색어를 입력하세요." v-model="keyword" @keyup.enter="searchKeyword">
          <span class="search_icon" @click="searchKeyword"><i class="xi-search"></i></span>
        </div>
      </div>
    </div>
     <div class="content">
       <OftenQNA :faqList="faqList" />
       <Notice :NoticeList="NoticeList" />
       <OneOnOneQ :qnaList="qnaList" :isLogin="loginInfo !== null" />
     </div>
  </div>
</template>

<script>
import OftenQNA from '@/src/components/serviceCenter/OftenQNA';
import Notice from '@/src/components/serviceCenter/Notice';
import OneOnOneQ from '@/src/components/serviceCenter/OneOnOneQ';

// import {api_getIndexFaqList, api_getIndexNotice, api_postIndexMyQna, } from '@/api/help';
import { mapActions, mapGetters } from 'vuex';
export default {
  layout: 'serviceCenter',
  components: {
    OftenQNA,
    Notice,
    OneOnOneQ
  },
  async asyncData({$axios,$intApi, store}) {

    let faqList = [];
    let NoticeList = [];
    let qnaList = [];

    try {
      const res_faq = await $axios.get('/help/faq/limit_question_list');
      faqList = (res_faq.data) ? res_faq.data.content : [];

      const res_notice = await $axios.get('/help/notice/top3_contraction_notice');
      NoticeList = (res_notice.data) ? res_notice.data.content.map(d=> ({
        ...d,
        createAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd'),
      })) : [{noList: '등록된 공지사항이 없습니다'}];

      const isLogin = store.state.loginStore.login_info
      if(isLogin) {
        const res_qna = await $intApi.post('/help/qna/limited_inquiry_in_file_list', {}, {withCredentials: true});
        qnaList = (res_qna.data.data.inquiry.content.length > 0) ? res_qna.data.data.inquiry.content.map(d=> ({
          ...d,
          createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd'),
        })) : [];
      }

    } catch(err) {
      console.log(err)
    }

    return { 
      faqList, 
      NoticeList,
      qnaList 
    } 
  },
  data() {
    return {
      keyword: '',
    }
  },
  mounted() {
    this.hideHeader(false);
  },
  watch: {
    loginInfo(val) {
      if(val !== null) {
        this.setQnaData();
      }
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
  },
  methods: {
    ...mapActions('signStore', ['hideHeader']),
    async setQnaData() {
      const res = await this.$intApi.post('/help/qna/limited_inquiry_in_file_list', {}, {withCredentials: true})
      this.qnaList = res.data.content.map(d=> ({
        ...d,
        createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd'),
      }))
    },
    async searchKeyword() {
      if(this.keyword !== '') {
        this.$router.push({name: 'help-faq', params: {keyword: this.keyword}})
      } else alert('검색어를 입력하세요'); return;
    }
  }
}
</script>

<style lang='scss'>
  @import "@/src/css/serviceCenter/index.scss";
</style>