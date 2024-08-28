<template>
  <div class="SubscribedMentor_area" ref="SubscribedMentor_area" :class="{active: active}">
    <BtnEffect 
      class="followerList"
      duration='0.7'
      color='#EAEAEA'
    >
      <div class="inner" @click="onClickFollowerList">
        <div class="profile">
          <div class="profile_img">
            <img :src="mentor.profileImage" alt="프로필이미지" @error="onImageError">
          </div>
          <h1 class="profile_tit">{{mentor.title}}</h1>
        </div>
        <p class="newNotice" v-if="mentor.alarmCount > 0"><span>{{mentor.alarmCount}}</span></p>
      </div>
    </BtnEffect>
    
    <div class="followerList_signList"
      v-if="active && mentor.items !== null && mentor.items.length > 0"
      :style="{height: active? mentor.size : null}"
    >
      <a class="sign" v-for="item in mentor.items" :key="item.signId" :href="`/m/${item.mentorId}/${item.sub_seq_id}`">
        <div class="coinCode">
          <div class="opacity">
            <div class="coinImg"><img :src="item.coinImageUrl" alt="코인이미지"></div>
            <p>{{item.coin.substr(4)}}</p>
          </div>
          <h2>{{item.coinName}}</h2>
        </div>
        <div class="buyPrice">
          <div class="opacity">
            <div class="buyPriceIcon"><img :src="`${imgURL}index/top/alarmIcon_buy_price.svg`" alt="진입가아이콘"></div>
            <p><span>{{item.start_price}}</span>원</p>
          </div>
          <h2>예상 진입가</h2>
        </div>
        <div class="earning">
          <div class="opacity">
            <div class="earningIcon" :style="{background: `rgba(${item.valueColor},0.14)`}">
              <i :class="item.earning_rate <= 0 ? 'xi-trending-down':'xi-trending-up'" :style="{color: `rgb(${item.valueColor})`}"></i>
            </div>
            <p :style="{color: `rgb(${item.valueColor})`}">
              <span>{{item.earning_rate}}</span>%
            </p>
          </div>
          <h2>수익률</h2>
        </div>        
        <div class="remainTime">
          <div class="opacity">
            <div class="remainTimeIcon"><img :src="`${imgURL}index/top/alarmIcon_time.svg`" alt="시간아이콘"></div>
            <span v-if="item.is_end === false">{{item.remain_time}}</span>
            <span v-else>종료</span>
          </div>
          <h2>게시 시간</h2>
        </div>
      </a>
    </div>
    <div v-else class="no_signList" ref="no_signList" 
      :style="active ? {height: '50px'} : {height:0}"
    >
      <i class="xi-error"></i><p>최근 등록된 SIGN이 없습니다.</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import {API_URL} from '@/core/apiUrl';
import BtnEffect from '@/components/common/BtnEffect.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {BtnEffect},
  props: {
    idx: Number,
    mentor: Object,
    active: Boolean,
    changeActive: Function
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('mentorRouteStore', ['mentorId']),
  },
  methods: {
    ...mapActions('loginStore', ['loadMentorAlarmSignItems']),
    async onClickFollowerList() {
      if(this.active) {
        this.changeActive(null);
      } else {
        this.changeActive(this.idx);
        // 클릭한 멘토의 싸인 아이템을 로드
        await this.loadMentorAlarmSignItems({mentorPageId: this.mentor.mentorPageId, idx: this.idx});
        this.$emit('changeScrollTop', this.$refs.SubscribedMentor_area.offsetTop)
      }
        
    },
    onImageError(e) {
      e.target.src = `${process.env.VUE_APP_IMG_URL}index/main/profile_picture1_img.png`;
    },
    // async loadAlarmItems() {
    //   const res = await axios.post(`${API_URL}/api/alarm/get/${this.mentor.mentorPageId}`, {}, {withCredentials: true});
      
    //   this.mentor.items = res.data.map(item => {
    //       return {
    //         ...item,
    //         start_price: item.start_price > 1000? item.start_price.toLocaleString(): item.start_price,
    //         earning_rate: ((item.target_price / item.start_price - 1) * 100).toFixed(2),
    //         remain_time: new Date(item.start_time).diffNow()
    //       }
    //   })

    //   this.mentor.size = this.mentor.items !== null? `${this.mentor.items.length * 68}px`: null;
    // }
  }
}
</script>

<style lang='scss'>
  @import './css/mentorAlarmItem.scss';
</style>