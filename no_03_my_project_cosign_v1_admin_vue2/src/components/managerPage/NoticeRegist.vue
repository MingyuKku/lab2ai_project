<template>
  <div class="noticeRegist_wrap">
    <div class="header">
      <h1>공지사항 등록</h1>
    </div>
    <div class="content">
      <div class="inner">
        <div class="title">
          <h2>제목</h2>
          <input type="text" ref="tit_input" placeholder="제목을 입력하세요" v-model="title">
          <span v-if="error.title"><i class="xi-error-o"></i>제목을 입력해 주세요.</span>
        </div>

        <div class="noticeContent">
          <h2>내용</h2>
          <div class="toastEditor_wrap">
            <Editor ref="toastEditor" class="toastEditor" :class="{focus: onEditorFocusFlag}"
              :initialValue="editorText"
              :options="editorOptions"
              initialEditType='wysiwyg'
              previewStyle='vertical'
              height='400px'
              @focus="onFocusEditor"
              @blur="onBlurEditor"
            />
          </div>
          <span v-if="error.content"><i class="xi-error-o"></i>내용을 입력해 주세요.</span>
        </div>

        <div class="attachfile_area">
          <div class="title">
            <h2>첨부 파일</h2>
            <label for="uploadFile">파일 선택</label>
            <input type="file" id="uploadFile" ref="uploadFile" multiple="multiple" accept="image/jpg, image/jpeg, image/png"
            :disabled="checkFileSize || checkFileLength"
            @change="uploadFile">
            <span class="error" :class="{on: checkFileSize || checkFileLength}">
              <i class="xi-error-o"></i>최대 5장/10MB 이내로 jpg,jpeg,png 파일을 등록할 수 있습니다.
            </span>
          </div>
          <div class="attachfileList" v-for="(file,idx) in attachfileList" :key="idx">
            <p class="fileName">{{file.name}}</p>
            <div class="right">
              <p class="fileVolume">{{ (file.size/(1024*1024)).toFixed(2) }}MB</p>
              <span class="deleteFile xi-close" @click="deleteFile(idx)"></span>
            </div>
          </div>
          
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

import { 
  api_postAddNotice_admin, 
  api_postAddEditFile_notice 
} from '@/api/manager'

export default {
  components: {
    Editor,
    // Viewer,
  },
  data() {
    return {
      title: '',
      error: {
        title: false,
        content: false,
      },
      submitFlag: true,
      attachfileList: [],
      attachFileSize: 0,
      translateImgUrl: [],
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
        },
      },
      onEditorFocusFlag: false,
    }
  },
  mounted() {
  },
  computed: {
    checkFileSize() {
      if(this.attachFileSize / (1024*1024) > 10) {
        return true;
      } else return false;
    },
    checkFileLength() {
      if(this.attachfileList.length > 5) {
        return true;
      } else return false;
    }
  },
  methods: {
    async addImageBlobHook(blob, callback) {
      let formData = new FormData();
      formData.append('file', blob);

      await api_postAddEditFile_notice(formData)
      .then(res => {
        if(res.data) {
          console.log('res',res.data)
          this.translateImgUrl.push(res.data);
          callback(res.data, '업로드이미지')
        }
      });
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
        if(this.checkFileSize) return this.submitFlag = true;
        if(this.checkFileLength) return this.submitFlag = true;

        let formData = new FormData();
        formData.append('title',this.title)
        formData.append('content',getHtml)
        formData.append('editorFile', this.translateImgUrl)

        for(let i = 0; i < this.attachfileList.length; i++) {
          formData.append('files',this.attachfileList[i])
        }

        for(let key of formData.keys()) {
          console.log('등록데이터', key, formData.get(key))
        }

        await api_postAddNotice_admin(formData)
        .then(res=> {
          console.log('notice regist',res)
          this.$emit('openModal', true, 2, 'notice');
          this.submitFlag = true;
        })
        .catch(err=> {
          console.log(err)
          this.submitFlag = true;
        })
      }
    },
    resetError() {
      this.error = {
        category: false,
        title: false,
        content: false,
      }
    },
    checkSubmit(getHtml) {
      if(this.title === '') {
        this.error.title = true; return true;
      } else if(getHtml === '') {
        this.error.content = true; return true;
      } else {
        return false;
      }
    },
    uploadFile(e) {
      let fileInput = this.$refs.uploadFile;

      for(let i = 0; i < fileInput.files.length; i++) {
        let checkFileType = ['image/png','image/jpg','image/jpeg']
        if(!checkFileType.includes(fileInput.files[i].type)) return;

        this.attachfileList.push(fileInput.files[i]);
        this.attachFileSize += fileInput.files[i].size;
      }
      console.log('파일업로드', this.attachfileList)
      if(this.checkFileSize) {
        this.$emit('openModal', true, 3, 'notice');
      }
      if(this.checkFileLength) {
        this.$emit('openModal', true, 4, 'notice');
      }

      e.target.value = '';
    },
    deleteFile(idx) {
      this.attachFileSize -= this.attachfileList[idx].size;
      this.attachfileList.splice(idx,1);
    },
    onFocusEditor() {
      this.onEditorFocusFlag = true
    },
    onBlurEditor() {
      this.onEditorFocusFlag = false;
    }
  }
}
</script>

<style lang='scss'>
  @import './css/noticeRegist.scss';
</style>