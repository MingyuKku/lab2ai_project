<template>
  <div class="faqRegist_wrap">
    <div class="header">
      <h1>자주 묻는 질문 등록</h1>
    </div>
    <div class="content">
      <div class="inner">
        <div class="category">
          <h2>카테고리</h2>
          <div class="select_wrap">
            <select v-model="selectCategory" @change="changeSelect">
              <option :value="data" v-for="data in category" :key="data">{{ data }}</option>
            </select>
            <i class="xi-angle-down"></i>
          </div>
          <span v-if="error.category"><i class="xi-error-o"></i>카테고리를 선택해 주세요.</span>
        </div>
        <div class="question">
          <h2>질문</h2>
          <input type="text" placeholder="질문을 입력하세요" v-model="title">
          <span v-if="error.title"><i class="xi-error-o"></i>질문을 입력해 주세요.</span>
        </div>

        <div class="inquiryContent">
          <h2>문의내용</h2>
          <div class="toastEditor_wrap">
            <Editor ref="toastEditor" class="toastEditor" v-if="editorText !== ''"
              :initialValue="editorText"
              :options="editorOptions"
              initialEditType='wysiwyg'
              previewStyle='vertical'
              height='400px'
            />
          </div>
          <span v-if="error.content"><i class="xi-error-o"></i>내용을 입력해 주세요.</span>
        </div>
      </div>

      <button type="button" @click="submitFaqData">등록</button>
    </div>
    
  </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

import { api_postFaqRead_admin, api_postUpdateFaq_admin, api_postAddEditFile_faq } from '@/api/manager'

export default {
  components: {
    Editor,
    // Viewer,
  },
  data() {
    return {
      selectCategory: null,
      categoryIdx: 0,
      category: [
        '선택',
        '서비스이용',
        '계정',
        '결제',
        '제휴',
      ],
      title: '',
      error: {
        category: false,
        title: false,
        content: false,
      },
      translateImgUrl: [],
      submitFlag: true,
      editorText: '',
      editorOptions: {
        language: 'ko',
        useCommandShortcut: true,
        usageStatistics: true,
        hideModeSwitch: true,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task',],
          ['table', 'image', 'link'],
          // ['code', 'codeblock'],
          // ['scrollSync'],
        ],
        hooks: {
          addImageBlobHook: this.addImageBlobHook
        }
      },
    }
  },
  mounted() {
    this.getFaqDetail();
  },
  computed: {
  },
  methods: {
    async addImageBlobHook(blob, callback) {
      let formData = new FormData();
      formData.append('file', blob);

      await api_postAddEditFile_faq(formData)
      .then(res => {
        if(res.data) {
          console.log('res',res.data)
          this.translateImgUrl.push(res.data);
          callback(res.data, '업로드이미지')
        }
      });
    },

    async getFaqDetail() {
      await api_postFaqRead_admin(this.$route.params.pageId)
      .then(res=> {
        console.log('faq detail',res);
        this.selectCategory = res.data.category;
        this.categoryIdx = this.category.findIndex(data => data === res.data.category);
        this.title = res.data.title;
        this.editorText = res.data.content;
      })
      .catch(err=> { console.log(err) })
    },
    aTagTargetBlank(str) {
      const expUrl = /<a.*?href="([^"]*)"[^>]*>/gi;

      str = str.replace(expUrl, '$& target="_blank"')
      str = str.replace(/"> target="_blank"/gi, '" target="_blank">')

      return str;
    },
    async submitFaqData() {
      if(this.submitFlag) {
        this.submitFlag = false;

        let getHtml = this.$refs.toastEditor.invoke('getHTML');
        getHtml = this.aTagTargetBlank(getHtml)

        this.resetError();
        if(this.checkSubmit(getHtml)) return this.submitFlag = true;

        let submit = {
          id: this.$route.params.pageId,
          title: this.title,
          category: this.selectCategory,
          content: getHtml,
        }

        await api_postUpdateFaq_admin(submit)
        .then(res=> {
          console.log('faq update',res)
          this.$router.push(`/manager/faq/${this.$route.params.pageId}`)
          this.submitFlag = true;
        })
        .catch(err=> {
          console.log(err)
          this.submitFlag = true
        })
      }
    },
    changeSelect() {
      const categoryindex = this.category.findIndex(data => data === this.selectCategory)
      this.categoryIdx = categoryindex;
    },
    resetError() {
      this.error = {
        category: false,
        title: false,
        content: false,
      }
    },
    checkSubmit(getHtml) {
      if(!this.categoryIdx) {
        this.error.category = true; return true;
      } else if(this.title === '') {
        this.error.title = true; return true;
      } else if(getHtml === '') {
        this.error.content = true; return true;
      } else {
        return false;
      }
    },
  }
}
</script>

<style lang='scss'>
  @import './css/faqRegist.scss';
</style>