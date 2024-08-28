<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>등락폭 리샘플링</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>가상화폐 가격과 같은 금융 시계열 데이터에 존재하는 많은 잡음(noise)과 불확실성은 예측 모델의 학습을 어렵게 합니다. 특히, 무작위 변동이 존재하는 경우 모델은 예측 불가능한 데이터에 대한 오차를 동등하게 적용하는 문제가 있습니다. 이런 문제를 해결하기 위해, (<a href="https://www.sciencedirect.com/science/article/abs/pii/S1568494620301277?casa_token=pHeRH6QztOkAAAAA:sEvPxJDLfcCKJjrDKjRpK8FX8Uy4GEaKVRe6ket887lBBagw3PdCRxTFBzCuYhq0hXWlWEvaT1fx#!" target="_blank">Tomé AlmeidaBorges</a> et al, 2020)은 시계열 데이터를 의미 있는 단위로 재구성하여 모델을 학습하는 방법을 제안했습니다.[1] 등락폭 리샘플링 멘토는 이와 같은 관점에서, 유의미한 단위로 재구성된 가격 데이터를 사용하여 예측 모델을 학습합니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(머신러닝)</li>
            <li>예측 코인: 비트코인 등 105종</li>
            <li>예측 길이: 약 15분 ~ 24시간</li>
            <li>예측 빈도: 약 20회/1일</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>등락폭 리샘플링 멘토는 리샘플링, 기술지표 변환 과정을 거쳐 가공된 데이터를 예측 모델에 입력합니다.</p>
          <p>리샘플링 단계에서는 캔들 데이터에 존재하는 무작위 변동을 제거하기 위해 누적 등락폭을 기준으로 캔들 데이터를 재구성합니다. 이 작업은 초단기 변동이 예측 불가능한 랜덤 프로세스를 따르지만, 어느정도 등락이 누적된 후에는 예측 가능한 패턴이 나타난다는 가정을 기반으로 합니다. 데이터 재구성은 종가 변화율의 절대값이 일정 % 이상 누적되면 해당 캔들들을 하나의 캔들로 그룹핑하는 방식으로 진행되며, 그룹핑이 완료된 경우 변화율 누적값을 초기화합니다. 이 과정을 전체 데이터셋에 대해 수행하여 최종적으로 재구성이 완료된 데이터셋을 얻을 수 있습니다.</p>
          <p>재구성이 완료된 캔들 데이터는 MACD, EMA, OBV, RSI, ATR, SO, CCI 등의 기술 지표로 변환하여 예측 모델에 입력합니다. 기술 지표를 사용하여 시퀀스 모델을 사용하지 않고도 과거 데이터에 대한 정보를 모델에 효과적으로 전달할 수 있으며 Feature Extraction 과정을 거친 데이터는 모델의 복잡도를 낮춰 학습을 용이하게 합니다.</p>
          <div class="descImg_wrap column">
            <div class="desc_img1 updown">
              <div class="img"><img :src="`${imgURL}mentorPage/modelDescription/updown_desc1.png`" alt="설명이미지"></div>
              <span>그림 1. 캔들 재구성 전(왼쪽)과 캔들 재구성 후(오른쪽) (<a href="https://www.sciencedirect.com/science/article/abs/pii/S1568494620301277?casa_token=pHeRH6QztOkAAAAA:sEvPxJDLfcCKJjrDKjRpK8FX8Uy4GEaKVRe6ket887lBBagw3PdCRxTFBzCuYhq0hXWlWEvaT1fx#!" target="_blank">Tomé AlmeidaBorges</a> et al, 2020)</span>
            </div>
          </div>
        </div>
        <div class="source">
          <h1>References</h1>
          <p>
            <!-- [1]
            <a href="https://www.sciencedirect.com/science/article/abs/pii/S1568494618306707?casa_token=8Ly8XA7d7-wAAAAA:yKhvgc32HtyzRjJXxZDn1j_qIGqzteDDEC0SItZ92NSzupa7pAI7-w5a47NQT7Io5Oi5fKuOQeCR#!" target="_blank">Dennys C.A.Mallqui</a>,
            <a href="https://www.sciencedirect.com/science/article/abs/pii/S1568494618306707?casa_token=8Ly8XA7d7-wAAAAA:yKhvgc32HtyzRjJXxZDn1j_qIGqzteDDEC0SItZ92NSzupa7pAI7-w5a47NQT7Io5Oi5fKuOQeCR#!" target="_blank">Ricardo A.S.Fernandes</a>.
            Predicting the direction, maximum, minimum and closing prices of daily Bitcoin exchange rate using machine learning techniques.
            <a href="https://www.sciencedirect.com/journal/applied-soft-computing" target="_blank">Applied Soft Computing</a>. 2019;75:596-606 -->
            [1] Tomé Almeida Borges, Rui Ferreira Neves, Ensemble of machine learning algorithms for cryptocurrency investment with different data resampling methods, Applied Soft Computing, Volume 90, 2020.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import commonModelDesc from '@/mixin/commonModelDesc';
export default {
  mixins: [commonModelDesc],
}
</script>

<style lang="scss">
  @import './css/commonModelDesc.scss'
</style>