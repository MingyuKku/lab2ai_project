<template>
  <div class="routeMyQuestion_wrap">
    <div class="header">
      <h1>문의 내역</h1>
    </div>
    <div class="loginUser" v-if="loginInfo !== null">
      <div class="inner" :class="{show: !loading}">
        <div class="list" v-for="(list,idx) in myQuestions" :key="idx">
          <div class="clickContent" @click="onClickContent(idx)" :class="{show: activeIndex === idx}">
            <p class="tit"><span>Q. </span>{{list.content}}</p>
            <p class="time">{{list.createAtText}}</p>
            <p class="ck yes" v-if="list.answerCk === true">답변완료</p>
            <p class="ck no" v-else>답변대기</p>
            <p class="accordion_btn"><i class="xi-angle-down"></i></p>
          </div>
          <div class="accordionContent" ref="accordionContent"
            :class="{show: activeIndex === idx}"
            :style="{height: (activeIndex === idx) ? `${contentHeight}px`:'0px'}"
          >
            <div class="viewer_wrap">
              <div class="viewer qnaViewer">
                <div class="toastui-editor-contents" v-html="list.content"></div>
              </div>
              <!-- <client-only placeholder="Loading...">
                <TuiViewer class="viewer qnaViewer" v-if="list.content"
                  :initialValue="list.content"
                />
              </client-only> -->
              <client-only placeholder="Loading..." v-if="list.answerInquiryData">
                <TuiViewer class="viewer anwViewer" v-if="list.answerInquiryData"
                  :initialValue="list.answerInquiryData.content"
                />
              </client-only>
              <div class="nonAnswer" v-else>
                <p>답변을 기다리고 있습니다.</p>
              </div>
            </div>

            <div class="attachFiles" v-for="(file,i) in list.siteInquiryFile" :key="i">
              <h2>첨부파일: </h2>
              <p><a :href="file.fileLink" download>{{ file.fileName }}</a></p>
            </div>
          </div>
        </div>
        <div class="nonList" v-if="myQuestions.length < 1">
          <p>등록된 문의내역이 없습니다</p>
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
    <div class="nonlogin" v-else>
      <div class="inner">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  layout: 'serviceCenter',
  data() {
    return {
      loading: false,
      activeIndex: null,
      contentHeight: 0,
      page: 1,
      totalPages: 0,
      myQuestions: [],
    }
  },
  async fetch() {
    if(this.loginInfo) {
      if(this.$route.params.qnaId !== undefined) { //고객센터메인에서 접근할 때
        await this.openAccordion(this.$route.params.qnaId);
      } else {
        await this.setMyQnaList();
      }
    }
  },
  mounted() {
    this.hideHeader(false);
    if(this.loginInfo) window.addEventListener('click', this.clickOtherArea);
    else this.$emit('openModal', true, 3);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.clickOtherArea)
  },
  watch: {
    loginInfo(val) {
      if(val !== null) {
        this.$router.go(0)
        this.setMyQnaList();
      }
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
  },
  methods: {
    ...mapActions('signStore', ['hideHeader']),
    onClickContent(idx) {
      if(this.activeIndex === idx) return this.activeIndex = null;
      this.activeIndex = idx;
      let accordionContent = this.$refs.accordionContent;
      this.contentHeight = accordionContent[idx].scrollHeight
    },
    async setMyQnaList() {
      this.loading = true;
      this.myQuestions = [];
      const params = {'page': this.page - 1};
      const res = await this.$intApi.post('/help/qna/inquiry_in_file_list', params.getParam(), {withCredentials: true})
      this.totalPages = res.data.data.inquiry.totalPages;
      this.myQuestions = res.data.data.inquiry.content.map(d=> ({
        ...d,
        createAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd'),
      }));
      this.loading = false;
    },
    onClickPage(no) {
      this.page = no;
      this.setMyQnaList();
    },
    clickOtherArea(e) {
      if(this.activeIndex !== null) {
        let flag = e.target.closest('.list')
        if(!flag) this.activeIndex = null;
      }
    },
    async openAccordion(id) {
      await this.setMyQnaList()
      this.activeIndex = this.myQuestions.findIndex(que=> que.id === id*1);
      
      this.$nextTick(()=> {
        let accordionContent = this.$refs.accordionContent;
        this.contentHeight = accordionContent[this.activeIndex].scrollHeight
      })
    },
  }
}
</script>

<style lang='scss'>
  @import '@/src/css/serviceCenter/routeMyQuestion.scss';
</style>