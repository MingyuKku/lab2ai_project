<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>급등 포착</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>기술적 분석은 시장 가격이 모든 기본적 요인들을 이미 반영하고 있다는 전제하에, 알려진 경제지표나 재료들 대신 기본적 요인들이 변화하는 시점 사이에서 형성되는 추세(Trend)와 패턴(Pattern)을 해석하는 접근 방식입니다. 특히, 가상화폐 시장의 경우 기반 자산가치를 명확히 계산할 수 없기 때문에 기술적 분석 방법을 사용하는 경우가 많습니다. 급등 포착 멘토는 이러한 기술적 매매기법을 규칙화하여 구현한 매매 알고리즘으로, 볼린저 밴드, DMI, ADX 지표를 기반으로 합니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(규칙기반)</li>
            <li>예측 코인: 전체 코인</li>
            <li>예측 길이: 12시간, 24시간</li>
            <li>예측 빈도: 약 50회/1주</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>볼린저 밴드는 대표적인 변동성 지표 중 하나로, 이동평균선을 기준으로 현재 가격이 어느정도 위치에 있는지 알려줍니다. 볼린저 밴드는 다음과 같이 구성됩니다.</p>
          <ul>
            <li>N기간 동안의 이동평균(MA)</li>
            <li>이동평균 위의 K배 표준편차 상위 밴드</li>
            <li>이동평균 아래의 K배 표준편차 하위 밴드</li>
          </ul>
          <h2>DMI와 ADX 지표는 추세 지표로, 다음과 같이 계산됩니다.</h2>
          <p>DM</p>
          <p class="rocket">모든 캔들에 대해 다음의 기준으로 PDM, MDM을 계산한다.</p>
          <ul class="numbering rocket">
            <li>①이전 고가보다 현재 고가가 높은 경우, 이전 고가를 초과하는 부분이 PDM</li>
            <li>②이전 저가보다 현재 저가가 낮은 경우, 이전 저가보다 작은 부분이 MDM</li>
            <li>③현재 변동폭이 이전 등락폭 내에 있는 경우, DM=0</li>
            <li>④ ①,②모두 해당되는 경우, PDM과 MDM 중 절대값이 더 큰 쪽만 반영하고, 작은 쪽은 0이 된다.</li>
            <li>⑤상위 갭이 발생한 경우, 갭의 크기가 PDM</li>
            <li>⑥하위 갭이 발생한 경우, 갭의 크기가 MDM</li>
          </ul>
          <p>TR</p>
          <p>모든 캔들에 대해 다음의 세 가지 중 절대값이 가장 큰 값을 취한다.</p>
          <ul class="numbering rocket">
            <li>①금일 고가 - 금일 저가</li>
            <li>②금일 고가 - 전일 종가</li>
            <li>③금일 저가 - 전일 종가</li>
          </ul>
          <p>DI</p>
          <p>모든 캔들에 대해 다음의 식을 계산한다.</p>
          <ul class="numbering rocket">
            <li>①PDI = SMA(PDM) / EMA(TR)</li>
            <li>②MDI = SMA(MDM) / EMA(TR)</li>
          </ul>
          <p>ADX</p>
          <p>모든 캔들에 대해 다음의 식을 계산한다.</p>
          <ul class="numbering rocket">
            <li>ADX = SMA( { |PDI - MDI| / (PDI + MDI) } × 100 )</li>
          </ul>
        </div>
        <div class="bottom">
          <p>급등 포착 멘토는 현재 캔들이 아래의 세 조건을 만족할 때 매수 예측을 발생시킵니다.</p>
          <ul class="numbering rocket">
            <li>①BB(5) 하위 밴드 &#60; BB(20) 하위 밴드</li>
            <li>②PDI &#62; MDI</li>
            <li>③ADX가 상승 추세일 때</li>
          </ul>
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