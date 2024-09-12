<template>
  <div class="guideLine_wrap">
    <div class="title">
      <div class="title_icon"><img :src="`${imgURL}index/main/guidePage/book_icon.svg`" alt="백서아이콘"></div>
      <h1><span>코싸인</span> 활용백서</h1>
    </div>
    <GuideChapter v-for="(data,idx) in chapterData" :key="idx" :index="idx">
      <template #img>
        <div class="contImg"><img :src="data.img" alt="가이드이미지"></div>
      </template>
      <template #contents>
        <div class="number">#0{{idx+1}}</div>
        <h1>{{ data.tit }}</h1>
        <p v-html="data.cont" :class="{txtRight: idx === 3 || idx === 5}"></p>
      </template>
    </GuideChapter>
  </div>

</template>

<script>
import GuideChapter from '@/components/guidePage/GuideChapter.vue';
export default {
  components: {GuideChapter},
  data() {
    return {
      chapterData: [
        {img: `${process.env.VUE_APP_IMG_URL}index/main/guidePage/guideImg1.png`,
         tit: '원하는 멘토를 구독하세요', cont: '<span>멘토</span>의 기본 프로필과 평균 수익률, 적중률을 확인할 수 있어요.<br>최근 수익률 그래프에서 COSIGN 전체 멘토와 수익률을 한눈에 비교해 보세요. 멘토 상세 설명은 더보기에서 확인이 가능합니다. 멘토의 예측이 궁금하다면 <span>구독</span> 버튼을 눌러주세요!'},
        {img: `${process.env.VUE_APP_IMG_URL}index/main/guidePage/guideImg2.png`,
         tit: '다양한 예측들을 살펴보세요', cont: '멘토를 구독한 사용자들만 받을 수 있는 혜택 <span>SIGN ON!</span> 현재 진행중인 SIGN들 중 원하는 코인을 선택하여 <span>예측 시세</span>를 확인하세요. 코인을 매수할 가격과 목표로 정한 매도가, 코인 시세가 떨어졌을때 매도할 가격을 제공하여 거래를 도와줘요.'},
        {img: `${process.env.VUE_APP_IMG_URL}index/main/guidePage/guideImg3.png`,
         tit: '멘토의 과거가 궁금하다면, 한눈에 볼 수 있어요!', cont: '멘토의 <span>과거 SIGN</span>을 모두 공개합니다! 첫 번째 SIGN부터 최근 종료된 SIGN까지, <span>모든 수익률</span>을 확인해 보세요~ 과거를 더 알고 싶다면 SIGN을 클릭해 주세요.'},
        {img: `${process.env.VUE_APP_IMG_URL}index/main/guidePage/guideImg5.png`,
         tit: '새로 등록된 예측을 위한 알림 설정~', cont: '멘토가 <span>새로운 예측</span>을 등록하면 <span>알림을</span> 보내드립니다.<br>알림을 클릭하면 SIGN ON으로 바로 이동할 수 있어요. 등록된 SIGN을 빠르게 확인하고 싶다면 알림을 허용해 주세요!'},
        {img: `${process.env.VUE_APP_IMG_URL}index/main/guidePage/guideImg6.png`,
         tit: '주요 SIGN만 빠르게 확인!', cont: '수익률이 높은 종목이 궁금한 분들을 위한 <span>최고 수익 SIGN!</span> 평소 단타를 하는 사용자들을 위한 예측 시간이 짧은 <span>초 단타 SIGN!</span> 메이저 코인만 거래하는 사용자들을 위한 <span>메이저 코인 SIGN!</span>'},
        {img: `${process.env.VUE_APP_IMG_URL}index/main/guidePage/guideImg7.png`,
         tit: '이제 SIGN들을 확인하러 가볼까요?', cont: '현재 <span>진행중인 SIGN</span>과 <span>종료 SIGN</span>도 볼 수 있답니다. 다양한 코인 종목에 투자를 하는 사람들을 위한 전체 코인 리스트, 지금 출발합니다.'},
      ]
    }
  }
}
</script>

<style lang='scss'>
  @import './css/guideLine.scss';
</style>