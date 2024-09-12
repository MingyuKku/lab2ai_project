<template>
  <div class="mentorList_wrap">
    <div class="title">
      <div class="title_list_wrap">
        <div class="title_list" ref="title_list" v-for="(mentorListTit, idx) in mentorListData" :key="idx"
          :class="{active: activeListIndex === idx}" @click="activeListIndex = idx">
          <div class="list_inner" v-show="mentorListTit.list.length > 0">
            {{ mentorListTit.listName }}
          </div>
        </div>
        <span class="activeStick" ref="activeStick" v-if="mentorListData[1].list.length > 0"></span>
      </div>
    </div>
    <div class="mentorList" v-for="(data, idx) in mentorListData" :key="idx">
      <div class="swiper_wrap" v-if="activeListIndex === idx">

        <div class="swiper" ref="swiper" v-swiper:myDirectiveSwiper="swiperOption" v-if="data.list.length > 0">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(mentor,idx2) in data.list" :key="idx2">
              <div class="inner">
                <a :href="`/${mentor.url}`">
                  <div class="mentorImg"><img :src="mentor.profileImage" :alt="mentor.mentorTitle" @error="onImageError"></div>
                  <h2>{{ mentor.mentorTitle }}</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="nonSwiperItems" v-else>
          <h2>등록된 멘토가 존재하지 않습니다.</h2>
        </div>
        <div class="swiper-button-prev button mentorList-button-prev" slot="button-prev" 
        v-show="activeListIndex === idx && data.list.length > 0 && swiperNavFlag">
          <i class="xi-angle-left"></i></div>
        <div class="swiper-button-next button mentorList-button-next" slot="button-next"
        v-show="activeListIndex === idx && data.list.length > 0 && swiperNavFlag">
          <i class="xi-angle-right"></i></div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';  

export default {
  name: 'CosignDevMentorList',
  props: ["totalMentors", "subscribedMentors"],
  data() {  
    const that = this;
    
    let subscribedMentors = [];

    if(this.subscribedMentors !== "") {
      subscribedMentors = this.subscribedMentors.map(mentor => {
        return {
          ...mentor,
          url: mentor.mentor.username
        }
      });
    }

    return {
      activeListIndex: 0,
      mentorListData: [
        {listName: '전체멘토', list: this.totalMentors},
        {listName: '구독중인 멘토', list: subscribedMentors},
      ],
      swiperNavFlag: true,
      swiperOption: {
        speed: 800,
        spaceBetween: 20,
        slidesPerView: 10,
        slidesPerGroup : 10,
        touchRatio: 1,
        navigation: {
          nextEl: '.mentorList-button-next',
          prevEl: '.mentorList-button-prev'
        },
        on: {
          init() {
            that.swiperNavFlag = true;
            if(this.slides.length <= 10) that.swiperNavFlag = false;
          },
        }
      },
    };
  },
  mounted() {
    if(this.mentorListData[1].length > 0) this.moveStick();
  },
  watch: {
    loginInfo(val) {
      this.setSubscribeMentor();

      if(val === null) {
        this.activeListIndex = 0;
      }
    },
    activeListIndex() {
      this.moveStick();
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']), 
  },
  methods: {
    async setSubscribeMentor() {
      if(this.loginInfo !== null) {
        const res = await this.$intApi.post(`/api/main/subscribing_mentor`, {}, {withCredentials: true});
        this.mentorListData[1].list = res.data.data.subscribingMentors;
      } else {
        this.mentorListData[1].list = [];
      }
    },
    moveStick() {
      this.$nextTick(()=> {
        let activeStick = this.$refs.activeStick;
        let title_list = this.$refs.title_list[this.activeListIndex];

        activeStick.style.width = (title_list.offsetWidth === 0) ? '90px':`${title_list.offsetWidth}px`;
        activeStick.style.transform = `translate3d(${title_list.offsetLeft}px, 0, 0)`;
      })
    },
    onImageError(e) {
      e.target.src = `${process.env.VUE_APP_IMG_URL_Mentor}default.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './css/mentorList.scss';
</style>