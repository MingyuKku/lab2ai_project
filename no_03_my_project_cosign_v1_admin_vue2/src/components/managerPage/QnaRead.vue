<template>
  <div class="qnaRead_wrap">
    <div class="header">
      <h1>1:1 문의</h1>
    </div>
    <div class="content">
      <div class="table_wrap">
        <table>
          <tr>
            <td class="td_tit">구분</td>
            <td>{{ readCont.member }}</td>
          </tr>
          <tr>
            <td class="td_tit">이메일</td>
            <td colspan="3">{{ readCont.email }}</td>
          </tr>
          <tr>
            <td class="td_tit">등록일</td>
            <td>{{ readCont.createdAtText }}</td>
          </tr>
          <tr class="content">
            <td colspan="2">
              <div class="cont">
                <Viewer class="viewer" v-if="readCont.content"
                  :initialValue="readCont.content"
                />
              </div> 
              <div class="attach" v-if="isAttach">
                <div class="list" v-for="(file,idx) in readCont.siteInquiryFile" :key="idx">
                  <h2>첨부파일: </h2>
                  <p><a :href="file.fileLink" download>{{ file.fileName }}</a></p>
                </div>
              </div>
            </td>
          </tr>
          </table>

          <div class="editor_area" v-if="answerFlag || readCont.answerCk">
            <h2>관리자 답변</h2>
            <div class="toastEditor_wrap" v-if="!readCont.answerCk"
            :style="!readCont.answerCk ? {padding: '0'}:{padding: '14px'}">
              <Editor ref="toastEditor" class="toastEditor" :class="{focus: onEditorFocusFlag}"
                :initialValue="editorText"
                :options="editorOptions"
                initialEditType='wysiwyg'
                previewStyle='vertical'
                height='400px'
                @focus="onEditorFocus"
                @blur="onBlurEditor"
              />
            </div>
            <Viewer class="viewer" v-else
              :initialValue="readCont.answerInquiryData.content"
            />
          </div>
          <div class="registDate" v-if="readCont.answerCk">
            <p>답변등록시간</p>
            <div class="date">
              {{ readCont.answerAddTimeText }}
            </div>
          </div>
        
      </div>
      <div class="buttons clearFix" v-show="!answerFlag && !readCont.answerCk">
        <button type="button" @click="answerFlag = true">답변등록</button>
        <button type="button" @click="deleteQna">삭제</button>
      </div>

      <button type="button" class="regist" v-if="answerFlag && !readCont.answerCk" @click="submitAnswer">등록</button>
      <button type="button" class="list" v-else @click="$router.push({name: 'Qna',params: {page: $route.params.page}  })">목록</button>
      
    </div>
  </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

import { Viewer } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { api_postQnaRead_admin, api_postAnswerQna_admin, api_postAddEditFile_qna } from '@/api/manager'
export default {
  components: {
    Editor, Viewer,
  },
  data() {
    return {
      readCont: {},
      answerFlag: false,
      submitFlag: true,
      editorText: '내용을 입력해 주세요.',
      placeholder: '',
      translateImgUrl: [],
      editorOptions: {
        language: 'ko',
        useCommandShortcut: true,
        usageStatistics: true,
        hideModeSwitch: true,
        useDefaultHTMLSanitizer: true,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task',],
          ['table', 'image', 'link'],
          // ['code', 'codeblock'],
        ],
        hooks: {
          addImageBlobHook: this.addImageBlobHook
        }
      },
      onEditorFocusFlag: false,
    }
  },
  mounted() {
    this.readQnaDetail();
  },
  computed: {
    isAttach() {
      if(this.readCont.siteInquiryFile?.length > 0) return true;
      else return false;
    }
  },
  methods: {
    async addImageBlobHook(blob, callback) {
      let formData = new FormData();
      formData.append('file', blob);

      await api_postAddEditFile_qna(formData)
      .then(res => {
        if(res.data) {
          console.log('res',res.data)
          this.translateImgUrl.push(res.data);
          callback(res.data, '업로드이미지')
        }
      });
    },

    async readQnaDetail() {
      await api_postQnaRead_admin(this.$route.params.pageId)
      .then(res=> {
        console.log('qna list',res)
        if(res.data.answerCk) this.answerFlag = true;
        this.readCont = res.data;
        this.readCont.createdAtText = Date.parseUtcText(res.data.createdAt).format('yyyy-MM-dd HH:mm'),
        this.readCont.answerAddTimeText = (res.data.answerInquiryData !== null) ?
        Date.parseUtcText(res.data.answerInquiryData.answerAddTime).format('yyyy-MM-dd HH:mm:ss'):null
      })
      .catch(err=> { console.log(err) })
    },
    aTagTargetBlank(str) {
      const expUrl = /<a.*?href="([^"]*)"[^>]*>/gi;

      str = str.replace(expUrl, '$& target="_blank"')
      str = str.replace(/"> target="_blank"/gi, '" target="_blank">')

      return str;
    },
    async submitAnswer() {
      if(this.submitFlag) {
        this.submitFlag = false;

        let getHtml = this.$refs.toastEditor.invoke('getHTML');
        getHtml = this.aTagTargetBlank(getHtml)

        let submitTime = Date.toUtcText(new Date()).format('yyyy-MM-ddTHH:mm:ss');
        
        let params = {
          inquiryId: this.$route.params.pageId,
          email: this.readCont.email,
          member: this.readCont.member,
          userContent: this.readCont.content,
          userAddDateTime: this.readCont.createdAt,
          content: getHtml,
          addDateTime: submitTime,
          editorFile: this.translateImgUrl,
        }

        await api_postAnswerQna_admin(params)
        .then(res=> {
          console.log(res)
          this.$router.go(0);
          this.submitFlag = true;
        })
        .catch(err=> {
          console.log(err)
          this.submitFlag = true;
        })
      }
    },
    deleteQna() {
      this.$emit('openModal', true, 0, 'qna')
    },
    onEditorFocus() {
      let editor = this.$refs.toastEditor
      let placeholder = '<p>내용을 입력해 주세요.</p>';
      if(editor.invoke('getHTML') === placeholder) {
        editor.invoke('setHTML', '')
      }
      this.onEditorFocusFlag = true;
    },
    onBlurEditor() {
      this.onEditorFocusFlag = false;
    }
  }
}
</script>

<style lang='scss'>
  @import './css/qnaRead.scss';
</style>