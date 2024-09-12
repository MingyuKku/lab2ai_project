<template>
  <div class="majorCoinSign_wrap">
    <div class="title">
      <!-- <div class="titIcon"><img :src="`${imgURL}index/main/majorCoin_icon.svg`" alt="아이콘"></div> -->
      <h1>메이저 코인 SIGN</h1>
    </div>
    <div class="swiperSlide_wrap" v-if="this.items.length > 0">
      <swiper class="swiper" ref="swiper" :options="swiperOption">
        <swiper-slide v-for="(item, idx) in items" :key="idx">
          <a :href="item.url">
            <div class="slide_inner">
              <div class="content_wrap">
                <div class="float_validation">
                  <img :src="`${imgURL}index/main/validation_icon.svg`" alt="유효기간 아이콘">
                  <p v-html="item.minuteTextEng"></p>
                </div>
                <div class="mentor">
                  <div class="marquee" ref="marquee_wrap" @mouseenter="marqueeIn(idx, 2000)" @mouseleave="marqueeOut(idx)">
                    <h2 ref="marquee">
                      {{ item.mentorTitle }}
                    </h2>
                  </div>
                  <div class="mentorImg"><img :src="item.mentorImg" alt="멘토이미지"></div>
                </div>
                <div class="earning">
                  <h2>목표수익률</h2>
                  <p>{{ item.targetEarningRateText }}<span>%</span></p>
                </div>
                <div class="coin">
                  <!-- <div class="coinImg"><img :src="item.marketImg" alt="코인이미지"></div> -->
                  <h2>{{ item.market }}</h2>
                  <!-- <h3>{{ item.marketCode.substr(4) }}</h3> -->
                </div>
              </div>
              <div class="time">
                <p><i class="xi-time-o"></i>{{ item.startTimeText }} - {{ item.endTimeText }}</p>
                <div class="validation">{{ item.minuteText }} 예측</div>
              </div>       
            </div>  <!--slide_inner-->
          </a>
          
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev button highEarningSign-button-prev" slot="button-prev" v-if="allowNavFlag">
        <i class="xi-angle-left"></i>
      </div>
      <div class="swiper-button-next button highEarningSign-button-next" slot="button-next" v-if="allowNavFlag">
        <i class="xi-angle-right"></i>
      </div>
    </div>  <!--swiperSlide_wrap-->
    <div class="noItems" v-else>
      <p><i class="xi-error-o"></i>최근 등록된 싸인이 없습니다</p>
    </div>
  </div>  <!--BestEarningSign_wrap-->
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';
import { mixin_indexPageMixin } from '@/mixin/mixin_indexPage'
export default {
  components: {
    swiper, swiperSlide,
  },
  mixins: [mixin_indexPageMixin],
  data() {
    const that = this;
    return {
      allowNavFlag: true,
      swiperOption: {
        speed: 600,
        slidesPerView: 4,
        slidesPerGroup : 4,
        spaceBetween: 20,
        touchRatio: 0.8,
        navigation: {
          nextEl: '.highEarningSign-button-next',
          prevEl: '.highEarningSign-button-prev'
        },
        on: {
          init() {
            this.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.61, 1, 0.88, 1)';
            if(this.slides.length <= 4) that.allowNavFlag = false;
          },
          touchStart() {
            if(this.slides.length <= 4) {
              this.allowSlideNext = false;
              this.allowSlidePrev = false;
              // this.navigation.nextEl.classList.add('swiper-button-disabled')
              // this.navigation.prevEl.classList.add('swiper-button-disabled')
            }
          }
        }
      },
      items: [],
    }
  },
  async mounted() {
    await this.loadSign();
    // this.marqueeMentorName(3000);
  },
  methods: {
    async loadSign() {
      const res = await axios.get(`${API_URL}/api/main/major_coin_sign`);
      
      this.items = res.data.map(item => {
        return {
          ...item,
          url: `/m/${item.mentorId}/${item.subSeqId}`,
          minuteText: this.getMinuteText(item.validateMin, 'ko'),
          minuteTextEng: this.getMinuteText(item.validateMin, 'en'),
          targetEarningRateText: ((item.targetPrice / item.startPrice - 1) * 100).toFixed(2),
          startTimeText: new Date(item.startTime).format("HH:mm"),
          endTimeText: new Date(item.endTime).format("HH:mm"),
        }
      })
    },
    getMinuteText(minute, lang) {
      if(lang === 'ko') {
        if(minute / 60 < 1) {
          return `${minute}분`;
        } else {
          return `${Math.ceil(minute/60)}시간`;
        }
      } else if(lang === 'en') {
        if(minute / 60 < 1) {
          return `${minute}<span>min</span>`;
        } else {
          return `${Math.ceil(minute/60)}<span>hour</span>`;
        }
      }
    },
  }
}
</script>

<style lang='scss'>
  @import '@/components/index/main/css/majorCoinSign.scss';
</style>