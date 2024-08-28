<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>차트 유사 패턴 AI</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>가상화폐의 일별 시세, 원 달러 시세, 변동성 시세와 같은 대부분의 금융 시계열 자료는 일반적인 통계 이론이나 통계적 분석 방법으로는 다루기가 어려워 별도의 시계열 분석 방법을 사용합니다. 이는 유사도를 계산할 때에도 마찬가지로, 시계열 데이터에 특화된 유사도 계산 알고리즘을 사용해야 합니다. 차트 유사 패턴 AI 멘토는 시계열 데이터의 유사도를 계산하는 DTW(Dynamic Time Warping) 알고리즘을 사용해 실시간으로 현재 패턴과 유사한 과거 패턴을 탐색하고 그 결과를 종합하여 가격을 예측합니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(사례기반)</li>
            <li>예측 코인: 전체 코인</li>
            <li>예측 길이: 최소 3시간 ~ 최대 24시간</li>
            <li>예측 빈도: 약 200회/1일</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>알고리즘은 유사한 과거 패턴을 찾기 위해 두 시계열 데이터를 비교하여 유사도를 계산하는 과정을 반복합니다. 이때, 우리가 일반적으로 데이터 간의 유사성을 따질 때 사용하는 측도인 유클리드 거리를 사용하면 같은 시간 선상에 대해 거리를 계산하므로 왼쪽 그림과 같이 특징적인 부분이 지연되거나, 다른 비율을 갖는 경우 정확하게 비교할 수 없게 됩니다.</p>
          <p>이러한 문제는 DTW(Dynamic Time Warping) 알고리즘을 사용하여 해결할 수 있습니다. DTW의 아이디어는 동일한 시간 선상의 데이터뿐 아니라 주변 시점까지 비교 대상으로 사용하여 더 비슷한 요소와 매칭하는 것으로, 오른쪽 그림처럼 DTW를 사용하면 서로 다른 위치에 있는 유사 패턴을 찾아 비교할 수 있게 됩니다.</p>
          <div class="descImg_wrap row">
            <div class="desc_img1">
              <div class="img"><img :src="`${imgURL}mentorPage/modelDescription/dtw_desc1.png`" alt="설명이미지"></div>
              <span>그림 1. 유클리드 거리를 사용한 유사도 계산(위),<br>DTW를 사용한 유사도 계산(아래)</span>
            </div>
            <div class="desc_img2">
              <div class="img"><img :src="`${imgURL}mentorPage/modelDescription/dtw_desc2.png`" alt="설명이미지"></div>
              <span>그림 2. 유사 패턴 탐색 결과. 현재 패턴(빨간색), 과거 패턴(파란색)</span>
            </div>
          </div>
          <p>위의 유사도 계산 방법을 모든 과거 시점에 대해 반복하여 가장 유사한 n개의 패턴을 얻게 됩니다. 그 결과는 위 그림과 같이 유사 패턴들의 시점과 가격 흐름 정보로 구성됩니다. 최종적으로, 가격 예측은 가장 유사했던 n개 패턴의 이후 흐름을 종합하여 산출하며, 특정 패턴 이후에 대부분 상승하였으면 상승 예측을, 대부분 하락하였으면 하락 예측이 생성됩니다.</p>
        </div>
        <div class="source">
          <h1>출처</h1>
          <p>
            그림 1. XantaCross, CC BY-SA 3.0
            <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">https://creativecommons.org/licenses/by-sa/3.0,</a>
            via Wikimedia Commons
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import commonModelDesc from '@/mixin/commonModelDesc';
export default {
  name: 'Dtw',
  mixins: [commonModelDesc],
  // props: {
  //   active: Boolean,
  // },
  data() {
    return {
    };
  },

  mounted() {
    // console.log('모달창?', this.active)
  },

  methods: {
  },
};
</script>

<style lang="scss">
  @import './css/commonModelDesc.scss';
</style>