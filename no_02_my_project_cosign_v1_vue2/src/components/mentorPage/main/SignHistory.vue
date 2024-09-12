<template>
  <div class="signHistory_wrap" :class="{active: mobileActiveTabIdx === 0}">
    <div class="list_head">
      <!-- <h1>Sign history</h1> -->
      <h1><img :src="`${imgURL}mentorPage/sign_off_title.png`" alt=""></h1>
      <!-- <h1><img src="@/images/test.svg" alt=""></h1> -->
      <!-- <h1><img src="@/images/test3.png" alt=""></h1> -->
    </div>

    <div class="list_body">
      <!-- <div class="top_shadow body_shadow"></div>
      <div class="bottom_shadow body_shadow"></div> -->

      <div class="history_list_area" ref="history_list_area">
          <SignHistoryItem
            class="sign_list_item"
            v-for='(history, idx) in signHistories' :key='history.id'
            :history='history'
            :idx='idx'
          />
      </div>
    </div>
    <BtnEffect
      class="moreBtn"
      duration='0.6'
      color='#FE8295'
      v-if="isloading === false && isLastPage === false"
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
      isloading: false,
    }
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.onScroll);
  },
  watch: {
    mentorId(val) {
      if(val !== null) {
        this.loadHistories({
          mentorId: val
        });
        // window.addEventListener('scroll', this.onScroll);
      }
    },
  },
  computed: {
    ...mapGetters('signHistoryStore', ['signHistories', 'isLastPage']),
    ...mapGetters('signStore', ['mobileActiveTabIdx']),
    ...mapGetters('mentorRouteStore', ['mentorId'])
  },
  mounted() {
    if(this.mentorId !== null) {
      this.loadHistories({mentorId: this.mentorId});
    }
  },
  methods: {
    ...mapActions('signHistoryStore', ['loadHistories']),
    onClickLoadNewHistories() {
      this.loadNewHistories();
    },
    async loadNewHistories() {
      if(this.isloading === false) {
        this.isloading = true;
        
        await this.loadHistories({
          mentorId: this.mentorId
        });

        this.isloading = false;
      }
    }
  },
}
</script>

<style lang='scss'>
  @import './css/signHistory.scss';
</style>