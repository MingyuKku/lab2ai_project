<template>
  <div class="themeContentInstagramAuth_wrap" v-if="instagramMedia.length > 0">
  <!-- <div class="themeContentInstagramAuth_wrap"> -->
    <div class="update_btn" @click="updateInstagramMedia">갱신</div>
    <ul>
      <li v-for="(media, idx) in instagramMedia" :key="idx">
        <a :href="media.permalink" target="_blank">
          <img :src="media.media_url" :alt="media.username">
        </a>
      </li>
    </ul>
    <!-- <input type="text" v-model="testCode">
    <button @click="inputCode">코드입력</button>
    <button @click="settingInstagram(code)">인스타그램셋팅</button> -->
  </div>
</template>

<script>
import { 
  api_settingInstagram, 
  api_updateInstagramMedia
  // api_instagramGetMedia
} from '@/api/contents'
export default {
  props: ['instagramUser','instagramMedia'],
  data() {
    return {
      // testCode: 'dsdsdsdd',
      // code: null
    }
  },
  mounted() {
    console.log('auth마운트?', this.$route.query.code)
    if(this.$route.query.code) {
      this.settingInstagram(this.$route.query.code)
    }
  },
  methods: {
    // inputCode() {
    //   this.code = this.testCode
    //   console.log('입력값', this.code, this.testCode)
    // },
    async updateInstagramMedia() {
      const param = { clientId: this.instagramUser.clientId }
      try {
        const res = await api_updateInstagramMedia(param)
        console.log('갱신응답',res)
        if(res.data.code === 1000) this.$router.go(0)
      } catch(err) { console.log(err) }
    },
    async settingInstagram(code) {
      try {
        const param = {
          clientId: this.instagramUser.clientId,
          authenticationToken: code
        }
        const res = await api_settingInstagram(param)

        if(res.data.code === 1000) {
          console.log('셋팅api테스트', res)
          location.href = '/manager/theme/auth';
          // this.$router.go(0);
        }

      } catch(err) { console.log(err) }
    }
  }
}
</script>

<style lang="scss">
  @import './css/themeContentInstagramAuth_wrap.scss';
</style>