<template>
  <div class="sideGnbMenu_wrap">
    <div class="title">
      <h1 @click="routerToMain">
        고객센터
      </h1>
    </div>
    <div class="side_menu">
      <ul>
        <li v-for="(menu,idx) in gnbMenu" :key="idx" :class="{active: menuIdx === idx}"
          @click="routePage(menu.name)"
        >
          {{menu.tit}}
          <!-- <router-link :to="{name: menu.name}" @click="onClickRouterLink">{{menu.tit}}</router-link> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['gnbMenu'],
  data() {
    return {
      menuIdx: 0,
    }
  },
  mounted() {
    this.setSideMenuActive(this.$route.meta.index)
  },
  watch: {
    $route() {
      this.setSideMenuActive(this.$route.meta.index)
    }
  },
  methods: {
    setSideMenuActive(i) {
      this.menuIdx = i;
    },
    routerToMain() {
      let current = this.$router.history.current;
      if(current.name !== 'Faq') this.$router.push('/manager/faq')
      else this.$router.go(0);
    },
    routePage(name) {
      let current = this.$router.history.current;
      if(current.name !== name) this.$router.push({name: name})
      else this.$router.go(0);
    }
  }
}
</script>

<style lang='scss'>
  @import './css/sideGnbMenu.scss';
</style>