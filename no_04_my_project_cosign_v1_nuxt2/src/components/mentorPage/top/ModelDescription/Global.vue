<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>글로벌 지표 AI</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>지난 몇 년간 비트코인과 금의 유사성에 주목해 이루어진 여러 연구들은 금, 주가 지수와 같은 경제 지표를 통해 비트코인 변동성 예측이 가능함을 보였습니다. 여기에 더해, 2019년 코로나 이후 미국의 양적완화와 기관들의 가상화폐 시장 진입은 거시경제와 가상화폐 시장의 상호 연관성이 더 높아지는 계기가 되었습니다. 이제, 비트코인이 거시경제와 밀접한 연관을 가진다는 사실에는 의심의 여지가 없으며, 거시경제지표는 가상화폐 가격 예측을 위해 필수적으로 고려해야할 요소가 되었습니다.</p>
          <p>글로벌 지표 AI는 금, 유가, 환율, 주가 지수 등 10여 종의 주요 거시경제지표 데이터를 기반으로 비트코인의 가격을 예측하는 딥러닝 모델입니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(딥러닝)</li>
            <li>예측 코인: 비트코인</li>
            <li>예측 길이: 12시간</li>
            <li>예측 빈도: 약 1회/1일</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>글로벌 지표 AI는 시계열 데이터 예측에 적극적으로 활용되고 있는 딥러닝 모델인 LSTM(Long Short-Term Memory)을 사용하여 비트코인 가격을 예측합니다. LSTM은 시퀀스 데이터를 다루기 위한 순환 신경망(Recurrent Neural Network) 기법의 하나로 셀, 입력 게이트, 출력 게이트, 망각 게이트를 이용해 기존 순환 신경망의 문제인 기울기 소멸 문제(Vanishing Gradient Problem)를 방지하고 긴 길이의 입력 시퀀스에 대해서도 좋은 예측 성능을 나타냅니다.</p>
          <!-- <p>가상화폐 가격과 같은 금융 시계열 데이터는 비정상(Non-Stationary) 시계열이면서, 서로 다른 주파수를 갖는 패턴이 복잡하게 얽혀 있어 모델의 학습이 매우 어려운 편에 속합니다. 이와 관련하여 이루어진 최근의 연구들은 시계열 데이터를 여러 주파수의 패턴으로 분해한 후 모델을 학습시키는 방법이 데이터를 정상 시계열로 변환함과 동시에 모델의 복잡도를 낮춰 학습이 원활하게 이루어지게 함을 보였습니다.</p>
          <p>글로벌 지표 AI 멘토는 CEEMD(Complete Ensemble Empirical Mode Decomposition) 알고리즘을 사용하여 시계열 데이터를 5~8개 내재모드함수(IMF, Intrinsic Mode Function)로 분해한 후, 각 내재모드함수 별로 학습된 LSTM(Long Short-Term Memory) 모델의 예측 결과를 종합해 원본 시계열 데이터에 대한 예측을 생성합니다.</p> -->
          <div class="descImg_wrap column">
            <div class="desc_img1">
              <div class="img"><img :src="`${$static.imgUrl}mentorPage/modelDescription/global_desc1.svg`" alt="설명이미지"></div>
              <span>그림 1. LSTM Sell 구조</span>
            </div>
            <div class="desc_img2">
              <div class="img"><img :src="`${$static.imgUrl}mentorPage/modelDescription/global_desc2.png`" alt="설명이미지"></div>
              <span>그림 2. 경제지표 feature 예시</span>
            </div>
          </div>
          <p>금, 유가, 환율, 주가 지수 등의 주요 거시경제지표의 변수 선택(Feature Selection)과 LSTM 모델의 하이퍼 파라미터(Hyper-parameter) 최적화를 위해 조건을 바꾸어가며 총 6천여 회의 백테스트를 수행하였으며, 누적 수익률을 최대화하는 최적 조건을 선택하였습니다.</p>
          <!-- <p>EMD(Empirical Mode Decomposition)는 FFT(Fast Fourier Transform), 웨이블릿 변환(Wavelet transform)과는 다르게 입력 데이터에 따라 기저 함수가 결정되는 스펙트럼 분해 알고리즘으로, 시퀀스의 특성이 특정 구간에서 변하는 비선형성을 갖는 경우에도 분해가 가능한 특징이 있습니다. EMD 알고리즘은 시퀀스의 최대값, 최소값을 이용한 포락선 생성과 시퀀스에서 해당 포락선의 평균을 제거하는 과정(시프팅)을 반복해 각 내재모드함수를 얻습니다. 시프팅은 이전 시프팅 사이클과의 차이가 특정 기준 이하가 되거나, 잔차에 두 개의 극단 값만 남게 되면 종료됩니다. </p>
          <p>CEEMD는 EMD를 기반으로 하는 스펙트럼 분해 알고리즘으로, 시프팅 과정에서 일정한 크기의 잡음을 더해 EMD 알고리즘에서 나타나는 Mode Mixing 문제를 해결하였으며, 각 시프팅 결과를 평균하여 원래 신호를 정확하게 복원합니다.</p> -->
        </div>
        <div class="source">
          <h1>출처</h1>
          <p>
            그림 1. Guillaume Chevalier, CC BY-SA 4.0 
            &#60;<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">https://creativecommons.org/licenses/by-sa/4.0,</a>&#62;
            via Wikimedia Commons
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import model from '@/src/mixin/model'
export default {
  name: 'Dtw',
  mixins: [model],
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