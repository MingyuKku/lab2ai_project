<template>
  <div class="signHistory_wrap" :class="{active: mobileActiveTabIdx === 0}">
    <div class="list_head">
      <h1>Sign history</h1>
    </div>

    <div class="list_body">
      <!-- <div class="top_shadow body_shadow"></div>
      <div class="bottom_shadow body_shadow"></div> -->

      <div class="history_list_area" ref="history_list_area">
          <sign-history-item
            class="sign_list_item"
            v-for='(history, idx) in signHistories'
            :key='history.id'
            :history='history'
            :idx='idx'
          />
      </div>
    </div>
    <BtnEffect
      class="moreBtn"
      duration='0.6'
      color='#A1B2FF'
      v-if="isloading"
    >
    <button type="button" @click="onClickLoadNewHistories">
      <i class="xi-plus"></i><span>더보기</span>
    </button>
    </BtnEffect>
  </div>
</template>

<script>
import BtnEffect from '@/components/common/BtnEffect.vue'
import SignHistoryItem from '@/components/mentorPage/main/SignHistoryItem.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    SignHistoryItem, BtnEffect
  },
  data(){
    return {
      contents: [],
      isloading: true,
    }
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.onScroll);
  },
  watch: {
    async pageId(val) {
      if(val !== null) {
        let res = await this.loadHistories({
          pageId: val
        });
        if(res.data.isLastPage) {
          this.isloading = false;
        }
        // window.addEventListener('scroll', this.onScroll);
      }
    }
  },
  computed: {
    ...mapGetters('signStore', ['signHistories', 'pageId', 'pageNo', 'signHistoriesTotalPageCount', 'mobileActiveTabIdx'])
  },
  methods: {
    ...mapActions('signStore', ['loadHistories', 'setPageNo']),
    onClickLoadNewHistories() {
      this.loadNewHistories();
    },
    // onScroll() {
    //   const doc = document.documentElement;
    //   if(this.isloading === false && doc.scrollTop >= doc.scrollHeight - doc.clientHeight - 1000) {
    //     this.loadNewHistories();
    //   }
    // },
    async loadNewHistories() {
      if(this.isloading) {
        let res = await this.loadHistories({
          pageId: this.pageId
        });
        if(res.data.isLastPage) {
          this.isloading = false;
        }
      }
    }
  },
}
</script>

<style lang='scss'>
  @import './css/signHistory.scss';
</style>