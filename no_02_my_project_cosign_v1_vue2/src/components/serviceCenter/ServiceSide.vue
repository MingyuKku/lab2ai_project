<template>
  <div class="serviceSide_wrap">
    <div class="title">
      <h1><a href="/service">고객센터</a></h1>
    </div>
    <div class="side_menu">
      <ul>
        <li v-for="(menu,idx) in sideMenu" :key="idx"><a :href="`/service${menu.path}`">{{menu.tit}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sideMenu'],
  data() {
    return {
    }
  }
}
</script>

<style lang='scss'>
  @import './css/serviceSide.scss';
</style>