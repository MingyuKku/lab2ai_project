<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>Tweets Keywords AI</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>가상화폐가 대체 투자자산으로 주목받기 시작한 이후로, 수년 동안 가상화폐 가격 변동은 수요공급변수나 실물경제변수와 같은 경제적 변수에 영향을 받기보다는 구글 트렌드 지수, 신문 기사 등 대중의 관심과 연관된 심리적 요인에 더 강한 영향을 받는다는 접근의 연구들이 많이 이루어져 왔습니다.</p>
          <p>이와 같은 관점에서, Tweets Keywords AI는 가상화폐 가격에 영향을 미칠 수 있는 심리적 요인을 수치화하여 가격 예측에 활용하는 AI 모델입니다. 모델은 약 200만 개의 트윗 데이터, 약 3천만 개의 단어로 학습되었고, 실시간 가격 예측을 위해 일 평균 3천여 개의 트윗 데이터를 수집합니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(머신러닝)</li>
            <li>예측 코인: 비트코인</li>
            <li>예측 길이: 24시간</li>
            <li>예측 빈도: 약 1회/3일</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>각 트윗의 매매의견은 Bullish, Neutral, Bearish 중 하나로 분류되고, 가상화폐 캔들 데이터와 함께 XGBoost(Extreme Gradient Boosting) 모델에 입력됩니다. XGBoost는 여러 개의 Decision Tree를 조합해서 사용하는 Ensemble 모델로, 과적합(Overfitting)을 감소시키는 효과가 있으며 적은 양의 데이터로 모델을 학습시킬 때 일반적인 딥러닝 모델보다 성능이 뛰어난 모델입니다. XGBoost는 분류와 회귀 모두에서 뛰어난 성능을 보여 여러 Kaggle Competition에서 상위 스코어를 기록하고 있습니다.</p>
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