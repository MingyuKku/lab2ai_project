<template>
  <div class="themeContent_wrap">
    <div class="header">
      <ul class="title">
        <li><router-link to="/manager/promotion">프로모션</router-link></li>
        <li><router-link to="/manager/popup">메인 팝업</router-link></li>
        <li class="active"><router-link to="/manager/theme/auth">테마 컨텐츠</router-link></li>
      </ul>
      <div class="theme_list">
        <ul>
          <li v-for="(item,idx) in themeItems" :key="idx" :class="{active: activeThemeIndex === idx}" @click="activeThemeIndex = idx">
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content" v-if="activeThemeIndex !== null && activeThemeIndex < 2">
      <div class="item" v-for="(item,idx) in themeItems[activeThemeIndex].content" :key="idx">
        <h1>아이템 #{{ item.itemId }}</h1>
        <div class="inner">
          <div class="linkUrl_wrap">
            <h2>링크 URL</h2>
            <input type="text" v-model="item.link">
            
            <div class="checkLinkTarget_wrap">
              <input type="checkbox" :id="`url_target${idx+1}`" v-model="item.newWindow">
              <label :for="`url_target${idx+1}`">
                <span>새 창</span>
              </label>
            </div>
          </div>

          <div class="attachFile_area">
            <h2>PC 이미지</h2>
            <div class="attachFile_wrap">
              <label :for="`pc_img${idx}`">찾아보기</label>
              <input type="file" :id="`pc_img${idx}`" ref="pc_img" accept="image/jpg, image/jpeg, image/png"
              @change="uploadFile('pc_img',idx)">

              <div class="imageName" v-if="item.pcImage">
                <i class="xi-close-circle-o" @click="deleteFile('pc_img',idx)"></i><span>{{ item.pcImage.name }}</span>
              </div>
            </div>
          </div>

          <div class="attachFile_area">
            <h2>MO 이미지</h2>
            <div class="attachFile_wrap">
              <label :for="`mobile_img${idx}`">찾아보기</label>
              <input type="file" :id="`mobile_img${idx}`" ref="mobile_img" accept="image/jpg, image/jpeg, image/png"
              @change="uploadFile('mobile_img',idx)">

              <div class="imageName" v-if="item.moImage">
                <i class="xi-close-circle-o" @click="deleteFile('mobile_img',idx)"></i><span>{{ item.moImage.name }}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div class="buttons">
        <button type="button" @click="submitContents">저장</button>
      </div>
    </div>

    <!--인스타그램 컨텐츠-->
    <div class="instagram_content" v-if="activeThemeIndex === 2">
      <div class="setting_btn" v-if="instagramUser && instagramMedia.length < 1">
        <a :href="`https://api.instagram.com/oauth/authorize?client_id=${instagramUser.clientId}
        &redirect_uri=${instagramUser.redirectUri}&scope=user_profile,user_media&response_type=code`">
        인스타그램 셋팅</a>
      </div>
        <!-- <button @click="redirect">클릭 리다이렉트</button> -->
      <router-view 
       :instagramUser="instagramUser"
       :instagramMedia="instagramMedia"
       >
      </router-view>
    </div>

    <!--뉴스 컨텐츠-->
    <div class="news_content" v-if="activeThemeIndex === 3">
      <div class="news_list">
        <ul>
          <li v-for="(cont,idx) in themeItems[3].content" :key="idx" :class="{active: themeItems[3].activeNewsIndex === idx}"
          @click="themeItems[3].activeNewsIndex = idx">
            <span>뉴스{{ idx+1 }}</span>
          </li>
        </ul>
        <button type="button" @click="addNewsCont">추가</button>
      </div>

      <div class="content">
        <div class="inner">

          <div class="order">
            <h2>순번</h2>
            <input type="text" v-model="themeItems[3].content[themeItems[3].activeNewsIndex].rank">
          </div>

          <div class="title_1">
            <h2>제목 1</h2>
            <input type="text" v-model="themeItems[3].content[themeItems[3].activeNewsIndex].title">
          </div>
          <div class="title_2">
            <h2>제목 2</h2>
            <input type="text" v-model="themeItems[3].content[themeItems[3].activeNewsIndex].subTitle">
          </div>

          <div class="agency">
            <h2>언론사</h2>
            <input type="text" v-model="themeItems[3].content[themeItems[3].activeNewsIndex].newsAgency">
          </div>

          <div class="date">
            <h2>날짜</h2>
            <input type="text" v-model="themeItems[3].content[themeItems[3].activeNewsIndex].newsDate">
          </div>

          <div class="link_url">
            <h2>링크 URL</h2>
            <input type="text" v-model="themeItems[3].content[themeItems[3].activeNewsIndex].newsLink">
            
            <div class="checkLinkTarget_wrap">
              <input type="checkbox" id="url_target" v-model="themeItems[3].content[themeItems[3].activeNewsIndex].newWindow">
              <label for="url_target">
                <span>새 창</span>
              </label>
            </div>
          </div>

          <div class="image">
            <h2>뉴스 이미지</h2>
            <div>
              <label for="news_img">찾아보기</label>
              <input type="file" id="news_img" ref="news_img" accept="image/jpg, image/jpeg, image/png"
              @change="uploadFile('news_img')">

              <div class="imageName" v-if="themeItems[3].content[themeItems[3].activeNewsIndex].newsImage">
                <i class="xi-close-circle-o" @click="deleteFile('news_img')"></i>
                <span>{{ themeItems[3].content[themeItems[3].activeNewsIndex].newsImage.name }}</span>
              </div>
            </div>
            
          </div>

        </div>

        <div class="buttons">
          <button type="button" @click="submitNews">저장</button>
          <button type="button" @click="deleteNews">삭제</button>
        </div>
        
      </div>

    </div>

    
  </div>
</template>

<script>
import { 
  api_highProfit_list, 
  api_highProfit_add,
  api_consecutiveHits_list,
  add_consecutiveHits_add,
  api_getInstagramUser,
  api_instagramGetMedia,
  api_cosignNews_list,
  api_cosignNews_add,
} from '@/api/contents'
export default {
  data: ()=> ({
    activeThemeIndex: 0,
    themeItems: [
      {
        title: '최고수익',
        content: [
          {
            itemId: 1,
            link: null,
            pcImage: null,
            moImage: null,
            newWindow: false,
          },
          {
            itemId: 2,
            link: null,
            pcImage: null,
            moImage: null,
            newWindow: false,
          },
          {
            itemId: 3,
            link: null,
            pcImage: null,
            moImage: null,
            newWindow: false,
          },
        ]
      },
      {
        title: '연속적중',
        content: [
          {
            itemId: 1,
            link: null,
            pcImage: null,
            moImage: null,
            newWindow: false,
          },
          {
            itemId: 2,
            link: null,
            pcImage: null,
            moImage: null,
            newWindow: false,
          },
          {
            itemId: 3,
            link: null,
            pcImage: null,
            moImage: null,
            newWindow: false,
          },
        ]
      },
      {
        title: '카드뉴스',
        itemId: 3,
        link: null,
        pcImage: null,
        moImage: null,
        newWindow: false,
      },
      {
        title: '코싸인 소식',
        content: [{
          rank: 1,
          title: null,
          subTitle: null,
          newsAgency: null,
          newsDate: null,
          newsLink: null,
          newsImage: null,
          newWindow: false,
        }],
        activeNewsIndex: 0,
      }
      
    ],
    instagramUser: null,
    instagramMedia: []
  }),
  async created() {
    this.getThemeNews();
    await this.getThemeList()
    await this.getInstagramUser()
    this.getInstagramMedia()
  },
  mounted() {
    
  },
  computed: {
  },
  methods: {
    async getThemeNews() {
      try {
        const res =  await api_cosignNews_list()

        if(res.data.length > 0) this.themeItems[3].content = res.data
        console.log('뉴스리스트', res)

        for(let cont of this.themeItems[3].content) {
          if(cont.newsImage) cont.newsImage = {name: cont.newsImage}
        }

      } catch(err) { console.log(err) }
    },
    setNullNewsContents() {
      return {
        rank: this.themeItems[3].content[this.themeItems[3].content.length - 1].rank + 1,
        title: null,
        subTitle: null,
        newsAgency: null,
        newsDate: null,
        newsLink: null,
        newsImage: null,
        newWindow: false,
      }
    },
    addNewsCont() {
      const newsThenme = this.themeItems[3]
      newsThenme.activeNewsIndex = newsThenme.content.length;
      newsThenme.content.push(this.setNullNewsContents())
    },
    async getThemeList() {
      for(let i = 0; i < this.themeItems.length - 1; i++) {
        let setData = null;

        try {
          if(i === 0) setData = await api_highProfit_list()
          else if(i === 1) setData = await api_consecutiveHits_list()

          console.log('테마컨텐츠', setData)
          if(setData.data.length > 0) {
            this.themeItems[i].content = setData.data;

            for(let cont of this.themeItems[i].content) {
              if(cont.pcImage) cont.pcImage = {name: cont.pcImage}
              if(cont.moImage) cont.moImage = {name: cont.moImage}
            }
          }
        } catch(err) { console.log(err) }
        
      }
    },
    async getInstagramMedia() {
      try {
        const res = await api_instagramGetMedia()
        console.log('겟미디어',res)
        if(res.data.length > 0) {
          // this.activeThemeIndex = 2;
          this.instagramMedia = res.data[0].data.slice(0,4)
        }

      } catch(err) { console.log('인스타미디어겟') }
    },
    async getInstagramUser() {
      try {
        const res = await api_getInstagramUser()
        this.instagramUser = res.data[0]
        console.log('겟 유저',res.data[0])

      } catch(err) { console.logO('인스타getAllUser') }
    },
    uploadFile(ref,idx) {
      let fileInput = this.$refs[ref];
      let checkFileType = ['image/png','image/jpg','image/jpeg']

      if(idx !== undefined) {

        if(!checkFileType.includes(fileInput[idx].files[0].type)) return;

        if(ref === 'pc_img') this.themeItems[this.activeThemeIndex].content[idx].pcImage = fileInput[idx].files[0];
        else if(ref === 'mobile_img') this.themeItems[this.activeThemeIndex].content[idx].moImage = fileInput[idx].files[0];

      } else {

        if(!checkFileType.includes(fileInput.files[0].type)) return;

        if(ref === 'news_img') this.themeItems[this.activeThemeIndex].content[this.themeItems[3].activeNewsIndex].newsImage = fileInput.files[0];  
      }
       
      event.target.value = '';
    },
    deleteFile(ref,idx) {
      if(idx !== undefined) {

        if(ref === 'pc_img') this.themeItems[this.activeThemeIndex].content[idx].pcImage = null;
        else if(ref === 'mobile_img') this.themeItems[this.activeThemeIndex].content[idx].moImage = null;

      } else {
        if(ref === 'news_img') this.themeItems[this.activeThemeIndex].content[this.themeItems[3].activeNewsIndex].newsImage = null;

      }
    },
    checkArrAlert() {
      const submitData = this.themeItems[this.activeThemeIndex].content;
      // const submitData = (this.activeThemeIndex === 3) ? 
      // this.themeItems[this.activeThemeIndex].content[this.themeItems[this.activeThemeIndex].activeNewsIndex] : this.themeItems[this.activeThemeIndex].content
      // console.log('머여', submitData)
      for(let i = 0; i < submitData.length; i++) {
        const keyArray = Object.keys(submitData[i])
        for(let key of keyArray) {
          // console.log('키', key, this.activeThemeIndex)
          if(key === 'newWindow') continue;
          if(this.activeThemeIndex === 3) {
            if(key === 'subTitle') continue;
          }

          if(!submitData[i][key]) {
            if(this.activeThemeIndex <= 2) {
              alert(`아이템${i+1}의 ${key}을(를) 등록해 주세요!`); return true;
            } else {
              alert(`${key}을(를) 등록해 주세요!`); return true;
            }
          }
        }
      }
    },
    async submitContents() {
      if(this.checkArrAlert()) return;

      let successStatus = 0;

      const submitData = this.themeItems[this.activeThemeIndex].content

      for(let list of submitData) {
        const keyArray = Object.keys(list)

        let formData = new FormData();

        for(let key of keyArray) {

          if(key === 'pcImage') {
            if(!list[key]?.type) continue;
          }
          if(key === 'moImage') {
            if(!list[key]?.type) continue;
          }

          if(key === 'itemId') {
            if(!list[key]) continue;
          }

          formData.append(key, list[key])
        }

        // for(let key of formData.keys()) {
        //   console.log('보내는 값', key, formData.get(key))
        // }
        // console.log('==============================')

        if(this.activeThemeIndex === 0) {
          try {
            const res = await api_highProfit_add(formData)
            // console.log('테마컨텐츠전송-최고수익',res)
            successStatus+=res.status;

          } catch(err) { console.log('전송에러',err) }

        } else if(this.activeThemeIndex === 1) {
          try {
            const res = await add_consecutiveHits_add(formData)
            // console.log('테마컨텐츠전송-연속적중',res)
            successStatus+=res.status;

          } catch(err) { console.log('전송에러',err) }
        }
        
      }
      
      if(successStatus === 600) {
        this.$emit('openModal', true, 2, 'theme');
      }
    },
    async submitNews() {
      
      if(this.checkArrAlert()) return;
      const submitData = this.themeItems[this.activeThemeIndex].content[this.themeItems[this.activeThemeIndex].activeNewsIndex];
      const keyArry = Object.keys(submitData)
      let formData = new FormData();
      for(let key of keyArry) {
        if(key === 'newsImage') {
          if(!submitData[key].type) continue;
        }
        
        formData.append(key, submitData[key])
      }

      for(let key of formData.keys()) {
        console.log('등록데이터', key, formData.get(key))
      }

      try {
        const res = await api_cosignNews_add(formData)
        console.log('코싸인뉴스저장',res)
        if(res.data.code === 1000) {
          this.$emit('openModal', true, 2, 'theme');
        }

      } catch(err) { console.log('전송에러',err) }

    },
    async deleteNews() {
      const activeItem = this.themeItems[this.activeThemeIndex]
      this.$emit('openModal', true, 0, 'theme', activeItem.content[activeItem.activeNewsIndex].id);
    },
  }
}
</script>

<style lang='scss'>
  @import './css/themeContent.scss'
</style>