<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>바닥 포착</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>알고리즘 트레이딩(Algorithmic trading)은 컴퓨터 프로그램을 이용하여 일정한 논리 구조나 알고리즘, 특정 매매 기법에 따라 증권, 외환, 파생상품 등의 자산을 자동으로 거래하는 매매 방식입니다. 알고리즘 트레이딩은 비일관성, 확신 편향, 기준점 편향, 손실 회피 현상, 처분 효과, 확증 편향 등 인간이 갖는 인지 편향의 문제를 해결하고 원칙에 따라 일관된 매매를 수행할 수 있는 이점이 있습니다. 바닥 포착 멘토는 이러한 알고리즘 트레이딩의 이점을 갖는 규칙 기반 매매기법으로, 실시간으로 단기 바닥을 포착하여 투자자에게 매수 시점을 알려줍니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(규칙기반)</li>
            <li>예측 코인: 전체 코인</li>
            <li>예측 길이: 15분, 30분</li>
            <li>예측 빈도: 약 150회/1일</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>바닥 포착 멘토는 5분, 15분 캔들 데이터를 사용하여 단기적인 과매도 상태를 포착합니다. 마지막 음봉 전환 시점으로부터, 임계치 이상의 하락이 1회 발생할 때마다 카운트하며, 누적 3회가 되면 과매도 구간으로 판단하고 매수 신호를 보냅니다. 예측 길이는 예측에 사용한 분 봉 단위에 따라 각각 15분, 30분 길이의 예측을 생성합니다.</p>
          <p>바닥 포착 멘토는 이처럼 단순한 로직으로 구성되어 있지만 단기 바닥을 짚어내는 데에 특화되어 전략적으로 사용할 수 있으며, 하락장에서 투자자가 효과적으로 대응할 수 있도록 돕습니다. 24시간 쉬지 않고 돌아가는 예측 알고리즘은 100여 종의 가상화폐에 대해 사람이 직접 모니터링 하지 않고도 손쉽게 반등 시점을 확인할 수 있게 합니다. 또한, 예측 길이가 짧아 단기 매매를 선호하는 투자자에게 매력적인 매매 알고리즘입니다.</p>
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