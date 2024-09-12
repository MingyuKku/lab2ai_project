<template>
  <div class="faqRead_wrap">
    <div class="header">
      <h1>자주 묻는 질문</h1>
    </div>
    <div class="content">
      <div class="table_wrap">
        <table>
          <tr>
            <td class="td_tit">카테고리</td>
            <td>{{ readContent.category }}</td>
          </tr>
          <tr>
            <td class="td_tit">질문</td>
            <td class="td_tit_cont">{{ readContent.title }}</td>
          </tr>
          <tr class="cont">
            <td colspan="2" class="td_viewer">
              <div class="viewer_wrap">
                <Viewer v-if="readContent.content !== undefined"
                  :initialValue="readContent.content"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="buttons clearFix">
        <button type="button" @click="$router.push(`/manager/faq/${$route.params.pageId}/faq_update`)">수정</button>
        <button type="button" @click="deleteFaq">삭제</button>
      </div>
      <button type="button" @click="$router.push({name: 'Faq', params: {page: $route.params.page} })">목록</button>
    </div>
  </div>
</template>

<script>
import { Viewer } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { api_postFaqRead_admin } from '@/api/manager'
export default {
  components: {Viewer},
  data() {
    return {
      readContent: {},
    }
  },
  mounted() {
    this.readFaqDetail()
  },
  methods: {
    async readFaqDetail() {
      await api_postFaqRead_admin(this.$route.params.pageId)
      .then(res=> {
        console.log('faq read',res)
        this.readContent = res.data;
      })
      .catch(err=> { console.log(err) })
    },
    deleteFaq() {
      this.$emit('openModal', true, 0, 'faq')
    }
    
  }
}
</script>

<style lang='scss'>
  @import './css/faqRead.scss';
</style>