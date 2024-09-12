<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import '@/core/timeUtil';
export default {
  mounted() {
    this.checkIsLogin();
  },
  methods: {
    ...mapActions('loginStore', ['checkIsLogin']),  
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
  .clearFix::after, .clearFix::before {
    display: block;
    content: '';
    clear: both;
  }
  body {
    #app {
      font-family: 'Noto Sans KR', sans-serif;
    }
  }
  
  @import './views/css/transition_animations.scss';
</style>
