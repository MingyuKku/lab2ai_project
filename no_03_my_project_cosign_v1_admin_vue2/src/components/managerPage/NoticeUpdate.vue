<template>
  <div class="noticeRegist_wrap">
    <div class="header">
      <h1>공지사항 등록</h1>
    </div>
    <div class="content">
      <div class="inner">
        <div class="title">
          <h2>제목</h2>
          <input type="text" placeholder="제목을 입력하세요" v-model="title">
          <span v-if="error.title"><i class="xi-error-o"></i>제목을 입력해 주세요.</span>
        </div>

        <div class="noticeContent">
          <h2>내용</h2>
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

        <div class="attachfile_area">
          <div class="title">
            <h2>첨부 파일</h2>
            <label for="uploadFile">파일 선택</label>
            <input type="file" id="uploadFile" ref="uploadFile" multiple="multiple" accept="image/*"
            :disabled="checkFileSize || checkFileLength"
            @change="uploadFile">
            <span class="error" :class="{on: checkFileSize || checkFileLength}">
              <i class="xi-error-o"></i>최대 5장/10MB 이내로 jpg,jpeg,png 파일을 등록할 수 있습니다.
            </span>
          </div>
          <div class="attachfileList" v-for="(file,idx) in attachfileList" :key="idx">
            <p class="fileName">{{file.fileName}}</p>
            <div class="right">
              <!-- <p class="fileVolume">{{(file.size/(1024*1024)).toFixed(2)}}MB</p> -->
              <span class="deleteFile xi-close" @click="deleteFile(idx, file.ass, file.addIndex)"></span>
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

import { api_postNoticeRead_admin, api_postUpdateNotice_admin, api_postAddEditFile_notice } from '@/api/manager'

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
      addAttachfileIndex: 0,
      addAttachfilesList: [],
      deleteAttachfileList: [],
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
        }
      },
    }
  },
  mounted() {
    this.getNoticeDetail();
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
    },
  },
  methods: {
    async addImageBlobHook(blob, callback) {
      let formData = new FormData();
      formData.append('file', blob);

      await api_postAddEditFile_notice(formData)
      .then(res => {
        if(res.data) {
          console.log('response',res.data)
          this.translateImgUrl.push(res.data);
          callback(res.data, '업로드이미지')
        }
      });
    },

    async getNoticeDetail() {
      await api_postNoticeRead_admin(this.$route.params.pageId)
      .then(res=> {
        console.log('관리자공지사항수정상세내용',res);
        this.title = res.data.title;
        this.editorText = res.data.content;

        this.attachfileList = res.data.noticeFileData.map(d=> {
          return {
            ...d,
            ass: 'origin',
          }
        });
        this.attachFileSize = res.data.noticeFileData.reduce((a,b)=> a + b.fileSize, 0)
      })
      .catch(err=> {
        console.log('관리자공지사항수정상세내용에러',err)
      })
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
        formData.append('id', this.$route.params.pageId)
        formData.append('title',this.title)
        formData.append('content',getHtml)
        formData.append('editorFile', this.translateImgUrl)

        //추가 이미지
        for(let i = 0; i < this.addAttachfilesList.length; i++) {
          formData.append('addFiles',this.addAttachfilesList[i])
        }

        //삭제 이미지
        for(let i = 0; i < this.deleteAttachfileList.length; i++) {
          formData.append('deleteFile',  this.deleteAttachfileList[i])
        }

        for(let key of formData.keys()) {
          console.log('수정데이터', key, formData.get(key))
        }

        await api_postUpdateNotice_admin(formData)
        .then(res=> {
          console.log('notice update',res)
          this.$router.push( `/manager/notice/${this.$route.params.pageId}`)
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
        let addFile = {
          fileName: fileInput.files[i].name,
          fileSize: fileInput.files[i].size,
          ass: 'new',
          addIndex: this.addAttachfileIndex,
        }

        fileInput.files[i].ass = 'new';
        fileInput.files[i].addIndex = this.addAttachfileIndex;
        this.addAttachfileIndex++;

        this.attachfileList.push(addFile);
        console.log('새 업로드',fileInput.files[i])
        this.addAttachfilesList.push(fileInput.files[i])
        this.attachFileSize += fileInput.files[i].size;
      }
      // console.log('파일업로드', this.attachfileList)
      if(this.checkFileSize) {
        this.$emit('openModal', true, 3, 'notice');
      }
      if(this.checkFileLength) {
        this.$emit('openModal', true, 4, 'notice');
      }
      e.target.value = '';
    },
    deleteFile(idx, ass, addIdx) {
      let originDeleteFile = this.attachfileList.splice(idx,1);
      if(ass === 'origin') {
        this.deleteAttachfileList.push(originDeleteFile[0].fileLink);
      } else if(ass === 'new') {
        let addDeleteFileIndex = this.addAttachfilesList.findIndex(file=> file.addIndex === addIdx)
        this.addAttachfilesList.splice(addDeleteFileIndex,1)
      }
      this.attachFileSize -= originDeleteFile[0].fileSize;
    },
  }
}
</script>

<style lang='scss'>
  @import './css/noticeRegist.scss';
</style>