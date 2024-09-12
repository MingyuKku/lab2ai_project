<template>
  <div class="serviceSide_wrap">
    <div class="title">
      <h1 @click="routeIndex">고객센터</h1>
    </div>
    <div class="side_menu">
      <ul>
        <li v-for="(menu,idx) in sideMenu" :key="idx" :class="{active: menuIdx === idx+1}"
        @click="routePage(menu.name,idx+1)">{{menu.tit}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sideMenu'],
  async fetch() {
    await this.setSideMenuActive(this.$route.name)
  },
  data() {
    return {
      menuIdx: 0,
    }
  },
  mounted() {
    // this.setSideMenuActive(this.$route.name)
  },
  watch: {
    $route() {
      this.setSideMenuActive(this.$route.name)
    }
  },
  methods: {
    setSideMenuActive(name) {
      switch(name) {
        case 'help-faq' : this.menuIdx = 1; break;
        case 'help-notice' : this.menuIdx = 2; break;
        case 'help-notice-pageId' : this.menuIdx = 2; break;
        case 'help-qna' : this.menuIdx = 3; break;
        case 'help-qnalist' : this.menuIdx = 4; break;
        default : this.menuIdx = 0;
      }
    },
    routeIndex() {
      let current = this.$router.history.current;
      this.menuIdx = 0;
      if(current.name !== 'help') {
        this.$router.push('/help')
      } else {
        this.$router.go(0);
      }
    },
    routePage(name,idx) {
      let current = this.$router.history.current;
      this.menuIdx = idx;
      if(current.name !== name) {
        this.$router.push({name: name})
      } else {
        this.$router.go(0)
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/serviceSide.scss';
</style>