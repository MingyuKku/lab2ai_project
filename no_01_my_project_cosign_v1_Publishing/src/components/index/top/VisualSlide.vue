<template>
  <div class="visualSlide_wrap">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <div class="inner" @click="$router.push({name: 'MentorPage', params: {page_id: 'bb3977d2-92d7-4423-a833-7e13aabcad98'}})">
          <div class="textContent">
            <h2>시세예측 오픈 플랫폼</h2>
            <h1>COSIGN<br>GRAND OPEN!</h1>
            <p>AI 전문가가 예측한 코인 시세!
            <br>세계 최초 가상화폐 예측 오픈플랫폼
            <br>지금 바로 만나보세요!</p>
          </div>
        </div> 
      </swiper-slide>
      <swiper-slide>
        <div class="inner" @click="$router.push({name: 'MentorPage', params: {page_id: 'bb3977d2-92d7-4423-a833-7e13aabcad98'}})">
          <div class="textContent clearFix">
            <h2>시세예측 오픈 플랫폼</h2>
            <h1>COSIGN<br>GRAND OPEN!</h1>
            <p>AI 전문가가 예측한 코인 시세!
            <br>세계 최초 가상화폐 예측 오픈플랫폼
            <br>지금 바로 만나보세요!</p>
          </div>
        </div> 
      </swiper-slide>
      <swiper-slide>
        <div class="inner" @click="$router.push({name: 'MentorPage', params: {page_id: 'bb3977d2-92d7-4423-a833-7e13aabcad98'}})">
          <div class="textContent">
            <h2>시세예측 오픈 플랫폼</h2>
            <h1>COSIGN<br>GRAND OPEN!</h1>
            <p>AI 전문가가 예측한 코인 시세!
            <br>세계 최초 가상화폐 예측 오픈플랫폼
            <br>지금 바로 만나보세요!</p>
          </div>
        </div> 
      </swiper-slide>
      <div class="swiper-pagination index_visualSlide_pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  components: {
    swiper, swiperSlide, 
  },
  data() {
    return {
      swiperOption: {
        speed: 1300,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        touchRatio: 0.7,
        pagination: {
          el: '.index_visualSlide_pagination',
          clickable: true,
          // type: "fraction",
        },
      },
    }
  },
}
</script>

<style lang='scss'>
  @import '@/components/index/top/css/visualSlide.scss';
</style>