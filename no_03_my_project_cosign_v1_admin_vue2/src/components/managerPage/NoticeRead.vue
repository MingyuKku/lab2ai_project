<template>
  <div class="noticeRead_wrap">
    <div class="header">
      <h1>공지사항</h1>
    </div>
    <div class="content">
      <div class="table_wrap">
        <table>
          <tr>
            <td class="td_tit">제목</td>
            <td class="td_tit_cont">{{ readContent.title }}</td>
          </tr>
          <tr>
            <td class="td_tit">등록일</td>
            <td>{{ readContent.createdAtText }}</td>
          </tr>
          <tr class="cont">
            <td colspan="2">
              <div class="viewer_wrap">
                <Viewer v-if="readContent.content !== undefined"
                  :initialValue="readContent.content"
                />
              </div>
              <div class="attach" v-if="isAttach">
                <div class="list" v-for="(file,idx) in readContent.noticeFileData" :key="idx">
                  <h2>첨부파일: </h2>
                  <p><a :href="file.fileLink" download>{{ file.fileName }}</a></p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="buttons clearFix">
        <button type="button" @click="$router.push(`/manager/notice/${$route.params.pageId}/notice_update`)">수정</button>
        <button type="button" @click="deleteFaq">삭제</button>
      </div>
      <button type="button" @click="$router.push({name: 'Notice', params: {page: $route.params.page} })">목록</button>
    </div>
  </div>
</template>

<script>
import { Viewer } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { api_postNoticeRead_admin } from '@/api/manager'
export default {
  components: {Viewer},
  data() {
    return {
      readContent: {}
    }
  },
  mounted() {
    this.readFaqDetail()
  },
  computed: {
    isAttach() {
      if(this.readContent.noticeFileData?.length > 0) return true;
      else return false;
    }
  },
  methods: {
    async readFaqDetail() {
      await api_postNoticeRead_admin(this.$route.params.pageId)
      .then(res=> {
        console.log('notice read',res)
        this.readContent = res.data;
        // this.readContent.createdAtText = new Date(res.data.createdAt).format('yyyy-MM-dd HH:mm:ss')
        this.readContent.createdAtText = Date.parseUtcText(res.data.createdAt).format('yyyy-MM-dd HH:mm:ss');
      })
      .catch(err=> { console.log(err) })
    },
    deleteFaq() {
      this.$emit('openModal', true, 0, 'notice')
    },
    // downloadFiles(link) {
    //   console.log('e',event.target)
    //   event.target.setAttribute('href', link)
    //   event.target.setAttribute('download', 'ddd')
    //   event.target.click();
    // }
  }
}
</script>

<style lang='scss'>
  @import './css/noticeRead.scss';
</style>