<template>
  <div class="bestEarningSign_wrap">
    <div class="title">
      <!-- <div class="titIcon"><img :src="`${imgURL}index/main/bestEarning_icon.svg`" alt="아이콘"></div> -->
      <div class="text">
        <h1>최고 수익 SIGN</h1>
        <p>최근 종료된 예측 SIGN 중</p>
        <p>최고 수익을 기록한 BEST SIGN</p>
      </div>
      <span class="date">{{ updateTime }} 기준</span>
    </div>
    <div class="swiperSlide_wrap" v-if="this.items.length > 0">
      <div class="swiperHidden_wrap">
        <swiper class="swiper" ref="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, idx) in items" :key="idx">
            <!-- <a :href="item.url"> -->
              <div class="slide_inner clearFix" :class="{ranker: item.rank <= 1, last: item.rank >= 10}">
                <div class="ranking">
                  <img v-if="item.rank <= 1" :src="`${imgURL}index/main/topRanker_bg.png`" alt="1등이미지">
                  {{ item.rank }}
                </div>
                <div class="content_wrap">
                  <a :href="item.url">
                    <div class="slide_content">
                      <div class="content_zindex">
                        <div class="mentor">
                          <div class="marquee" ref="marquee_wrap" @mouseenter="marqueeIn(idx, 2000)" @mouseleave="marqueeOut(idx)">
                            <h2 ref="marquee">
                              {{ item.mentorTitle }}
                            </h2>
                          </div>
                          <div class="mentorImg"><img :src="item.mentorImg" alt="멘토이미지"></div>
                        </div>
                        <div class="earning">
                          <h2>
                            <span>{{ item.earningRateText[0] }}</span>
                            <span>.{{ item.earningRateText[1] }}%</span>
                          </h2>
                          <p>수익</p>
                        </div>
                        <div class="coin">
                          <!-- <div class="coinImg"><img :src="item.marketImg" alt="코인이미지"></div> -->
                          <h2>{{ item.market }}</h2>
                          <!-- <h3>{{ item.marketCode.substr(4) }}</h3> -->
                        </div>
                        <p class="validation">{{ item.validationText }} 예측</p>
                      </div>
                    </div>
                  </a>
                </div>
                
              </div>  <!--slide_inner-->
            <!-- </a> -->
          </swiper-slide>
        </swiper>
      </div>
      <div class="swiper-button-prev button BestEarningSign-button-prev" slot="button-prev" v-if="allowNavFlag">
        <i class="xi-angle-left"></i>
      </div>
      <div class="swiper-button-next button BestEarningSign-button-next" slot="button-next" v-if="allowNavFlag">
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
import { mixin_indexPageMixin } from '@/mixin/mixin_indexPage';

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
        slidesPerView: 3,
        slidesPerGroup : 3,
        spaceBetween: 0,
        touchRatio: 0.8,
        navigation: {
          nextEl: '.BestEarningSign-button-next',
          prevEl: '.BestEarningSign-button-prev'
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
      updateTime: null,
      interval: null,
    }
  },
  async mounted() {
    await this.loadSign();
  },
  methods: {
    async loadSign() {
      const res = await axios.get(`${API_URL}/api/main/highest_profit`);
      this.updateTime = new Date(res.data.curTime).format('MM-dd HH:mm');
      this.items = res.data.highestProfitSignRes.map(item => {
        return {
          ...item,
          url: `/m/${item.mentorId}/${item.subSeqId}`,
          earningRateText: item.earningRate.toFixed(2).split('.'),
          validationText: this.getMinuteText(item.validateMin),
        }
      })
    },
    getMinuteText(minute) {
      if(minute / 60 < 1) {
        return `${minute}분`;
      } else {
        return `${Math.ceil(minute/60)}시간`;
      }
    }
  }
  
}

</script>

<style lang='scss'>
  @import '@/components/index/main/css/bestEarningSign.scss';
</style>