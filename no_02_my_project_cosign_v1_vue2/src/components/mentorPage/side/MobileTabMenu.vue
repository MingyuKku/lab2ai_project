<template>
  <div class="mobile_tabMenu_wrap">
    <ul>
      <li
        :class="{active: activeIdx == idx}"
        @click="onClickMenu(idx)"
        v-for="(menu, idx) in menus"
        :key="idx"
      >
      {{ menu }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      activeIdx: 0,
      menus: [
        'Sign History',
        '채팅톡',
        '추천채널',
      ],
    }
  },
  methods: {
    ...mapActions('signStore', ['setMobileActiveTabIdx']),
    onClickMenu(idx) {
      this.activeIdx = idx;
      this.setMobileActiveTabIdx(idx);
    },
  }
}
</script>

<style lang='scss'>
  @import './css/mobileTabMenu.scss';
</style>