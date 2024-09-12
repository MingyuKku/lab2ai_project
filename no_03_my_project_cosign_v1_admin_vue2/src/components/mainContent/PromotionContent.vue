<template>
  <div class="promotionContent_wrap">
    <div class="header">
      <ul class="title">
        <li class="active"><router-link to="/manager/promotion">프로모션</router-link></li>
        <li><router-link to="/manager/popup">메인 팝업</router-link></li>
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
    <div class="content" v-if="activeSlideIndex !== null">
      <div class="inner">

        <div class="order">
          <h2>순번</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].rank">
        </div>

        <div class="tag">
          <h2>태그</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].tag">
        </div>

        <div class="title_1">
          <h2>제목 1</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].title">
        </div>
        <div class="title_2">
          <h2>제목 2</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].subTitle">
        </div>

        <div class="desc_1">
          <h2>설명 1</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].content">
        </div>
        <div class="desc_2">
          <h2>설명 2</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].subContent">
        </div>

        <div class="link_text">
          <h2>링크명</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].linkName">
        </div>
        <div class="link_url">
          <h2>링크 URL</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].link">
          
          <div class="checkLinkTarget_wrap">
            <input type="checkbox" id="url_target" v-model="visualSlides[activeSlideIndex].newWindow">
            <label for="url_target">
              <span>새 창</span>
            </label>
          </div>
        </div>

        <div class="bg_color">
          <h2>배경컬러</h2>
          <input type="text" v-model="visualSlides[activeSlideIndex].backColor">
        </div>

        <div class="pc_image">
          <h2>PC 이미지</h2>
          <div>
            <label for="pc_img">찾아보기</label>
            <input type="file" id="pc_img" ref="pc_img" accept="image/jpg, image/jpeg, image/png"
            @change="uploadFile('pc_img')">

            <div class="imageName" v-if="visualSlides[activeSlideIndex].pcImage">
              <i class="xi-close-circle-o" @click="deleteFile('pc_img')"></i><span>{{ visualSlides[activeSlideIndex].pcImage.name }}</span>
            </div>
          </div>
          
        </div>
        <div class="mobile_image">
          <h2>MO 이미지</h2>
          <div>
            <label for="mobile_img">찾아보기</label>
            <input type="file" id="mobile_img" ref="mobile_img" accept="image/jpg, image/jpeg, image/png"
            @change="uploadFile('mobile_img')">

            <div class="imageName" v-if="visualSlides[activeSlideIndex].moImage">
              <i class="xi-close-circle-o" @click="deleteFile('mobile_img')"></i><span>{{ visualSlides[activeSlideIndex].moImage.name }}</span>
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
import { api_promotion_list,api_addPromotion, } from '@/api/contents'
export default {
  data: ()=> ({
    visualSlides: [{
      rank: 1,
      tag: null,
      title: null,
      subTitle: null,
      content: null,
      subContent: null,
      linkName: null,
      link: null,
      backColor: null,
      pcImage: null,
      moImage: null,
      newWindow: false,
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
        rank: this.visualSlides[this.visualSlides.length - 1].rank + 1,
        tag: null,
        title: null,
        subTitle: null,
        content: null,
        subContent: null,
        linkName: null,
        link: null,
        backColor: null,
        pcImage: null,
        moImage: null,
        newWindow: false,
      }
      return addNullData;
    },
    async getContentsList() {
      try {
        const res =  await api_promotion_list()
        if(res.data.length > 0) {
          this.visualSlides = res.data
          console.log('비주얼컨텐츠', this.visualSlides)

          for(let cont of this.visualSlides) {
            if(cont.pcImage) cont.pcImage = {name: cont.pcImage}
            if(cont.moImage) cont.moImage = {name: cont.moImage}
          }
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

      if(ref === 'pc_img') this.visualSlides[this.activeSlideIndex].pcImage = fileInput.files[0];
      else if(ref === 'mobile_img') this.visualSlides[this.activeSlideIndex].moImage = fileInput.files[0];   

      event.target.value = '';
    },
    deleteFile(ref) {
      if(ref === 'pc_img') this.visualSlides[this.activeSlideIndex].pcImage = null;
      else if(ref === 'mobile_img') this.visualSlides[this.activeSlideIndex].moImage = null;
    },
    checkArrAlert() {
      if(this.visualSlides[this.activeSlideIndex].id) {
        //업데이트
        const current = this.visualSlides[this.activeSlideIndex]
        for(let i = 0; i < this.visualSlides.length; i++) {
          if(Number(current.id) === this.visualSlides[i].id) continue;
          else {
            if(Number(current.rank) === this.visualSlides[i].rank) {
              alert('이미 동일한 순번의 컨텐츠가 등록되어 있습니다!'); return true;
            }
          }
        }
      } else {
        //신규저장
        console.log('신규저장')
        for(let i = 0; i < this.visualSlides.length - 1; i++) {
          if(this.visualSlides[this.activeSlideIndex].rank == this.visualSlides[i].rank) {
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
        if(key === 'pcImage') {
          if(!submitData[key].type) continue;
        }
        if(key === 'moImage') {
          if(!submitData[key].type) continue;
        }
        formData.append(key, submitData[key])
      }

      for(let key of formData.keys()) {
        console.log('등록데이터', key, formData.get(key))
      }

      try {
        const res = await api_addPromotion(formData)
        console.log('요고는?',res)
        if(res.data.code === 1000) {
          this.$emit('openModal', true, 2, 'promotion');
        }

      } catch(err) { console.log('전송에러',err) }
      
    },
    async deleteContents() {
      this.$emit('openModal', true, 0, 'promotion', this.visualSlides[this.activeSlideIndex].id);
    }
  }
}
</script>

<style lang='scss'>
  @import './css/promotionContent.scss'
</style>