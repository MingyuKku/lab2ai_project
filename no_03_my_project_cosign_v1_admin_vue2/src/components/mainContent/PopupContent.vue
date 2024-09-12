<template>
    <div class="promotionContent_wrap">
      <div class="header">
        <ul class="title">
          <li><router-link to="/manager/promotion">프로모션</router-link></li>
          <li class="active"><router-link to="/manager/popup">메인 팝업</router-link></li>
          <li><router-link to="/manager/theme/auth">테마 컨텐츠</router-link></li>
        </ul>
        <div class="promotion_list">
          <ul>
            <li v-for="(slide,idx) in visualSlides" :key="idx" :class="{active: activeSlideIndex === idx}"
            @click="activeSlideIndex = idx">
              <span>슬라이드{{ idx+1 }}</span>
            </li>
          </ul>
          <button type="button" @click="addSlide">추가</button>
        </div>
      </div>
      <div class="content" v-if="activeSlideIndex !== null && visualSlides.length > 0">
        <div class="inner">
  
          <div class="order">
            <h2>순번</h2>
            <input type="text" v-model="visualSlides[activeSlideIndex].bannerNumber">
          </div>
          <div class="link_url">
            <h2>웹링크</h2>
            <input type="text" v-model="visualSlides[activeSlideIndex].webLink">
          
            <div class="checkLinkTarget_wrap">
                <input type="checkbox" id="url_target" v-model="visualSlides[activeSlideIndex].webLinkNewWindowFlag">
                <label for="url_target">
                <span>새 창</span>
                </label>
            </div>
          </div>
          <div>
            <h2>앱 딥링크</h2>
            <input type="text" v-model="visualSlides[activeSlideIndex].appDeepLink">
          </div>

          <div class="mobile_image">
            <h2>이미지</h2>
            <div>
              <label for="mobile_img">찾아보기</label>
              <input type="file" id="mobile_img" ref="mobile_img" accept="image/jpg, image/jpeg, image/png"
              @change="uploadFile('mobile_img')">
  
              <div class="imageName" v-if="visualSlides[activeSlideIndex].bannerImage">
                <i class="xi-close-circle-o" @click="deleteFile('mobile_img')"></i><span>{{ visualSlides[activeSlideIndex].bannerImage.name }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="buttons">
          <button type="button" @click="submitContents">저장</button>
          <button type="button" @click="deleteContents">삭제</button>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  import { api_popup_list, api_addPopup, } from '@/api/contents'
  export default {
    data: ()=> ({
      visualSlides: [{
        bannerNumber: 1,
        webLink: null,
        appDeepLink: null,
        bannerImage: null,
        webLinkNewWindowFlag: null,
      }],
      activeSlideIndex: 0,
    }),
    created() {
      this.getContentsList()
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      setNullSlideContents() {
        const addNullData = {
          bannerNumber: this.visualSlides[this.visualSlides.length - 1].bannerNumber + 1,
          webLink: null,
          appDeepLink: null,
          bannerImage: null,
          webLinkNewWindowFlag: true
        }
        return addNullData;
      },
      async getContentsList() {
        try {
          const res =  await api_popup_list()
          if(res.data.data.banners.length > 0) {
            this.visualSlides = res.data.data.banners.map(banner => {
                return {
                    ...banner,
                    bannerImage: {name: banner.bannerImage},
                }
            });
          }
          
        } catch(err) { console.log(err) }
      },
      addSlide() {
        this.activeSlideIndex = this.visualSlides.length;
        this.visualSlides.push(this.setNullSlideContents())
      },
      uploadFile(ref) {
        let fileInput = this.$refs[ref];
  
        let checkFileType = ['image/png','image/jpg','image/jpeg']
        if(!checkFileType.includes(fileInput.files[0].type)) return;
  
        this.visualSlides[this.activeSlideIndex].bannerImage = fileInput.files[0];   
        console.log("uploadFile", this.visualSlides[this.activeSlideIndex].bannerImage.name, fileInput.files[0]);
  
        event.target.value = '';
      },
      deleteFile() {
        this.visualSlides[this.activeSlideIndex].bannerImage = null;
      },
      checkArrAlert() {
        if(this.visualSlides[this.activeSlideIndex].bannerId) {
          //업데이트
          const current = this.visualSlides[this.activeSlideIndex]
          for(let i = 0; i < this.visualSlides.length; i++) {
            if(Number(current.bannerId) === this.visualSlides[i].bannerId) continue;
            else {
              if(Number(current.bannerNumber) === this.visualSlides[i].bannerNumber) {
                alert('이미 동일한 순번의 컨텐츠가 등록되어 있습니다!'); return true;
              }
            }
          }
        } else {
          //신규저장
          console.log('신규저장')
          for(let i = 0; i < this.visualSlides.length - 1; i++) {
            if(this.visualSlides[this.activeSlideIndex].bannerNumber == this.visualSlides[i].bannerNumber) {
              alert('이미 동일한 순번의 컨텐츠가 등록되어 있습니다'); return true;
            }
          }
        }
        
        const submitDataArr = Object.keys(this.visualSlides[this.activeSlideIndex])

        for(let key of submitDataArr) {
          if(key === 'newWindow') continue;
  
          if(!this.visualSlides[this.activeSlideIndex][key]) {
            alert(`${key}을(를) 등록해 주세요!`); return true;
          }
          
          if(key ==='rank') {
            const value = this.visualSlides[this.activeSlideIndex][key]
            if(isNaN(value)) {
              alert('순번은 숫자만 입력할 수 있습니다!'); return true;
            }
          }
        }
      },
      async submitContents() {
        if(this.checkArrAlert()) return;
        const submitData = this.visualSlides[this.activeSlideIndex]
        const keyArry = Object.keys(submitData)
        let formData = new FormData();
  
        for(let key of keyArry) {
            if(key === 'bannerImage') {
                if(!submitData[key].type) continue;
            }
            formData.append(key, submitData[key])
        }
  
        for(let key of formData.keys()) {
          console.log('등록데이터', key, formData.get(key))
        }
  
        try {
            console.log("add", formData);
          const res = await api_addPopup(formData)
          console.log('요고는?',res)
          if(res.data.status === 200) {
            this.$emit('openModal', true, 2, 'promotion');
          }
  
        } catch(err) { console.log('전송에러',err) }
        
      },
      async deleteContents() {
        this.$emit('openModal', true, 0, 'popup', this.visualSlides[this.activeSlideIndex].bannerId);
      }
    }
  }
  </script>
  
  <style lang='scss'>
    @import './css/promotionContent.scss'
  </style>