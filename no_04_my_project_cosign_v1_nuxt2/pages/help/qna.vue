<template>
  <div class="routeSiteInquiry_wrap">
    <div class="header">
      <h1>1:1 문의</h1>
    </div>
    <div class="content">
      <div class="form">
        <div class="email">
          <h2>이메일</h2>
          <input type="text" name="" id="" placeholder="이메일을 입력해 주세요"
          v-model="email"
          :disabled="userInfo.email !== ''">
          <span class="error" v-if="error.email"><i class="xi-error-o"></i>이메일을 입력해 주세요</span>
        </div>
        <div class="inquiry_cont">
          <h2>문의 내용</h2>
          <textarea name="" id="" rows="16" placeholder="내용을 입력해 주세요" v-model="content"></textarea>
          <span class="error" v-if="error.content"><i class="xi-error-o"></i>내용을 입력해 주세요.</span>
        </div>

        <div class="attachfile_area">
          <div class="title">
            <h2>첨부 파일</h2>
            <label for="uploadFile">파일 선택</label>
            <input type="file" id="uploadFile" ref="uploadFile" multiple="multiple" accept="image/jpg, image/jpeg, image/png"
            :disabled="checkFileSize || checkFileLength"
            @change="uploadFile">
            <span class="error" :class="{on: checkFileSize || checkFileLength}"><i class="xi-error-o"></i>최대 5장/10MB 이내로 jpg,jpeg,png 파일을 등록할 수 있습니다.</span>
          </div>
          <div class="attachfileList" v-for="(file,idx) in attachfileList" :key="idx">
            <p class="fileName">{{file.name}}</p>
            <div class="right">
              <p class="fileVolume">{{(file.size/(1024*1024)).toFixed(2)}}MB</p>
              <span class="deleteFile xi-close" @click="deleteFile(idx)"></span>
            </div>
          </div>
          
        </div>

        <div class="note">
          <div class="text">
            <p><i class="xi-error-o"></i>1:1 문의 작성 유의사항</p>
          </div>
          <ul>
            <li>정확한 답변을 위하여 문의 내용을 상세하게 작성해주시기 바랍니다.</li>
            <li>접수된 내용은 순차적으로 답변드리고 있으며, 추가 확인이 필요한 경우 답변이 지연될 수 있습니다.</li>
            <li>등록하신 문의에 대한 답변은 <strong>이메일, 고객센터 > 문의내역</strong>에서 확인 가능합니다.</li>
          </ul>
        </div>
        <button type="button" @click="submitInquiry">제출</button>
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
      attachfileList: [],
      attachFileSize: 0,
      email: '',
      content: '',
      submitFlag: true,
      error: {
        email: false,
        content: false,
      }
    }
  },
  mounted() {
    this.hideHeader(false);
    this.setUserInfo();
  },
  watch: {
    loginInfo() {
      this.$router.go(0);
    }
  },
  computed: {
    ...mapGetters('loginStore', ['userInfo', 'loginInfo']),
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
    ...mapActions('loginStore',['loadUserInfo']),
    ...mapActions('signStore', ['hideHeader']),
    async setUserInfo() {
      await this.loadUserInfo();
      this.email = this.userInfo.email;
    },
    uploadFile(e) {
      let fileInput = this.$refs.uploadFile;

      for(let i = 0; i < fileInput.files.length; i++) {
        let checkFileType = ['image/png','image/jpg','image/jpeg']
        if(!checkFileType.includes(fileInput.files[i].type)) return;

        this.attachfileList.push(fileInput.files[i]);
        this.attachFileSize += fileInput.files[i].size;
      }

      if(this.checkFileSize && this.checkFileLength) {
        this.$emit('openModal', true, 1, 'both');
      } else if(this.checkFileSize) {
        this.$emit('openModal', true, 1);
      } else if(this.checkFileLength) {
        this.$emit('openModal', true, 2);
      }

      e.target.value = '';
    },
    deleteFile(idx) {
      this.attachFileSize -= this.attachfileList[idx].size;
      this.attachfileList.splice(idx,1);
    },
    async submitInquiry() {
      if(this.submitFlag) {
        this.submitFlag = false;

        if(this.checkFileSize) return this.submitFlag = true;
        if(this.checkFileLength) return this.submitFlag = true;
        if(this.checkValidate()) return this.submitFlag = true;

        let formData = new FormData();
        formData.append('email',this.email)
        formData.append('content',this.content)
        for(let i = 0; i < this.attachfileList.length; i++) {
          formData.append('images',this.attachfileList[i])
        }

        
        // for(let key of formData.keys()) {
        //   console.log('파라미터 키', key)
        // }
        // for(let key of formData.values()) {
        //   console.log('파라미터 값', key)
        // }
        
        

        try {
          const res = await this.$intApi.post('/help/qna/add_inquiry', formData, {withCredentials: true},
          {headers: { "Content-Type": 'multipart/form-data',}},)
          if(this.$res_inspect(res, 'inspect')) {
            this.$emit('openModal', true, 0);
          } else {
            alert(this.$res_inspect(res, 'message'))
          }

          this.submitFlag = true;
          
        } catch(err) {console.log('문의전송에러',err); this.submitFlag = true;}
      }
    },
    checkValidate() {
      if(this.email === '') {
        this.error.email = true; return true;
      } else if(this.content === '') {
        this.error.content = true; return true;
      }
    }
  }
}
</script>

<style lang='scss'>
  @import '@/src/css/serviceCenter/routeSiteInquiry.scss';
</style>