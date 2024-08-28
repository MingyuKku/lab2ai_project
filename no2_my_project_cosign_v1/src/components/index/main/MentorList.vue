<template>
  <div class="mentorList_wrap">
    <div class="title">
      <div class="title_list_wrap">
        <div class="title_list" ref="title_list" v-for="(mentorListTit, idx) in mentorListData" :key="idx"
          :class="{active: activeListIndex === idx}" @click="activeListIndex = idx">
          <div class="list_inner" v-if="mentorListTit.list.length > 0">
            {{ mentorListTit.listName }}
          </div>
        </div>
        <span class="activeStick" ref="activeStick"></span>
      </div>
    </div>
    <div class="mentorList" v-for="(data, idx) in mentorListData" :key="idx">
      <div class="swiper_wrap" v-if="activeListIndex === idx">
        <swiper class="swiper" :options="swiperOption" ref="swiper" v-if="data.list.length > 0">
          <swiper-slide v-for="(mentor,idx2) in data.list" :key="idx2">
            <div class="inner">
              <a :href="`/m/${mentor.url}`">
                <div class="mentorImg"><img :src="mentor.profileImage" alt="멘토이미지" @error="onImageError"></div>
                <h2>{{ mentor.mentorTitle }}</h2>
              </a>
            </div>
          </swiper-slide>
        </swiper>
        <div class="nonSwiperItems" v-else>
          <h2>등록된 멘토가 존재하지 않습니다.</h2>
        </div>
        <div class="swiper-button-prev button mentorList-button-prev" slot="button-prev" v-if="activeListIndex === idx && data.list.length > 0">
          <i class="xi-angle-left"></i></div>
        <div class="swiper-button-next button mentorList-button-next" slot="button-next" v-if="activeListIndex === idx && data.list.length > 0">
          <i class="xi-angle-right"></i></div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/core/apiUrl';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import { mapGetters } from 'vuex';  
export default {
  name: 'CosignDevMentorList',
  components: {
    swiper, swiperSlide, 
  },
  data() {
    return {
      activeListIndex: 0,
      mentorListData: [
        {listName: '전체멘토', list: []},
        {listName: '구독중인 멘토', list: []},
      ],
      swiperOption: {
        speed: 800,
        // loop: true,
        // autoplay: {
        //   delay: 4000,
        //   disableOnInteraction: false,
        // },
        // parallax: true,
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
          },
        }
      },
    };
  },

  mounted() {
    this.setTotalMentorList();
    this.setSubscribeMentor();
    this.moveStick();
  },
  watch: {
    loginInfo(val) {
      if(val !== null) {
        this.setSubscribeMentor();
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
    async setTotalMentorList() {
      await axios.get(`${API_URL}/api/mentor_page/success_rate/main`)
      .then(res=> {
        this.mentorListData[0].list = res.data.totalMentorLists;
      })
      .catch(err=> {
        console.log('전체멘토에러', err)
      })
    },
    async setSubscribeMentor() {
      if(this.loginInfo !== null) {
        await axios.post(`${API_URL}/api/main/subscribing_mentor`, {}, {withCredentials: true})
        .then(res=> {
          this.mentorListData[1].list = res.data.map(d=> {
            return {
              mentorTitle: d.title,
              profileImage: d.profileImage,
              url: d.mentor.username,
            }
          })
        })
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