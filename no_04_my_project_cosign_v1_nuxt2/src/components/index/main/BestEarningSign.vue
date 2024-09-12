<template>
  <div class="bestEarningSign_wrap">
    <div class="title">
      <!-- <div class="titIcon"><img :src="`${$static.imgUrl}index/main/bestEarning_icon.svg`" alt="아이콘"></div> -->
      <div class="text">
        <h1>최고 수익 SIGN</h1>
        <p>최근 종료된 예측 SIGN 중</p>
        <p>최고 수익을 기록한 BEST SIGN</p>
      </div>
      <span class="date">{{ updateTime }} 기준</span>
    </div>
    <div class="swiperSlide_wrap" v-if="items.length > 0">
      <div class="swiperHidden_wrap">
        <div class="swiper" v-swiper:myDirectiveSwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, idx) in items" :key="idx">
              <div class="slide_inner clearFix" :class="{ranker: idx+1 <= 1, last: idx+1 >= 10}">
                <div class="ranking">
                  <img v-if="idx+1 <= 1" :src="`${$static.imgUrl}index/main/topRanker_bg.png`" alt="1등이미지">
                  {{ idx+1 }}
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
                          <div class="mentorImg"><img :src="item.mentorImg" :alt="item.mentorTitle"></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev button BestEarningSign-button-prev" slot="button-prev" v-show="swiperNavFlag">
        <i class="xi-angle-left"></i></div>
      <div class="swiper-button-next button BestEarningSign-button-next" slot="button-next" v-show="swiperNavFlag">
        <i class="xi-angle-right"></i></div>
    </div>  <!--swiperSlide_wrap-->
    <div class="noItems" v-else>
      <p><i class="xi-error-o"></i>최근 등록된 싸인이 없습니다</p>
    </div>
  </div>  <!--BestEarningSign_wrap-->
</template>

<script>
import { index } from '@/src/mixin/index.js';

export default {
  mixins: [index],
  props: ["bestEarningSigns"],
  data() {
    const that = this;
    return {
      swiperNavFlag: true,
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
            if(this.slides.length <= 3) that.swiperNavFlag = false;
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
      items: (this.bestEarningSigns.highestProfitSignRes) ? this.bestEarningSigns.highestProfitSignRes.map(item => {
        return {
          ...item,
          url: `/${item.mentorId}/${item.subSeqId}`,
          earningRateText: item.earningRate.toFixed(2).split('.'),
          validationText: this.getMinuteText(item.validateMin),
        }
      }) : [],
      updateTime: this.bestEarningSigns.curTime,
      interval: null,
    }
  },
  async mounted() {
    // await this.loadSign();
    this.updateTime = Date.parseUtcText(this.updateTime).format('MM-dd HH:mm');
  },
  methods: {
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
  @import '@/src/components/index/main/css/bestEarningSign.scss';
</style>