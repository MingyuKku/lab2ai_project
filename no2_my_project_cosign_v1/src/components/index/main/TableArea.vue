<template>
  <div class="tableArea_wrap">
    <div class="tabMenuArea">
      <ul>
        <li v-for="(tabMenu,idx) in tabMenus" :key="idx"
          :class="{active: tabMenuIndex === idx}"
          @click="tabMenuIndex = idx"
        >
          <BtnEffect class="inner_btn"
            duration='0.7'
            color='#FB9BA9'
          >
            <i :class="tabMenu.icon"></i>
            <h1>{{ tabMenu.title }}</h1>
          </BtnEffect>
        </li>
      </ul>
    </div>
    <div class="signListArea">
      <NewPredictSignList class="newPredictSignList"
        :tabMenuIndex="tabMenuIndex"
      />
      <HitSignList class="hitSignList"
        :tabMenuIndex="tabMenuIndex"
      />
    </div>
  </div>
</template>

<script>
import NewPredictSignList from '@/components/index/main/NewPredictSignList';
import HitSignList from '@/components/index/main/HitSignList'
import BtnEffect from '@/components/common/BtnEffect';
export default {
  components: {
    NewPredictSignList, HitSignList, BtnEffect,
  },
  data() {
    return {
      tabMenuIndex: 0,
      tabMenus: [
        {title: '최신 예측 SIGN', icon: 'xi-bell-o'},
        {title: '최근 수익 적중 SIGN', icon: 'xi-central-router'},
      ],
    }
  },
  mounted() {
  },
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/tableArea.scss';
</style>