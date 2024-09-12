<template>
  <div class="routeNoticeRead_wrap">
    <div class="header">
      <h1>공지사항</h1>
    </div>
    <div class="inner">
      <div class="content_wrap">
        <div class="title">
          <h1>{{ content.title }}</h1>
          <p>{{ content.createdAtText }}</p>
        </div>
        <div class="content">
          <div class="viewer">
            <div class="toastui-editor-contents" v-html="content.content"></div>
          </div>
          <!-- <client-only>
            <TuiViewer class="viewer" v-if="content.content"
              :initialValue="content.content"
            />
            <template #placeholder>
              <div class="loading_ui">
                <p>렌더링중입니다</p>
              </div>
            </template>
          </client-only> -->
          
        </div>
        <div class="attach" v-if="isAttach">
          <div class="list" v-for="(file,idx) in content.noticeFileData" :key="idx">
            <h2>첨부파일: </h2>
            <p><a :href="file.fileLink" download>{{ file.fileName }}</a></p>
          </div>
        </div>
      </div>
      
      <button type="button" class="goBackList" @click="$router.push({name: 'help-notice',params: {page: $route.params.page} })">목록</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  layout: 'serviceCenter',
  data() {
    return {
      content: {},
    }
  },
  async fetch() {
    await this.readContent();
  },
  mounted() {
    this.hideHeader(false);
  },
  computed: {
    isAttach() {
      if(this.content.noticeFileData?.length > 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions('signStore', ['hideHeader']),
    async readContent() {
      const res = await this.$axios.get('/help/notice/get_notice', {params: {id: this.$route.params.pageId}})
      this.content = res.data;
      this.content.createdAtText = Date.parseUtcText(res.data.createdAt).format('yyyy-MM-dd HH:mm:ss')
    }
  }
}
</script>

<style lang='scss'>
  @import '@/src/css/serviceCenter/routeNoticeRead.scss';
</style>