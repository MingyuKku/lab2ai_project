<template>
  <div class="SubscribedMentor_area" :class="{active: active}">
    <BtnEffect 
      class="followerList"
      duration='0.7'
      color='#DAD3D3'
    >
      <div class="inner" @click="onClickFollowerList">
        <div class="profile">
          <div class="profile_img">
            <img :src="mentor.profileImage" alt="프로필이미지" @error="onImageError">
          </div>
          <h1 class="profile_tit">{{mentor.title}}</h1>
        </div>
        <p class="newNotice"><span>{{mentor.alarmCount}}</span>+</p>
      </div>
    </BtnEffect>
    <div class="followerList_signList" :style="{height: active? mentor.size: null}">
      <a class="sign" v-for="item in mentor.items" :key="item.signId">
        <div class="coinCode">
          <div class="opacity">
            <div class="coinImg"><img :src="item.coinImageUrl" alt="코인이미지"></div>
            <p>{{item.coin.substr(4)}}</p>
          </div>
          <h2>코인코드</h2>
        </div>
        <div class="buyPrice">
          <div class="opacity">
            <div class="buyPriceIcon"><img src="@/images/index/top/buyPriceIcon.svg" alt="진입가아이콘"></div>
            <p><i class="xi-won"></i><span>{{item.start_price}}</span></p>
          </div>
          <h2>예상 진입가</h2>
        </div>
        <div class="earning">
          <div class="opacity">
            <div class="earningIcon"><img src="@/images/index/top/earningIcon.svg" alt="수익률아이콘"></div>
            <p><span>{{item.earning_rate}}</span>%</p>
          </div>
          <h2>예상수익률</h2>
        </div>
        <div class="remainTime">
          <div class="opacity">
            <div class="remainTimeIcon"><img src="@/images/index/top/timeIcon.svg" alt="시간아이콘"></div>
            <span>{{item.remain_time}}</span>
          </div>
          <h2>게시 시간</h2>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';
import BtnEffect from '@/components/common/BtnEffect.vue';

export default {
  components: {BtnEffect},
  props: {
    followerListIdx: Number,
    mentor: Object,
    active: Boolean,
    changeActive: Function
  },
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL
    }
  },
  computed: {

  },
  methods: {
    onClickFollowerList() {
      if(this.active) {
        this.changeActive(null);
      } else {
        this.changeActive(this.followerListIdx);
        this.loadAlarmItems();
        this.mentor.alarmCount = 0;
      }
    },
    onImageError(e) {
      e.target.src = require("@/images/index/main/profile_picture1_img.png");
    },
    async loadAlarmItems() {
      const res = await axios.post(`${API_URL}/api/alarm/get/${this.mentor.mentorPageId}`, {}, {withCredentials: true});
      
      this.mentor.items = res.data.map(item => {
          return {
            ...item,
            start_price: item.start_price > 1000? item.start_price.toLocaleString(): item.start_price,
            earning_rate: ((item.target_price / item.start_price - 1) * 100).toFixed(2),
            remain_time: new Date(item.start_time).diffNow()
          }
      })

      this.mentor.size = this.mentor.items !== null? `${this.mentor.items.length * 68}px`: null;
    }
  }
}
</script>

<style lang='scss'>
  @import './css/mentorAlarmItem.scss';
</style>