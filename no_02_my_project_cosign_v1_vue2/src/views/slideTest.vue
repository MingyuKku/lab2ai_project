<template>
  <div class="home">
    <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
      <!-- :style="renderExFlag ? {left: `${virtualData.offset}px`}: {left: '0px'}" -->
      <swiper-slide v-for="(slide, index) in virtualData.slides" :key="index"
        :style="{left: `${virtualData.offset}px`}"
      >
        <div class="inner_wrap">
          <h1 class="coinImg"><img :src="slide.coinImageUrl" alt=""></h1>
          <p class="coinName">{{slide.coinName}}</p>
          <span>SIGN ID{{slide.id}}</span>
          <p class="validationMin">유효기간: {{slide.validateMinutes}}</p>
          <p class="startT"> {{slide.startTime}} </p>
          <p class="endT"> {{slide.endTime}} </p>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev button modal_swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next button modal_swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  name: 'Home',
  components: {
		swiper,
    swiperSlide
	},
  props: ['dataSource'],
  data() {
    let that = this;
    return {
      clickPos: 18,
      nextPos: 0,
      prevPos: 0,
      virtualData: {
        slides: []
      },
      swiperOptions: {
        speed: 250,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 20,
        touchRatio: 1,
        renderExternalUpdate: true,
        navigation: {
          nextEl: '.modal_swiper-button-next',
          prevEl: '.modal_swiper-button-prev'
        },
        virtual: {
          renderExternal(data) {
            that.virtualData = data;
            console.log('renderExternal', data, this.activeIndex);
            
          },

        },
        on: {
          slideChange() {
            console.log('체인지 액티브인덱스', this.activeIndex, this.swipeDirection)
            if(this.isEnd) {
              let appendSlide = that.dataSource.slice(that.nextPos,that.nextPos+3)
              that.nextPos = that.nextPos + 3;
              this.virtual.appendSlide(appendSlide);
              console.log('맨오른쪽', appendSlide)
            }
          },
          transitionEnd() {
            console.log('슬라이드종료','액티브인덱스', this.activeIndex, this.swipeDirection)
            if(this.swipeDirection === 'prev' && this.activeIndex === 0) {
              console.log('왼쪽끝지점 포인트보자', that.prevPos)
              if(that.prevPos-3 >= 0) {
                for(let i = that.prevPos-1; i >= that.prevPos-3; i--) {
                  this.virtual.prependSlide(that.dataSource[i])
                  console.log('슬라이드 추가', this)
                }
                that.prevPos = that.prevPos - 3;
              }
            }
          }
          // init() {
          //   console.log('슬라이드로드', that.show)
          // }
        }
      }
    }
  },
  mounted() {
  },
  watch: {
    dataSource(val) {
      console.log('데이터넘어왔니',val)
      this.$nextTick(()=> {
        let swiper = this.$refs.mySwiper.swiper
        if(swiper.virtual.to === -1) {
          this.virtualData.slides = val.slice(0,2);
        }
        this.nextPos = this.clickPos;
        this.prevPos = this.clickPos;
        swiper.virtual.slides = val.slice(this.nextPos,this.nextPos+3);
        this.nextPos = this.nextPos + 3;
        // swiper.virtual.slides = val;
      })
    }
  },
  computed: {
  },
  methods: {
  }
  
}
</script>

<style scoped lang='scss'>
  .swiper {
      width: 60%;
      height: 100vh;
      background: #111;
      .swiper-slide {
        position: relative;
        width: 100%;
        height: auto;
        background: #999;
        overflow: hidden;
        .inner_wrap {
          width: 100%;
          height: 100%;
          padding: 24px;
          .coinImg {
            width: 200px;
            img {
              display: block;
              width: 100%;
            }
          }
          .coinName {
            font-size: 24px;
            font-weight: 500;
            color: yellowgreen;
          }
          .validationMin {
            font-size: 24px;
            font-weight: 500;
            color: orange;
          }
          .startT {
            font-size: 19px;
            font-weight: 500;
            color: teal;
          }
          .endT {
            font-size: 19px;
            font-weight: 500;
            color: salmon;
          }
        }
      }
    }

</style>
