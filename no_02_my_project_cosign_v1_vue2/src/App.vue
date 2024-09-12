<template>
  <div id="app">
    <LoginAlert />
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import '@/core/timeUtil';
import LoginAlert from '@/components/common/LoginAlert.vue'

export default {
  components: {
    LoginAlert
  },
  data() {
    return {
      site_type: ''
    }
  },
  mounted() {
    this.checkIsLogin();

    if(this.isMobile()) {
      if(location.href.includes("www.cosign.cc")) {
        const idx = location.href.indexOf("www.cosign.cc") + "www.cosign.cc".length;
        location.href = "https://m.cosign.cc" + location.href.substring(idx);
      } else if(location.href.includes("dev.cosign.cc")) {
        const idx = location.href.indexOf("dev.cosign.cc") + "dev.cosign.cc".length;
        location.href = "https://dev-mobile.cosign.cc" + location.href.substring(idx);
      } else if(location.href.includes("qa.cosign.cc")) {
        const idx = location.href.indexOf("qa.cosign.cc") + "qa.cosign.cc".length;
        location.href = "https://qa-mobile.cosign.cc" + location.href.substring(idx);
      }
    }

    if(location.href.includes("www.cosign.cc")) {
      this.addGATag('G-DQ27XJPBPY');
    } else if(location.href.includes("dev.cosign.cc")) {
      this.addGATag('G-2LPELSEQBZ');
    }
  },
  methods: {
    ...mapActions('loginStore', ['checkIsLogin']),  
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    addGATag(id) {
      let gaScript = document.createElement("script");
      gaScript.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${id}`);
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', id);
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
    width: 100%;
    height: auto;
  }
  .clearFix::after, .clearFix::before {
    display: block;
    content: '';
    clear: both;
  }
  body {
    // background: $backgroundColor;
    background: $white;
    #app {
      font-family: 'Noto Sans KR', sans-serif;
    }
  }
  
  @import './views/css/transition_animations.scss';
</style>
