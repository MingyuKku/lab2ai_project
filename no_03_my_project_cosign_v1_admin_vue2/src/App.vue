<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import '@/core/timeUtil';
import '@/core/apiUrl.js';
import '@/core/commonUtil.js';
import {
  api_health_feed,
  api_health_discover,
  api_health_sign,
  api_health_bookmark,
  api_health_menu,
  api_health_search,
  api_health_faq,
} from '@/api/manager'

export default {
  components: {
  },
  data() {
    return {
      site_type: ''
    }
  },
  created() {
    this.healthCheckApi()
  },
  methods: {
    ...mapActions('loginStore', ['checkIsLogin']),  

    async healthCheckApi() {
      try {
        const data = await api_health_feed() // 홈피드
        console.log(data)
      } catch (err) {console.log()}

      try {
        const data = await api_health_discover() // 디스커버
        console.log(data)
      } catch (err) { console.log() }

      try {
        const data = await api_health_sign() // 싸인
        console.log(data)
      } catch (err) { console.log() }

      try {
        const data = await api_health_bookmark() // 북마크
        console.log(data)
      } catch (err) { console.log() }

      try {
        const data = await api_health_menu() // 메뉴
        console.log(data)
      } catch (err) { console.log() }

      try {
        const data = await api_health_search() // 검색
        console.log(data)
      } catch (err) { console.log() }

      try {
        const data = await api_health_faq() // 고객센터
        console.log(data)
      } catch (err) { console.log() }
    }
  }
}
</script>


<style lang='scss'>
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  i {
    font-style: normal;
  }
  img {
    image-rendering: crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  .clearFix::after, .clearFix::before {
    display: block;
    content: '';
    clear: both;
  }
  body {
    background: $backgroundColor;
    #app {
      font-family: 'Noto Sans KR', sans-serif;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  @import './views/css/transition_animations.scss';
</style>
